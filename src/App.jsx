import { CariocaProvider } from "./contexts/CariocaContext"
import { Header } from "./components/Header"
import { GameSite } from "./components/GameSite"
import "./App.css"

function App() {
  return (
    <div>
      <CariocaProvider>
        <Header />
        <GameSite />
      </CariocaProvider>
    </div>
  )
}

export default App
