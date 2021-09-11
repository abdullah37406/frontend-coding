
var bcrypt = require("bcryptjs");
const db = require("../models/index.js");
const ItemInfo = require("../utils/itemInfo.util.js");
var socket = require("../app.js");
const itemInfoObj = new ItemInfo();

exports.createContact = async (req, res) => {
    try {
        const contact = await itemInfoObj.createContact(req.body);
        const contactDetail = await itemInfoObj.createContactDetail(req.body.contactDetail, contact.id);
        res.status(200).send({
            message: "Contact Added Successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getAllContacts = async (req, res) => {
    try {
        console.log("pppppppp")
        const getContacts = await itemInfoObj.getAllContacts();
        res.status(200).send({
            getContacts: getContacts,
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.setIdforDetail = async (req, res) => {
    try {
        socket.notification("notification", req.body.id);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
exports.getDetail = async (req, res) => {
    try {
        const getDetail = await itemInfoObj.getDetail(req.body);
            res.status(200).send({
                getDetail: getDetail,
            });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};