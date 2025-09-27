import React, {useState} from "react";
import './App.css';
import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from './components/Display Pannel/DisplayPannel';
import { StakingProvider } from './context/StakingContext';

function App() {
  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };
  return (
    <div className="main-section">
      <Wallet>
      <Navigation />
      <StakingProvider>
        <DisplayPannel />
        <div className="main-content">
            <div className="button-section">
              <button
                onClick={() => handleButtonClick("stake")}
                className={displaySection === "stake" ? "" : "active"}
              >
                Stake
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={displaySection === "withdraw" ? "" : "active"}
              >
                Withdraw
              </button>
            </div>

            {displaySection === "stake" && (
              <div className="stake-wrapper">Placeholder for stake UI</div>
            )}

            {displaySection === "withdraw" && (
              <div className="stake-wrapper">Placeholder for withdraw UI</div>
            )}
          </div>

        </StakingProvider>
      </Wallet>
    </div>
  );
}


export default App;