"use client";

import React, { useEffect, useState } from "react";
import { SiBlockchaindotcom } from "react-icons/si";
// import { SignerContext } from "../../context/signerContext";
import { useContext } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignerContext } from "@/context/signerContext";
import { EtherProviderContext } from "@/context/EtherProviderContext";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "@/smart_contract/contractEthers";
// import { AiOutlineCLose } from "react-icons/ai";

const NavbarItems = ({ title, path, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer  hover:text-slate-300 ${classProps}`}>
      <Link href={path}>{title}</Link>
    </li>
  );
};

const Navbar = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  //to disable multiple clicks on the connect button
  const { signer, setSigner } = useContext(SignerContext);
  const etherProvider = useContext(EtherProviderContext);
  const [votingContract, setVotingContract] = useState("");
  // toast.success("hola");
  console.log(etherProvider);

  useEffect(() => {
    // setSigner(await etherProvider.getSigner());
    // alert(await votingContract.name());
    async function tellname() {
      console.log(await votingContract.getElectionDetails());
    }

    tellname();
  }, [votingContract]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // toast.success("hi");
      if (window.ethereum == null)
        throw { code: 100, message: "Metamask not available" };
      // const provider = new ethers.BrowserProvider(window.ethereum);
      await etherProvider.send("eth_requestAccounts", []);
      setSigner(await etherProvider.getSigner());
      setVotingContract(
        new ethers.Contract(contractAddress, contractAbi, etherProvider)
      );
    } catch (e) {
      console.log(e);
      if (e.code != 100) toast.error("Error connecting");
      else toast.error(e.message);
    }
    setIsConnecting(false);
    // console.log("provider destroyed");
  };

  return (
    <nav
      className="w-full flex justify-between items-center px-6 py-2 bg-[#222831] text-[#EEEEEE]  border-slate-700 text-l title-krypt drop-shadow-xl"
      style={{ height: "20vh" }}
    >
      <div className="flex flex-1 justify-around items-center gap-4">
        <span className="font-bold text-[#00ADB5]">
          <SiBlockchaindotcom size="3rem"></SiBlockchaindotcom>VOTECHAIN BHARAT
        </span>

        {/* <img src={logo} alt="logo" className="w-32 cursor-pointer"></img> */}
        <ul className=" flex list-none justify-between items-center flex-row flex-initial gap-2">
          {[
            { name: "Home", path: "/" },
            { name: "Candidate Registration", path: "/registerCandidate" },
            { name: "Voter Registration", path: "/registerVoter" },
          ].map((item, index) => {
            return (
              <NavbarItems
                key={item.name + index}
                title={item.name}
                path={item.path}
              />
            );
          })}
        </ul>
        <button
          onClick={handleConnect}
          style={
            isConnecting || signer != "" ? { opacity: 0.2 } : { opacity: 1 }
          }
          disabled={isConnecting || signer != ""}
          className="rounded  bg-[#00ADB5] py-2 px-5 hover:bg-[#393E46] cursor-pointer"
        >
          Connect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
