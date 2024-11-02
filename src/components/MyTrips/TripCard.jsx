import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTrip } from "@/lib/deleteTrip";
import { MdDeleteForever } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
/* eslint-disable react/prop-types */
export default function TripCard({ trip, setIsDeleted, setDeletedId }) {
  const { duration, traveler_type } = trip.tripData;
  const { traveller } = trip.userSelection;
  const destination = trip.userSelection.location.properties.formatted;
  const { toast } = useToast();
  async function handleDelete() {
    try {
      await deleteTrip(trip.id);
      setIsDeleted(true);
      setDeletedId(trip.id);
      toast({
        title: "Trip Deletion",
        description: "A trip has been successfully deleted!",
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong!",
        description: "Can't delete the trip!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log(error);
    }
  }
  return (
    <>
      <div className="relative">
        <Link to={`/view-trip/${trip.id}`}>
          <div className="text-black h-full p-4 flex flex-col gap-4 rounded-lg max-w-[350px] hover:bg-[#DBFF73] cursor-pointer bg-white shadow-lg ">
            <div className="flex gap-2 justify-between">
              <h2 className="font-bold text-[20px] text-gray-700 leading-tight">
                {destination}
              </h2>
            </div>
            <div className="flex flex-row flex-wrap gap-3 text-sm font-normal antialiased ">
              <Badge variant="secondary" className="bg-green-100 text-gray-500">
                {traveler_type}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-gray-500"
              >
                {duration}
              </Badge>
              <Badge variant="secondary" className=" bg-red-100 text-gray-500">
                {traveller}
              </Badge>
            </div>
          </div>
        </Link>
        <div className=" absolute right-[10px] -top-[10px]">
          <AlertDialog>
            <AlertDialogTrigger className="hover:bg-red-500 px-1 py-1 bg-white border-gray-200">
              <MdDeleteForever className="w-4 h-4" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to delete this trip?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this trip from your saved trips.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* <button
            className="bg-white p-1 rounded-lg shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <MdDeleteForever className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </>
  );
}
