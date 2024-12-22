import { Hono } from "hono";
import { v4 as uuid } from "uuid";

const app = new Hono();

app.post("/send-mail", async (c) => {
	const { emails, password } = await c.req.json();

	// Validate emails and password
	if (!emails || !password) {
		return c.json({ message: "Emails and password are required" }, 400);
	}

	// Password validation
	if (password !== Bun.env.MAIL_PASSWORD) {
		return c.json({ message: "Invalid password" }, 401);
	}

	// tracking id, data store in db

	return c.json({ message: "Emails sent successfully" }, 200);
});

export default app;
