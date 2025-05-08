import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"
import { Button } from "./Button"

export const GameOver = () => {
  const { player, computer, startNewGame } = useCarioca()
  return (
    <Table>
      <TextDiv>
        <Text>Spelet är över</Text>
        <Text>Dina poäng: {player.score} </Text>
        <Text>Datorns poäng: {computer.score}</Text>
      </TextDiv>
      <Button
        text="Nytt spel"
        func={() => startNewGame()}
      />
    </Table>
  )
}

const Table = styled.div`
  background-color: var(--primary);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  gap: 20px;
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Text = styled.p`
  font-size: 24px;
  color: white;
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  margin: 0;
`