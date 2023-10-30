"use client";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
// export it with SSR disabled
const NoSSRToaster = dynamic(() => Promise.resolve(Toaster), {
  ssr: false,
});

export default NoSSRToaster;
