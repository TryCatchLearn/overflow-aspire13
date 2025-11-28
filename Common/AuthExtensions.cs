using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Common;

public static class AuthExtensions
{
    public static IServiceCollection AddKeycloakAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddKeycloakJwtBearer(
                serviceName: "keycloak",
                realm: "overflow",
                options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.Audience = "overflow";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuers = [
                            "http://localhost:6001/realms/overflow",
                            "http://keycloak/realms/overflow",
                            "http://id.overflow.local/realms/overflow"
                        ]
                    };
                });

        services.AddAuthorizationBuilder();

        return services;
    }
}