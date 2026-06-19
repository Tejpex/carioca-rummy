import styled from "styled-components"
import { Table } from "./Table"
import { HandRow } from "./HandRow"
import { TableRow } from "./TableRow"
import { MessageBox } from "./MessageBox"
import { useCarioca } from "../contexts/CariocaContext"
import { RulesInfo } from "./RulesInfo"
import { GameOver } from "./GameOver"

export const GameSite = () => {
  const {
    player,
    computer,
    message,
    showRules,
    gameOver
  } = useCarioca()
  
  return (
    <MainWindow>
      {showRules && <RulesInfo />}
      {gameOver && <GameOver />}
      {!gameOver && (
        <Container>
          <HandRow person={player} />
          <TableRow person={player} />
          {message && <MessageBox message={message} />}
          <Table />
          <TableRow person={computer} />
          <HandRow person={computer} />
        </Container>
      )}
    </MainWindow>
  ) 
}

const MainWindow = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--primary);
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
