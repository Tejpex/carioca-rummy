import styled from "styled-components"
import { Button } from "./Button"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, contractNumber, gameStageIndex, player, computer, showRules, setShowRules } = useCarioca()

  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
      <InfoDiv>
        <TextDiv>
          <InfoText $size="22px">Kontrakt {contractNumber + 1}</InfoText>
          <InfoText $size="18px">Mål: {contracts[contractNumber].name}</InfoText>
          <InfoText $size="18px">Att göra: {gameStages[gameStageIndex]}</InfoText>
        </TextDiv>
        <Button text={showRules ? "Dölj reglerna" : "Visa reglerna"} func={() => setShowRules(!showRules)}/>
      </InfoDiv>
      <ScoreDiv>
        <Score>Dina poäng: {player.score}</Score>
        <Score>Datorns poäng: {computer.score}</Score>
      </ScoreDiv>
    </HeaderDiv>
  )
}

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

const InfoDiv = styled.div`
margin: 0 10px;
padding: 0 50px 0 10px;
align-self: center;
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoText = styled.p`
  font-size: ${(props) => props.$size};
  color: white;
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  margin: 0;
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
