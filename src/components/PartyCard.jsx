import React from "react";

const PartyCard = () => {
  //   return <></>;
  return (
    <div className="flex w-4/5 border border-slate-400  justify-left">
      <div
        className="h-48 w-48 bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
        style={{
          backgroundImage:
            "url(" +
            "https://1000logos.net/wp-content/uploads/2022/02/BJP-logo.png" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div class=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">BJP</div>
        </div>
      </div>
    </div>
  );
};

export default PartyCard;
