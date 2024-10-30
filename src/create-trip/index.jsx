import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/services/AIModel";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { DialogTitle } from "@radix-ui/react-dialog";

import { db } from "@/services/firebaseConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "@/contexts/Usercontext";
import { getUserProfile } from "@/lib/getUserProfile";

//
export default function CreateTrip() {
  const [searchParams] = useSearchParams();
  const [userInput, setUserInput] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveller: "",
  });
  const { user, setUser } = useContext(userContext);
  const isSignin = !user && searchParams.get("signin") === "true";

  const [openDialog, setOpenDialog] = useState(isSignin);
  const { toast } = useToast();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function handleInputChange(field, value) {
    if (field === "noOfDays" && value > 5) {
      toast({
        title: "Travel days must be less than 5.",
        variant: "destructive",
      });
      return;
    }

    if (value < 1) {
      toast({
        title: "Travel days cannot be less than 1.",
        variant: "destructive",
      });
      return;
    }

    setUserInput((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  const OnGenerateTrip = async function () {
    if (!user) {
      setOpenDialog(true);
    }

    if (
      !userInput.budget ||
      !userInput.location ||
      !userInput.noOfDays ||
      !userInput.traveller
    ) {
      toast({
        title: "Please provide all information.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      userInput.location.properties.state
    )
      .replace("{totalDays}", userInput.noOfDays)
      .replace("{traveller}", userInput.traveller)
      .replace("{budget}", userInput.budget)
      .replace("{totalDays}", userInput.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    console.log(userInput);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const docId = crypto.randomUUID();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: userInput,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async function (tokenInfo) {
    const data = await getUserProfile(tokenInfo);

    setOpenDialog(false);
    setUser(JSON.stringify(data));
    if (isSignin) navigate("/create-trip");
    OnGenerateTrip();
  };

  return (
    <div className="sm:px-20 md:px-32 lg:px-56 xl:px-100 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl max-w-[600px]">
        Just provide some basic information, and trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10 mb-20">
        {/* location */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              lang="en"
              placeSelect={(value) => handleInputChange("location", value)}
            />
          </GeoapifyContext>
        </div>

        {/* days */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* budget */}
      <div className="mb-20">
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => (
            <div
              onClick={() => handleInputChange("budget", item.title)}
              key={item.id}
              className={` p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                userInput?.budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* traveler */}
      <div className="mb-20">
        <h2 className="text-xl my-3 font-medium">
          Who do plan to travel with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item) => (
            <div
              onClick={() => handleInputChange("traveller", item.people)}
              key={item.id}
              className={` p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                userInput?.traveller === item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-20 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <>
              Loading
              <AiOutlineLoading3Quarters className="ml-[10px] h-5 w-5 animate-spin" />
            </>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <img src="/logo.svg" />
          <DialogHeader>
            <DialogTitle>Sign In With Google.</DialogTitle>
            <DialogDescription>
              Sign in to the App with Google authentication securely.
              <Button
                onClick={login}
                className="w-full mt-5 flex flex-row gap-5 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
