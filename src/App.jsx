import { CariocaProvider } from "./contexts/CariocaContext"
import { Header } from "./components/Header"
import { GameSite } from "./components/GameSite"

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
