const dbService = require("../services/db.service");

const Status = require("../models/enum.status.model");

const statusTypes = require("./data/01_enum.status.data");

module.exports = {
  up: async () => {
    await dbService.createMany(Status, statusTypes, {
      ignoreDuplicates: true,
    });
  },
  down: async () => {
    const idsToDelete = statusTypes.map((e) => e.id);
    await dbService.destroy(Status, { id: idsToDelete });
  },
};
