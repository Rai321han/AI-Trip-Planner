/* eslint-disable no-unused-vars */

import PlaceCardItem from "./PlaceCardItem";

/* eslint-disable react/prop-types */
export default function DailyPlan({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary?.map((item) => (
          <div key={item.day} className="mb-5">
            <h2 className="font-bold text-lg">Day {item.day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {item.activities.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.best_time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
