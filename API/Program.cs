using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddAplicationServices(builder.Configuration);
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("CorsPolicy");
        app.UseAuthorization();
        app.MapControllers();
        using var scope = app.Services.CreateScope();
        var service = scope.ServiceProvider;
        try
        {
            var context = service.GetRequiredService<DataContext>();
            await context.Database.MigrateAsync();
            await Seed.SeedData(context);
        }
        catch (Exception ex)
        {
            var logger = service.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An Error ocrred while creating the database");
        }
        app.Run();
    }
}