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

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

import { useGoogleLogin } from "@react-oauth/google";

import { db } from "@/services/firebaseConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "@/contexts/Usercontext";
import { getUserProfile } from "@/lib/getUserProfile";
import SignInDialog from "@/components/SignInDialog";

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

  const { toast } = useToast();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const [isLoading, setIsLoadin] = useState(false);
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

    setIsLoadin(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      userInput.location.properties.state
    )
      .replace("{totalDays}", userInput.noOfDays)
      .replace("{traveller}", userInput.traveller)
      .replace("{budget}", userInput.budget)
      .replace("{totalDays}", userInput.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setIsLoadin(false);
    console.log(userInput);
    SaveAITrip(result?.response?.text());
    console.log(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {
    setIsLoadin(true);
    const docId = crypto.randomUUID();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: userInput,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
      timeStamp: Date.now(),
    });
    setIsLoadin(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async function (tokenInfo) {
    const data = await getUserProfile(tokenInfo);

    setUser(JSON.stringify(data));
    if (isSignin) navigate("/create-trip");
    OnGenerateTrip();
  };

  return (
    <div className="sm:px-20 py-20 lg:px-56 xl:px-100 px-5 bg-[#F1F4F4]">
      <h2 className="font-Inter font-extrabold text-5xl">
        Tell us your travel preferences
      </h2>
      <p className="mt-5 text-gray-500 text-xl max-w-[600px]">
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
            disabled={isLoading}
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      {/* budget */}
      <div className="mb-20">
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => (
            <div
              onClick={() => handleInputChange("budget", item.title)}
              key={item.id}
              className={`bg-[#F7FBFA] p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                userInput?.budget === item.title
                  ? "shadow-2xl border-black bg-white"
                  : "bg-[#F7FBFA]"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item) => (
            <div
              onClick={() => handleInputChange("traveller", item.people)}
              key={item.id}
              className={` p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                userInput?.traveller === item.people
                  ? "shadow-2xl border-black bg-white"
                  : "bg-[#F7FBFA]"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-end">
        {user ? (
          <Button disabled={isLoading} onClick={OnGenerateTrip} className="btn">
            {isLoading ? (
              <>
                Loading
                <AiOutlineLoading3Quarters className="ml-[10px] h-5 w-5 animate-spin" />
              </>
            ) : (
              "GENERATE TRIP"
            )}
          </Button>
        ) : (
          <SignInDialog login={login}>GENERATE TRIP</SignInDialog>
        )}
      </div>
    </div>
  );
}
