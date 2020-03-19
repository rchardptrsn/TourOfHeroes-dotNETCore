using Microsoft.EntityFrameworkCore;
using Heroes.API.Model;

namespace Heroes.API.Data
{

    public class HeroesContext : DbContext
    {
        public HeroesContext (DbContextOptions<HeroesContext> options)
            : base(options)
        {
        }

        public DbSet<HeroValue> HeroValue { get; set; }
    }
}
