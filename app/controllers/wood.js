const { Wood } = require("../models");
const fs = require("fs");
const { generateWoodLinks, globalLinks } = require("../services/generateLink");

exports.readAll = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    const woodsLinks = woods.map((wood) => {
      return {
        ...wood.toJSON(),
        links: generateWoodLinks(wood),
      };
    });

    res.status(200).json({ woods: woodsLinks, globalLinks: globalLinks() });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while reading woods.",
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
    const woodsLinks = woods.map((wood) => {
      return {
        ...wood.toJSON(),
        links: generateWoodLinks(wood),
      };
    });

    res.status(200).json({ woods: woodsLinks, links: globalLinks() });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `Some error occurred while reading woods with hardness ${hardness}.`,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    let wood = await Wood.create({
      ...JSON.parse(req.body.datas),
      image: pathname,
    });
    wood = {
      ...wood.toJSON(),
      links: generateWoodLinks(wood),
    };
  

    res.status(201).json({ 
      wood: wood,
      globalLinks: globalLinks()
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating new wood.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id);
    if (!wood) {
      return res.status(404).json({
        message: `Wood with id ${req.params.id} not found.`,
      });
    }
    let newWood = {
      ...JSON.parse(req.body.datas),
    };

    if (req.file) {
      const pathname = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      newWood = {
        ...newWood,
        image: pathname,
      };
      if (wood.image) {
        const filename = wood.image.split("/uploads/")[1];
        fs.unlink(`uploads/${filename}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    }

    await wood.update(newWood);

    const woodLinks = {
      ...wood.toJSON(),
      links: generateWoodLinks(wood),
    };

    res.status(200).json({ wood: woodLinks });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while updating wood.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    // 1. Récuperer l'essence de bois
    const wood = await Wood.findByPk(req.params.id);

    // 2. Vérifier si elle existe
    if (!wood) {
      return res.status(404).json({
        error: "Wood not found",
      });
    }

    // 3. Dans le cas où on a une image, la supprimer
    if (wood.image) {
      const filename = wood.image.split("/uploads/")[1];
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    await wood.destroy();

    res.status(200).json({
      message: `Wood with id ${req.params.id} has been deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while deleting wood.",
    });
  }
};
