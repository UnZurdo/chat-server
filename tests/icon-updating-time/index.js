var express = require('express');
var app = express();
const path = require('path');
const router = express.Router()

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname, "public", '/index.html'));
  
});
router.get('/.json',function(req,res){
  res.sendFile(path.join(__dirname+'/sprite.json'));
  
});
router.get('/@2x.json',function(req,res){
  res.sendFile(path.join(__dirname+'/sprite.json'));
  
});
router.get('/@2x.png',function(req,res){
  res.sendFile(path.join(__dirname+'/sprite.png'));
  
});
router.get('/.png',function(req,res){
  res.sendFile(path.join(__dirname+'/sprite.png'));
  
});
router.get('/style.json',function(req,res){
  res.sendFile(path.join(__dirname+'/style.json'));
  
});
router.get('/arrow', function (req,res){
  let frame = req.params.frame
  res.sendFile(path.join(__dirname, "assets", "arrow" + ".png"));

})

router.get('/iconByteCode', function (req,res){ 
  res.setHeader('Content-Type', 'application/json');
  iconBytes(res)
})
router.get('/public/:fileName', function (req,res){ 
  var pth = path.join(__dirname, "public", req.params.fileName);
  res.sendFile(pth);
  console
})








const Jimp = require('jimp')

function iconBytes(response){
  Jimp.read("C:\\Node\\sprite-generator\\input\\panel.png", function (err, image) {
      //image.resize(49,50)
      var start = new Date().getTime()
      var width = image.bitmap.width;
      var height = image.bitmap.height; 
      var bytesPerPixel = 4; 
      var data = new Uint8Array(width * height * bytesPerPixel);
      
      for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
      var pixel = Jimp.intToRGBA(image.getPixelColor(x, y))
      var offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = pixel.r  // red
        data[offset + 1] = pixel.g; // green
        data[offset + 2] = pixel.b; // blue
        data[offset + 3] = pixel.a; // alpha
      }
      }
      console.log(new Date().getTime()-start)

      var json = { width: width, height: height, bytes: Object.values(data)}
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(json))
  });
}


app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
