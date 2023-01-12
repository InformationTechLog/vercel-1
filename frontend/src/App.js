import styled from "styled-components";
import { Connect } from "./components/Connect";
import { WalletStatus } from "./components/WalletStatus";
import { SignMessage } from "./components/SignMessage";
import { ContractCall } from "./components/ContractCall";
import { keyframes } from "styled-components";
import { ReactComponent as MySvg } from "./wlogo.svg";
import { CallBallot } from "./components/CallBallot";
import { ChakraProvider } from "@chakra-ui/react";

<MySvg />;

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 24px;
`;

const StyledAppDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
`;
// -------------------------------------------------------

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// ----------------------------------------------------------
const StyledMyIcon = styled(MySvg)`
  animation: ${rotate} infinite 7s linear;
  height: 1.25rem;
  width: 1.25rem;
  display: inline-block;
  margin: auto;
`;

function App() {
  return (
    <ChakraProvider>
      <StyledAppDiv>
        <MainTitleText>
          <StyledMyIcon />
          조율해 DAO
        </MainTitleText>
        <Connect />
        <WalletStatus />
        <SignMessage />
        <ContractCall />
        <CallBallot />
      </StyledAppDiv>
    </ChakraProvider>
  );
}

export default App;
