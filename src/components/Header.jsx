import styled from "styled-components"

export const Header = () => {
  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
    </HeaderDiv>
  )
}

const Title = styled.h1`
  margin: 0px;
  font-size: 36px;
  color: white;
`

const HeaderDiv = styled.div`
  background-color: black;
  width: 100vw;
  height: 100px; 
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start; 
`
