import { Navigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

import { useContext, useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import { userContext } from "@/contexts/Usercontext";
import { useToast } from "@/hooks/use-toast";

// export default function ViewTrip() {
//   const { tripId } = useParams();
//   const toast = useToast();
//   const [trip, setTrip] = useState();
//   const { user } = useContext(userContext);
//   useEffect(() => {
//     tripId && GetTripData();
//   }, [tripId]);

//   // fetching trip data
//   const GetTripData = async () => {
//     const docRef = doc(db, "AITrips", tripId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       setTrip(docSnap.data());
//     } else {
//       toast({
//         title: "Error",
//         variant: "No data found!",
//       });
//     }
//   };

export default function ViewTrip() {
  const { tripId } = useParams();
  const { toast } = useToast();
  const [trip, setTrip] = useState();
  const { user } = useContext(userContext);
  const parsedUserData = JSON.parse(user);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  // fetching trip data
  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tripData = docSnap.data();
        // Check if the user's email matches the trip owner's email
        if (tripData.userEmail === parsedUserData.email) {
          setTrip(tripData);
        } else {
          setIsError(true);
          toast({
            title: "You don't have the access to view this trip.",
            variant: "destructive",
          });
        }
      } else {
        setIsError(true);
        toast({
          title: "Error",
          variant: "No data found!",
        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };
  if (isError) return <Navigate to={"/"} />;
  return (
    <div className="px-10 font-Inter w-full  min-h-[90vh] flex flex-row justify-center gap-10 bg-[#F1F4F4] py-20">
      <div className="max-w-[900px] flex flex-col gap-10">
        {/* Information Section */}
        <InfoSection trip={trip} />

        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <DailyPlan trip={trip} />
      </div>
    </div>
  );
}
