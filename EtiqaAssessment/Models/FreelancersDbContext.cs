using Microsoft.EntityFrameworkCore;

namespace EtiqaAssessment.Models
{
    public class FreelancersDbContext: DbContext
    {
        public FreelancersDbContext(DbContextOptions<FreelancersDbContext> options) : base(options)
        { 
        }

        public DbSet<Freelancer> Freelancers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.; Initial Catalog=lbs; User Id=sa; password=123; TrustServerCertificate= True");
        }
    }
}
