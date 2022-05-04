import { faParking } from "@fortawesome/free-solid-svg-icons";
let map, overview: google.maps.Map;
const OVERVIEW_DIFFERENCE = 6; //diffrence between zoom levels of main map and mini map
const OVERVIEW_MIN_ZOOM = 4; //minimum zoom the mini map will go to
const OVERVIEW_MAX_ZOOM = 15; //maximum zoom the mini map will go to

function initMap(): void {
    //Robotics club LatLng
    const myLatLng = { lat: 28.585578, lng: -81.199156 }
    //Default map options
    const mapOptions = {
        center: myLatLng,
        zoom: 18,
    }
    //Make the main map
    const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
            ...mapOptions,
            mapId: '415ed56c04246670'
            /* styles: [
                 { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                 { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                 { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                 {
                     featureType: "administrative.locality",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#d59563" }],
                 },
                 {
                     featureType: "poi",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#d59563" }],
                 },
                 {
                     featureType: "poi.park",
                     elementType: "geometry",
                     stylers: [{ color: "#263c3f" }],
                 },
                 {
                     featureType: "poi.park",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#6b9a76" }],
                 },
                 {
                     featureType: "road",
                     elementType: "geometry",
                     stylers: [{ color: "#38414e" }],
                 },
                 {
                     featureType: "road",
                     elementType: "geometry.stroke",
                     stylers: [{ color: "#212a37" }],
                 },
                 {
                     featureType: "road",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#9ca5b3" }],
                 },
                 {
                     featureType: "road.highway",
                     elementType: "geometry",
                     stylers: [{ color: "#746855" }],
                 },
                 {
                     featureType: "road.highway",
                     elementType: "geometry.stroke",
                     stylers: [{ color: "#1f2835" }],
                 },
                 {
                     featureType: "road.highway",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#f3d19c" }],
                 },
                 {
                     featureType: "transit",
                     elementType: "geometry",
                     stylers: [{ color: "#2f3948" }],
                 },
                 {
                     featureType: "transit.station",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#d59563" }],
                 },
                 {
                     featureType: "water",
                     elementType: "geometry",
                     stylers: [{ color: "#17263c" }],
                 },
                 {
                     featureType: "water",
                     elementType: "labels.text.fill",
                     stylers: [{ color: "#515c6d" }],
                 },
                 {
                     featureType: "water",
                     elementType: "labels.text.stroke",
                     stylers: [{ color: "#17263c" }],
                 },
             ],*/
        }
    );
    //Make the mini map without controls
    const overview = new google.maps.Map(
        document.getElementById("overview") as HTMLElement,
        {
            ...mapOptions,
            disableDefaultUI: true,
            gestureHandling: "none",
            zoomControl: false
        }
    );
    //relation of the main and mini map
    function clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    }
    //Keep mini map relative to main map
    map.addListener("bounds_changed", () => {
        overview.setCenter(map.getCenter()!);
        overview.setZoom(
            clamp(
                map.getZoom()! - OVERVIEW_DIFFERENCE,
                OVERVIEW_MIN_ZOOM,
                OVERVIEW_MAX_ZOOM
            )
        );
    });
    //Robotics club point on the main map
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "The Robtotics Club",
    });
    //Robotics club point on the mini map
    new google.maps.Marker({
        position: myLatLng,
        map: overview,
        title: "The Robtotics Club",
    });
    
    //Parking lot marker
    new google.maps.Marker({
        position: { lat: 28.585465, lng: -81.200288 },
        map,
        icon: {
            path: faParking.icon[4] as string,
            fillColor: "#ff1100",
            fillOpacity: 1,
            anchor: new google.maps.Point(
                faParking.icon[0] / 2, // width
                faParking.icon[1] // height
            ),
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
        },
        title: "Parking Lot",
    });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}
window.initMap = initMap;
export { };