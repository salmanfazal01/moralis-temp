export const getAssessmentWithContentAdmin = async (db, cid, seperate) => {
  try {
    if (!db) return null;

    const contentRef = db.collection("content").doc(cid);
    const contentSnap = await contentRef.get();

    if (contentSnap.exists) {
      const contentData = contentSnap.data();

      const docRef = db.collection("assessments").doc(contentData.published);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString?.() || null,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp: contentData.timestamp?.toDate?.()?.toString?.() || null,
        };

        return JSON.parse(JSON.stringify(docObj));
      }
    }
  } catch (error) {
    console.log("assessment error", error);
    throw error;
  }
};
