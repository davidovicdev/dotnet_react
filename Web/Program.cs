using Application.IServices;
using Application.Services;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IPostService, PostService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowCredentials().AllowAnyOrigin().WithOrigins(builder.Configuration.GetConnectionString("ClientConnection"));
    });
});

var infrastructureStartup = new InfrastructureStartup(builder.Configuration);
infrastructureStartup.ConfigureService(builder.Services);

var app = builder.Build();

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    InfrastructureStartup.SeedData(serviceScope.ServiceProvider.GetService<ApplicationDbContext>());
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
