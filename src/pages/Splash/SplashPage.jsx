import React from 'react';

import bunny from "../../assets/img/bunny.svg"
import { StyledSplashPage, LogoImageWrap } from './SplashStyle';

const SplashPage = () => (
  <StyledSplashPage>
    <LogoImageWrap>
      <img src={bunny} alt="mainLogo" className="main-logo" />
    </LogoImageWrap>
    <h1>월간스토리</h1>
  </StyledSplashPage>
);

export default SplashPage;