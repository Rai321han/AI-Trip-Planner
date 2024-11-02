import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
export async function deleteTrip(id) {
  await deleteDoc(doc(db, "AITrips", id));
}
