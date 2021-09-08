// const verifySignUp = require("./verifySignUp");
// const authJwt = require("./verifyJwtToken");

module.exports = function(app) {
    const controller = require("../controller/controller.js");

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");

        next();
    });

    // app.post("/auth/signin", controller.signin);
    // app.post(
    //     "/auth/signup", [authJwt.verifyToken, verifySignUp.checkDuplicateEmail],
    //     controller.signup
    // );

    app.post("/api/category/add", controller.createCategory);
    app.post("/api/parentCategories/get", controller.getParentCategories);
    app.post("/api/subcategory/add", controller.createSubcategory);
    app.post("/api/categoriesSubcategories/get", controller.getcategorySubcategories);
    app.post("/api/name/update", controller.updateName);
    app.post("/api/name/delete", controller.deleteItem);
    app.get("/api/allItems/get", controller.getAllItems);
    app.post("/api/getOneItem", controller.detailForOne);
    app.post("/api/item/update", controller.updateItem);
    app.get("/api/everyThing/get", controller.getEveryThing);

    // app.get("/company/getAll", controller.getAllCompanies);
    // app.post("/company/get", controller.getCompanyInfo);

    // app.post("/items/add", controller.addItem);
    // app.get("/items/getAll", controller.getAllItems);
    // app.post("/items/getCompanyItems", controller.getCompanyItems);
    // app.post("/items/getItemInfo", controller.getItemInfo);

    // app.post("/dealer/add", controller.addDealer);
    // app.get("/dealer/getAll", controller.getAllDealer);
    // app.get("/dealer/getAllDealerAndItems", controller.getAllDealerAndItems);
    // app.post("/dealer/getDealerAndItems", controller.getDealerAndItems);

    // app.post("/itemDealer/add", controller.addItemDealer);
    // app.get("/itemDealer/getAll", controller.getAllItemDealer);

    // app.get("/order/getAll", controller.getAllOrders);
    // app.post("/order/getOne", controller.getOneOrder);
    // app.post("/order/add", controller.addOrder);
};