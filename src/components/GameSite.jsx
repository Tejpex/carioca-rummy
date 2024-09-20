import { Table } from "./Table"
import { HandRow } from "./HandRow"
import { useCarioca } from "../contexts/CariocaContext"

export const GameSite = () => {
   const {
     player,
     computer
   } = useCarioca()

  return (
    <div>
      <HandRow person={player}/>
      <Table />
      <HandRow person={computer}/>
    </div>
  ) 
}
