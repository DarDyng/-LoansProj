export  class ClaimConstants{
    static RoleClaim(){
        return "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    };

    static EmailClaim(){
        return "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    };

    static ExpirationClaim(){
        return "exp";
    }
};

// Roles

export const AdminRole = "Admin";
export const UserRole = "User";
export const ArtistRole = "Artist";