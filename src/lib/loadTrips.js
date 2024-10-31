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
  setIsMore,
  setIsLoading
) {
  // Query the first page of docs
  let limitValue = 5;
  setIsLoading(true);
  const first = query(
    collection(db, "AITrips"),
    where("userEmail", "==", email),
    limit(limitValue)
  );
  const documentSnapshots = await getDocs(first);

  // Get the last visible document
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  setLastVisible(lastVisible);
  let data = [];

  documentSnapshots.forEach((doc) => {
    data.push(doc.data());
  });
  if (data.length < limitValue) {
    setIsMore(false);
  } else {
    data.pop();
    setIsMore(true);
  }
  setVisibleTrips(data);
  setIsLoading(false);
}

export async function nextTrips(
  email,
  lastVisible,
  setLastVisible,
  setVisibleTrips,
  setIsMore,
  setIsLoading
) {
  let limitValue = 5;
  setIsLoading(true);
  const next = query(
    collection(db, "AITrips"),
    where("userEmail", "==", email),
    startAt(lastVisible),
    limit(limitValue)
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

  if (data.length < limitValue) {
    setIsMore(false);
  } else {
    setIsMore(true);
    data.pop();
  }
  setVisibleTrips(data);
  setIsLoading(false);
}
