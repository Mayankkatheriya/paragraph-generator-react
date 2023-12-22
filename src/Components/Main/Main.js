import "./Main.css";
import data from "./data.json";
import React from "react";
import { useState } from "react";

const Main = () => {
  let [totalPara, setTotalPara] = useState(0);
  let [paraData, setParaData] = useState([]);

  const GenerateData = () => {
    if (totalPara < 1) {
      alert("Please enter a number greater than zero.");
      return;
    } else if (totalPara > 9) {
      alert("You can only generate up to 9 paragraphs at once.");
      return;
    }
    for (let i = 0; i < totalPara; i++) {
      setParaData((prevData) => {
        if (i == 0) {
          return [data[i]];
        }
        return [...prevData, data[i]];
      });
    }
  };

  const sharePara = (para) => {
    navigator.share({
      title: "Share Paragraph",
      text: para,
    });
  };

  return (
    <main>
      <div className="form">
        <label htmlFor="para">Paragraphs</label>
        <input
          type="number"
          placeholder="Paragraphs"
          id="para"
          min={1}
          step={1}
          value={totalPara}
          onChange={(e) => setTotalPara(e.target.value)}
          max={9}
        />
        <button title="Generate" onClick={GenerateData}>
          Generate
        </button>
      </div>

      <div className="para-container">
        {paraData.map((item, index) => {
          return (
            <div key={index} className="para">
              <p>{item}</p>
              <div className="btn-box">
                <button title = "Copy" onClick={() => navigator.clipboard.writeText(item)}>
                  <i className="bx bx-copy"></i>
                </button>
                <button title = "Share" onClick={() => sharePara(item)}>
                  <i className="bx bx-share-alt"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;
