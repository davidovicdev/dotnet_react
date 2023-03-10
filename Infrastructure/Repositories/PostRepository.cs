using Domain.Entities;
using Domain.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class PostRepository : IPostRepository
{
    private readonly ApplicationDbContext _context;

    public PostRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Post> GetPostByIdRepositoryAsync(Guid id)
    {
        var post = await _context.Posts.Include(x => x.User).SingleOrDefaultAsync(x => x.Id == id);
        return post;
    }
    public async Task<List<Post>> GetPostsWithoutFiltersRepositoryAsync()
    {
        var posts = await _context.Posts.Include(x => x.User).ToListAsync();
        return posts;
    }
    public async Task<(List<Post>, int)> GetPostsWithFiltersRepositoryAsync(int page, int perPage, string sortBy, string search)
    {
        var totalItems = await _context.Posts
            .Where(x => x.Title.Contains(search) || x.Body.Contains(search))
            .CountAsync();

        var posts = await _context.Posts.Include(x => x.User)
            .Where(x => x.Title.Contains(search) || x.Body.Contains(search))
            .OrderBy(x => x[sortBy])
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();

        var totalPages = (int)Math.Ceiling((double)totalItems / perPage);

        return (posts, totalPages);
    }
    public async Task CreatePostRepositoryAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }
    public async Task UpdatePostRepositoryAsync(Post post)
    {
        var postToUpdate = await _context.Posts.SingleOrDefaultAsync(x => x.Id == post.Id);

        postToUpdate.Title = post.Title;
        postToUpdate.Body = post.Body;
        postToUpdate.User = post.User;
        await _context.SaveChangesAsync();
    }
    public async Task DeletePostRepositoryAsync(Guid id)
    {
        var post = await _context.Posts.SingleOrDefaultAsync(x => x.Id == id);
        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
    }
}
