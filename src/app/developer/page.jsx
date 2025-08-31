// app/developer/page.tsx
import { cookies } from "next/headers";
import DeveloperClient from "@/components/DeveloperClient";
import jwt from "jsonwebtoken"; // or jose if you prefer

export default async function Developer() {
  const cookieStore = await cookies();

  const token = cookieStore?.get("authToken")?.value;

  let decodedUser = null;
  if (token) {
    try {
      decodedUser = jwt.verify(token, process.env.JWT_KEY); // verify on server
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  return <DeveloperClient user={decodedUser} />;
}
