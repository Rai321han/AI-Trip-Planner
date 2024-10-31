import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

/* eslint-disable react/prop-types */
export default function TripCard({ trip }) {
  const { duration, traveler_type } = trip.tripData;
  const { traveller } = trip.userSelection;
  const destination = trip.userSelection.location.properties.formatted;
  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="text-black h-full p-4 flex flex-col gap-4 rounded-lg max-w-[250px] hover:bg-gray-50 cursor-pointer bg-white shadow-lg hover:scale-105 transition-all">
        <h2 className="font-bold text-[20px] text-gray-700 leading-tight">
          {destination}
        </h2>
        <div className="flex flex-row flex-wrap gap-3 text-sm font-normal antialiased ">
          <Badge variant="secondary" className="bg-green-100 text-gray-500">
            {traveler_type}
          </Badge>
          <Badge variant="secondary" className="bg-yellow-100 text-gray-500">
            {duration}
          </Badge>
          <Badge variant="secondary" className=" bg-red-100 text-gray-500">
            {traveller}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
