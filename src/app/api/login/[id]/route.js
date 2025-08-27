const { connectDb } = require("@/lib/db");

connectDb();

export const POST = async (req,{params}) => {
const {adminId}=params;

};
