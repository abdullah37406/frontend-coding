
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
    app.post("/api/contact/add", controller.createContact);
    app.get("/api/allContacts/get", controller.getAllContacts);
    app.post("/api/oneContact/set", controller.setIdforDetail);
    app.post("/api/oneContact/get", controller.getDetail);
};