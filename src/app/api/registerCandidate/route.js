import { firebase_registerParty } from "@/firebase/cloud-firestore";
import { firebase_uploadSymbol } from "@/firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const symbol_id = data.symbol_id;
  console.log(data);
  try {
    //cant upload file here sending to api loses blob.bytelength
    await firebase_registerParty(
      data.partyName,
      symbol_id,
      data.partyDetails,
      data.contactDetails
    );
    return Response.json({ post: true });
  } catch (error) {
    return Response.json({ post: false });
  }
}

export async function GET(request) {
  console.log(request.body);
  return Response.json({ post: true, body: request.body });
}
