mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZpbGFub3ZhIiwiYSI6ImNqcmhoa2NqdTJtcnY0OW4wdzZpbmdhdnUifQ.kpKlgU9cmI2vBpTn3I5a0g";

// window.address = "localhost:3001"
// Docker toolbox ip: http://192.168.99.100:32768

window.address = "localhost:3001";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "http://" + window.address + "/style.json", // stylesheet location
  center: [2.041000800000006, 41.3309933], // starting position [lng, lat]
  zoom: 15, // starting zoom
  pitch: 0, // pitch in degrees
  bearing: -45 // bearing in degrees
});

var icons;

var running = true;
var markers = 0;
var rad = 0.05;
var selectedCoordinate;
var popup;

//EVENTS

map.on("click", "points", function(e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  popup = new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

map.on("click", function(e) {
  console.log(e);
  selectedCoordinate = e.lngLat;
  popup = new mapboxgl.Popup({ offset: 0, className: "my-class" })
    .setLngLat(e.lngLat)
    .setHTML(
      '<img onClick= "addMarker(this)" iconid = "blue1" src="http://' +
        window.address +
        '/assets/icons/blue1.bmp" class="removeImage" />' +
        '<img onClick= "addMarker(this)" iconid = "blue2" src="http://' +
        window.address +
        '/assets/icons/blue2.bmp" class="removeImage" />' +
        '<img onClick= "addMarker(this)" iconid = "blue3" src="http://' +
        window.address +
        '/assets/icons/blue3.bmp" class="removeImage" />' +
        '<img onClick= "addMarker(this)" iconid = "blue4" src="http://' +
        window.address +
        '/assets/icons/blue4.bmp" class="removeImage" />'
    )
    .addTo(map);
});
map.on("mouseenter", "points", function() {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "points", function() {
  map.getCanvas().style.cursor = "";
});

map.on("load", () => {
  addPoints();
});

function addMarker(e) {
  var iconId = $(e).attr("iconid");
  sources.interactive.data.features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [selectedCoordinate.lng, selectedCoordinate.lat]
    },
    properties: {
      id: "SecondPanel",
      title: "",
      icon: iconId,
      "icon-offset": 900
    }
  });

  map.getSource("interactive").setData(sources.interactive.data);
  popup.remove();
}
