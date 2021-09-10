
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

};