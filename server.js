const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ACCESS_TOKEN = "EAAQxQA3jt00BQwGVL81gz3kgS4T0jIPPZA7IijdrZA4CiHraPlLcWxpZB0ltRKNIRkPBOhvSYiTF2eTeK35IsJv2ZCFJCf5jmhZAmo2cQgOCuWtg3qSKNU6QrANSIGSiNFpn5HhOP43YZCHeHnkHQctZANKeKFv1ycapYRwSmhNzc3yvvuqyoK6pv7KrGExVkZBRGgZDZD";
const PHONE_NUMBER_ID = "1010712728795148";

app.post("/send", async (req, res) => {

    const { to, message } = req.body;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ status: "success", data: response.data });

    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

app.get("/", (req, res) => {
    res.send("WhatsApp Bridge Running");
});

app.listen(process.env.PORT || 3000, () =>
    console.log("Server running")
);
