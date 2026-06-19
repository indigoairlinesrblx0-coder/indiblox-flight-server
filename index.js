const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// simple test data
let flights = [];

// when bot starts
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// fetch events every 30 seconds
async function fetchEvents() {
  try {
    const guild = client.guilds.cache.get(process.env.1500376783072002048);
    if (!guild) {
      console.log("Server not found");
      return;
    }

    const events = await guild.scheduledEvents.fetch();

    flights = events.map(event => ({
      name: event.name,
      time: event.scheduledStartTimestamp
    }));

    console.log("Flights updated");

  } catch (err) {
    console.log(err);
  }
}

setInterval(fetchEvents, 30000);

// API for Roblox
app.get("/flights", (req, res) => {
  res.json(flights);
});

// start server
app.listen(3000, () => {
  console.log("Server running");
});

// login bot (SAFE way)
client.login(process.env.MTUwNTIzMDg1MTA5OTcyNTk4NA.GTgLJg.vgyE4B1LTw_dV8sLOXrvqhFVAQ8nulPn4TlzLI);
