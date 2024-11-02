import { userContext } from "@/contexts/Usercontext";
import { useContext, useEffect, useRef, useState } from "react";
import TripCard from "./TripCard";
import Empty from "./Empty";
import { Button } from "../ui/button";
import { initialTrips, nextTrips } from "@/lib/loadTrips";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MyTrips() {
  const { user } = useContext(userContext);

  const parsedUserData = JSON.parse(user);
  const [lastTrip, setLastTrip] = useState(null);
  const [tripsData, setTripsData] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const settingTripsData = function (data) {
    const updatedTrips = [...tripsData, ...data];
    setTripsData(updatedTrips);
  };

  const email = parsedUserData.email;

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isDeleted === false && !isFirstLoad.current) return;
    if (isFirstLoad.current) isFirstLoad.current = false;

    initialTrips({
      email,
      setLastTrip,
      deletedId,
      setTripsData,
      setIsMore,
      isDeleted,
      lastTrip,
      setIsLoading,
    });

    setIsDeleted(false);
  }, [isDeleted]);

  function loadMoreTrip() {
    nextTrips({
      email,
      lastTrip,
      setLastTrip,
      settingTripsData,
      setIsMore,
      setIsLoading,
    });
  }

  return (
    <div className="font-Inter w-full  min-h-[90vh] flex flex-row justify-center gap-10 bg-[#F1F4F4] py-20 px-4 md:px-10">
      <div className="max-w-[900px] flex flex-col gap-10">
        <h2 className="font-extrabold text-5xl">MY TRIPS</h2>

        {tripsData.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 flex-wrap items-stretch">
            {tripsData.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                setDeletedId={setDeletedId}
                setIsDeleted={setIsDeleted}
              />
            ))}
          </div>
        ) : isLoading ? (
          <div className="w-full flex items-center justify-center">
            <AiOutlineLoading3Quarters className="w-10 h-10 animate-spin " />
          </div>
        ) : (
          <Empty />
        )}
        {isMore && (
          <div className="flex items-center justify-center">
            <Button variant="outline" onClick={loadMoreTrip}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
