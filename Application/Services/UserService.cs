using Application.DTO;
using Application.DTO.Posts;
using Application.DTO.Users;
using Application.IServices;
using Domain.Entities;
using Domain.SharedKernel.Interfaces;

namespace Application.Services;
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<UserDTO> GetUserByIdServiceAsync(Guid id)
    {
        var user = await _userRepository.GetUserByIdRepositoryAsync(id);
        List<PostDTO> mappedPosts = new();

        foreach (var post in user.Posts)
        {
            mappedPosts.Add(new PostDTO()
            {
                Id = post.Id,
                Title = post.Title,
                Body = post.Body,
            });
        }
        UserDTO userMapped = new()
        {
            Id = id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Posts = mappedPosts
        };
        return userMapped;
    }

    public async Task<UsersDTO> GetUsersServiceAsync(FiltersDTO filters)
    {
        List<User> usersFromRepository = await _userRepository.GetUsersRepositoryAsync(filters.Page, filters.PerPage, filters.SortBy, filters.Search);
        List<UserDTO> users = new();
        foreach (var user in usersFromRepository)
        {
            List<PostDTO> posts = new();
            foreach (var post in user.Posts)
            {
                posts.Add(new PostDTO()
                {
                    Id = post.Id,
                    Title = post.Title,
                    Body = post.Body,
                    User = new UserDTO()
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                    },
                });
            }
            users.Add(new UserDTO()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Posts = posts
            });
        }
        UsersDTO output = new()
        {
            Filters = filters,
            Users = users
        };
        return output;
    }
    public async Task CreateUserServiceAsync(CreateUserDTO user)
    {
        User mappedUser = new()
        {
            Id = Guid.NewGuid(),
            FirstName = user.FirstName,
            LastName = user.LastName,
            Posts = new List<Post>() { }
        };
        await _userRepository.CreateUserRepositoryAsync(mappedUser);
    }
    public async Task UpdateUserServiceAsync(UpdateUserDTO user)
    {
        User mappedUser = new()
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
        };
        await _userRepository.UpdateUserRepositoryAsync(mappedUser);
    }
    public async Task DeleteUserServiceAsync(Guid id)
    {
        await _userRepository.DeleteUserRepositoryAsync(id);
    }
}
