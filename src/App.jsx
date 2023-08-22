import React, { useEffect, useState } from "react";
import DividerMobile from "./assets/pattern-divider-mobile.svg";
import DividerDesktop from "./assets/pattern-divider-desktop.svg";
import Dice from "./assets/icon-dice.svg";
import "./App.scss";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changeAdvice, setChangeAdvice] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const { data } = await axios.get("https://api.adviceslip.com/advice");
        // console.log(data);
        setAdvice(data);
        setLoading(false);
      } catch (error) {
        alert("Error while fetching data");
        setLoading(false);
      }
    };
    fetchAdvice();
  }, [changeAdvice]);

  const handleAdvice = () => {
    setLoading(true);
    setChangeAdvice(!changeAdvice);
  };

  return (
    <main>
      {loading ? (
        <ClipLoader color="hsl(150, 100%, 66%)" />
      ) : (
        <div className="adviceContainer">
          <h6>Advice #{advice.slip.id}</h6>
          <p>"{advice.slip.advice}"</p>
          <picture>
            <source media="(max-width:465px)" srcSet={DividerMobile} />
            <img src={DividerDesktop} alt="divider" />
          </picture>
          <button onClick={handleAdvice}>
            <img src={Dice} alt="Change Advice" />
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
