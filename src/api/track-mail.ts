import { promises as fs } from "node:fs";
import { Hono } from "hono";
import { getConnInfo } from "hono/bun";
import Track from "../model/track.model";

const app = new Hono();

// Image Buffer

let imageBuffer: Buffer;
(async () => {
	try {
		imageBuffer = await fs.readFile(`${__dirname}/assets/image.png`);
	} catch (error) {
		console.log("Error reading image file:", error);
	}
})();

app.get("/track-mail/:id", async (c) => {
	const id = c.req.param("id");
	const userIP =
		c.req.raw.headers.get("true-client-ip") ||
		c.req.raw.headers.get("cf-connecting-ip") ||
		getConnInfo(c).remote.address ||
		"0.0.0.0";

	if (!userIP) {
		return c.json({ message: "User IP not found" }, 400);
	}

	if (!id) {
		return c.json({ message: "Tracking ID not found" }, 400);
	}

	try {
		const track = await Track.findOne({ trackingId: id });

		if (!track) return c.json({ message: "Tracking ID not found" }, 404);

		// check if user aready opened the email or not
		if (!track.userIPs.includes(userIP)) {
			track.userIPs.push(userIP);
			track.opens += 1;
			await track.save();
		}

		return new Response(imageBuffer, {
			headers: {
				"Content-Type": "image/png",
				"content-length": imageBuffer.length.toString(),
			},
		});
	} catch (error) {
		console.error(error);
		return c.json({ message: "Internal Server Error" }, 500);
	}
});

export default app;
