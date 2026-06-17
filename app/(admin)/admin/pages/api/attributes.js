// pages/api/attributes.js
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // gọi sang Laravel API
      const laravelRes = await fetch("http://localhost:8000/api/attributes");
      const data = await laravelRes.json();

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching attributes:", error);
      return res.status(500).json({ error: "Failed to fetch attributes" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
