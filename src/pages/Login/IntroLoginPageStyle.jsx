import styled, { keyframes } from "styled-components";
import moon from "../../assets/img/moon.svg"
import '../../style/font.css'

const fadeIn = keyframes`
  from {
    opacity: .0;
  }
  to {
    opacity: 1;
  }
`;

const fadeUp = keyframes`
  from {
    opacity: .0;
    transform: translateY(50px);
  }
  to {
    transform: none;
  }
`;

const StyledLoginPopUpPage = styled.div`
  background: var(--btn-border-color);
  height: 100vh;
`

const LogoImageWrap = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -55%);
  width: 323px;
  height: 323px;
  background: url(${moon}) no-repeat 0 0 / auto 100%;
  animation: ${fadeIn} 1s;
  .main-logo {
    width: 193.266px;
    height: 260.738px;
    position: absolute;
    left: 21%;
    top: 50%;
    transform: translate(0%, -50%);
  }
`;

const LoginPopUpWrap = styled.div`
  background-color: var(--white-color);
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
  border-radius: 30px 30px 0px 0px;
  padding: 45px 34px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  animation: ${fadeUp} 3s;

  Link{
    width: 100%;
  }
`

export { StyledLoginPopUpPage, LogoImageWrap, LoginPopUpWrap };