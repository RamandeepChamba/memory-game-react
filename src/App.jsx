import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import CardLayout from "./components/CardLayout";
import { GameProvider } from "./contexts/GameContext";
import StatsAndNew from "./components/StatsAndNew";
import GameEndScreen from "./components/GameEndScreen";

const StyledApp = styled.div`
  background: linear-gradient(
    to right,
    var(--color-primary-1),
    var(--color-primary-2)
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <GameProvider>
      <StyledApp>
        <GlobalStyles />
        <Header />
        <StatsAndNew />
        <CardLayout />
        <GameEndScreen />
      </StyledApp>
    </GameProvider>
  );
}

export default App;
