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
    setShowRules,
    gameOver
  } = useCarioca()
  
  return (
    <MainWindow>
      <RulesInfo isOpen={showRules} onClose={() => setShowRules(false)} />
      {gameOver && <GameOver />}
      {!gameOver && (
        <div>
          <HandRow person={player} />
          <TableRow person={player} />
          {message && <MessageBox message={message} />}
          <Table />
          <LowerRow>
            <TableRow person={computer} />
            <HandRow person={computer} />
          </LowerRow>
        </div>
      )}
    </MainWindow>
  ) 
}

const MainWindow = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--primary);
`

const LowerRow = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`
