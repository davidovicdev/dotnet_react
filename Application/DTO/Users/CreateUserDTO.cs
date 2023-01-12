namespace Application.DTO.Users;
public class CreateUserDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public CreateUserDTO()
    {
    }
    public CreateUserDTO(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
}
