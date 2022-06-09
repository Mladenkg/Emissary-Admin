import React from "react";
import { useLayoutContext } from "../../../../utility/AppContextProvider/LayoutContextProvider";
import IntlMessages from "../../../../utility/IntlMessages";
import Typography from "@mui/material/Typography";
import FooterWrapper from "./FooterWrapper";

const AppFixedFooter = () => {
  const { footer, footerType } = useLayoutContext();

  return (
    <>
      {footer && footerType === "fixed" ? (
        <FooterWrapper className="footer fixed-footer">
          <div className="footerContainer">
            <Typography>&#169;&nbsp;{new Date().getFullYear()}&nbsp;
              <IntlMessages id="common.copyright" />
            </Typography>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
