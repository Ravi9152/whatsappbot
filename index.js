import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// webhook verify
app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

// webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    if (body.entry) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from;

      // auto reply message
      await axios.post(
        https://graph.facebook.com/v19.0/${process.env.PHONE_ID}/messages,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Auto reply: Hello 👋" }
        },
        {
          headers: {
            Authorization: Bearer ${process.env.TOKEN},
            "Content-Type": "application/json"
          }
        }
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// server start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
