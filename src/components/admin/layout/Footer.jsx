import { EtherSignerContext } from "@/context/EtherSignerContext";
import React, { useContext } from "react";

const Footer = () => {
  const { signer, setSigner } = useContext(EtherSignerContext);
  return (
    <nav
      className="w-full flex justify-between items-center px-6 py-2 bg-[#222831] text-[#EEEEEE]  border-slate-700 text-l title-krypt drop-shadow-xl fixed "
      style={{ bottom: "0px", height: "8vh" }}
    >
      <div className="flex flex-1 justify-around items-center gap-4">
        {signer == "" ? "..." : signer.address}
      </div>
    </nav>
  );
  // return <div>{signer == "" ? "no user" : signer.address}</div>;
};

export default Footer;
