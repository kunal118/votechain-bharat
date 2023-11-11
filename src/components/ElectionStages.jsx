import Link from "next/link";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
const ElectionStages = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const stages = ["Setup", "In process", "Ended"];
  const activeIndex = 1;
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        size="100vh"
      >
        <div>Hello World</div>
      </Drawer>
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
                onClick={toggleDrawer}
                className="rounded  bg-[#00ADB5] py-2 px-5 hover:bg-slate-300 cursor-pointer"
              >
                Proceed
              </button>
            </li>
          </ul>
        </div>
        <div className="w-4/5 overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};

export default ElectionStages;
