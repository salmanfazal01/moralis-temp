import firebaseAdmin from "firebase-admin";

const project_id = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID;

const firebaseConfig = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace?.(
    /\\n/gm,
    "\n"
  ),
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_CERT_URL,
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      ...firebaseConfig,
    }),
    databaseURL: `https://${project_id}.firebaseio.com`,
  });
}

export { firebaseAdmin };
