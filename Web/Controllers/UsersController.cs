using Application.DTO;
using Application.DTO.Users;
using Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;
public class UsersController : BaseController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet]
    public async Task<ActionResult> GetUsersWithoutFiltersAsync() => Ok(await _userService.GetUsersWithoutFiltersServiceAsync());
    [HttpGet("/api/[controller]Filters")]
    public async Task<ActionResult> GetUsersWithFiltersAsync([FromQuery] FiltersDTO filters) => Ok(await _userService.GetUsersWithFiltersServiceAsync(filters));

    [HttpGet("/api/[controller]/{id}")]
    public async Task<ActionResult> GetUserByIdAsync(Guid id) => Ok(await _userService.GetUserByIdServiceAsync(id));

    [HttpPost]
    public async Task CreateUserAsync([FromBody] CreateUserDTO user) => await _userService.CreateUserServiceAsync(user);

    [HttpPut]
    public async Task UpdateUserAsync([FromBody] UpdateUserDTO user) => await _userService.UpdateUserServiceAsync(user);

    [HttpDelete("/api/[controller]/{id}")]
    public async Task DeleteUserAsync(Guid id) => await _userService.DeleteUserServiceAsync(id);
}
