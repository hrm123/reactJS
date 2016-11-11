using System;
using System.Data.Entity;

namespace mongodb101.DAL
{
    public interface IMainBCUnitOfWork : IQueryableUnitOfWork, IUnitOfWork, IDisposable, ISql
    {
        IDbSet<ToDo> Todos { get; }
    }
}
