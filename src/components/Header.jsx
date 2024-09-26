import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, gameStageIndex } = useCarioca()

  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
      <Info>Mål: {contracts[0]} Att göra: {gameStages[gameStageIndex]}</Info>
    </HeaderDiv>
  )
}

const Title = styled.h1`
  margin: 0 10px;
  font-size: 36px;
  color: white;
`

const Info = styled.h2`
  margin: 0 10px;
  font-size: 22px;
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
