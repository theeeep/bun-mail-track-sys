import { Hono } from "hono";
import Track from "../model/track.model";

const app = new Hono();

app.get("/get-mail-status/:id", async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ message: "Tracking ID is required" }, 400);
	}
	const track = await Track.findOne({ trackingId: id });
	if (!track) {
		return c.json({ message: "Track not found" }, 404);
	}
	return c.json({ message: "Track found", track });
});

export default app;
