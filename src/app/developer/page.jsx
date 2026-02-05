import DeveloperDashboard from "@/components/DeveloperDashboard";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Developer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("authToken")?.value;

  let decodedUser = null;
  if (token) {
    try {
      decodedUser = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  return <DeveloperDashboard user={decodedUser} />;
};

export default Developer;
