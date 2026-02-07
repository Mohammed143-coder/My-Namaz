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

      // Authorization check: only specific emails can access developer panel
      const developerEmails = (process.env.DEVELOPER_EMAILS || "")
        .split(",")
        .map((e) => e.trim());

      if (!developerEmails.includes(decodedUser?.userEmail)) {
        // Not a developer, redirect to admin
        return Response.redirect(new URL("/admin", "http://localhost:3000"));
      }
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  return <DeveloperDashboard user={decodedUser} />;
};

export default Developer;
