import { EtherSignerContext } from "@/context/EtherSignerContext";
import { contractAbi, contractAddress } from "@/smart_contract/contractEthers";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
function toObject(proxy) {
  return JSON.parse(
    JSON.stringify(
      proxy,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}
const ElectionStages = ({ children }) => {
  const [votingContract, setVotingContract] = useState("");
  const { signer, setSigner } = useContext(EtherSignerContext);
  useEffect(() => {
    if (signer != "")
      setVotingContract(
        new ethers.Contract(contractAddress, contractAbi, signer)
      );
  }, [signer]);
  useEffect(() => {
    if (votingContract == "") return;
    async function work() {
      const stageObj = toObject(await votingContract.getStage());
      setActiveIndex(parseInt(stageObj[0] - 1));
    }
    votingContract.addListener("StageChanged", () => {
      work();
    });
    work();
  }, [votingContract]);
  function handleSubmit() {
    votingContract.nextStage();
  }
  const [isOpen, setIsOpen] = useState(false);
  // const toggleDrawer = () => {
  //   setIsOpen((prevState) => !prevState);
  // };
  const stages = ["Setup", "In process", "Ended"];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      {/* <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        size="100vh"
      >
        <div>Hello World</div>
      </Drawer> */}
      <div class="flex h-full">
        <div class="w-1/5 bg-slate-700 break-words p-10 overflow-hidden h-full">
          <ul className=" flex list-none justify-between items-center flex-col flex-initial gap-8 ">
            {stages.map((item, index) => (
              <li
                key={index}
                className={`mx-4 cursor-pointer ${
                  index === activeIndex
                    ? " text-green-200 font-bold"
                    : "text-slate-300"
                }`}
              >
                {item}
              </li>
            ))}
            <li key="nextStage">
              <button
                onClick={handleSubmit}
                className="rounded  bg-[#00ADB5] py-2 px-5 hover:bg-slate-300 cursor-pointer"
              >
                Proceed
              </button>
            </li>
          </ul>
        </div>
        <div className="w-4/5 overflow-y-scroll p-5">{children}</div>
      </div>
    </>
  );
};

export default ElectionStages;
