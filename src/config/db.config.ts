import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		await mongoose.connect(Bun.env.MONGODB_URI as string);
		console.log("DB connected successfully");
	} catch (error) {
		console.log("DB connection error", error);
		process.exit(1);
	}
};
