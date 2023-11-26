import React from "react";

import { useState, useEffect, useContext } from "react";

import { EtherSignerContext } from "../../context/EtherSignerContext";
import { v4 as uuidv4 } from "uuid";
import { firebase_uploadSymbol } from "@/firebase/storage";

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const partySymbolFile = formData.get("partySymbol");

  const symbol_id = uuidv4();
  formData.append("symbol_id", symbol_id);
  await firebase_uploadSymbol(partySymbolFile, symbol_id);
  const response = await fetch("/api/registerCandidate", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
}
const PartyRegister = () => {
  const [partyName, setPartyName] = useState("");
  const [partySymbol, setPartySymbol] = useState("");
  const [partyDetails, setPartyDetails] = useState("");
  const [contactDetails, setContactDetails] = useState("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="py-10  flex  flex-1 justify-center items-center">
          <ul className="m-2 w-2/5 flex flex-col gap-4 ">
            <li>
              <input
                name="partyName"
                className="rounded-lg text-md p-4 focus:outline-none  w-full"
                placeholder="Party Name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              ></input>
            </li>
            <li className="flex gap-2 items-center">
              <div className="w-full">Party Symbol</div>
              <input
                name="partySymbol"
                className="rounded-lg text-md p-4 focus:outline-none  w-full"
                value={partySymbol}
                onChange={(e) => setPartySymbol(e.target.value)}
                type="file"
              ></input>
            </li>
            <li>
              <input
                name="partyDetails"
                className="rounded-lg text-md p-4 focus:outline-none  w-full"
                placeholder="Party Details"
                value={partyDetails}
                onChange={(e) => setPartyDetails(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                name="contactDetails"
                className="rounded-lg text-md p-4 focus:outline-none  w-full"
                placeholder="Contact Details"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)}
              ></input>
            </li>

            <li>
              <button
                // onClick={transact}
                className="rounded  text-md p-4 bg-[#00ADB5]  hover:bg-[#393E46] cursor-pointer w-full hover:text-white font-bold"
                type="submit"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
};

export default PartyRegister;
