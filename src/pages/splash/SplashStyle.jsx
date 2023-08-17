import styled, { keyframes } from "styled-components";
import moon from "../../assets/img/moon.svg"
import '../../style/font.css'

const fadeIn = keyframes`
  from {opacity: .0;}
  to {opacity: 1;}
`;

const rotate = keyframes`
  0% {rotate: 0deg}
  25% {rotate: -10deg}
  70% {rotate: 10deg}
`;

const StyledSplashPage = styled.main`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: var(--btn-border-color);
  h1 {
    position: absolute;
    font-family: 'iceSotong-Rg';
    font-size: 96px;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(50%);
    animation: ${fadeIn} 3s;
  }
  `

const LogoImageWrap = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 257px;
  height: 257px;
  background: url(${moon}) no-repeat 0 0 / auto 100%;
  animation: ${fadeIn} 3s;
  .main-logo {
    position: absolute;
    left: 21%;
    top: 50%;
    animation: ${rotate} 5s 3s infinite;
    transform: translate(0%, -50%);
  }
`;

export { StyledSplashPage, LogoImageWrap };