import styled from "styled-components";
import moon from "../../assets/img/moon.svg"
import '../../style/font.css'

const StyledLoginPopUpPage = styled.div`
  background: var(--btn-border-color);
  /* width: 100%; */
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

  Link{
    width: 100%;
  }
`

export { StyledLoginPopUpPage, LogoImageWrap, LoginPopUpWrap };