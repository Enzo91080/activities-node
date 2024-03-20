const { Wood } = require("../models");

exports.listWood = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve the essences of wood.",
    });
  }
};

exports.readByHardness = async (req, res) => {
  try {
    const hardness = req.params.hardness;
    const woods = await Wood.findAll({
      where: {
        hardness: hardness,
      },
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve the essences of wood.",
    });
  }
};

exports.createWood = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed" });
    }
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const woodData = {
      ...JSON.parse(req.body.datas),
      image: pathname,
    };
    const wood = await Wood.create(woodData);
    res.status(201).json(wood);

    // Rest of your code...
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new essence of wood.",
    });
  }
};
