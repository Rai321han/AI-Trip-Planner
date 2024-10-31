import { userContext } from "@/contexts/Usercontext";
import { useContext, useEffect, useState } from "react";
import TripCard from "./TripCard";
import Empty from "./Empty";
import { Button } from "../ui/button";
import { initialTrips, nextTrips } from "@/lib/loadTrips";

export default function MyTrips() {
  const { user } = useContext(userContext);

  const parsedUserData = JSON.parse(user);
  const [lastTrip, setLastTrip] = useState(null);
  const [tripsData, setTripsData] = useState([]);
  const [isMore, setIsMore] = useState(false);

  const settingTripsData = function (data) {
    setTripsData((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    if (tripsData.length) return;
    initialTrips(
      parsedUserData.email,
      setLastTrip,
      settingTripsData,
      setIsMore
    );
  }, []);

  function loadMoreTrip() {
    nextTrips(
      parsedUserData.email,
      lastTrip,
      setLastTrip,
      settingTripsData,
      setIsMore
    );
  }

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
      {isMore && (
        <div className="flex items-center justify-center">
          <Button variant="outline" onClick={loadMoreTrip}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
