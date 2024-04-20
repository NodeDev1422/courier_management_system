const statusMaster = require("../app/models/master/v1/Status");
const statusDataJson = require("./data/statusMasterData.json");

async function statusDataInsertion(truncate = false) {
  if (truncate) {
    await statusMaster.deleteMany();
    console.log("All status records deleted successfully");
    await statusMaster.insertMany(statusDataJson);
    console.log("status data inserted successfully");
  } else {
    let statusCount = await statusMaster.countDocuments({});
    if (!statusCount) {
      await statusMaster.insertMany(statusDataJson);
      console.log("status data inserted successfully");
    }
  }
}

async function dataInsertion(truncate) {
  await statusDataInsertion(truncate);
}

module.exports = { dataInsertion };
