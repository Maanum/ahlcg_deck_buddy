import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

// Initialize OpenAI with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

let conversations = {};

// Route to handle chat requests
app.post("/chat", async (req, res) => {
  try {
    console.log(req.body);
    const sessionId = req.body.sessionId;

    if (!conversations[sessionId]) {
      const message = {
        role: "user",
        content: `
        [{APP}] You are an AI assistant that will be used by an application ("App") to provide a user ("Player") with assistance on crafting a deck for Arkham Horror LCG.  When providing prompts to you, I will indicate whether the prompt is from the App or from the Player.  I will indicate this by preceding the message with the title of the actor in capital letters wrapped in curly and straight braces as follows: [{APP}] and [{PLAYER}].  YOU SHOULD NEVER ADD REFERENCES [{PLAYER}] OR [{APP}] IN YOUR RESPONSES.  Your interaction should be as follows:

        [{APP}] prompts: Do not provide a response.  This is just a computer application.  The App will provide the Arkham Horror LCG deck in a JSON object format as follows: 

        { "investigator": "INVESTIGATOR_NAME", "cards": [ { "name": "CARD_NAME", "type": "CARD_TYPE", "quantity": COUNT_OF_CARD_IN_DECK }.

        The initial state of the deck will be: ${req.body.deck}.

        [{PLAYER}] prompts: When responding to the Player prompts, act as an expert on Arkham Horror LCG that is seeking to guide the Player on crafting an effective deck that provides an interesting and fun playthrough.  Avoid providing basic Arkham Horror LCG deckbuilding rules unless specifically asked.  Assume the Player knows them.  Avoid providing full decklists unless asked.  When discussing changes or suggestions to the deck, simply explain the suggestions in natural language.  If specifically asked for full decklists, do not use the JSON format; provide the deck outlines in a natural language or bulleted list format that is readable by a human.
      `,
      };
      conversations[sessionId] = []; // initialize as an array
      conversations[sessionId].push(message);
    }

    const message = {
      role: "user",
      content: `
      [{APP}] The deck is: ${JSON.stringify(req.body.deck)}
      [{PLAYER}] ${req.body.prompt}
    `,
    };
    conversations[sessionId].push(message);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversations[sessionId],
    });

    const aiReply = response.data["choices"][0]["message"]["content"];
    conversations[sessionId].push({ role: "assistant", content: aiReply });
    console.log(conversations[sessionId]);
    res.json(aiReply);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Start the server
const port = process.env.BACKEND_PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
