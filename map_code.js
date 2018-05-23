mapboxgl.accessToken = 'pk.eyJ1IjoiamVmZmFsbGVuIiwiYSI6ImNqaGlnOHZkODIzb2UzOGw4MmNvaTY1cnEifQ.EzcwmMSTC_vL90m7Bd3XAg';


var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jeffallen/cilzhgc78001wa0m461yacv10',
  center: [-73.67, 45.52],
  zoom: 10.3,
  maxZoom: 14.9,
  minZoom: 10,
  bearing: -45,
  attributionControl: false,
});


var breaks = [0,50,75,100,125,150,175,200,225,250,275,300,30000]


map.on('style.load', function(){

  map.addSource('stops',{
    "type": "geojson",
    "data": stops
  })
  map.addLayer({
      "id": "stops_b",
      "type": "circle",
      "source": "stops",
      "layout": {},
      "paint":{
        'circle-color': "black",
        'circle-opacity': 1,
        'circle-radius': {
            "base": 2,
            "stops": [
                [10, 3],
                [15, 11]
              ] }
      }
  });

  for (var c = 0; c < 12; c++) {

  var opa = c * 0.06 + 0.28
  console.log(opa)

  map.addLayer({
      "id": "stops" + String(c + 1),
      "type": "circle",
      "source": "stops",
      "layout": {},
      "paint":{
        'circle-color': '#00D5FF',
        'circle-opacity': opa,
        'circle-radius': {
            "base": 2,
            "stops": [
                [10, 2],
                [15, 10]
              ] }
      },
      'filter': [ "<", "frequency", breaks[c+1]],
      'filter': [ ">=", "frequency", breaks[c]]
  });
  }
});

map.addControl(new mapboxgl.Navigation({position: 'top-right'}));

var x = 1;
function ShowDiv() {
    if (x == 0) {
      document.getElementById("show_info").style.display = "";
      document.getElementById("info").style.display = "none";
      x = 1;
    } else {
      document.getElementById("show_info").style.display = "none";
      document.getElementById("info").style.display = "";
      x = 0;
    }
}
