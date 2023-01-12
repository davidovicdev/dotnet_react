using Application.DTO;
using Application.DTO.Posts;
using Application.DTO.Users;
using Application.IServices;
using Domain.Entities;
using Domain.SharedKernel.Interfaces;

namespace Application.Services;
public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly IUserRepository _userRepository;

    public PostService(IPostRepository postRepository, IUserRepository userRepository)
    {
        _postRepository = postRepository;
        _userRepository = userRepository;
    }
    public async Task<PostDTO> GetPostByIdServiceAsync(Guid id)
    {
        var post = await _postRepository.GetPostByIdRepositoryAsync(id);
        PostDTO mappedPost = new()
        {
            Id = id,
            Title = post.Title,
            Body = post.Body,
            User = new UserDTO()
            {
                Id = post.User.Id,
                FirstName = post.User.FirstName,
                LastName = post.User.LastName,
                Posts = new List<PostDTO>()
            }
        };
        return mappedPost;
    }

    public async Task<PostsDTO> GetPostsServiceAsync(FiltersDTO filters)
    {
        var posts = await _postRepository.GetPostsRepositoryAsync(filters.Page, filters.PerPage, filters.SortBy, filters.Search);
        List<PostDTO> mappedPosts = new();
        foreach (var post in posts)
        {
            UserDTO mappedUser = new()
            {
                Id = post.User.Id,
                FirstName = post.User.FirstName,
                LastName = post.User.LastName,
            };
            mappedPosts.Add(new PostDTO()
            {
                Id = post.Id,
                Body = post.Body,
                Title = post.Title,
                User = mappedUser
            });
        }
        PostsDTO output = new()
        {
            Filters = filters,
            Posts = mappedPosts
        };
        return output;
    }

    public async Task CreatePostServiceAsync(CreatePostDTO post)
    {
        Post mappedPost = new()
        {
            Id = Guid.NewGuid(),
            Body = post.Body,
            Title = post.Title,
            User = await _userRepository.GetUserByIdRepositoryAsync(post.UserId)
        };
        await _postRepository.CreatePostRepositoryAsync(mappedPost);
    }
    public async Task UpdatePostServiceAsync(UpdatePostDTO post)
    {
        Post mappedPost = new()
        {
            Id = post.Id,
            Body = post.Body,
            Title = post.Title,
        };
        await _postRepository.UpdatePostRepositoryAsync(mappedPost);
    }
    public async Task DeletePostServiceAsync(Guid id)
    {
        await _postRepository.DeletePostRepositoryAsync(id);
    }
}
