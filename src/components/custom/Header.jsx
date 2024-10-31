import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "@/contexts/Usercontext";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoAdd } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserProfile } from "@/lib/getUserProfile";

export default function Header() {
  const navigation = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [openDialog, setOpenDialog] = useState(false);
  const parsedUser = user ? JSON.parse(user) : null;
  const login = useGoogleLogin({
    onSuccess: (token) => handleLogin(token),
    onError: (err) => console.log(err),
  });

  const handleLogin = async function (token) {
    const data = await getUserProfile(token);

    const userInformation = JSON.stringify(data);
    setUser(userInformation);
    setOpenDialog(false);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-2 md:px-5 bg-[#F7FBFA]">
      <img
        onClick={() => navigation("/")}
        src="/logo.svg"
        className="w-[35px] h-[35px]"
      />
      <div>
        {user ? (
          <div className="flex items-center gap-2 md:gap-5">
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="rounded-full text-gray-500"
                onClick={() => navigation("/create-trip")}
              >
                <IoAdd className="mr-1 w-5 h-5" />
                Create Trip
              </Button>
            </div>
            <Button
              variant="outline"
              className="rounded-full text-gray-500"
              onClick={() => navigation("/my-trips")}
            >
              My Trips
            </Button>
            <Popover>
              <PopoverTrigger className="rounded-full p-2 md:p-3">
                <img
                  className="w-[25px] h-[25px] md:h-[35px] md:w-[35px] rounded-full"
                  src={parsedUser.picture}
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent className="cursor-pointer p-0 w-full">
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    setUser(null);
                    navigation("/");
                  }}
                >
                  Log Out
                </Button>
                {/* <h2></h2> */}
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
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
          </>
        )}
      </div>
    </div>
  );
}
