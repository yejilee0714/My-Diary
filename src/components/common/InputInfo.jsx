import React from "react";
import styled from 'styled-components'

export default function InputInfo( {type, id, onChange, value, warningMsg, placeholder, children}){
  return (
    <StyledInputInfo>
      <label htmlFor={id}>{children}</label>
        <input type={type} id={id} onChange={onChange} value={value} placeholder={placeholder}/>
        <p>{warningMsg}</p>
    </StyledInputInfo>
  )
}

const StyledInputInfo = styled.div`
  margin-bottom: 16px;
  font-family: 'Pretendard-Regular';

  input{
    width: 100%;
    padding-bottom: 9px;
    margin-top: 10px;
    font-size: 14px;
    border-bottom: 1px solid var(--gray50-color);

    &::placeholder {
      color: var(--gray200-color);
      font-size: 14px;
    }

    &:focus {
      border-bottom: 2px solid #865DFF;
    }

  }

  label{
    font-size: 0.75rem;
    color: var(--gray400-color);
    font-weight: bold;
  }
  p {
    color: var(--warning-color);
    font-size: 0.75rem;
    margin: 0.5rem 0 1.5rem;
  }
`