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
// import { useState } from "react";
import { IoAdd } from "react-icons/io5";

import { getUserProfile } from "@/lib/getUserProfile";
import SignInDialog from "../SignInDialog";

export default function Header() {
  const navigation = useNavigate();
  const { user, setUser } = useContext(userContext);
  // const [openDialog, setOpenDialog] = useState(false);
  const parsedUser = user ? JSON.parse(user) : null;
  const login = useGoogleLogin({
    onSuccess: (token) => handleLogin(token),
    onError: (err) => console.log(err),
  });

  const handleLogin = async function (token) {
    const data = await getUserProfile(token);

    const userInformation = JSON.stringify(data);
    setUser(userInformation);
    // setOpenDialog(false);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-2 md:px-5 bg-[#F7FBFA]">
      <div
        className="flex flex-row gap-2 items-center cursor-pointer"
        onClick={() => navigation("/")}
      >
        <img src="/logo.svg" className="w-[35px] h-[35px]" />
        <p className="text-xl font-Inter font-extrabold text-[#404530] hidden sm:block">
          TripPlanner
        </p>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-2 md:gap-5">
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="btn-full-rounded"
                onClick={() => navigation("/create-trip")}
              >
                <IoAdd className="mr-1 w-5 h-5" />
                CREATE TRIPS
              </Button>
            </div>
            <Button
              variant="outline"
              className="btn-full-rounded"
              onClick={() => navigation("/my-trips")}
            >
              MY TRIPS
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
                  className="btn"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    setUser(null);
                    navigation("/");
                  }}
                >
                  LOG OUT
                </Button>
                {/* <h2></h2> */}
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            {/* <Button className="btn" onClick={() => setOpenDialog(true)}>
              SIGN IN
            </Button> */}

            <SignInDialog login={login}>SIGN IN</SignInDialog>
          </>
        )}
      </div>
    </div>
  );
}
