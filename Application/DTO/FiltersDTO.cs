namespace Application.DTO;
public class FiltersDTO
{
    public int Page { get; set; } = 1;
    public int PerPage { get; set; } = 10;
    public string SortBy { get; set; } = "Id";
    public string Search { get; set; } = "";
    public FiltersDTO()
    {

    }
    public FiltersDTO(int page, int perPage, string sortBy, string search)
    {
        Page = page;
        PerPage = perPage;
        SortBy = sortBy;
        Search = search;
    }
}
