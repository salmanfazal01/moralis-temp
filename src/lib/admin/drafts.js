export const getDraftAdmin = async (db, cid) => {
  const docRef = db.collection("drafts").doc(cid);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return { success: true, response: docSnap.data() };
  } else {
    return console.log("cid", cid, "No such document!");
  }
};
