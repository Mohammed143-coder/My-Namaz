
import NamazTimingsForm from "@/components/NamazTimingsForm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const Admin = async() => {
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
   
  return (
    <div>
    
      <NamazTimingsForm User={decodedUser}/>
    </div>
  );
};

export default Admin;
