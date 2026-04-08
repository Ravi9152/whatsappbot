import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const TOKEN = "YOUR_ACCESS_TOKEN";
const PHONE_ID = "YOUR_PHONE_NUMBER_ID";

// Verify webhook
app.get("/webhook", (req, res) => {
  const verify_token = "12345";

  if (req.query["hub.verify_token"] === verify_token) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("Error");
  }
});

// Auto reply
app.post("/webhook", async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
  const from = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

  if (msg) {
    const reply = "Hello 👋 Auto reply working!";

    await axios.post(
      https://graph.facebook.com/v19.0/${PHONE_ID}/messages,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply },
      },
      {
        headers: {
          Authorization: Bearer ${TOKEN},
        },
      }
    );
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
