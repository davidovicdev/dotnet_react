namespace Application.DTO.Users;
public class UpdateUserDTO
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public UpdateUserDTO()
    {
    }
    public UpdateUserDTO(Guid id, string firstName, string lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }
}
