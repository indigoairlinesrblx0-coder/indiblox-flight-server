const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let flights = [];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

async function fetchEvents() {
  try {
    const guild = client.guilds.cache.get("YOUR_SERVER_ID");
    const events = await guild.scheduledEvents.fetch();

    flights = events.map(event => ({
      name: event.name,
      time: event.scheduledStartTimestamp
    }));
  } catch (err) {
    console.log(err);
  }
}

setInterval(fetchEvents, 30000);

app.get("/flights", (req, res) => {
  res.json(flights);
});

app.listen(3000, () => {
  console.log("Server running");
});

client.login("YOUR_BOT_TOKEN");
