import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).json({ error: "Failed to parse form data" });
      }

      const file = files.file[0];
      if (!file) {
        return res.status(400).json({ error: "File not found" });
      }

      try {
        const result = await cloudinary.v2.uploader.upload(file.filepath, {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
