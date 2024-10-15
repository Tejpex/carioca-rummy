import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, contractNumber, gameStageIndex, player, computer } = useCarioca()

  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
      <Info>Mål: {contracts[contractNumber].name}</Info>
      <Info>Att göra: {gameStages[gameStageIndex]}</Info>
      <ScoreDiv>
        <Score>Dina poäng: {player.score}</Score>
        <Score>Datorns poäng: {computer.score}</Score>
      </ScoreDiv>
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

const Score = styled.p`
  font-size: 14px;
  color: white;
`

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 80px;
`

const HeaderDiv = styled.div`
  background-color: black;
  width: 100vw;
  height: 80px; 
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
`
