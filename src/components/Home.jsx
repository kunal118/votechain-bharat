import React from "react";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { SignerContext } from "../context/signerContext";
import { toast } from "react-hot-toast";
import PartyCard from "./PartyCard";

const Home = () => {
  const { signer, setSigner } = useContext(SignerContext);
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [units, setUnits] = useState("gwei");
  async function handleAccountsChanged(accounts) {
    // console.log(accounts);
    const provider = signer.provider;
    console.log(provider);
    // await provider.send("eth_requestAccounts", []);
    // setSigner(await provider.getSigner());
    console.log(signer);
  }
  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);
  const transact = async () => {
    const _amount = ethers.parseUnits(amount.toString(), units);
    console.log(receiver, _amount, units);
    // console.log(toString(amount));
    // console.log(ethers.parseEther("0.01"));
    try {
      const tx = await signer.sendTransaction({
        to: receiver,
        value: _amount,
      });
      toast.success("Transaction Successful");
    } catch (e) {
      toast.error("Transaction failed");
      console.log(e);
    }
    // // Often you may wish to wait until the transaction is mined
    // const receipt = await tx.wait();
    // console.log(receipt);
    // updateWallet(accounts); /* New */
  };

  return (
    <>
      <div className=" m-3 text-center font-semibold">{signer.address}</div>
      <div className="py-20  flex  flex-1 justify-center items-center">
        <ul className="m-2 w-2/5 flex flex-col gap-4 ">
          <li>
            <PartyCard></PartyCard>
            <PartyCard></PartyCard>
            <PartyCard></PartyCard>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
