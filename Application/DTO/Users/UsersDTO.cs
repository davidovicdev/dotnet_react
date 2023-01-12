namespace Application.DTO.Users;
public class UsersDTO
{
    public FiltersDTO Filters { get; set; }
    public List<UserDTO> Users { get; set; }
    public UsersDTO()
    {
    }
    public UsersDTO(FiltersDTO filters, List<UserDTO> users)
    {
        Filters = filters;
        Users = users;
    }
}
