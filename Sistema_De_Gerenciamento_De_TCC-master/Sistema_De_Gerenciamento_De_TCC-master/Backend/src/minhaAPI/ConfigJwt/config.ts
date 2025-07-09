export function getJwtConfig() {
  return {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '1h' as const,
  };
}