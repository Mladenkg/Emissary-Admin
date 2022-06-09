import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Fonts } from "shared/constants/AppEnums";
import IntlMessages from "@crema/utility/IntlMessages";
import AppInfoView from "@crema/core/AppInfoView";
import AppAnimate from "@crema/core/AppAnimate";
import { initialUrl } from "shared/constants/AppConst";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/icon/comingsoon.svg";
import { useTheme } from "@mui/material";


const ComingSoon = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const onGoBackToHome = () => {
    navigate(initialUrl);
  };

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <>
        <Box
          sx={{
            py: { xl: 8 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              mb: { xs: 4, xl: 8 },
              width: "100%",
              maxWidth: { xs: 200, sm: 300, xl: 706 },
              "& svg": {
                width: "100%",
                maxWidth: 400,
              },
            }}
          >
            <Logo fill={theme.palette.primary.main} />
          </Box>

          <Box
            component="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <IntlMessages id="error.comingSoon" />!
          </Box>

          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
            }}
          >
            <Typography style={{ fontSize: 18, marginTop: 3 }}>
              <IntlMessages id="error.comingSoonMessage1" />
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              <IntlMessages id="error.comingSoonMessage2" />
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 16,
              textTransform: "capitalize",
            }}
            onClick={onGoBackToHome}
          >
            <IntlMessages id="error.goBackToHome" />
          </Button>
        </Box>

        <Box
          sx={{
            mx: "auto",
            maxWidth: 384,
          }}
        >
        </Box>
        <AppInfoView />
      </>
    </AppAnimate>
  );
};

export default ComingSoon;
