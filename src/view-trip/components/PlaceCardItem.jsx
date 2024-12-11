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
      className="flex-auto"
    >
      <div className=" w-full bg-white text-black hover:scale-105 transition-all cursor-pointer border rounded-xl p-3 shadow-lg mt-2 flex flex-col sm:flex-row gap-5  h-full">
        {/* <img
          src="/placeholder.webp"
          alt=""
          className="w-[130px] h-[130px] rounded-xl"
        /> */}
        <div className="flex flex-col items-start w-full">
          <h2 className="font-bold text-lg">{place.name}</h2>
          <p className="text-gray-500 text-sm">
            {place.description || place.details}
          </p>
          <h2 className=" my-2 text-sm text-gray-700 p-1 bg-gray-200 rounded-lg">
            {place.travel_time}
          </h2>

          <div className="flex flex-col gap-3 xs:flex-row justify-between flex-wrap text-sm w-full mt-auto">
            <p className="max-w-[250px]">Ticket: {place.ticket_price}</p>
            <p>⭐ Rating: {place.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
