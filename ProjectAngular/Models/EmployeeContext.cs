using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Models
{
    public class EmployeeContext : DbContext
    {
        
        public DbSet<PersonalInfo> PersonalInfos { get; set; }
        public DbSet<EducationalInfo> EducationalInfos { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<EmploymentInfo> EmploymentInfos { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<District> Districts { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string con = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetConnectionString("EmployeeCon");
            optionsBuilder.UseSqlServer(con);
            base.OnConfiguring(optionsBuilder);
        }

    }
}
