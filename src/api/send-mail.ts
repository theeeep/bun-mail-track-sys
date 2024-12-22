import { Hono } from "hono";
import { v4 as uuid } from "uuid";
import Track from "../model/track.model";
import { sendMail } from "../utils/sendMail";

const app = new Hono();

app.post("/send-mail", async (c) => {
	const { emails, password } = await c.req.json();

	// Validate emails and password
	if (!emails || !password) {
		return c.json({ message: "Emails and password are required" }, 400);
	}

	// Password validation
	if (password !== Bun.env.MAIL_PASSWORD) {
		return c.json({ message: "Invalid email password" }, 401);
	}

	// tracking id, data store in db
	const trackingId = uuid();

	try {
		await Track.create({ trackingId });
		await sendMail(emails, trackingId);
		return c.json({
			message: "Emails sent successfully",
			TrackingId: trackingId,
		});
	} catch (error) {
		return c.json({ message: "Error creating track" }, 500);
	}
});

export default app;
