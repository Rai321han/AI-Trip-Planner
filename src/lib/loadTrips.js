import { db } from "@/services/firebaseConfig";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  startAt,
} from "firebase/firestore";

export async function initialTrips(
  email,
  setLastVisible,
  setVisibleTrips,
  setIsMore
) {
  // Query the first page of docs

  const first = query(
    collection(db, "AITrips"),
    where("userEmail", "==", email),
    limit(5)
  );
  const documentSnapshots = await getDocs(first);

  // Get the last visible document
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  setLastVisible(lastVisible);
  let data = [];

  documentSnapshots.forEach((doc) => {
    data.push(doc.data());
  });
  if (data.length < 5) {
    setIsMore(false);
  } else {
    data.pop();
    setIsMore(true);
  }
  setVisibleTrips(data);
}

export async function nextTrips(
  email,
  lastVisible,
  setLastVisible,
  setVisibleTrips,
  setIsMore
) {
  const next = query(
    collection(db, "AITrips"),
    where("userEmail", "==", email),
    startAt(lastVisible),
    limit(5)
  );

  const documentSnapshots = await getDocs(next);

  // Get the last visible document
  const updatedlastVisible =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];
  setLastVisible(updatedlastVisible);

  let data = [];

  documentSnapshots.forEach((doc) => {
    data.push(doc.data());
  });

  if (data.length < 5) {
    setIsMore(false);
  } else {
    setIsMore(true);
    data.pop();
  }
  setVisibleTrips(data);
}
