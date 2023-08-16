import styled from 'styled-components'
import { ReactComponent as IconMore } from '../../assets/icon/more.svg'

export default function UploadHeader({handleFunc}){
  return(
    <BasicHeaderStyle>
      <IconMore onClick={handleFunc} style={{ cursor:'pointer', height: '100%'}}/>
    </BasicHeaderStyle>
  )
}

const BasicHeaderStyle = styled.div`
  height: 66px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
