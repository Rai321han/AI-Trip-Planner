import { db } from "@/services/firebaseConfig";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  startAt,
  startAfter,
} from "firebase/firestore";

export async function initialTrips({
  email,
  setTripsData,
  deletedId,
  setLastTrip,
  setIsMore,
  lastTrip,
  isDeleted,
  setIsLoading,
}) {
  setIsLoading(true);
  if (isDeleted && lastTrip === null) {
    setTripsData((prev) => prev.filter((trip) => trip.id !== deletedId));
    setIsLoading(false);
    return;
  }

  let Query, limitValue;

  if (isDeleted) {
    limitValue = 1;
    Query = query(
      collection(db, "AITrips"),
      where("userEmail", "==", email),
      startAfter(lastTrip),
      limit(limitValue)
    );
  } else {
    limitValue = 3;
    Query = query(
      collection(db, "AITrips"),
      where("userEmail", "==", email),
      limit(limitValue)
    );
  }

  const documentSnapshots = await getDocs(Query);

  let data = [];

  documentSnapshots.forEach((doc) => {
    data.push(doc.data());
  });

  // Get the extra trip document
  const updatedExtraTrip =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  if (data.length < limitValue) {
    setLastTrip(null);
    setIsMore(false);
  } else {
    !isDeleted && data.pop();
    setLastTrip(updatedExtraTrip);
    setIsMore(true);
  }

  if (isDeleted) {
    setTripsData((prev) => prev.filter((trip) => trip.id !== deletedId));
    setTripsData((prev) => [...prev, lastTrip.data()]);
  } else setTripsData((prev) => [...prev, ...data]);

  setIsLoading(false);
}

export async function nextTrips({
  email,
  lastTrip,
  setLastTrip,
  settingTripsData,
  setIsMore,
  setIsLoading,
}) {
  let limitValue = 3;
  setIsLoading(true);
  const next = query(
    collection(db, "AITrips"),
    where("userEmail", "==", email),
    startAt(lastTrip),
    limit(limitValue)
  );

  const documentSnapshots = await getDocs(next);

  let data = [];

  documentSnapshots.forEach((doc) => {
    data.push(doc.data());
  });

  // Get the last visible document
  const updatedExtraTrip =
    documentSnapshots.docs[documentSnapshots.docs.length - 1];

  if (data.length < limitValue) {
    setIsMore(false);
    setLastTrip(null);
  } else {
    setIsMore(true);
    setLastTrip(updatedExtraTrip);
    data.pop();
  }
  settingTripsData(data);
  setIsLoading(false);
}
