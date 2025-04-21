import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
    await readFile(new URL("../../serviceAccountKey.json", import.meta.url))
);

import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { admin };