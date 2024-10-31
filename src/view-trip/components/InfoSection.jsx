/* eslint-disable no-unused-vars */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

/* eslint-disable react/prop-types */
export default function InfoSection({ trip }) {
  const placeName = trip?.userSelection?.location?.properties?.formatted;
  const noOfDays = trip?.userSelection?.noOfDays;
  const budget = trip?.userSelection?.budget;
  const noOfTravellers = trip?.userSelection?.traveller;
  const daysPlaceholder = noOfDays > 1 ? " Days" : "Day";
  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src="/placeholder.png"
        alt=""
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{placeName}</h2>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <Badge className="py-1 px-2">
              {noOfDays} {daysPlaceholder}
            </Badge>
            <Badge className="py-1 px-2">{budget}</Badge>
            <Badge className="py-1 px-2">{noOfTravellers}</Badge>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}
