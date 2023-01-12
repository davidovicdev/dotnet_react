namespace Application.DTO.Posts;
public class UpdatePostDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public UpdatePostDTO()
    {
    }
    public UpdatePostDTO(Guid id, string title, string body)
    {
        Id = id;
        Title = title;
        Body = body;
    }
}