/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

export default function SignInDialog({ login, children }) {
  return (
    <Dialog>
      <DialogTrigger className=" bg-slate-950 text-white rounded-sm px-10 py-3 text-xs tracking-widest">
        {children}
      </DialogTrigger>
      <DialogContent>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => navigation("/")}
        >
          <img src="/logo.svg" className="w-[35px] h-[35px]" />
          <p className="text-xl font-Inter font-extrabold text-[#404530] ">
            TripPlanner
          </p>
        </div>
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
  );
}
