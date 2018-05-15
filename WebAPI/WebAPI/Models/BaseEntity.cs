using System;

namespace WebAPI.Models
{
    public abstract class BaseEntity
    {
        public Guid id { get; set; }
    }
}