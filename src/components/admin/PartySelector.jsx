"use client";
import ElectionStages from "@/components/admin/layout/ElectionStages";
import PartyCard from "@/components/PartyCard";
import { EtherSignerContext } from "@/context/EtherSignerContext";
import { firebase_getPartyDetails } from "@/firebase/cloud-firestore";
import { firebase_getPartySymbol } from "@/firebase/storage";
import { contractAbi, contractAddress } from "@/smart_contract/contractEthers";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

async function updatePartyDetails(setData) {
  setData(await firebase_getPartyDetails());
}

function updatePartySymbols(data) {
  data.map(async (d, index) => {
    const path = "partySymbols/" + d.data.party_symbol_id;
    // console.log(path);
    const url = await firebase_getPartySymbol(path);
    document.getElementById("img" + index.toString()).setAttribute("src", url);
  });
}

const PartySelector = () => {
  const [data, setData] = useState([]);
  const [votingContract, setVotingContract] = useState("");
  const { signer, getSigner } = useContext(EtherSignerContext);

  useEffect(() => {
    updatePartyDetails(setData);
  }, []);
  useEffect(() => {
    updatePartySymbols(data);
  }, [data]);
  useEffect(() => {
    setVotingContract(
      new ethers.Contract(contractAddress, contractAbi, signer)
    );
  }, [signer]);
  console.log(data);
  function handleSubmit() {
    // data.map((candidate, index) => {
  }
  function handleCheckBoxChange(docId) {}
  return (
    <>
      <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Choose candidates:
      </h3>
      <ul class="grid w-full gap-6 md:grid-cols-2">
        {data.map((candidate, index) => {
          return (
            <li>
              <input
                type="checkbox"
                id={`box-${index.toString()}`}
                value="true"
                class="hidden peer candidate"
                required=""
                key={index}
                defaultchecked={
                  candidate.data.party_selected == true ? true : false
                }
                onChange={handleCheckBoxChange(candidate.id)}
              />
              <label
                for={`box-${index.toString()}`}
                class="flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div class="flex gap-16 items-center">
                  <img
                    id={`img${index.toString()}`}
                    src=""
                    className=" h-16"
                  ></img>
                  <div class="w-full">
                    <div className=" text-lg font-semibold">
                      {candidate.data.party_name}
                    </div>
                    <div>{candidate.data.party_symbol_id}</div>
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center w-full my-5">
        <button
          onClick={handleSubmit}
          style={signer == "" ? { opacity: 0.2 } : { opacity: 1 }}
          disabled={signer == ""}
          className="rounded  bg-[#00ADB5] py-2 px-5 hover:bg-[#393E46] cursor-pointer text-white"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default PartySelector;
