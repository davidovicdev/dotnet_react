namespace Application.DTO.Posts;
public class CreatePostDTO
{
    public string Title { get; set; }
    public string Body { get; set; }
    public Guid UserId { get; set; }
    public CreatePostDTO()
    {
    }
    public CreatePostDTO(string title, string body, Guid userId)
    {
        Title = title;
        Body = body;
        UserId = userId;
    }
}
