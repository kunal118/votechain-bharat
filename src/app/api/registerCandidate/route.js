import { firebase_registerParty } from "@/firebase/cloud-firestore";
import { firebase_uploadSymbol } from "@/firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  // const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  // console.log(data);
  // const symbol_id = uuidv4();
  // let b = new Blob(data.partySymbol);
  // try {
  //   await firebase_uploadSymbol(data.partySymbol, symbol_id);
  //   await firebase_registerParty(
  //     data.partyName,
  //     symbol_id,
  //     data.partyDetails,
  //     data.contactDetails
  //   );
  //   return Response.json({ post: true });
  // } catch (error) {
  //   return Response.json({ post: false });
  // }
  console.log(request);
}

export async function GET(request) {
  console.log(request.body);
  return Response.json({ post: true, body: request.body });
}
