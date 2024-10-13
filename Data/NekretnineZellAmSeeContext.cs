using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Models;

namespace NekretnineZellAmSee.Data
{
    public class NekretnineZellAmSeeContext(DbContextOptions<NekretnineZellAmSeeContext> opcije) : DbContext(opcije)
    {
        public DbSet<Stan> Stanovi { get; set; }
        public DbSet<Zakupac> Zakupci { get; set; }
    }
}