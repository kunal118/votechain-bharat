"use client";

import React, { useContext, useState } from "react";

const VotingPage = ({ votingContract }) => {
  // const { signer, setSigner } = useContext(SignerContext);
  const candidateDetails = JSON.parse(localStorage.getItem("candidateDetails"));
  const [uid, setUid] = useState("");
  const count = candidateDetails.length;
  function castVote(id) {
    votingContract.castVote(uid, id);
  }
  return (
    <div className=" min-h-screen bg-[#222831] p-5">
      <h1 className="text-3xl font-bold mb-8 text-center  text-[#e5e7eb]">
        Cast Your Vote
      </h1>
      <input
        className=" w-full text-2xl font-semibold mb-8 text-center  text-[#e5e7eb] bg-inherit"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      ></input>

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
