import styled from "styled-components"
import { Button } from "./Button"
import { useCarioca } from "../contexts/CariocaContext"

export const Header = () => {
  const { gameStages, contracts, contractNumber, gameStageIndex, player, computer, showRules, setShowRules, gameOver } = useCarioca()

  return (
    <HeaderDiv>
      <Title>Carioca Rummy</Title>
      <InfoDiv>
        {gameOver && <InfoText $size="18px">Spelet är över</InfoText>}
        {!gameOver && (
          <TextDiv>
            <InfoText $size="14px">Kontrakt {contractNumber + 1} av 8</InfoText>
            <InfoText $size="14px">
              Mål: {contracts[contractNumber].name}
            </InfoText>
            <InfoText $size="14px">
              Att göra: {gameStages[gameStageIndex]}
            </InfoText>
          </TextDiv>
        )}
      </InfoDiv>
      <ButtonDiv>
        <Button
          text={showRules ? "Dölj reglerna" : "Visa reglerna"}
          func={(e) => {
            e.stopPropagation()
            setShowRules(!showRules)
          }}
          color="var(--secondary-light)"
          size="wide"
        />
      </ButtonDiv>
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
  padding: 10px 0 20px;

  display: flex;
  flex-direction: column;

  @media (min-width: 500px) {
    align-items: flex-start;
  }

  @media (min-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 10px 0;
    align-items: center;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 30px 0;
  }

  @media (min-width: 1500px) {
    grid-template-columns: 2fr 2fr 1fr 1fr;
  }
`

const Title = styled.h1`
  color: white;
  font-family: "Quicksand", serif;
  font-weight: 700;
  font-style: normal;
  line-height: 1;
  font-size: 28px;
  text-align: center;
  margin: 10px 0;

  @media (min-width: 500px) {
    font-size: 46px;
    text-align: left;
    margin: 30px 0 10px 40px;
  }
  
  @media (min-width: 690px) {
    margin: 10px 0 10px 40px;
  }

  @media (min-width: 1500px) {
    margin-left: 90px;
  }
`

const InfoDiv = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (min-width: 500px) {
    align-items: flex-start;
  }

  @media (min-width: 690px) {
    margin: 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
`

const TextDiv = styled.div`
  display: none;

  @media (min-width: 690px) {
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (min-width: 1500px) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`

const InfoText = styled.p`
  font-size: ${(props) => props.$size};
  color: white;
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  margin: 0;

  @media (min-width: 500px) {
    font-size: ${(props) => props.$size + 6};
  }
`

const ButtonDiv = styled.div`

  @media (min-width: 500px) {
    margin-left: 40px;
  }

  @media (min-width: 690px) {
    margin-left: 0;
  }
`

const ScoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  @media (min-width: 500px) {
    align-items: flex-start;
    margin-left: 40px;
  }

  @media (min-width: 690px) {
    align-self: center;
    margin-top: 0;
    margin-left: 10px;
  }
`

const Score = styled.p`
  font-family: "Raleway", serif;
  color: white;
  font-size: 12px;
  margin: 0;

  @media (min-width: 690px) {
    font-size: 14px;
  }
`
