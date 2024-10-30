/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const userContext = createContext(null);

export default function Usercontext({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
