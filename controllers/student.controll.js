import student from "../models/student.model.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads/");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
export const uploadFile = upload.single("image");

export const savedata = async (req, res) => {
  try {
    const { name, email, address, city, state, contact } = req.body;
    const imagePath = req.file ? `${req.file.filename}` : null;

    await student.create({
      name,
      email,
      address,
      city,
      state,
      contact,
      imagePath,
    });

    return res
      .status(201)
      .json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getData = async (req, res) => {
  try {
    const allstudent = await student.findAll({
      attributes: ["name", "address", "city", "imagePath"],
    });

    const dataWithFullPath = allstudent.map((s) => ({
      ...s.dataValues,
      imagePath: s.imagePath ? `${path.basename(s.imagePath)}` : null,
    }));

    return res.status(201).json({
      success: true,
      data: dataWithFullPath,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
