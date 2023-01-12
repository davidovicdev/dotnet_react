using System.Reflection;

namespace Domain.Entities;
public class User
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public List<Post> Posts { get; set; }
    public object this[string propertyName]
    {
        get
        {
            PropertyInfo property = GetType().GetProperty(propertyName);
            return property.GetValue(this, null);
        }
        set
        {
            PropertyInfo property = GetType().GetProperty(propertyName);
            property.SetValue(this, value, null);
        }
    }
}
