<template>
  <div id="map-box-container">
    <div :id="container" class="map"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
require("../../node_modules/mapbox-gl/dist/mapbox-gl.css");
export default {
  name: "Mapbox",
  props: {
    container: {
      type: String,
      required: true,
      default: "map"
    }
  },
  data() {
    return {
      token:
        "pk.eyJ1IjoiZnVzZWJveDEzIiwiYSI6ImNqa3ZybDJuaTB0Z3Mza210MWpxbXkyYm0ifQ.EB-I9-FeWDI5Vy9O3RXNoA",
      pointData: {
        type: "Point",
        coordinates: [-83.78532, 42.268224]
      },
      drawMode: false
    };
  },
  mounted() {
    let self = this;
    mapboxgl.accessToken = this.token;
    var map = new mapboxgl.Map({
      container: this.container,
      style: "mapbox://styles/mapbox/light-v9",
      center: [-83.78532, 42.268224],
      zoom: 16
    });
    map.setStyle("mapbox://styles/mapbox/dark-v9");
    map.on("mousedown", () => {
      this.drawMode = !this.drawMode;
    });

    map.on("mousemove", data => {
      if (this.drawMode) {
        console.log(data.lngLat);
      }
    });
    map.on("load", function() {
      map.addSource("point", {
        type: "geojson",
        data: self.pointData
      });
      map.addLayer({
        id: "point",
        source: "point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#007cbf"
        }
      });

      //     map.addLayer({
      //         "id": "points",
      //         "type": "symbol",
      //         "source": {
      //             "type": "geojson",
      //             "data": {
      //                 "type": "FeatureCollection",
      //                 "features": [{
      //                     "type": "Feature",
      //                     "geometry": {
      //                         "type": "Point",
      //                         "coordinates": [-77.03238901390978, 38.913188059745586]
      //                     },
      //                     "properties": {
      //                         "title": "Mapbox DC",
      //                         "icon": "monument"
      //                     }
      //                 }, {
      //                     "type": "Feature",
      //                     "geometry": {
      //                         "type": "Point",
      //                         "coordinates": [-122.414, 37.776]
      //                     },
      //                     "properties": {
      //                         "title": "Mapbox SF",
      //                         "icon": "harbor"
      //                     }
      //                 }]
      //             }
      //         },
      //         "layout": {
      //             "icon-image": "{icon}-15",
      //             "text-field": "{title}",
      //             "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //             "text-offset": [0, 0.6],
      //             "text-anchor": "top"
      //         }
      //     });
    });
  }
};
</script>
<style lang="scss" scoped>
.map {
  width: 500px;
  height: 500px;
}
</style>
