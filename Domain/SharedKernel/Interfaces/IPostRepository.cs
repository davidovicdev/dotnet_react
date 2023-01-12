using Domain.Entities;

namespace Domain.SharedKernel.Interfaces;
public interface IPostRepository
{
    Task<List<Post>> GetPostsRepositoryAsync(int page, int perPage, string sortBy, string search);

    Task<Post> GetPostByIdRepositoryAsync(Guid id);

    Task UpdatePostRepositoryAsync(Post post);

    Task DeletePostRepositoryAsync(Guid id);

    Task CreatePostRepositoryAsync(Post post);
}
