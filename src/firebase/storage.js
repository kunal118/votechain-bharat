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

export async function firebase_getPartySymbol(path) {
  var url = "";
  try {
    url = await getDownloadURL(ref(storage, path));
  } catch (err) {
    console.log(err);
  }
  return new Promise((resolve, reject) => {
    resolve(url);
  });
}
