import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { fireApp } from "./config";
const storage = getStorage(fireApp);

export async function firebase_uploadSymbol(file, filename) {
  try {
    const storageRef = ref(storage, `partySymbols/${filename}`);

    // 'file' comes from the Blob or File API
    console.log("uploading........", file);
    await uploadBytes(storageRef, file);
    console.log("Uploaded a blob or file!");
  } catch (err) {
    console.log(err);
  }
}

export async function firebase_getPartySymbol() {
  try {
    const url = await getDownloadURL(ref(storage, "images/stars.jpg"));
    return url;
  } catch (err) {
    console.log(err);
    return null;
  }
}
