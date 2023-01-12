using Domain.Entities;
using Domain.SharedKernel.Interfaces;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;
public class InfrastructureStartup
{
    public InfrastructureStartup(IConfigurationRoot configurationRoot)
    {
        Configuration = configurationRoot;
    }
    public IConfiguration Configuration { get; }
    public void ConfigureService(IServiceCollection services)
    {
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IPostRepository, PostRepository>();

        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    }
    public static void SeedData(ApplicationDbContext context)
    {

        // Look for any data already in the database.
        if (context.Users.Any() || context.Posts.Any())
        {
            return;   // DB has been seeded
        }

        var users = new List<User>
            {
                new User { Id = Guid.NewGuid(), FirstName = "John", LastName = "Doe", Posts = new List<Post>() },
                new User { Id = Guid.NewGuid(), FirstName = "Jane", LastName = "Doe", Posts = new List<Post>() },
                new User { Id = Guid.NewGuid(), FirstName = "Bob", LastName = "Smith", Posts = new List<Post>() }
            };

        var posts = new List<Post>
            {
                new Post { Id = Guid.NewGuid(), Title = "First Post", Body = "This is the first post.", User = users[0] },
                new Post { Id = Guid.NewGuid(), Title = "Second Post", Body = "This is the second post.", User = users[1] },
                new Post { Id = Guid.NewGuid(), Title = "Third Post", Body = "This is the third post.", User = users[2] },
                new Post { Id = Guid.NewGuid(), Title = "Fourth Post", Body = "This is the fourth post.", User = users[0] }
            };

        users[0].Posts.Add(posts[0]);
        users[0].Posts.Add(posts[3]);
        users[1].Posts.Add(posts[1]);
        users[2].Posts.Add(posts[2]);

        context.Users.AddRange(users);
        context.SaveChanges();
    }
}
