"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlayerRooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      ownerId: {
        type: Sequelize.STRING,
      },
      challengerId: {
        type: Sequelize.STRING,
      },
      // uniqueName: {
      //   type: Sequelize.STRING,
      // },
      roomStatus: {
        type: Sequelize.STRING,
      },
      // ownerTurn: {
      //   type: Sequelize.BOOLEAN,
      // },
      // challengerTurn: {
      //   type: Sequelize.BOOLEAN,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlayerRooms");
  },
};
