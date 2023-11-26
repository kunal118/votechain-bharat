"use client";
import { SiBlockchaindotcom } from "react-icons/si";

import React, { useEffect, useState } from "react";
function toObject(proxy) {
  return JSON.stringify(
    proxy,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
}
const VotingMachineLoading = ({ electionId, votingContract, setPageState }) => {
  localStorage.setItem("electionId", electionId);
  useEffect(() => {
    async function fetchDetails() {
      const electionDetails = await votingContract.getElectionDetails();
      localStorage.setItem("electionDetails", electionDetails);
      const candidateDetails = await votingContract.getCandidateDetails();
      localStorage.setItem("candidateDetails", toObject(candidateDetails));
      console.log(candidateDetails);
      setPageState(2);
    }
    fetchDetails();
  }, []);

  return (
    <section className="container mx-auto flex flex-col items-center justify-center h-screen">
      <div className={"mb-4 animate-pulse"}>
        <SiBlockchaindotcom size="10rem"></SiBlockchaindotcom>
      </div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
        Loading...
      </h2>
      <div className="mt-2">
        <p className="text-sm text-gray-500 dark:text-gray-200 animate-blink">
          Setting up election...{electionId}
        </p>
      </div>
      <div className="mt-2 hidden">
        <p className="text-sm text-gray-500 dark:text-gray-200 animate-blink">
          Fetching election details...
        </p>
      </div>
      <div className="mt-2 hidden">
        <p className="text-sm text-gray-500 dark:text-gray-200 animate-blink">
          Caching candidate details...
        </p>
      </div>
      <div className="mt-2 hidden">
        <p className="text-sm text-gray-500 dark:text-gray-200 animate-blink">
          Caching fingerprints...
        </p>
      </div>
    </section>
  );
};
export default VotingMachineLoading;
