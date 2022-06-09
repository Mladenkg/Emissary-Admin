import { authRole } from "../../../shared/constants/AppConst";

// TODO handle roles if needed -istevanovic 

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      ...user,
      roles: authRole["user"],
    };
  return user;
};
