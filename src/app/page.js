"use client";

import React, { useContext } from "react";

const page = () => {
  // const { signer, setSigner } = useContext(SignerContext);
  let count = 7;
  return (
    <div className=" min-h-screen bg-[#222831] p-5">
      <h1 className="text-3xl font-bold mb-8 text-center  text-[#e5e7eb]">
        Cast Your Vote
      </h1>
      <h2 className="text-2xl font-semibold mb-8 text-center  text-[#e5e7eb]">
        5792 9051 3641
      </h2>

      <div
        className={
          "w-full p-6  grid  gap-8 " +
          (count > 6 ? "grid-cols-3" : "grid-cols-2")
        }
      >
        {[1, 6, 7, 7, 7, 7].map(() => {
          return (
            <button className="flex items-center justify-start space-x-6 w-full p-5 rounded-lg bg-[#00ADB5]">
              <div className="w-24 h-24">
                <img
                  alt="Party Logo"
                  className="rounded-full"
                  height="96"
                  src="https://www.bjp.org/files/content/images/constitution-image.jpg"
                  style={{
                    aspectRatio: "96/96",
                    objectFit: "cover",
                  }}
                  width="96"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#e5e7eb]">
                Party Name
              </h2>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default page;
