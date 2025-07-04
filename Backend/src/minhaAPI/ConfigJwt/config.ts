export function getJwtConfig() {
    return {
        secret: process.env.JWT_SECRET || 'default',
        expireIn: "1h" //Expiração do token é em 1 hora.
    }

}