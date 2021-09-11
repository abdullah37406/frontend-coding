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
      meeting:info.meeting,
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
}
module.exports = ItemInfo;
