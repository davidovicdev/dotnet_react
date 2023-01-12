using Domain.Entities;
using Domain.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<User> GetUserByIdRepositoryAsync(Guid id)
    {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == id);
        user.Posts ??= new List<Post>();
        return user;
    }

    public async Task<List<User>> GetUsersRepositoryAsync(int page, int perPage, string sortBy, string search)
    {
        var users = await _context.Users.Include(x => x.Posts)
            .Where(x => x.FirstName.Contains(search) || x.LastName.Contains(search))
            .OrderBy(x => x[sortBy])
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();
        return users;
    }

    public async Task CreateUserRepositoryAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserRepositoryAsync(User user)
    {
        var userToUpdate = await _context.Users.SingleOrDefaultAsync(x => x.Id == user.Id);
        userToUpdate.FirstName = user.FirstName;
        userToUpdate.LastName = user.LastName;
        await _context.SaveChangesAsync();
    }
    public async Task DeleteUserRepositoryAsync(Guid id)
    {
        _context.Posts.RemoveRange(_context.Posts.Where(x => x.User.Id == id));
        var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == id);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}
