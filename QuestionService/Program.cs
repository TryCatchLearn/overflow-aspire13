using Microsoft.EntityFrameworkCore;
using QuestionService.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.AddServiceDefaults();
builder.Services.AddAuthentication()
    .AddKeycloakJwtBearer(
        serviceName: "keycloak",
        realm: "overflow",
        options =>
        {
            options.RequireHttpsMetadata = false;
            options.Audience = "overflow";
        }
    );
builder.Services.AddAuthorizationBuilder();
builder.AddNpgsqlDbContext<QuestionDbContext>("questionDb");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.MapDefaultEndpoints();

using var scope = app.Services.CreateScope();  
var services = scope.ServiceProvider;  
try  
{  
    var context = services.GetRequiredService<QuestionDbContext>();  
    await context.Database.MigrateAsync();  
}  
catch (Exception ex)  
{  
    var logger = services.GetRequiredService<ILogger<Program>>();  
    logger.LogError(ex, "An error occured during migration");  
}

app.Run();