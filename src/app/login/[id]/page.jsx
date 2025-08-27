import CommonHeader from "@/components/CommonHeader";
import NamazTimingsForm from "@/components/NamazTimingsForm";

const AdminCreation = async ({ params }) => {
  const { id: token } = await params; // ✅ await params

  console.log(token);

  return (
    <div className="bg-white text-black h-screen">
      {token === "admin" ? (
        <NamazTimingsForm />
      ) : token === "dev" ? (
        <CommonHeader>Welcome to Developer Page</CommonHeader>
      ) : (
        <CommonHeader>User Not Found</CommonHeader>
      )}
    </div>
  );
};

export default AdminCreation;
