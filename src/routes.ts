import { getApi } from "./controllers/api";

export const AppRoutes = [
  { path: "/api", method: "get", action: getApi },
];
