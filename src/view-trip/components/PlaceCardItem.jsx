import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function PlaceCardItem({ place }) {
  return (
    <Link
      to={
        `https://www.google.com/maps/search/?api=1&query=` +
        place.name +
        "," +
        place.address
      }
      target="_blank"
    >
      <div className="min-h-[200px] text-black hover:bg-gray-100  cursor-pointer border rounded-xl p-3 mt-2 flex gap-5 grid-row items-stretch">
        <img
          src="/placeholder.png"
          alt=""
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-lg">{place.name}</h2>
          <p className="text-gray-500 text-sm">{place.description}</p>
          <h2 className=" my-2 text-sm text-gray-700 p-1 bg-gray-200 rounded-lg">
            {place.travel_time}
          </h2>
          <div className="flex flex-row justify-between text-sm w-full">
            <p>Ticket: {place.ticket_price}</p>
            <p>⭐ Rating: {place.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
