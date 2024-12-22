import { createTransport } from "nodemailer";

const transport = createTransport({
	host: Bun.env.MAIL_HOST,
	auth: {
		user: Bun.env.MAIL_USER,
		pass: Bun.env.MAIL_PASSWORD,
	},
});

export const sendMail = async (emails: string[], trackingId: string) => {
	const trackURL = `${Bun.env.BASE_URL}/track/track-mail/${trackingId}`;
	const mailOptions = {
		from: Bun.env.MAIL_USER,
		to: emails,
		subject: "Emails sent successfully",
		html: `
		<h1>Tracking ID: ${trackingId}</h1>
		<img
			src="${trackURL}"
			alt="Tracking URL"
			style="display: none;"
		/>
		`,
	};

	// Send Mail
	try {
		await transport.sendMail(mailOptions);
	} catch (error) {
		console.log("Error sending email", error);
	}
};
