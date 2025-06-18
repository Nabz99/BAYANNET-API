const WilayaModel = require("../models/WilayaModel");
const CommuneModel = require("../models/CommuneModel");
const RegionModel = require("../models/RegionModel");
const AdminModel = require("../models/AdminModel");





const { wilayas, regions, communes, admin } = require("../../mock/buncha");


class seeder {

  // async wilaya() {
  //   const wilayaCount = await WilayaModel.countDocuments();

  //   if (wilayaCount === 0) {
  //     await WilayaModel.insertMany(wilayas);
  //     console.log("Wilayas inserted successfully");
  //   } else {
  //     console.log("Wilayas already exist in the database");
  //   }
  // }

  // async commune() {
  //   const communeCount = await CommuneModel.countDocuments();

  //   if (communeCount === 0) {
  //     await CommuneModel.insertMany(communes);
  //     console.log("Communes inserted successfully");
  //   } else {
  //     console.log("Communes already exist in the database");
  //   }
  // }


  // async region() {
  //   const regionCount = await RegionModel.countDocuments();

  //   if (regionCount === 0) {
  //     await RegionModel.insertMany(regions);
  //     console.log("Regions inserted successfully");
  //   } else {
  //     console.log("Regions already exist in the database");
  //   }
  // }

  async wilaya() {
    const wilaya_exist = await WilayaModel.findOne();
    if (!wilaya_exist) {
      await WilayaModel.create(wilayas)
    }
  }
  async commune() {
    const commune_exist = await CommuneModel.findOne();
    if (!commune_exist) {
      await CommuneModel.create(communes)
    }
  }
  async region() {
    const region_exist = await RegionModel.findOne();
    if (!region_exist) {
      await RegionModel.create(regions)
    }
  }

  async admin() {
    const admin_exist = await AdminModel.findOne();
    if (!admin_exist) {
      await AdminModel.create(admin)
    }
  }
}

module.exports = seeder;
