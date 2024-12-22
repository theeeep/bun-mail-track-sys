import { Hono } from "hono";
import { cors } from "hono/cors";
import { dbConnect } from "./config/db.config";

import getMailStatusRoute from "./api/get-mail-status";
import sendMailRoute from "./api/send-mail";
import trackMailRoute from "./api/track-mail";

const app = new Hono();

app.use(cors());

app.route("/track", trackMailRoute);
app.route("/send", sendMailRoute);
app.route("/status", getMailStatusRoute);

dbConnect();

export default app;
