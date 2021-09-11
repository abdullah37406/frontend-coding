// const config = require("../config/config.js");
// var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models/index.js");
const ItemInfo = require("../utils/itemInfo.util.js");
const itemInfoObj = new ItemInfo();

exports.createContact = async (req, res) => {
    try {
        console.log("---------",req.body);
        console.log("+++++++++",req.body.contactDetail);
        const contact = await itemInfoObj.createContact(req.body);
        const contactDetail = await itemInfoObj.createContactDetail(req.body.contactDetail,contact.id);
        res.status(200).send({
            message: "Contact Added Successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getParentCategories = async (req, res) => {
    try {
        if (req.body.itemOrTable == "items") {
            const parentCategories = await itemInfoObj.parentItemCategories();
            res.status(200).send({
                parentCategories: parentCategories,
            });
        }
        else if (req.body.itemOrTable == "tables") {
            const parentCategories = await itemInfoObj.parentTableCategories();
            res.status(200).send({
                parentCategories: parentCategories,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.createSubcategory = async (req, res) => {
    try {
        if (req.body.itemOrTable == "items") {
            const category = await itemInfoObj.createItemSubcategory(req.body);
        }
        else if (req.body.itemOrTable == "tables") {
            const category = await itemInfoObj.createTableSubcategory(req.body);
        }
        res.status(200).send({
            message: "Subcategory Added Successfully!",
            // category: category,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getcategorySubcategories = async (req, res) => {
    try {
        if (req.body.itemOrTable == "items") {
            const categorySubcategories = await itemInfoObj.categorySubcategoriesItems(req.body);
            res.status(200).send({
                categorySubcategories: categorySubcategories,
            });
        }
        else if (req.body.itemOrTable == "tables") {
            const categorySubcategories = await itemInfoObj.categorySubcategoriesTables(req.body);
            res.status(200).send({
                categorySubcategories: categorySubcategories,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.updateName = async (req, res) => {
    try {
        console.log("llllllll", req.body)
        if (req.body.subOrMain == "itemSub") {
            const updation = await itemInfoObj.itemNameUpdation(req.body);
        }
        else if (req.body.subOrMain == "itemMain") {
            const updation = await itemInfoObj.itemCategoryNameUpdation(req.body);
        }
        else if (req.body.subOrMain == "tableMain") {
            const updation = await itemInfoObj.tableCategoryNameUpdation(req.body);
        }
        else if (req.body.subOrMain == "tableSub") {
            const updation = await itemInfoObj.tableNameUpdation(req.body);
        }
        res.status(200).send({
            message: "Name Updated Successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.deleteItem = async (req, res) => {
    try {
        if (req.body.subOrMain == "itemMain") {
            const updation = await itemInfoObj.itemCategoryDelete(req.body);
        }
        else if (req.body.subOrMain == "itemSub") {
            const updation = await itemInfoObj.itemSubcategoryDelete(req.body);
        }
        else if (req.body.subOrMain == "tableSub") {
            const updation = await itemInfoObj.tableSubcategoryDelete(req.body);
        }
        else if (req.body.subOrMain == "tableMain") {
            const updation = await itemInfoObj.tableCategoryDelete(req.body);
        }
        res.status(200).send({
            message: "Deleted Successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getAllItems = async (req, res) => {
    try {
        const getItems = await itemInfoObj.getItems();
        res.status(200).send({
            getItems: getItems,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.detailForOne = async (req, res) => {
    try {
        const detailForOne = await itemInfoObj.detailForOne(req.body);
        const subcategoryForOne = await itemInfoObj.subcategoryForOne(detailForOne.subcategoryId);
        res.status(200).send({
            detailForOne: detailForOne,
            subcategoryForOne: subcategoryForOne,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.updateItem = async (req, res) => {
    try {
        const updateItem = await itemInfoObj.updateItem(req.body);
        res.status(200).send({
            message: "Updated Successfully!",
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getEveryThing = async (req, res) => {
    try {
        const getItems = await itemInfoObj.getItems();
        const parentItemCategories = await itemInfoObj.parentItemCategories();
        const parentTableCategories = await itemInfoObj.parentTableCategories();
        const allSubcategoriesItems = await itemInfoObj.allSubcategoriesItems();
        const allsubcategoriesTables = await itemInfoObj.allsubcategoriesTables();
        res.status(200).send({
            getItems: getItems,
            parentItemCategories: parentItemCategories,
            parentTableCategories: parentTableCategories,
            allSubcategoriesItems: allSubcategoriesItems,
            allsubcategoriesTables: allsubcategoriesTables,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
// exports.signup = (req, res) => {
//   db.User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//   })
//     .then(() => {
//       res.send({
//         message: "Registered Successfully!",
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         reason: err.message,
//       });
//     });
// };
// exports.signin = (req, res) => {
//   db.User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           reason: "Incorrect Email or Password",
//         });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       if (!passwordIsValid) {
//         return res.status(404).send({
//           reason: "Incorrect Email or Password",
//         });
//       }

//       var token = jwt.sign(
//         {
//           id: user.id,
//         },
//         config.secret,
//         {
//           expiresIn: 86400,
//         }
//       );
//       res.status(200).send({
//         auth: true,
//         accessToken: token,
//         email: user.email,
//         name: user.name,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         reason: err.message,
//       });
//     });
// };

// exports.addCompanyInfo = async (req, res) => {
//   try {
//     const company = await itemInfoObj.addCompany(req.body);
//     res.status(200).send({
//       message: "Company Added Successfully!",
//       company: company,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
//
// exports.getCompanyInfo = async (req, res) => {
//   try {
//     const company = await itemInfoObj.getCompanyInfo(req.body);
//     res.status(200).send({
//       message: "Company Retrieved Successfully!",
//       parentCategories: company,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.addItem = async (req, res) => {
//   try {
//     const item = await itemInfoObj.addItem(req.body);
//     res.status(200).send({
//       message: "item Added Successfully!",
//       item: item,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await itemInfoObj.getAllItems();
//     res.status(200).send({
//       message: "items Retrieved Successfully!",
//       items: items,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getItemInfo = async (req, res) => {
//   try {
//     const items = await itemInfoObj.getItemInfo(req.body);
//     res.status(200).send({
//       message: "item Retrieved Successfully!",
//       items: items,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getCompanyItems = async (req, res) => {
//   try {
//     const companyItems = await itemInfoObj.getCompanyItems(req.body);
//     res.status(200).send({
//       message: "Company Items Retrieved Successfully!",
//       items: companyItems,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.addDealer = async (req, res) => {
//   try {
//     const dealer = await itemInfoObj.addDealer(req.body);
//     // req.body.itemDealer.forEach((element) => {
//     //   element.dealerId = dealer.id;
//     // });
//     // const itemDealer = await itemInfoObj.addItemDealer(req.body.itemDealer);
//     res.status(200).send({
//       message: "Dealer Added Successfully!",
//       dealer: dealer,
//       // itemDealer: itemDealer
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getAllDealer = async (req, res) => {
//   try {
//     const dealer = await itemInfoObj.getAllDealer();
//     res.status(200).send({
//       message: "Dealers Retrieved Successfully!",
//       dealers: dealer,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getAllDealerAndItems = async (req, res) => {
//   try {
//     const dealer = await itemInfoObj.getAllDealerAndItems();
//     res.status(200).send({
//       message: "Dealer & Items Retrieved Successfully!",
//       dealer: dealer,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getDealerAndItems = async (req, res) => {
//   try {
//     const dealer = await itemInfoObj.getDealerAndItems(req.body);
//     res.status(200).send({
//       message: "Dealer & Items Retrieved Successfully!",
//       dealer: dealer,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

// exports.addItemDealer = async (req, res) => {
//   try {
//     const itemDealer = await itemInfoObj.addItemDealer(req.body);
//     res.status(200).send({
//       message: "Dealer Items Added Successfully!",
//       itemDealer: itemDealer,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getAllItemDealer = async (req, res) => {
//   try {
//     const itemDealer = await itemInfoObj.getAllItemDealer();
//     res.status(200).send({
//       message: "Dealer Items Retrieved Successfully!",
//       itemDealer: itemDealer,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await itemInfoObj.getAllOrders();
//     res.status(200).send({
//       message: "Orders Retrieved Successfully!",
//       orders: orders,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.getOneOrder = async (req, res) => {
//   try {
//     const order = await itemInfoObj.getOneOrder(req.body);
//     res.status(200).send({
//       message: "Order Information Retrieved Successfully!",
//       order: order,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// exports.addOrder = async (req, res) => {
//   try {
//     const orderAdded = await itemInfoObj.addOrder(req.body);
//     req.body.orderDetails.forEach((element) => {
//       element.orderId = orderAdded.id;
//       element.id = null;
//     });
//     const orderDetails = await itemInfoObj.addOrderDetails(
//       req.body.orderDetails
//     );
//     res.status(200).send({
//       message: "Order Placed Successfully!",
//       orderAdded: orderAdded,
//       orderDetails: orderDetails,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
