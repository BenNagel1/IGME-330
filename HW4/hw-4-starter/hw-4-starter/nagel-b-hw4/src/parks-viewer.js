import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrcmGWNjHzDY0lVwydvjgK7gFOuKzWDMM",
    authDomain: "park-buddy-21f19.firebaseapp.com",
    projectId: "park-buddy-21f19",
    storageBucket: "park-buddy-21f19.firebasestorage.app",
    messagingSenderId: "149022967596",
    appId: "1:149022967596:web:6f4e85c8b277e33293ce89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const parks = {
    "p79": "Letchworth State Park",
    "p20": "Hamlin Beach State Park",
    "p180": "Brookhaven State Park",
    "p35": "Allan H. Treman State Marine Park",
    "p118": "Stony Brook State Park",
    "p142": "Watkins Glen State Park",
    "p62": "Taughannock Falls State Park",
    "p84": "Selkirk Shores State Park",
    "p43": "Chimney Bluffs State Park",
    "p200": "Shirley Chisholm State Park",
    "p112": "Saratoga Spa State Park"
};

export const writeFavNameData = (name, value) => {
    const db = getDatabase();
    const favRef = ref(db, 'favorites/' + name);
    set(favRef, {
        name,
        likes: increment(value)
    });
};

let favoritesList = document.querySelector("#list-fav");
const favoritesChanged = (snapshot) => {
    // TODO: clear #favoritesList
    if(!favoritesList) return;
    favoritesList.innerHTML = "";
    snapshot.forEach(fav => {
        const childKey = fav.key;
        const childData = fav.val();
        console.log(childKey, childData);
        // TODO: update #favoritesList
        favoritesList.innerHTML += `<li><b>${parks[childData.name]} (${childData.name})</b> - Likes: ${childData.likes}</li>`;
    });
};

const init = () => {
    const db = getDatabase();
    const favoritesRef = ref(db, 'favorites/');
    onValue(favoritesRef, favoritesChanged);

    /*for(let fav in parks) {
        writeFavNameData(fav, 0);
    };*/
};

init();