import { db } from "@config/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const getProfiles = async (params = {}) => {
  const {
    sort: _sort = "level",
    order: _order = "desc",
    limit: _limit,
    role,
    startAfter: _startAfter,
    searchTerm,
  } = params;

  try {
    const docsRef = collection(db, "contacts");

    const queryConstraints = [];

    if (_startAfter) queryConstraints.push(startAfter(_startAfter[_sort]));
    if (_limit) queryConstraints.push(limit(_limit));
    if (searchTerm) {
      const _term = searchTerm?.toLowerCase()?.trim()?.split(" ");
      queryConstraints.push(
        where("filters.searchTerm", "array-contains-any", _term)
      );
    }
    if (role) {
      queryConstraints.push(where("role", "==", role));
    }

    const q = query(docsRef, orderBy(_sort, _order), ...queryConstraints);

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    return { success: true, response: snapshotData };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProfile = async (cid) => {
  try {
    const q = await getDoc(doc(db, `contacts/${cid}`));
    return q.data?.();
  } catch (error) {
    return error;
  }
};

export const listenProfiles = (callback, params = {}) => {
  const { author } = params;

  try {
    const docsRef = collection(db, "contacts");

    const queryConstraints = [];

    // if (author) queryConstraints.push(where("filters.brand", "==", author));

    const q = query(docsRef, ...queryConstraints);

    const unsub = onSnapshot(q, (snapshot) => {
      const result = [];

      snapshot.docs.forEach((doc) => {
        result.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      callback?.(result);
    });

    return unsub;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const listenOneProfile = (_id, callback) => {
  try {
    const docRef = doc(db, "contacts", _id);

    const unsub = onSnapshot(docRef, (snapshot) => {
      callback?.(snapshot.data());
    });

    return unsub;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const listenUserContent = (cid, callback) => {
  const docsRef = collection(db, "content");

  const q = query(docsRef, where("author", "==", cid));

  const unsub = onSnapshot(q, (snapshot) => {
    const result = [];

    snapshot.docs.forEach((doc) => {
      result.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    callback?.(result);
  });

  return unsub;
};
