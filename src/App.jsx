import { CariocaProvider } from "./contexts/CariocaContext"
import { Header } from "./components/Header"
import { PlayersSide } from "./components/PlayersSide"
import { ComputersSide } from "./components/ComputersSide"
import { Table } from "./components/Table"
import "./App.css"

function App() {
  return (
    <div>
      <CariocaProvider>
        <Header />
        <PlayersSide />
        <Table />
        <ComputersSide />
      </CariocaProvider>
    </div>
  )
}

export default App
