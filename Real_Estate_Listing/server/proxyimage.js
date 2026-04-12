// ── routes/proxyImage.js  (add this to your Express app) ─────────────────────
// Usage: GET /api/proxy-image?url=https://example.com/photo.jpg
//
// Add to your main server file:
//   const proxyImage = require("./routes/proxyImage");
//   app.use("/api", proxyImage);

const express = require("express");
const router  = express.Router();
const https   = require("https");
const http    = require("http");

router.get("/proxy-image", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "url query param is required" });
  }

  // Basic validation — only allow http/https
  let parsed;
  try {
    parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const lib = parsed.protocol === "https:" ? https : http;

  const proxyReq = lib.get(url, (proxyRes) => {
    // Only forward image content types
    const ct = proxyRes.headers["content-type"] || "";
    if (!ct.startsWith("image/")) {
      return res.status(400).json({ error: "URL does not point to an image" });
    }

    res.set("Content-Type", ct);
    res.set("Cache-Control", "public, max-age=86400"); // cache 1 day
    res.set("Access-Control-Allow-Origin", "*");
    proxyRes.pipe(res);
  });

  proxyReq.on("error", () => {
    res.status(500).json({ error: "Failed to fetch image" });
  });

  proxyReq.setTimeout(8000, () => {
    proxyReq.destroy();
    res.status(504).json({ error: "Image fetch timed out" });
  });
});

module.exports = router;