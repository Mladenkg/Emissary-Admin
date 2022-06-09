import { NavStyle } from "shared/constants/AppEnums";
import HeaderUserLayout from "./UserHeader";
import HeaderUserMiniLayout from "./UserMiniHeader";

const Layouts: any = {
  [NavStyle.HEADER_USER]: HeaderUserLayout,
  [NavStyle.HEADER_USER_MINI]: HeaderUserMiniLayout,
};
export default Layouts;
