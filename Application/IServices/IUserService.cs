using Application.DTO;
using Application.DTO.Users;

namespace Application.IServices;
public interface IUserService
{
    Task<List<UserDTO>> GetUsersWithoutFiltersServiceAsync();
    Task<UsersDTO> GetUsersWithFiltersServiceAsync(FiltersDTO filters);
    Task<UserDTO> GetUserByIdServiceAsync(Guid id);
    Task UpdateUserServiceAsync(UpdateUserDTO user);
    Task DeleteUserServiceAsync(Guid id);
    Task CreateUserServiceAsync(CreateUserDTO user);
}
