using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Models;

namespace NekretnineZellAmSee.Data
{
    public class NekretnineZellAmSeeContext(DbContextOptions<NekretnineZellAmSeeContext> opcije) : DbContext(opcije)
    {
        public DbSet<Stan> Stanovi { get; set; }
        public DbSet<Zakupac> Zakupci { get; set; }
        public DbSet<Najam> Najmovi { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);                                 //Falio mi je ovaj kod

            // Implementacija veze 1:n između Stanovi i Najmovi
            modelBuilder.Entity<Najam>().HasOne(n => n.Stan);

            // Implementacija veze 1:n između Zakupci i Najmovi
            modelBuilder.Entity<Najam>().HasOne(n => n.Zakupac);
                
        }
    }
}