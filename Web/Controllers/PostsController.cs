using Application.DTO;
using Application.DTO.Posts;
using Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PostsController : BaseController
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }
    [HttpGet]
    public async Task<ActionResult> GetPostsAsync([FromQuery] FiltersDTO filters) => Ok(await _postService.GetPostsServiceAsync(filters));

    [HttpGet("/api/[controller]/{id}")]
    public async Task<ActionResult> GetPostByIdAsync(Guid id) => Ok(await _postService.GetPostByIdServiceAsync(id));

    [HttpPost]
    public async Task CreatePostAsync([FromBody] CreatePostDTO post) => await _postService.CreatePostServiceAsync(post);

    [HttpPut]
    public async Task UpdatePostAsync([FromBody] UpdatePostDTO post) => await _postService.UpdatePostServiceAsync(post);

    [HttpDelete("/api/[controller]/{id}")]
    public async Task DeletePostAsync(Guid id) => await _postService.DeletePostServiceAsync(id);
}
