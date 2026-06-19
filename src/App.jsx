import styled from "styled-components"
import { CariocaProvider } from "./contexts/CariocaContext"
import { Header } from "./components/Header"
import { GameSite } from "./components/GameSite"

function App() {
  return (
    <AppContainer>
      <CariocaProvider>
        <Header />
        <GameSite />
      </CariocaProvider>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
`
