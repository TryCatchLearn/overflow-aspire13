using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Common;

public static class MigrationRunner
{
    public static async Task MigrateDbContextAsync<TContext>(this IHost host)
        where TContext : DbContext
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        var loggerFactory = services.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger(typeof(MigrationRunner));
        try
        {
            var context = services.GetRequiredService<TContext>();
            await context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occured during migration");
        }

        logger.LogInformation("✅ Migration complete for {Name}", typeof(TContext).Name);
    }
}