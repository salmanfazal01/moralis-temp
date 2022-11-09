export const getDocumentWithContentAdmin = async (db, cid, seperate) => {
  try {
    const contentRef = db.collection("content").doc(cid);
    const contentSnap = await contentRef.get();

    if (contentSnap.exists) {
      const contentData = contentSnap.data();

      const docRef = db.collection("documents").doc(contentData.published);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString() ||
                    contentData.timestamp,
                  updatedTimestamp:
                    contentData.updatedTimestamp?.toDate?.()?.toString() ||
                    contentData.updatedTimestamp,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp:
            contentData.timestamp?.toDate?.()?.toString() ||
            contentData.timestamp,
          updatedTimestamp:
            contentData.updatedTimestamp?.toDate?.()?.toString() ||
            contentData.updatedTimestamp,
        };

        return { success: true, response: JSON.parse(JSON.stringify(docObj)) };
      }
    }
  } catch (error) {
    console.log("cid", cid, "No such course!", error);
    throw error;
  }
};
