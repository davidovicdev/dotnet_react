using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>()
        .HasOne(b => b.User)
        .WithMany(a => a.Posts)
        .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<User>()
        .HasMany(b => b.Posts);
    }
}
