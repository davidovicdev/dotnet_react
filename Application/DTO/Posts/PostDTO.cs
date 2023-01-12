using Application.DTO.Users;

namespace Application.DTO.Posts;
public class PostDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public UserDTO User { get; set; }
}
