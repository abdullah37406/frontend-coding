var intformat = require("biguint-format");
var fs = require("fs");
var FlakeId = require("flake-idgen");
var flakeIdGen = new FlakeId();
const url = "http://localhost:8000/";
exports.fileUpload = (file, name, path) => {
    const base64data = file.replace(/^data:.*,/, "");
    const fileName =
        intformat(flakeIdGen.next(), "dec").toString() +
        name.replace(/\s+/g, " ").trim();
    path = path+"/" + fileName;

    try {
        fs.writeFileSync("uploads/"+path, base64data, "base64"); //'a+' is append mode
        return url + path;
    } catch (err) {
        console.log(err);
        return "Error";
    }
}

exports.fileDelete = (name,path) => {
    try {
        const replace=url+path+"/";
        name=name.replace(replace,"");
        fs.unlinkSync("uploads/"+path+"/" + name); //'a+' is append mode
        return name;
    } catch (err) {
        return err;
    }
}