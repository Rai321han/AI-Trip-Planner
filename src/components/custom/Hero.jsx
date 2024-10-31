import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className=" font-Inter flex flex-col items-center gap-9 py-10 mx-10">
      <h1 className="text-[45px]  text-center mt-16 font-extrabold">
        <span className="text-lime-700 ">
          Discover Your Next Adventure with AI:&nbsp;
        </span>
        <br /> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-center text-xl text-gray-700 max-w-[400px] md:max-w-[600px]">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button className="btn">GET STARTED</Button>
      </Link>
    </div>
  );
}
