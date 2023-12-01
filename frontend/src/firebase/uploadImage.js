import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

const bucket_url = process.env.REACT_APP_BUCKET_URL;

export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app, bucket_url);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        reject(error); // Reject the Promise if an error occurs
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error); // Reject the Promise if an error occurs during URL retrieval
        }
      }
    );
  });
};
