import styled from 'styled-components'
import { ReactComponent as IconProfile } from '../../assets/img/profile-main.svg'
import { ReactComponent as IconMore } from '../../assets/icon/more.svg'

export default function MainHeader({handleFunc}){
  return(
    <BasicHeaderStyle>
      <IconProfile onClick={handleFunc} style={{ cursor:'pointer', height: '100%'}}/>
      <IconMore onClick={handleFunc} style={{ cursor:'pointer', height: '100%'}}/>
    </BasicHeaderStyle>
  )
}

const BasicHeaderStyle = styled.div`
  height: 66px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
