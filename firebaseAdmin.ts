//mpm i firebase-admin
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

//The line below is what firebase recommends
//This is not cool since you don't want to include serviceAccountKey.json file in your commits
//So instead copy everything inside that file and go to https://www.textfixer.com/tools/remove-line-breaks.php
//Paste everything in that link to remove line breaks then copy the result to the clipboard
//Now paste this new result in the .env.local file

// const serviceAccount = require("./serviceAccountKey.json")

//Rebuild the contents of the file from JSON
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

//Now we rebuild it back from the above environment variable
//And initialise th app with it
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();

export { adminDb };

//All this basically allows one to make admin calls to manipulate the database
//with zero permissions
