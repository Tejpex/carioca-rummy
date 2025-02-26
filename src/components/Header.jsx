import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, contractNumber, gameStageIndex, player, computer } = useCarioca()

  return (
    <HeaderDiv>
      
        <Title>Carioca Rummy</Title>
        <Info>Mål: {contracts[contractNumber].name} <br/>Att göra: {gameStages[gameStageIndex]}</Info>

      <ScoreDiv>
        <Score>Dina poäng: {player.score}</Score>
        <Score>Datorns poäng: {computer.score}</Score>
      </ScoreDiv>
    </HeaderDiv>
  )
}

const Info = styled.h2`
  margin: 0 10px;
  font-size: 22px;
  color: white;
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  align-self: center;
`


const HeaderDiv = styled.div`
  background-color: var(--secondary);
  width: 100vw;
  padding: 10px 30px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
`

const Title = styled.h1`
  margin: 0 10px;
  text-align: left;
  font-size: 46px;
  color: white;
  font-family: "Quicksand", serif;
  font-weight: 700;
  font-style: normal;
  align-self: center;
`

const ScoreDiv = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Score = styled.p`
  font-family: "Raleway", serif;
  font-size: 14px;
  color: white;
  margin: 0;
`
