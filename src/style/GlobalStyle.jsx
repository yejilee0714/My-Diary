const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`

  // === ROOT ===
  :root {
    // Color
    --white-color: #FFFFFF;
    --main-color: #FAF8FF;
    --sub-color: #9C85C5;
    --warning-color: #EB5757;
    --btn-border-color: #A6B1E1;
    --btn-disabled-color: #DFCCFB; 
    --btn-abled-color: #424874;
    --gray50-color: #DBDBDB;
    --gray100-color: #C0C0C0;
    --gray200-color: #9F9F9F;
    --gray300-color: #767676;
    --gray400-color: #6F6F6F;
    --gray500-color: #646464;
    --black-color: #000000;
  }

  body{
    all: unset;
    background-color: var(--main-color);
    color: inherit;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input {
    border: none;
    background: none;
    font-family: inherit;
    padding: 0;

    &:focus {
      outline: none;
      background: none;
    }
  }

  img {
    vertical-align: top;
  }
  p{
    all: unset;
  }
  button{
    all: unset;
    cursor: pointer;
  }
  ul, li{
    all: unset;
  }
  textarea{
    padding: 0;
    border: none;
    color: inherit;
    background-color: inherit;
  }
  .a11y-hidden {
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
  }
`;

export default GlobalStyle;