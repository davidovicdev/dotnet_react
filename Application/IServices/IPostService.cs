using Application.DTO;
using Application.DTO.Posts;

namespace Application.IServices;
public interface IPostService
{
    Task<PostsDTO> GetPostsServiceAsync(FiltersDTO filters);
    Task<PostDTO> GetPostByIdServiceAsync(Guid id);
    Task UpdatePostServiceAsync(UpdatePostDTO post);
    Task DeletePostServiceAsync(Guid id);
    Task CreatePostServiceAsync(CreatePostDTO post);
}
