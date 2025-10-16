const express = require("express");
const fetch = require("node-fetch");
const Parser = require("rss-parser");
const cors = require("cors");
const path = require("path");

const TARGET_FEED = "http://studije.med.bg.ac.rs/?feed=rss2";
const PORT = process.env.PORT || 3000;

const app = express();
const rss = new Parser({ timeout: 10000 });

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const stripHTML = s => s ? String(s).replace(/<[^>]*>/g, "") : "";

// Koristi samo RSS feed
async function viaRSS() {
  try {
    const feed = await rss.parseURL(TARGET_FEED);
    return feed.items.slice(0, 20).map(item => ({
      title: stripHTML(item.title),
      link: item.link,
      date: item.pubDate
    }));
  } catch (err) {
    console.error("RSS error:", err.message);
    return [];
  }
}

// API endpoint za frontend
app.get("/api/posts", async (req, res) => {
  const posts = await viaRSS();
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
