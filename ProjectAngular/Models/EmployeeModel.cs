using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Models
{
    public class PersonalInfo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime DoB { get; set; }
        public string Gender { get; set; }
        [Required]
        //[RegularExpression(@"^[0][1-9]\d{9}$", ErrorMessage = "Invalid Phone Number")]
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int DivisionId { get; set; }
        [ForeignKey("District")]
        public int DistrictId { get; set; }
        public string Image { get; set; }

        public virtual ICollection<EducationalInfo> EducationalInfo { get; set; }
        public virtual EmploymentInfo EmploymentInfo { get; set; }
        public virtual District District { get; set; }
    }

    public class EducationalInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        [ForeignKey("PersonalInfo")]
        public int EmployeeId { get; set; }
        public string HighestDegree { get; set; }
        public string Subject { get; set; }
        public int PassingYear { get; set; }
        public int CGPA { get; set; }
        public string Training { get; set; }
        public string Duration { get; set; }
        public virtual PersonalInfo PersonalInfo { get; set; }
    }

    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        public string DepName { get; set; }
        public virtual ICollection<EmploymentInfo> EmploymentInfos { get; set; }
    }

    public class EmploymentInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        [ForeignKey("PersonalInfo")]
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
        public string Designation { get; set; }
        public bool IsNew { get; set; }
        [DataType(DataType.Currency)]
        public double Salary { get; set; }
        public string ReferenceName { get; set; }
        public int ReferencePhone { get; set; }

        public virtual PersonalInfo PersonalInfo { get; set; }
    }

    public class Division
    {
        [Key]
        public int DivisionId { get; set; }
        public string DivName { get; set; }
        public virtual ICollection<District> Districts { get; set; }
    }

    public class District
    {
        [Key]
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        [ForeignKey("Division")]
        public int DivisionId { get; set; }
        public virtual Division Division { get; set; }
        public virtual ICollection<PersonalInfo> PersonalInfos { get; set; }
    }
}
