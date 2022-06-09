import React from "react";
import { Box } from "@mui/material";

interface AppLogoProps {
  color?: string;
}
// TODO change src on image if needed -istevanovic 
// TODO applay white image depending on the color pasted
const AppLogo: React.FC<AppLogoProps> = ({ color }) => {

  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
          height: { xs: 40, sm: 45 },
        },
      }}
      className="app-logo"
    >
      <Box
        sx={{
          mt: 1,
          "& svg": {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
        <div className="">
          <a href="/">
            <img src={process.env.PUBLIC_URL + "/assets/images/logo-icon-large.png"} alt="Emissary Logo" />
          </a>
        </div>
      </Box>
    </Box>
  );
};

export default AppLogo;
