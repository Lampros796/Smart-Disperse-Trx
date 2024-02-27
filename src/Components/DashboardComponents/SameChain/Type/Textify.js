"use client";
import React, { useState, useEffect } from "react";
import textStyle from "./textify.module.css";
import { isValidAddress } from "@/Helpers/ValidateInput.js";
import { isValidValue } from "@/Helpers/ValidateInput.js";
import { isValidTokenValue } from "@/Helpers/ValidateInput.js";

/*
Funtion :Storing value for more personalization
*/
// const useLocalStorage = (key, initialValue = "") => {
//   const [value, setValue] = useState(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue !== null ? storedValue : initialValue;
//   });
//   useEffect(() => {
//     localStorage.setItem(key, value);
//   }, [key, value]);

//   return [value, setValue];
// };

function Textify({ listData, setListData, tokenDecimal }) {
  // const [textValue, setTextValue] = useLocalStorage("textValue", "");
  const [textValue, setTextValue] = useState("");

  /*
  Funtion : for parsing and validation the value received from user Input and store
  it in our desired format for Showing in Transaction Lineup
  */
  const parseText = async (textValue) => {
    const lines = textValue.split("\n").filter((line) => line.trim() !== "");
    let updatedRecipients = [];
    lines.forEach((line) => {
      const [address, value] = line.split(/[,= \t]+/);

      if (tokenDecimal) {
        var validValue = isValidTokenValue(value, tokenDecimal);
        console.log("go", validValue);
      } else {
        var validValue = isValidValue(value);
      }

      if (isValidAddress(address) && validValue) {
        updatedRecipients.push({
          address,
          value: validValue,
        });
      }
    });

    console.log(updatedRecipients);
    setListData(updatedRecipients);
  };

  /*
  UseEffect :For updating user Input in the textbox for adding  Recipient address and value
  */

  useEffect(() => {
    console.log(textValue);
    parseText(textValue);
  }, [textValue]);

  return (
    <div>
      <div className={textStyle.divtocoversametextdi}>
        <div>
          <div id="textify-input" className={textStyle.textlistdiv}>
            <div className={textStyle.titlesametexttextarea}>
              <h2
                style={{
                  padding: "10px",
                  fontSize: "20px",
                  margin: "0px",
                  letterSpacing: "1px",
                  fontWeight: "700",
                }}
              >
                Enter Recipients and Amount (enter one address and amount on
                each line, supports any format)
              </h2>
            </div>
            <div id="tt">
              <textarea
                spellCheck="false"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "10px",
                  border: "none",
                  background: "#e6e6fa",
                  color: "black",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
                className={textStyle.textareaInput}
                placeholder="0xe57f4c84539a6414C4Cf48f135210e01c477EFE0=1.41421 
                  0xe57f4c84539a6414C4Cf48f135210e01c477EFE0 1.41421
                  0xe57f4c84539a6414C4Cf48f135210e01c477EFE0,1.41421"
              ></textarea>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              paddingRight: "25px",
              paddingBottom: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Textify;