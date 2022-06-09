using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProjectAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAngular.Repository
{
    public interface IService<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(object Id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(object Id);
    }
    public class Service<T> : IService<T> where T : class
    {
        private readonly EmployeeContext _context;
        private readonly DbSet<T> _entities;
        public Service()
        {
            _context = new EmployeeContext();
            _entities = _context.Set<T>();
        }

        public void Delete(object Id)
        {
            T deleted = _entities.Find(Id);
            _entities.Remove(deleted);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return _entities.ToList();
        }

        public T GetById(object Id)
        {
            return _entities.Find(Id);
        }

        public void Insert(T entity)
        {
            _entities.Add(entity);
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _entities.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        //public void getFullInfo()
        //{
        //    string con = "server=(localdb)\\mssqllocaldb; database=EmployeeDBMS; integrated security = true";
        //    SqlConnection connection = new SqlConnection();
        //    connection.ConnectionString = con;
        //    string cmdString = "select p.EmployeeId, p.Name, p.DoB, p.Gender, p.Phone, p.Email, p.Address, div.DivName, dis.DistrictName, edu.HighestDegree, edu.Subject, edu.CGPA," +
        //        "edu.Training, dep.DepName, em.Designation, em.Salary, p.Image from Divisions as div join Districts as dis on div.DivisionId = dis.DivisionId join" +
        //        "PersonalInfos as p on dis.DistrictId = p.DistrictId join EducationalInfos as edu on p.EmployeeId = edu.EmployeeId join" +
        //        "EmploymentInfos as em on edu.EmployeeId = em.EmployeeId join Departments as dep on em.DepartmentId = dep.DepartmentId";
        //    SqlCommand cmd = new SqlCommand(cmdString);
        //    connection.Open();
        //    SqlDataReader sdr = cmd.ExecuteReader();
        //    while (sdr.Read())
        //    {
        //        sdr.
        //    }
        //}
    }
}
