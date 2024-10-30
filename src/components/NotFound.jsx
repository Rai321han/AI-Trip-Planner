import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2  bg-slate-300 h-[90vh] text-gray-700">
      <h2 className="text-8xl font-extrabold animate-pulse ">404</h2>
      <h2 className="text-2xl ">Page not found</h2>
      <h2
        onClick={() => navigate("/")}
        className="text-lg italic cursor-pointer underline underline-offset-4 hover:underline-offset-8 transition-all font-bold"
      >
        Return to Home
      </h2>
    </div>
  );
}
