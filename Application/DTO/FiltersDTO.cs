namespace Application.DTO;
public class FiltersDTO
{
    public int Page { get; set; } = 1;
    public int PerPage { get; set; } = 2;

    public string SortBy { get; set; } = "Id";
    private string _search = string.Empty;
    public string Search
    {
        get => _search;
        set { _search = value ?? string.Empty; }
    }
    public int? PageCount { get; set; } = 1;
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
    public FiltersDTO(int page, int perPage, string sortBy, string search, int pageCount)
    {
        Page = page;
        PerPage = perPage;
        SortBy = sortBy;
        Search = search;
        PageCount = pageCount;
    }
}
