import NamazTimingsForm from "@/components/NamazTimingsForm";
import AdminDashboard from "@/components/AdminDashboard";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Admin = async () => {
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

  return <AdminDashboard user={decodedUser} />;
};

export default Admin;
