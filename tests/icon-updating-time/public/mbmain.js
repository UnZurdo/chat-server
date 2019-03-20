mapboxgl.accessToken = "pk.eyJ1IjoiZHZpbGFub3ZhIiwiYSI6ImNqcmhoa2NqdTJtcnY0OW4wdzZpbmdhdnUifQ.kpKlgU9cmI2vBpTn3I5a0g";

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'http://10.144.33.115:3000/style.json', // stylesheet location
    center: [2.041000800000006,41.3309933 ], // starting position [lng, lat]
    zoom: 15, // starting zoom
    pitch: 0, // pitch in degrees
    bearing: -45 // bearing in degrees
});

var icons

var running = true;
var markers = 0;
var rad = 0.05;
var akmIcons = 10000;

var layers = {
    lines : {
        "id": "lines",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                    "type": "Feature",
                    "properties": {
                        "line_width": 3
                    },
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                        [
                            -357.9595175385475,
                            41.330770516294116
                        ],
                        [
                            -357.95770436525345,
                            41.3321400874683
                        ],
                        [
                            -357.9570069909096,
                            41.332647627120636
                        ],
                        [
                            -357.95684337615967,
                            41.33275034299772
                        ],
                        [
                            -357.9566904902458,
                            41.33277249738134
                        ],
                        [
                            -357.9558643698692,
                            41.33171109253564
                        ]
                        ]
                    }
                    }
                ]
                }
            },
        "minzoom": 12,
        "maxzoom" : 20,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#008000",
            "line-width": {
                "type": "exponential",
                "property": "line_width",
                "base": 2,
                "stops": [
                    [{zoom: 10, value: 12}, 12 * Math.pow(2, (10 - 18))],
                    [{zoom: 24, value: 12}, 12 * Math.pow(2, (24 - 18))],
                ]    
            }
         },
       
    },
     akm : {
            "id": "akm",
            "type": "symbol",
            "minzoom": 13,
            "source" : "akm",
            "maxzoom" : 18,
            "layout": {
                "icon-image": "{icon}",
                "icon-size": {stops: [
                        [13, 0.1 ],
                        [17, 1 ]
                    ]
                },
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top",
                "icon-allow-overlap" : true,
                "text-allow-overlap" : true
            },
           
    },
     blue : {
        "id": "blue",
        "type": "symbol",
        "minzoom": 13,
        "source" : "blue",
        "maxzoom" : 18,
        "layout": {
            "icon-image": "{icon}",
            "icon-size": {stops: [
                    [13, 0.1 ],
                    [17, 1 ]
                ]
            },
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
            "icon-allow-overlap" : true,
            "text-allow-overlap" : true
        },
       
    },
    panels : {
        "id": "panels",
        "type": "symbol",
        "minzoom": 13,
        "source" : "panel",
        "maxzoom" : 18,
        "layout": {
            "icon-image": "{icon}",
            "icon-size": {stops: [
                    [13, 0.1 ],
                    [17, 1 ]
                ]
            },
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
            "icon-allow-overlap" : true,
            "text-allow-overlap" : true
        },
       
}
}

var sources = {
    akm : {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    },
    blue : {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    },
    panel : {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [2.049000800000006 ,41.3009933]
                },
                "properties": {
                    "id" : "FirstPanel",
                    "title": "FirstPanel",
                    "icon": "panel1",
                    "icon-offset": 900
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [2.040000800000006 ,41.3009933]
                },
                "properties": {
                    "id" : "SecondPanel",
                    "title": "SecondPanel",
                    "icon": "panel2",
                    "icon-offset": 900
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [2.038000800000006 ,41.3009933]
                },
                "properties": {
                    "id" : "ThirdPanel",
                    "title": "ThirdPanel",
                    "icon": "panel3",
                    "icon-offset": 900
                }
            }]
        }
    }
}


new Array(akmIcons).fill().forEach(d => sources.akm.data.features.push({
                                                                "type": "Feature",
                                                                "geometry": {
                                                                    "type": "Point",
                                                                    "coordinates": [2.041000800000006 + Math.random() * rad ,41.3309933 + Math.random() * rad ]
                                                                    },
                                                                "properties": {
                                                                    "title": "",
                                                                    "icon": "akm1",
                                                                    "description" : "Point Description"
                                                                 }
                                                            }))
new Array(100).fill().forEach(d => sources.blue.data.features.push({
                                                                "type": "Feature",
                                                                "geometry": {
                                                                    "type": "Point",
                                                                    "coordinates": [2.041000800000006 + Math.random() * rad ,41.3309933 + Math.random() * rad ]
                                                                    },
                                                                "properties": {
                                                                    "title": "",
                                                                    "icon": "blue1",
                                                                    "description" : "Point Description"
                                                                 }
                                                            }))

function addPoints(){
    map.addSource("akm", sources.akm)
    map.addSource("blue", sources.blue)
    map.addSource("panel", sources.panel)
    map.addLayer(layers.lines);
    map.addLayer(layers.akm);
    map.addLayer(layers.blue);
    map.addLayer(layers.panels);
    var fin = new Date().getTime();
}

function getSource(sourceName){
    return sources[sourceName]
}

function getLayer(layerName){
    return layers[layerName]
}

//EVENTS

map.on('click', 'points', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
 

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
        
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';
});
 
map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
});



map.on("load", () => {

    addPoints()
    
    
})

var running = true;

function onSourceData (e) {
    if (e.isSourceLoaded) {
      console.log(akmIcons +  " Icons, updated in " + (new Date().getTime() - window.start) + " ms")
      map.off('sourcedata', onSourceData)
      
    }
  }
  
map.on('sourcedata', onSourceData);

function updateIcons(){
    
    map.on('sourcedata', onSourceData)
    sources.akm.data.features = sources.akm.data.features.map(ft => {ft.properties.icon = icons[Math.floor(Math.random(0,1)* icons.length)]; return ft})
    window.start = new Date().getTime()
    map.getSource('akm').setData(sources.akm.data)
    console.log("updatingIcons")
    if(running){
        setTimeout(() => updateIcons(), 8000)
    }
}
$.ajax({
  url: "http://10.144.33.115:3000/.json",
  context: document.body
}).done(function(data) {
 icons=Object.keys(data)
 console.log(icons)
});
