using Domain.Entities;

namespace Domain.SharedKernel.Interfaces;
public interface IUserRepository
{
    Task<List<User>> GetUsersRepositoryAsync(int page, int perPage, string sortBy, string search);

    Task<User> GetUserByIdRepositoryAsync(Guid id);

    Task UpdateUserRepositoryAsync(User user);

    Task DeleteUserRepositoryAsync(Guid id);

    Task CreateUserRepositoryAsync(User user);
}
