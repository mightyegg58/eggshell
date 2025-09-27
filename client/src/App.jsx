import React, { useEffect, useState } from "react";
import './App.css';
import { createClient } from "urql";
import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from './components/Display Pannel/DisplayPannel';
import TokenApproval from './components/StakeToken/TokenApproval';
import StakeAmount from './components/StakeToken/StakeAmount';
import WithdrawStakeAmount from './components/Withdraw/Withdraw';
import { StakingProvider } from './context/StakingContext';


function App() {
  const QueryURL = "https://api.studio.thegraph.com/query/121793/eth-global/v0.0.1";
  const query = `{
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeUSD
    }
  }`;

  const [displaySection, setDisplaySection] = useState("stake");
  const [tokens, setTokens] = useState([]);
  const client = createClient({ url: QueryURL });

   useEffect(() => {
    const getTokens = async() => {
      const {data} = await client.query(query).toPromise();
      console.log(data);
      setTokens(data.tokens);
    }
    getTokens();
  },[])


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
              <div className="stake-wrapper">
                <TokenApproval />
                <StakeAmount />
              </div>
            )}

            {displaySection === "withdraw" && (
              <div className="stake-wrapper">
                <WithdrawStakeAmount />
              </div>
            )}
          </div>

        </StakingProvider>
      </Wallet>
    </div>
  );
}


export default App;
