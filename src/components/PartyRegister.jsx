import React from "react";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { SignerContext } from "../context/signerContext";
import { toast } from "react-hot-toast";

const PartyRegister = () => {
  const { signer, setSigner } = useContext(SignerContext);

  return (
    <>
      <div className=" m-3 text-center font-semibold">{signer.address}</div>
      <div className="py-20  flex  flex-1 justify-center items-center">
        <ul className="m-2 w-2/5 flex flex-col gap-4 ">
          <li>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Party Name"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-full">Party Symbol</div>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
              type="file"
            ></input>
          </li>
          <li>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Party Constitution"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
          </li>
          <li>
            <input
              className="rounded-lg text-md p-4 focus:outline-none  w-full"
              placeholder="Contact Details"
              // value={receiver}
              // onChange={(e) => setReceiver(e.target.value)}
            ></input>
          </li>

          <li>
            <button
              // onClick={transact}
              className="rounded  text-md p-4 bg-[#00ADB5]  hover:bg-[#393E46] cursor-pointer w-full hover:text-white font-bold"
            >
              Register
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PartyRegister;
