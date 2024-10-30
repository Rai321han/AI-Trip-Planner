import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold mt-5 text-xl mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={
              `https://www.google.com/maps/search/?api=1&query=` +
              hotel.name +
              "," +
              hotel.address
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img src="/placeholder.png" alt="" className="rounded-lg" />
              <div className="my-2 flex flex-col gap-2 text-black">
                <h2 className="font-medium">{hotel.name}</h2>
                <h2 className="font-medium text-xs text-gray-500">
                  📌 {hotel.address}
                </h2>
                <h2 className="text-sm">🪙 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ Rating: {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}