export const authRole = {
  admin: ["admin"],
  user: ["user", "admin"],
};
// TODO change role names -istevanovic
export enum RoutePermittedRole {
  Admin = "admin",
  User = "user",
}

export const initialUrl = "/card/slider-settings"; // landing page (URL to open after signin)
