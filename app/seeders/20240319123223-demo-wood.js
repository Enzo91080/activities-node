"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Woods",
      [
        {
          name: "Épicéa",
          type: "softwood",
          hardness: "tender",
          image:"https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pin",
          type: "softwood",
          hardness: "medium-hard",
          image:"https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Padouk",
          type: "exotic wood",
          hardness: "hard",
          image: "https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Érable",
          type: "noble and hardwoods",
          hardness: "medium-hard",
          image:"https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hêtre",
          type: "noble and hardwoods",
          hardness: "medium-hard",
          image: "https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Itauba",
          type: "exotic wood",
          hardness: "hard",
          image: "https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Douglas",
          type: "softwood",
          hardness: "tender",
          image: "https://www.snhf.org/wp-content/uploads/2020/06/Epic%C3%A9a-commun.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Woods", null, {});
  },
};
