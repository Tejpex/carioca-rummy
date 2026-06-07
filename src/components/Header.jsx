import styled from "styled-components"
import { Button } from "./Button"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, contractNumber, gameStageIndex, player, computer, showRules, setShowRules, gameOver } = useCarioca()

  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
      <InfoDiv>
        {gameOver && <InfoText $size="22px">Spelet är över</InfoText>}
        {!gameOver && (
          <TextDiv>
            <InfoText $size="22px">Kontrakt {contractNumber + 1} av 8</InfoText>
            <InfoText $size="18px">
              Mål: {contracts[contractNumber].name}
            </InfoText>
            <InfoText $size="18px">
              Att göra: {gameStages[gameStageIndex]}
            </InfoText>
          </TextDiv>
        )}
        <Button
          text={showRules ? "Dölj reglerna" : "Visa reglerna"}
          func={() => setShowRules(!showRules)}
          color="var(--secondary-light)"
        />
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
  width: 100%;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;

  @media (min-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 2fr 2fr 1fr;
  }

  @media (min-width: 1500px) {
    grid-template-columns: 1fr 2fr 1fr;
    padding: 20px 50px;
  }
`

const Title = styled.h1`
  margin: 20px 10px;
  text-align: left;
  font-size: 28px;
  color: white;
  font-family: "Quicksand", serif;
  font-weight: 700;
  font-style: normal;
  align-self: center;

  @media (min-width: 500px) {
    font-size: 46px;
  }

  @media (min-width: 690px) {
    margin: 0 10px;
  }
`

const InfoDiv = styled.div`
  margin: 0 10px;
  padding: 0 10px;
  
  display: flex;
  flex-direction: column-reverse;
  align-items: left;
  justify-content: center;
  gap: 10px;

  @media (min-width: 500px) {
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  @media (min-width: 800px) {
    padding: 0 50px 0 10px;
  }
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1500px) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`

const InfoText = styled.p`
  font-size: ${(props) => props.$size - 20};
  color: white;
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  margin: 0;

  @media (min-width: 500px) {
    font-size: ${(props) => props.$size}
  }
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
