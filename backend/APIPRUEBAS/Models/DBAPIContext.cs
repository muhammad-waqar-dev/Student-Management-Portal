using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace APIPRUEBAS.Models
{
    public partial class DBAPIContext : DbContext
    {
        public DBAPIContext()
        {
        }

        public DBAPIContext(DbContextOptions<DBAPIContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Nationality> Nationality { get; set; } = null!;
        public virtual DbSet<Student> Student { get; set; } = null!;
        public virtual DbSet<FamilyMember> FamilyMember { get; set; } = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Nationality>(entity =>
            {
                entity.HasKey(e => e.id)
                    .HasName("PK__Nationality__A3C02A1033A1C444");

                entity.ToTable("Nationality");

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasKey(e => e.ID)
                    .HasName("PK__Student__A3C02A1033A1C444");

                entity.ToTable("Student");

                entity.Property(e => e.ID)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FamilyMember>(entity =>
            {
                entity.HasKey(e => e.ID)
                    .HasName("PK__FamilyMember__A3C02A1033A1C444");

                entity.ToTable("FamilyMember");

                entity.Property(e => e.ID)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
