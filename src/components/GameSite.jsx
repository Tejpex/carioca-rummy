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
    <div>
      {showRules && <RulesInfo/>}
      {gameOver && <GameOver/>}
      {!gameOver && (
        <div>
          <HandRow person={player}/>
          <TableRow person={player}/>
          {message && <MessageBox message={message}/>}
          <Table />
          <TableRow person={computer}/>
          <HandRow person={computer}/>
        </div>
      )}
    </div>
  ) 
}
