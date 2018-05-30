const env = process.env.NODE_ENV;

export function isProduction() {
  return (env == "production");
}