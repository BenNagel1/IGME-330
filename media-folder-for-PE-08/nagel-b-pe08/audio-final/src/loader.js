import * as main from "./main.js";
import { fetchData } from "./dataFetcher.js";

let title;
let tracks;
let bassValue;
let trebleValue;

window.onload = () => {
    //console.log("window.onload called");
    // 1 - do preload here - load fonts, images, additional sounds, etc...
    // 2 - start up app
    main.init();
}