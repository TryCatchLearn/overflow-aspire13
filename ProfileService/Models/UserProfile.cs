using System.ComponentModel.DataAnnotations;

namespace ProfileService.Models;

public class UserProfile
{
    [MaxLength(36)]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [MaxLength(100)]
    public required string DisplayName { get; set; }
    
    [MaxLength(500)]
    public string? Description { get; set; }
    public DateTime JoinedAt { get; init; } = DateTime.UtcNow;
    public int Reputation { get; set; }
}