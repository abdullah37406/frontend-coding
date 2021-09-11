const db = require("../models/index.js");
var dateFormat = require("dateformat");
const imageUpload = require("../imageuploading.js")

class ItemInfo {
  constructor() { }

  async createContact(info) {
    var fileName = null;
    if (info.imgPath != null) {
      fileName = imageUpload.fileUpload(info.file, info.imgPath, "contact-images");
    } else {
      fileName = "/assets/user.jpg";
    }
    return await db.Contact.create({
      firstName: info.firstName,
      lastName: info.lastName,
      designation: info.designation,
      imgPath: fileName,
      isDeleted: false,
    });
  }
  async createContactDetail(info, id) {
    return await db.ContactDetail.create({
      contactId: id,
      primaryPhone: info.priPhone,
      primaryEmail: info.priEmail,
      secondaryPhone: info.secPhone,
      SecondaryEmail: info.secEmail,
      bio: info.bio,
      facebook: info.facebook,
      twitter: info.twitter,
      linkwdin: info.linkedin,
    });
  }
  async getAllContacts() {
    return await db.Contact.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  async getDetail(info) {
    return await db.Contact.findOne({
      where: {
        id: info.id,
      },
      include: [
        {
          model: db.ContactDetail,
          required: true,
        }
      ]
    });
  }
  async parentItemCategories() {
    return await db.Categories.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  async parentTableCategories() {
    return await db.TableCategory.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  async createItemSubcategory(info) {
    return await db.SubCategories.create({
      categoryId: info.parentCategory,
      name: info.name,
      isDeleted: false,
      userId: "1",
    });
  }
  async createTableSubcategory(info) {
    return await db.Table.create({
      tableCategoryId: info.parentCategory,
      name: info.name,
      isDeleted: false,
      userId: "1",
    });
  }
  async categorySubcategoriesItems(info) {
    return await db.SubCategories.findAll({
      where: {
        isDeleted: false,
        categoryId: info.id,
      },
    });
  }
  async categorySubcategoriesTables(info) {
    return await db.Table.findAll({
      where: {
        isDeleted: false,
        tableCategoryId: info.id,
      },
    });
  }
  async itemNameUpdation(info) {
    return await db.SubCategories.update({
      name: info.updatedName,
    }, {
      where: {
        id: info.id,
        isDeleted: false
      },
    });
  }
  async tableNameUpdation(info) {
    return await db.Table.update({
      name: info.updatedName,
    }, {
      where: {
        id: info.id,
        isDeleted: false
      },
    });
  }
  async itemCategoryNameUpdation(info) {
    return await db.Categories.update({
      name: info.updatedName,
    }, {
      where: {
        id: info.id,
        isDeleted: false
      },
    });
  }
  async tableCategoryNameUpdation(info) {
    return await db.TableCategory.update({
      name: info.updatedName,
    }, {
      where: {
        id: info.id,
        isDeleted: false
      },
    });
  }
  async itemCategoryDelete(info) {
    return await db.Categories.update({
      isDeleted: true,
    }, {
      where: {
        id: info.id,
      },
    });
  }
  async itemSubcategoryDelete(info) {
    return await db.SubCategories.update({
      isDeleted: true,
    }, {
      where: {
        id: info.id,
      },
    });
  }
  async tableCategoryDelete(info) {
    return await db.TableCategory.update({
      isDeleted: true,
    }, {
      where: {
        id: info.id,
      },
    });
  }
  async tableSubcategoryDelete(info) {
    return await db.Table.update({
      isDeleted: true,
    }, {
      where: {
        id: info.id,
      },
    });
  }
  async createItem(info) {
    var fileName = null;
    fileName = imageUpload.fileUpload(info.itemInfo.file1, info.itemInfo.imagePath, "item-images");
    return await db.Items.create({
      subcategoryId: info.name,
      name: info.itemInfo.name,
      description: info.itemInfo.description,
      price: info.itemInfo.price,
      imagePath: fileName,
      isDeleted: false,
      userId: "1",
    });
  }
  async getItems() {
    return await db.Items.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  async detailForOne(info) {
    return await db.Items.findOne({
      where: {
        id: info.id,
        isDeleted: false,
      },
    });
  }
  async subcategoryForOne(info) {
    return await db.SubCategories.findOne({
      where: {
        id: info,
        isDeleted: false,
      },
    });
  }
  async updateItem(info) {
    if (info.itemInfo.newImage == 1) {
      var fileName = null;
      imageUpload.fileDelete(info.itemInfo.oldPath, "item-images");
      fileName = imageUpload.fileUpload(info.itemInfo.file1, info.itemInfo.imagePath, "item-images");
    }
    return await db.Items.update({
      subcategoryId: info.id,
      name: info.itemInfo.name,
      description: info.itemInfo.description,
      price: info.itemInfo.price,
      imagePath: fileName
    }, {
      where: {
        id: info.itemInfo.id,
      }
    });
  }
  async allSubcategoriesItems() {
    return await db.SubCategories.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  async allsubcategoriesTables() {
    return await db.Table.findAll({
      where: {
        isDeleted: false,
      },
    });
  }
  // async getCompanyInfo(info) {
  //   return await db.Company.findOne({
  //     where: {
  //       isDeleted: false,
  //       id: info.id,
  //     },
  //     include: [
  //       {
  //         model: db.Items,
  //         required: false,
  //         include: {
  //           model: db.ItemDealer,
  //           required: false,
  //           include: {
  //             model: db.Dealers,
  //             required: false,
  //           },
  //         },
  //       },
  //     ],
  //   });
  // }

  // async addItem(info) {
  //   return await db.Items.create({
  //     name: info.name,
  //     companyId: info.companyId,
  //     pack: info.pack,
  //     isDeleted: false,
  //     userId: "1",
  //   });
  // }
  // async getAllItems() {
  //   return await db.Items.findAll({
  //     where: {
  //       isDeleted: false,
  //     },
  //     include: [
  //       {
  //         model: db.Company,
  //         required: true,
  //       },
  //     ],
  //   });
  // }

  // async getItemInfo(info) {
  //   return await db.Items.findOne({
  //     where: {
  //       isDeleted: false,
  //       id: info.id,
  //     },
  //     include: [
  //       {
  //         model: db.ItemDealer,
  //         required: false,
  //         include: {
  //           model: db.Dealers,
  //           required: true,
  //         },
  //       },
  //       {
  //         model: db.Company,
  //         required: true,
  //       },
  //     ],
  //   });
  // }
  // async getCompanyItems(info) {
  //   return await db.Items.findAll({
  //     where: {
  //       isDeleted: false,
  //       companyId: info.companyId,
  //     },
  //   });
  // }
  // async addDealer(info) {
  //   return await db.Dealers.create({
  //     name: info.name,
  //     address: info.address,
  //     phoneNo: info.phoneNo,
  //     orderDate: info.orderDate,
  //     isDeleted: false,
  //     userId: "1",
  //   });
  // }
  // async getAllDealer() {
  //   return await db.Dealers.findAll({
  //     where: {
  //       isDeleted: false,
  //     },
  //   });
  // }
  // async getAllDealerAndItems() {
  //   return await db.Dealers.findAll({
  //     where: {
  //       isDeleted: false,
  //     },
  //     include: [
  //       {
  //         model: db.ItemDealer,
  //         required: true,
  //         include: {
  //           model: db.Items,
  //           required: true,
  //           include: {
  //             model: db.Company,
  //             required: true,
  //           },
  //         },
  //       },
  //     ],
  //   });
  // }
  // async getDealerAndItems(info) {
  //   return await db.Dealers.findOne({
  //     where: {
  //       isDeleted: false,
  //       id: info.id,
  //     },
  //     include: [
  //       {
  //         model: db.ItemDealer,
  //         required: false,
  //         include: {
  //           model: db.Items,
  //           required: true,
  //           include: {
  //             model: db.Company,
  //             required: true,
  //           },
  //         },
  //       },
  //     ],
  //   });
  // }
  // async removeAllDealerItems(dealerId) {
  //   await db.ItemDealer.destroy({
  //     where: {
  //       dealerId: dealerId,
  //     },
  //   });
  // }
  // async addItemDealer(info) {
  //   await this.removeAllDealerItems(info.map((a) => a.dealerId)[0]);
  //   return await db.ItemDealer.bulkCreate(info);
  // }
  // async getAllItemDealer() {
  //   return await db.ItemDealer.findAll({
  //     where: {
  //       isDeleted: false,
  //     },
  //     include: [
  //       {
  //         model: db.Dealers,
  //         required: true,
  //       },
  //       {
  //         model: db.Items,
  //         required: true,
  //         include: [
  //           {
  //             model: db.Company,
  //             required: true,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // }
  // async getAllOrders() {
  //   return await db.Order.findAll({
  //     where: {
  //       isDeleted: false,
  //     },
  //     include: [
  //       {
  //         model: db.Dealers,
  //         required: true,
  //       },
  //     ],
  //     order: [["id", "DESC"]],
  //   });
  // }
  // async getOneOrder(info) {
  //   return await db.Order.findOne({
  //     where: {
  //       isDeleted: false,
  //       id: info.id,
  //     },
  //     include: [
  //       {
  //         model: db.Dealers,
  //         required: true,
  //       },

  //       {
  //         model: db.OrderDetails,
  //         required: true,
  //         include: [
  //           {
  //             model: db.Items,
  //             required: true,
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // }
  // async addOrder(info) {
  //   let currentDate = new Date();
  //   return await db.Order.create({
  //     dealerId: info.dealerId,
  //     totalPrice: info.totalPrice,
  //     date: dateFormat(currentDate, "yyyy-mm-dd"),
  //     isDeleted: false,
  //     userId: "1",
  //   });
  // }
  // async addOrderDetails(info) {
  //   return await db.OrderDetails.bulkCreate(info);
  // }
}
module.exports = ItemInfo;
