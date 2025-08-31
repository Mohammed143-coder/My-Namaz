// app/developer/DeveloperClient.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "@/components/CommonHeader";
import { login } from "@/lib/userSlice/authSlice";


export default function DeveloperClient({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    }
  }, [user, dispatch]);
  
  

  return (
    <div className="bg-white p-2 h-screen text-black">
       <CommonHeader>Developer Page</CommonHeader>
      {user ? <p className="font-semibold text-center my-2">Welcome {user.id||user.userName}</p> : <p>No valid token</p>}
    </div>
  );
}
