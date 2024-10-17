import { Table } from "./Table"
import { HandRow } from "./HandRow"
import { TableRow } from "./TableRow"
import { MessageBox } from "./MessageBox"
import { useCarioca } from "../contexts/CariocaContext"

export const GameSite = () => {
   const {
     player,
     computer,
     message
   } = useCarioca()

  return (
    <div>
      <HandRow person={player}/>
      <TableRow person={player}/>
      {message && <MessageBox message={message}/>}
      <Table />
      <TableRow person={computer}/>
      <HandRow person={computer}/>
    </div>
  ) 
}
