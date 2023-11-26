import { createContext } from "react";
export const EtherSignerContext = createContext({
  signer: "",
  setSigner: () => {},
});
// export const ProviderContext = createContext();
