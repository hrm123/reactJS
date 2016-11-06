using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Data.Entity;
using Lucene.Net.Linq.Mapping;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace mongodb101.DAL
{
    /// <summary>
    /// Base class for entities
    /// </summary>
    public abstract class EntityBase
    {
        #region Members
        Guid _Id;
        #endregion
        #region Properties

        /// <summary>
        /// Get or set the persisted object identifier
        /// </summary>
        [Key]
        [Field(Key = true)]
        [BsonId]
        public virtual Guid Id
        {
            get
            {
                return _Id;
            }
            set
            {
                _Id = value;
            }
        }
        /// <summary>
        /// Get or set the Date of Creation
        /// </summary>
        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }
        /// <summary>
        /// Get or set the Date of LastUpdate
        /// </summary>
        [DataType(DataType.DateTime)]
        public DateTime LastUpdateDate { get; set; }
        #endregion
    }
}