import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[45px]  text-center mt-16">
        <span className="text-[#f56551] ">
          Discover Your Next Adventure with AI:&nbsp;
        </span>
        <br /> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-center text-xl text-gray-500">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button>Get Started, It&apos;s Free</Button>
      </Link>
    </div>
  );
}
