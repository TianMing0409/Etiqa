using System.ComponentModel.DataAnnotations;

namespace EtiqaAssessment.Models
{
    public class Freelancer
    {
        [Key]
        public int id { get; set; }

        public string username { get; set; }

        public string email { get; set; }

        public string phoneNo { get; set; }

        public string skillsets { get; set; }

        public string hobby { get; set; }
    }
}
