import { getFirestore } from "firebase/firestore";
import { fireApp } from "./config";
import { collection, addDoc } from "firebase/firestore";

const db = getFirestore(fireApp);

export async function firebase_registerParty(
  party_name,
  party_symbol_id,
  party_details,
  party_contact
) {
  try {
    const docRef = await addDoc(collection(db, "candidates"), {
      party_name: party_name,
      party_symbol_id: party_symbol_id,
      party_details: party_details,
      party_contact: party_contact,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function firebase_getPartyDetails() {
  let details = [];
  try {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      details.push({ id: doc.id, data: doc.data() });
    });
    return details;
  } catch (err) {
    console.log(err);
    return null;
  }
}
