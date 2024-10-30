import { userContext } from "@/contexts/Usercontext";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import TripCard from "./TripCard";
import Empty from "./Empty";

export default function MyTrips() {
  const { user } = useContext(userContext);

  const parsedUserData = JSON.parse(user);
  const [tripsData, setTripsData] = useState([]);

  useEffect(() => {
    const loadTrips = async function () {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", parsedUserData.email)
      );

      let data = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTripsData(data);
    };
    loadTrips();
  }, [parsedUserData.email]);

  return (
    <div className="min-h-[90vh] flex flex-col gap-10 mx-4 md:mx-8 lg:mx-10 my-10">
      <h2 className="font-bold text-4xl ">My Trips</h2>
      {tripsData.length ? (
        <div className="flex flex-row gap-5 flex-wrap items-stretch">
          {tripsData.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
