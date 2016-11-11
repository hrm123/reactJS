using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Collections.Generic;
using System;
using System.Data.Entity.Infrastructure;
using mongodb101.DAL.Resources;

namespace mongodb101.DAL
{
    public class MainBCUnitOfWork : DbContext, IMainBCUnitOfWork
    {
        #region Fileds
        private IDbSet<ToDo> _todos;
        #endregion

        #region Properties
        public IDbSet<ToDo> Todos
        {
            get
            {
                if (this._todos == null)
                    this._todos = (IDbSet<ToDo>)this.Set<ToDo>();
                return this._todos;
            }
        }
        
        #endregion

        #region IQueryableUnitOfWork
        public virtual IQueryable<TEntity> CreateSet<TEntity>() where TEntity : class, new()
        {
            return (IDbSet<TEntity>)this.Set<TEntity>();
        }

        public virtual void Attach<TEntity>(TEntity item) where TEntity : class
        {
            this.Entry<TEntity>(item).State = EntityState.Unchanged;
        }

        public virtual void SetModified<TEntity>(TEntity item) where TEntity : class
        {
            this.Entry<TEntity>(item).State = EntityState.Modified;
        }

        public virtual void ApplyCurrentValues<TEntity>(TEntity original, TEntity current) where TEntity : class
        {
            this.Entry<TEntity>(original).CurrentValues.SetValues((object)current);
        }

        #endregion

        #region IUnitOfWork
        public virtual void Commit()
        {
            try
            {
                this.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                throw this.GetDBValidationExptions(ex);
            }
        }

        public async Task CommitAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                await this.SaveChangesAsync(cancellationToken);
            }
            catch (DbEntityValidationException ex)
            {
                throw this.GetDBValidationExptions(ex);
            }
        }

        public void CommitAndRefreshChanges()
        {
            bool saveFailed = false;

            do
            {
                try
                {
                    base.SaveChanges();

                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    ex.Entries.ToList()
                              .ForEach(entry =>
                              {
                                  entry.OriginalValues.SetValues(entry.GetDatabaseValues());
                              });

                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var entry in this.ChangeTracker.Entries())
                    {
                        if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                        {
                            entry.State = EntityState.Detached;
                        }
                    }

                    throw GetDBValidationExptions(dbEx);

                }
            } while (saveFailed);
        }

        public async Task CommitAndRefreshChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            bool saveFailed = false;

            do
            {
                try
                {
                    await base.SaveChangesAsync(cancellationToken);

                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;

                    ex.Entries.ToList()
                              .ForEach(entry =>
                              {
                                  entry.OriginalValues.SetValues(entry.GetDatabaseValues());
                              });

                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var entry in this.ChangeTracker.Entries())
                    {
                        if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                        {
                            entry.State = EntityState.Detached;
                        }
                    }

                    throw GetDBValidationExptions(dbEx);
                }

            } while (saveFailed);
        }

        public void RollbackChanges()
        {
            this.ChangeTracker.Entries().ToList().ForEach((entry => entry.State = EntityState.Unchanged));
        }

        #endregion

        #region ISsql
        public IEnumerable<TEntity> ExecuteQuery<TEntity>(string sqlQuery, params object[] parameters)
        {
            return (IEnumerable<TEntity>)this.Database.SqlQuery<TEntity>(sqlQuery, parameters);
        }

        public int ExecuteCommand(string sqlCommand, params object[] parameters)
        {
            return this.Database.ExecuteSqlCommand(sqlCommand, parameters);
        }

        #endregion

        #region DbContext
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<IncludeMetadataConvention>();
        }

        #endregion

        #region local
        private Exception GetDBValidationExptions(DbEntityValidationException dbEx)
        {
            string message = string.Empty;
            foreach (DbEntityValidationResult validationResult in dbEx.EntityValidationErrors)
            {
                foreach (DbValidationError dbValidationError in (IEnumerable<DbValidationError>)validationResult.ValidationErrors)
                    message = message + string.Format("Property: {0} Error: {1}", (object)dbValidationError.PropertyName, (object)dbValidationError.ErrorMessage);
            }
            return new Exception(Messages.ValidationError, new Exception(message));
        }

        #endregion
    }
}