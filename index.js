var express = require("express");
var app = express();
const path = require("path");
const router = express.Router();
var cors = require("cors");
app.use(cors());

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});
router.get("/.json", function(req, res) {
  res.sendFile(path.join(__dirname + "/sprite.json"));
});

/*
Use default or custom
"sprite": "http://localhost:3001/styles/osm-bright/sprite",
*/
router.get("/styles/osm-bright/sprite.json", function(req, res) {
  res.sendFile(path.join(__dirname + "/sprite.json"));
});

router.get("/styles/osm-bright/sprite.png", function(req, res) {
  res.sendFile(path.join(__dirname + "/sprite.png"));
});

router.get("/.png", function(req, res) {
  res.sendFile(path.join(__dirname + "/sprite.png"));
});
router.get("/style.json", function(req, res) {
  res.sendFile(path.join(__dirname + "/style.json"));
});

router.get("/assets/icons/:name", function(req, res) {
  let name = req.params.name;
  res.sendFile(path.join(__dirname, "assets", "icons", name));
});

router.get("/iconByteCode", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  iconBytes(res);
});
router.get("/public/:fileName", function(req, res) {
  var pth = path.join(__dirname, "public", req.params.fileName);
  res.sendFile(pth);
  console;
});

const PANEL_PATH =
  process.env.PANEL_PATH || "C:\\Node\\sprite-generator\\input\\panel.png";
const PORT = process.env.port;

const Jimp = require("jimp");

function iconBytes(response) {
  Jimp.read(PANEL_PATH, function(err, image) {
    //image.resize(49,50)
    var start = new Date().getTime();
    var width = image.bitmap.width;
    var height = image.bitmap.height;
    var bytesPerPixel = 4;
    var data = new Uint8Array(width * height * bytesPerPixel);

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        var offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = pixel.r; // red
        data[offset + 1] = pixel.g; // green
        data[offset + 2] = pixel.b; // blue
        data[offset + 3] = pixel.a; // alpha
      }
    }
    console.log(new Date().getTime() - start);

    var json = { width: width, height: height, bytes: Object.values(data) };
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(json));
  });
}

app.use("/", router);
app.listen(PORT || 3001);
console.log("Running at Port " + PORT);
