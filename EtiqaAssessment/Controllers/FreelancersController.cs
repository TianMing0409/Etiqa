using EtiqaAssessment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EtiqaAssessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreelancersController : ControllerBase
    {
        private readonly FreelancersDbContext _FreelancerDbContext;
        public FreelancersController(FreelancersDbContext FreelancerDbContext)
        {
            _FreelancerDbContext = FreelancerDbContext;
        }

        [HttpGet]
        [Route("GetFreelancer")]
        public async Task<IEnumerable<Freelancer>> GetFreelancers()
        {
            return await _FreelancerDbContext.Freelancers.ToListAsync();
        }

        [HttpPost]
        [Route("AddFreelancer")]
        public async Task<Freelancer> AddFreelancer(Freelancer objFreelancer)
        {
            _FreelancerDbContext.Freelancers.Add(objFreelancer);
            await _FreelancerDbContext.SaveChangesAsync();
            return objFreelancer;
        }

        [HttpPatch]
        [Route("UpdateFreelancer/{id}")]
        public async Task<Freelancer> UpdateFreelancer(Freelancer objFreelancer)
        {
            _FreelancerDbContext.Entry(objFreelancer).State = EntityState.Modified;
            await _FreelancerDbContext.SaveChangesAsync();
            return objFreelancer;
        }

        [HttpDelete]
        [Route("DeleteFreelancer/{id}")]
        public bool DeleteFreelancer(int id)
        {
            bool a = false;
            var Freelancer = _FreelancerDbContext.Freelancers.Find(id);
            if (Freelancer != null)
            {
                a = true;
                _FreelancerDbContext.Entry(Freelancer).State = EntityState.Deleted;
                _FreelancerDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}
