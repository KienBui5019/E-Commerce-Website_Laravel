export const config = {
  api: {
    bodyParser: false, // cho phép upload file
  },
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Dùng formidable để parse form-data (có file)
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ message: err.message });

      try {
        const formData = new FormData();
        for (const key in fields) {
          formData.append(key, fields[key]);
        }

        if (files.thumbnail) {
          const file = fs.createReadStream(files.thumbnail.filepath);
          formData.append("thumbnail", file, files.thumbnail.originalFilename);
        }

        const apiRes = await fetch("http://localhost:8000/api/products", {
          method: "POST",
          body: formData,
        });

        const text = await apiRes.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          return res
            .status(500)
            .json({ message: `Laravel trả về không phải JSON:\n${text}` });
        }

        res.status(apiRes.status).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
