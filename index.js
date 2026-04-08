import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mytoken123";

// ✅ Webhook verification endpoint
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Webhook endpoint for incoming messages
app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from;

      // Auto reply message
      await axios.post(
        `https://graph.facebook.com/v19.0/${process.env.PHONE_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Auto reply: Hello 👋" }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.sendStatus(500);
  }
});

// ✅ Server start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
