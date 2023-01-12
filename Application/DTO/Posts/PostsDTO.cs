namespace Application.DTO.Posts;
public class PostsDTO
{
    public FiltersDTO Filters { get; set; }
    public List<PostDTO> Posts { get; set; }
    public PostsDTO()
    {
    }
    public PostsDTO(FiltersDTO filters, List<PostDTO> posts)
    {
        Filters = filters;
        Posts = posts;
    }
}
