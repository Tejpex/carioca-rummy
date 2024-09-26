import { Table } from "./Table"
import { HandRow } from "./HandRow"
import { TableRow } from "./TableRow"
import { useCarioca } from "../contexts/CariocaContext"

export const GameSite = () => {
   const {
     player,
     computer
   } = useCarioca()

  return (
    <div>
      <HandRow person={player}/>
      <TableRow person={player}/>
      <Table />
      <TableRow person={computer}/>
      <HandRow person={computer}/>
    </div>
  ) 
}
