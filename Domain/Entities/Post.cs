using System.Reflection;

namespace Domain.Entities;
public class Post
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public User User { get; set; }
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
