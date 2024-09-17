using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Models;

namespace NekretnineZellAmSee.Data
{
    public class NekretnineContext : DbContext
    {
        public NekretnineContext(DbContextOptions<NekretnineContext> opcije) : base(opcije)
        {
        }

        public DbSet<Stan> Stanovi { get; set; }
    }
}