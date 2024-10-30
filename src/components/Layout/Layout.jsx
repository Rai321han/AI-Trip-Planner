import { Outlet } from "react-router-dom";
import Header from "../custom/Header";
import Footer from "@/view-trip/components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
