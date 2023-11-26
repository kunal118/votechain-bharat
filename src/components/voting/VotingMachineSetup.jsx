import { contractAbi } from "@/smart_contract/contractEthers";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export default function VotingMachineSetup({
  etherProvider,
  etherSigner,
  setEtherSigner,
  setVotingContract,
  electionId,
  setElectionId,
  setPageState,
}) {
  const [connecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // toast.success("hi");
      if (window.ethereum == null)
        throw { code: 100, message: "Metamask not available" };
      // const provider = new ethers.BrowserProvider(window.ethereum);
      await etherProvider.send("eth_requestAccounts", []);
      const temp_signer = await etherProvider.getSigner();
      setEtherSigner(temp_signer);
      // console.log(temp_signer);
    } catch (e) {
      console.log(e);
      // if (e.code != 100) toast.error("Error connecting");
      // else toast.error(e.message);
    }
    setIsConnecting(false);
    // console.log("provider destroyed");
  };

  const handleSetup = () => {
    try {
      setVotingContract(
        new ethers.Contract(electionId, contractAbi, etherSigner)
      );
    } catch (e) {
      console.log(e);
    }
    setPageState(1);
  };

  // useEffect(() => {
  //   if (etherProvider == null) return;

  //   async function request_connection() {
  //     handleConnect();
  //   }
  //   request_connection();
  // }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Voting Machine Setup</h1>
          <p className="text-gray-600">
            Enter the Election ID to configure the voting machine.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="election-id"
              className="block text-sm font-medium text-gray-600"
            >
              Election ID
            </label>
            <input
              type="text"
              id="election-id"
              placeholder="Enter the Election ID"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={electionId}
              onChange={(e) => setElectionId(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded"
            onClick={handleConnect}
          >
            {etherSigner == "" ? "Connect to Metamask" : etherSigner.address}
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
            disabled={electionId == "" || connecting}
            onClick={() => handleSetup()}
          >
            Setup
          </button>
        </div>
      </div>
    </div>
  );
}
