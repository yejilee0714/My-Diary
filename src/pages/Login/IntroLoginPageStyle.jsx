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
  transform: translate(-50%, -60%);
  width: 257px;
  height: 257px;
  background: url(${moon}) no-repeat 0 0 / auto 100%;
  .main-logo {
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

  button{
    width: 100%;
  }
`

export { StyledLoginPopUpPage, LogoImageWrap, LoginPopUpWrap };