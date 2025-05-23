import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js";
import { writeFavNameData } from "./parks-viewer.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
let geojson;
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let favoriteIds = [];
favoriteIds = storage.readFromLocalStorage("favorites");
if(!Array.isArray(favoriteIds)) favoriteIds = [];

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	}

	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	}

	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatUSA);
	}

	refreshFavorites();
}

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("./data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	});
};

const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `
	<b>Address:</b> ${feature.properties.address} <br>
	<b>Phone:</b> <a href="tel:+${feature.properties.phone}">${feature.properties.phone}</a> <br>
	<b>Website:</b> <a href="${feature.properties.url}">${feature.properties.url}</a>
	`;
	document.querySelector("#details-3").innerHTML = `${feature.properties.description}`;

	const btnFavorite = document.querySelector("#btn-fav");
	const btnDelete = document.querySelector("#btn-del");

	const checkButtons = () => {
		if(favoriteIds.includes(id)) {
			btnFavorite.disabled = true;
			btnDelete.disabled = false;
		}
		else {
			btnFavorite.disabled = false;
			btnDelete.disabled = true;
		}
	}

	checkButtons();
	
	btnFavorite.onclick = () => {
		if(!favoriteIds.includes(id)) {
			favoriteIds.push(id); 
			refreshFavorites(); 
			checkButtons();
			storage.writeToLocalStorage("favorites", favoriteIds);
			writeFavNameData(id, 1);
		}
	}

	btnDelete.onclick = () => {
		for(let i = 0; i < favoriteIds.length; i++){
			if(favoriteIds[i] == id) {
				favoriteIds.splice(i, 1);
				refreshFavorites(); 
				checkButtons();
				storage.writeToLocalStorage("favorites", favoriteIds);
				writeFavNameData(id, -1);
			}
		}
	}

	
};

const getFeatureById = (id) => {
	return geojson.features.find((e) => e.id == id);
}

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for(const id of favoriteIds){
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
}

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a;
}

init();