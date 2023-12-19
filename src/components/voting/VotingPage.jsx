"use client";

import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const voterData = {
  2: {
    name: "Kunal Narang",
    uid: "102003058",
  },
  3: {
    name: "Atul Thakur",
    uid: "102003064",
  },
  6: {
    name: "Tushar Kapoor",
    uid: "102003062",
  },
};
const VotingPage = ({ votingContract }) => {
  const socket = io("http://localhost:4000");
  socket.on("data", (msg) => {
    // if (msg == "nf") setUid("nf");
    console.log(msg);
    // console.log(voterData[parseInt(msg)]["name"]);
    // setName(msg);
    setUid(voterData[parseInt(msg)]["uid"]);
    setName(voterData[parseInt(msg)]["name"]);
  });
  // const { signer, setSigner } = useContext(SignerContext);
  const candidateDetails = JSON.parse(localStorage.getItem("candidateDetails"));
  const [uid, setUid] = useState("Place your finger");
  const [name, setName] = useState("");
  const count = candidateDetails.length;
  async function castVote(id) {
    try {
      await votingContract.castVote(uid, id);
      setUid("Place your finger");
      setName("");
    } catch (e) {
      // console.log(e.code);
      alert("Already voted");
    }
  }

  return (
    <div className=" min-h-screen bg-[#222831] p-5">
      <h1 className="text-3xl font-bold mb-8 text-center  text-[#e5e7eb]">
        Cast Your Vote
      </h1>
      <h2 className=" w-full text-2xl font-semibold mb-8 text-center  text-[#e5e7eb] bg-inherit">
        {uid}
      </h2>
      <h2 className=" w-full text-2xl font-semibold mb-8 text-center  text-[#e5e7eb] bg-inherit">
        {name}
      </h2>
      <div
        className={
          "w-full p-6  grid  gap-8 " +
          (count > 6 ? "grid-cols-3" : "grid-cols-2")
        }
      >
        {candidateDetails.map((candidate, idx) => {
          return (
            <button
              className="flex items-center justify-start space-x-6 w-full p-5 rounded-lg bg-[#00ADB5]"
              onClick={() => castVote(idx + 1)}
            >
              <div className="w-24 h-24">
                <img
                  alt="Party Logo"
                  className="rounded-full"
                  height="96"
                  src={candidate[1]}
                  style={{
                    aspectRatio: "96/96",
                    objectFit: "cover",
                  }}
                  width="96"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#e5e7eb]">
                {candidate[0]}
              </h2>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default VotingPage;
