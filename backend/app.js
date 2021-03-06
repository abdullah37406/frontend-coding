var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/uploads/'));
app.use(express.json({limit: '50mb'}))
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}))
require('./router/router.js')(app);

// const db = require('./config/db.config.js');


// db.sequelize.sync({ alter: true });

var server = app.listen(8000, function () {

  var host = server.address().address
  var port  = server.address().port

  console.log("App listening on http://%s:%s", host, port)
})
const socket = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});
socket.on("connection", (socket) => {
  console.log("Socket: client connected");
});
module.exports.notification = function (type, data) {
  socket.emit(type, data);
};