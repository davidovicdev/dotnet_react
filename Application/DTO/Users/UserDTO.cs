using Application.DTO.Posts;

namespace Application.DTO.Users;
public class UserDTO
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public List<PostDTO> Posts { get; set; }
}
