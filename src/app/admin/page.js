"use client";
import BarChart from "@/components/admin/charts/BarChart";
import { EtherSignerContext } from "@/context/EtherSignerContext";
import { contractAbi, contractAddress } from "@/smart_contract/contractEthers";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
function toObject(proxy) {
  return JSON.parse(
    JSON.stringify(
      proxy,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}
const page = () => {
  const [votingContract, setVotingContract] = useState("");
  const { signer, setSigner } = useContext(EtherSignerContext);
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [],
    },
  ]);
  useEffect(() => {
    if (signer != "")
      setVotingContract(
        new ethers.Contract(contractAddress, contractAbi, signer)
      );
  }, [signer]);

  useEffect(() => {
    async function update() {
      console.log(votingContract);
      console.log(signer);
      const candidates = toObject(await votingContract.getCandidateDetails());
      const categories = candidates.map((candidates) => {
        return candidates[0];
      });
      const votes = candidates.map((candidates) => {
        return candidates[2];
      });
      // console.log(categories);
      const newOptions = structuredClone(options);
      newOptions.xaxis.categories = categories;
      setOptions(newOptions);
      const newSeries = structuredClone(series);
      newSeries[0].data = votes;
      setSeries(newSeries);
    }
    if (votingContract != "") {
      votingContract.addListener("VoteCasted", () => {
        update();
      });
      update();
    }
  }, [votingContract]);

  useEffect(() => {}, []);

  return <BarChart options={options} series={series}></BarChart>;
  // return <BarChart></BarChart>;
  // return <PartySelector></PartySelector>;
};

export default page;
