import React from "react";
import './App.css';
import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from './components/Display Pannel/DisplayPannel';

function App() {
  return (
    <div className="main-section">
      <Wallet>
      <Navigation />
      <DisplayPannel />
      </Wallet>
    </div>
  );
}


export default App;