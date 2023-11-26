"use client";
import PartyCard from "@/components/PartyCard";
import VotingMachineLoading from "@/components/voting/VotingMachineLoading";
import VotingMachineSetup from "@/components/voting/VotingMachineSetup";
import VotingPage from "@/components/voting/VotingPage";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const page = () => {
  const [etherProvider, setEtherProvider] = useState("");
  const [etherSigner, setEtherSigner] = useState("");
  const [votingContract, setVotingContract] = useState("");
  const [electionId, setElectionId] = useState("");
  const [pageState, setPageState] = useState(0);

  useEffect(() => {
    setEtherProvider(new ethers.BrowserProvider(window.ethereum));
  }, []);

  return (
    <>
      {pageState == 0 ? (
        <VotingMachineSetup
          etherProvider={etherProvider}
          etherSigner={etherSigner}
          setEtherSigner={setEtherSigner}
          setVotingContract={setVotingContract}
          electionId={electionId}
          setElectionId={setElectionId}
          setPageState={setPageState}
        />
      ) : (
        <></>
      )}
      {pageState == 1 ? (
        <VotingMachineLoading
          electionId={electionId}
          votingContract={votingContract}
          setPageState={setPageState}
        />
      ) : (
        <></>
      )}
      {pageState == 2 ? (
        <VotingPage votingContract={votingContract}></VotingPage>
      ) : (
        <></>
      )}
      {/* {pageState == 2 ?</> : <></>} */}
    </>
  );
};

export default page;
