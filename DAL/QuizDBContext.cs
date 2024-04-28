using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class QuizDBContext : DbContext
    {
        public QuizDBContext(DbContextOptions<QuizDBContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<Question> QuizzifyQuestions { get; set; }
        public DbSet<Category> QuizzifyCategories { get; set; }
        public DbSet<QuestionType> QuestionTypes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Quiz> QuizzifyQuiz { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<User>(entity =>
            //{
            //    entity.HasKey(e => e.Id);

            //    entity.Property(e => e.Name)
            //          .IsRequired();

            //    entity.Property(e => e.EmailId)
            //          .IsRequired();

            //    entity.Property(e => e.Password)
            //          .IsRequired()
            //          .HasMaxLength(15);

            //    entity.Property(e => e.OrganisationId)
            //          .IsRequired();

            //    entity.Property(e => e.PhoneNo)
            //          .IsRequired()
            //          .HasMaxLength(10);

            //    entity.Property(e => e.IsApproved)
            //          .HasDefaultValue(false);

            //    entity.Property(e => e.ModifiedDate)
            //          .IsRequired(false);

            //    entity.Property(e => e.ModifiedBy)
            //          .IsRequired(false);

            //    entity.Property(e => e.RoleId)
            //          .HasDefaultValue(1);

            //    entity.Property(e => e.IsEnable)
            //          .HasDefaultValue(true);
            //});


            //modelBuilder.Entity<Quiz>(entity =>
            //{
            //    entity.HasKey(q => q.Id);
            //    entity.Property(q => q.IsEnable).HasDefaultValue(true);
            //    entity.Property(q => q.AutoValidation).HasDefaultValue(true);
            //    entity.HasOne(q => q.User).WithMany().HasForeignKey(q => q.UserId);
            //    entity.Property(q => q.TotalMarks)
            //          .HasColumnType("decimal(18,2)")
            //          .IsRequired();
            //});
            //modelBuilder.Entity<QuizQuestion>(entity =>
            //{
            //    entity.HasKey(qq => qq.Id);
            //    // Define relationships
            //    entity.HasOne(qq => qq.Category)
            //          .WithMany()
            //          .HasForeignKey(qq => qq.CategoryId)
            //          .OnDelete(DeleteBehavior.NoAction);

            //    entity.HasOne(qq => qq.Question)
            //          .WithMany()
            //          .HasForeignKey(qq => qq.QuestionId)
            //          .OnDelete(DeleteBehavior.NoAction);

            //    entity.HasOne(qq => qq.Quiz)
            //          .WithMany()
            //          .HasForeignKey(qq => qq.QuizId)
            //          .OnDelete(DeleteBehavior.NoAction);

            //    // Other configurations for QuizQuestion entity
            //    entity.Property(qq => qq.Marks)
            //          .HasColumnType("decimal(18,2)")
            //          .IsRequired();
            //});
            //modelBuilder.Entity<QuizQuestion>()
            //    .HasOne(q => q.Category)
            //    .WithMany()
            //    .HasForeignKey(q => q.CategoryId)
            //    .OnDelete(DeleteBehavior.NoAction); // or DeleteBehavior.NoAction

            //modelBuilder.Entity<QuizQuestion>()
            //    .HasOne(q => q.Question)
            //    .WithMany()
            //    .HasForeignKey(q => q.QuestionId)
            //    .OnDelete(DeleteBehavior.NoAction); // or DeleteBehavior.NoAction

            //modelBuilder.Entity<QuizQuestion>()
            //    .HasOne(q => q.Quiz)
            //    .WithMany()
            //    .HasForeignKey(q => q.QuizId)
            //    .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
