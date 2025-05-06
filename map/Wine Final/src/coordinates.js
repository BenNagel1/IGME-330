const coffeeShops = [
    {
        title: "King Estate",
        description: "<b>Location:</b> Willamette Valley, OR, USA<br><b>Grape(s):</b> Pinot Gris<br><b>When:</b> Week 1",
        latitude: 43.8610251321341,
        longitude: -123.25074127116386
      },
      {
        title: "Hugel",
        description: "<b>Location:</b> Alsace, France<br><b>Grape(s):</b> Pinot Gris<br><b>When:</b> Week 1",
        latitude: 48.166565659552305,
        longitude: 7.297279825008047
      },
      {
        title: "Ruffino Modus",
        description: "<b>Location:</b> Tuscany, Italy<br><b>Grape(s):</b> Merlot, Sangiovese, and Cabernet Sauvignon<br><b>When:</b> Week 1",
        latitude: 43.69519543462434,
        longitude: 11.325987081515649
      },
      {
        title: "Ferrari-Carano Siena",
        description: "<b>Location:</b> Sonoma County, CA, USA<br><b>Grape(s):</b> Sangiovese, Malbec, Petite Sirah, and Cabernet Sauvignon<br><b>When:</b> Week 1",
        latitude: 38.711384417762844,
        longitude: -122.97832072243716
      },
      {
        title: "Mulderbosch",
        description: "<b>Location:</b> Stellenbosch, South Africa<br><b>Grape(s):</b> Sauvignon Blanc<br><b>When:</b> Week 2",
        latitude: -33.9482368232269,
        longitude: 18.766532600184235
      },
      {
        title: "Schmitt-Sohne Relax",
        description: "<b>Location:</b> Mosel, Germany<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 2",
        latitude: 49.80712129387203,
        longitude: 6.769691214176589
      },
      {
        title: "Toasted Head",
        description: "<b>Location:</b> California, USA<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 2",
        latitude: 38.796437889959414,
        longitude: -121.94629891114211
      },
      {
        title: "Sidewise",
        description: "<b>Location:</b> Vin de Pays d’Oc, France<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 2",
        latitude: 43.74186129465914,
        longitude: 3.8542521066515594
      },
      {
        title: "Rodney Strong",
        description: "<b>Location:</b> Sonoma County, CA, USA<br><b>Grape(s):</b> Merlot or Cabernet Sauvignon<br><b>When:</b> Week 2",
        latitude: 38.573229048991095,
        longitude: -122.84395961351761
      },
      {
        title: "Weingut Brundlmayer Terrassen",
        description: "<b>Location:</b> Kamptal, Austria<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 3",
        latitude: 48.473948739613824,
        longitude: 15.665115480468135
      },
      {
        title: "Trimbach",
        description: "<b>Location:</b> Alsace, France<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 3",
        latitude: 48.19442668653145,
        longitude: 7.325486574021854
      },
      {
        title: "Dr. Loosen",
        description: "<b>Location:</b> Ürziger Würzgarten, Mosel, Germany<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 3",
        latitude: 49.92362698955095,
        longitude: 7.069901504041787
      },
      {
        title: "Dr. Frank Dry Riesling",
        description: "<b>Location:</b> Finger Lakes, NY, USA<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 3",
        latitude: 42.473470949467135,
        longitude: -77.1837381294159
      },
      {
        title: "Chateau Ste. Michelle",
        description: "<b>Location:</b> Columbia Valley, WA, USA<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 3",
        latitude: 47.731247138756586,
        longitude: -122.15098333281108
      },
      {
        title: "Robert Mondavi",
        description: "<b>Location:</b> Napa Valley, CA, USA<br><b>Grape(s):</b> Sauvignon Blanc or Chardonnay<br><b>When:</b> Week 4",
        latitude: 38.441634595944954,
        longitude: -122.41009895464111
      },
      {
        title: "Barefoot",
        description: "<b>Location:</b> California, USA<br><b>Grape(s):</b> Moscato<br><b>When:</b> Week 4",
        latitude: 37.63684698740147,
        longitude: -120.98134931948182
      },
      {
        title: "Cambria Julia’s Vineyard",
        description: "<b>Location:</b> Santa Maria, CA, USA<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 4",
        latitude: 34.87725393303668,
        longitude: -120.26011850901595
      },
      {
        title: "Cline Ancient Vines",
        description: "<b>Location:</b> Contra Costa Co., CA, USA<br><b>Grape(s):</b> Zinfandel<br><b>When:</b> Week 4",
        latitude: 38.21414985125829,
        longitude: -122.4581442147517
      },
      {
        title: "Sterling Vintner’s Collection Red Meritage",
        description: "<b>Location:</b> Sonoma County, CA, USA<br><b>Grape(s):</b> Cabernet Sauvignon, Merlot, Malbec, and Petit Verdot<br><b>When:</b> Week 4",
        latitude: 38.570166485169864,
        longitude: -122.55470713238846
      },
      {
        title: "Borealis White Blend",
        description: "<b>Location:</b> Washington or Oregon, USA<br><b>Grape(s):</b> Riesling, Pinot gris, Muller-thurgau, and Gewurztraminer<br><b>When:</b> Week 5",
        latitude: 45.49283747059204,
        longitude: -123.13337620335344
      },
      {
        title: "Chateau Ste. Michelle",
        description: "<b>Location:</b> Washington, USA<br><b>Grape(s):</b> Gewürztraminer<br><b>When:</b> Week 5",
        latitude: 47.73119170596572,
        longitude: -122.15104428973356
      },
      {
        title: "Willamette Valley Vineyards",
        description: "<b>Location:</b> Willamette Valley, Oregon, USA<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 5",
        latitude: 44.8278004661719,
        longitude: -123.01235729989165
      },
      {
        title: "Charles Smith The Velvet Devil",
        description: "<b>Location:</b> Washington, USA<br><b>Grape(s):</b> Merlot<br><b>When:</b> Week 5",
        latitude: 46.06815716177548,
        longitude: -118.33500827995071
      },
      {
        title: "Columbia Crest",
        description: "<b>Location:</b> Washington, USA<br><b>Grape(s):</b> Syrah<br><b>When:</b> Week 5",
        latitude: 45.96008531215877,
        longitude: -119.60835161972669
      },
      {
        title: "Hedges CMS",
        description: "<b>Location:</b> Columbia Valley, Washington, USA<br><b>Grape(s):</b> Merlot, Cabernet Sauvignon, and Syrah<br><b>When:</b> Week 5",
        latitude: 46.28992646647492,
        longitude: -119.44630076097943
      },
      {
        title: "Bully Hill Love My Goat",
        description: "<b>Location:</b> New York, USA<br><b>Grape(s):</b> Seyval and Vidal<br><b>When:</b> Week 6",
        latitude: 42.42952391165997,
        longitude: -77.20911569002077
      },
      {
        title: "Ravines",
        description: "<b>Location:</b> Finger Lakes, New York, USA<br><b>Grape(s):</b> Cabernet Franc<br><b>When:</b> Week 6",
        latitude: 42.84466710570216,
        longitude: -77.00103773021641
      },
      {
        title: "Pindar Pythagorus",
        description: "<b>Location:</b> North Fork of Long Island, New York, USA<br><b>Grape(s):</b> Merlot, Cabernet Sauvignon, Cabernet Franc, Malbec, and Petit Verdot<br><b>When:</b> Week 6",
        latitude: 41.0324570472357,
        longitude: -72.46563702222745
      },
      {
        title: "Hazlitt Red Cat",
        description: "<b>Location:</b> Finger Lakes, New York, USA<br><b>Grape(s):</b> Catawba and red hybrids<br><b>When:</b> Week 6",
        latitude: 42.51063127262807,
        longitude: -76.87603757713683
      },
      {
        title: "Carroll’s Mead",
        description: "<b>Location:</b> USA<br><b>Grape(s):</b> Honey (Not Grape)<br><b>When:</b> Week 6",
        latitude: 41.431978773342436,
        longitude: -74.16249916765211
      },
      {
        title: "Montezuma Cranberry Bog",
        description: "<b>Location:</b> New York, USA<br><b>Grape(s):</b> Cranberry (Not Grape)<br><b>When:</b> Week 6",
        latitude: 42.950818777824196,
        longitude: -76.76792091882858
      },
      {
        title: "Kim Crawford",
        description: "<b>Location:</b> Marlborough, New Zealand<br><b>Grape(s):</b> Sauvignon Blanc<br><b>When:</b> Week 7",
        latitude: -41.4816679363825,
        longitude: 173.90637076760058
      },
      {
        title: "Oyster Bay",
        description: "<b>Location:</b> Marlborough, New Zealand<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 7",
        latitude: -39.60182401151305,
        longitude: 176.83136196576444
      },
      {
        title: "[yellow tail]",
        description: "<b>Location:</b> South Eastern Australia<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 7",
        latitude: -34.24517698356871,
        longitude: 146.21633341830412
      },
      {
        title: "Paua Rock",
        description: "<b>Location:</b> Central Otago, New Zealand (Winery in California, USA)<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 7",
        latitude: 38.617092850771094,
        longitude: -122.87257866455202
      },
      {
        title: "d’Arenberg The Stump Jump",
        description: "<b>Location:</b> McLaren Vale, Australia<br><b>Grape(s):</b> Grenache, Shiraz, and Mourvèdre<br><b>When:</b> Week 7",
        latitude: -35.19708038583519,
        longitude: 138.55113650011882
      },
      {
        title: "19 Crimes",
        description: "<b>Location:</b> South Eastern Australia<br><b>Grape(s):</b> Shiraz<br><b>When:</b> Week 7",
        latitude: -37.81505199539821,
        longitude: 144.96855239716598
      },
      {
        title: "Man “Steen”",
        description: "<b>Location:</b> Cape Coast, South Africa<br><b>Grape(s):</b> Chenin Blanc<br><b>When:</b> Week 8",
        latitude: -33.83941646724505,
        longitude: 18.87782139607835
      },
      {
        title: "Veramonte Reserva",
        description: "<b>Location:</b> Casablanca Valley, Chile<br><b>Grape(s):</b> Sauvignon Blanc<br><b>When:</b> Week 8",
        latitude: -33.36981841175117,
        longitude: -71.29452326957409
      },
      {
        title: "Torino Cuma",
        description: "<b>Location:</b> Argentina<br><b>Grape(s):</b> Torrontés<br><b>When:</b> Week 8",
        latitude: -26.06337262199209,
        longitude: -65.96556193980102
      },
      {
        title: "Robertson",
        description: "<b>Location:</b> Robertson, South Africa<br><b>Grape(s):</b> Pinotage<br><b>When:</b> Week 8",
        latitude: -33.81069808769875,
        longitude: 19.88143906294765
      },
      {
        title: "Concha y Toro “Casillero del Diablo” Reserva",
        description: "<b>Location:</b> Central Valley, Chile<br><b>Grape(s):</b> Carmenere<br><b>When:</b> Week 8",
        latitude: -34.36519892172367,
        longitude: -71.20094346056075
      },
      {
        title: "Alamos",
        description: "<b>Location:</b> Mendoza, Argentina<br><b>Grape(s):</b> Malbec<br><b>When:</b> Week 8",
        latitude: -33.16393576986634,
        longitude: -68.9195197335418
      },
      {
        title: "Freixenet Cordon Negro Gran Seleccion",
        description: "<b>Location:</b> Spain<br><b>Grape(s):</b> Macabeo, Xarel-lo, and Parellada<br><b>When:</b> Week 9",
        latitude: 41.42043086341415,
        longitude: 1.793645841900996
      },
      {
        title: "Dr. Loosen",
        description: "<b>Location:</b> Germany<br><b>Grape(s):</b> Riesling<br><b>When:</b> Week 9",
        latitude: 49.9236399808313,
        longitude: 7.06979823783762
      },
      {
        title: "Mondoro",
        description: "<b>Location:</b> Asti, Piedmont, Italy<br><b>Grape(s):</b> Moscato<br><b>When:</b> Week 9",
        latitude: 45.53912233753971,
        longitude: 9.234527374492979
      },
      {
        title: "Brotherhood",
        description: "<b>Location:</b> New York, USA<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 9",
        latitude: 41.43205246722141,
        longitude: -74.16250906135437
      },
      {
        title: "Domaine Chandon",
        description: "<b>Location:</b> California, USA<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 9",
        latitude: 38.39600204471656,
        longitude: -122.3651104257961
      },
      {
        title: "Moët et Chandon Imperial",
        description: "<b>Location:</b> Champagne, France<br><b>Grape(s):</b> Chardonnay, Pinot Noir, and Pinot Meunier<br><b>When:</b> Week 9",
        latitude: 49.05132869777183,
        longitude: 4.01568508549675
      },
      {
        title: "Louis Jadot (Chablis)",
        description: "<b>Location:</b> Chablis, Burgundy, France<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 10",
        latitude: 47.03805574499348,
        longitude: 4.840712606925467
      },
      {
        title: "Louis Jadot (Pouilly-Fuissé)",
        description: "<b>Location:</b> Pouilly-Fuissé, Mâcon, Burgundy, France<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 10",
        latitude: 47.03805574499348,
        longitude: 4.840712606925467
      },
      {
        title: "Louis Jadot (Savigny-Les-Beaune Hauts Jarrons 1er Cru)",
        description: "<b>Location:</b> Savigny-Les-Beaune Hauts Jarrons 1er Cru, Côte de Beaune, Burgundy, France<br><b>Grape(s):</b> Chardonnay<br><b>When:</b> Week 10",
        latitude: 47.03805574499348,
        longitude: 4.840712606925467
      },
      {
        title: "Georges Duboeuf",
        description: "<b>Location:</b> Beaujolais-Villages, Burgundy, France<br><b>Grape(s):</b> Gamay<br><b>When:</b> Week 10",
        latitude: 46.17692188791269,
        longitude: 4.740011414475403
      },
      {
        title: "Joseph Drouhin",
        description: "<b>Location:</b> Burgundy, France<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 10",
        latitude: 47.02330045843344,
        longitude: 4.836243416466395
      },
      {
        title: "Louis Latour",
        description: "<b>Location:</b> Marsannay, Côte de Nuits, Burgundy, France<br><b>Grape(s):</b> Pinot Noir<br><b>When:</b> Week 10",
        latitude: 47.02411230903572,
        longitude: 4.840476819308656
      },
      {
        title: "Chateau Castenet Blanc",
        description: "<b>Location:</b> Entre-Deux-Mers, Bordeaux, France<br><b>Grape(s):</b> Sauvignon Blanc, Sémillon, and Muscadelle<br><b>When:</b> Week 11",
        latitude: 44.72861316114619,
        longitude: 0.04576459660515262
      },
      {
        title: "Chateau Graville-Lacoste Blanc",
        description: "<b>Location:</b> Graves, Bordeaux, France<br><b>Grape(s):</b> Sémillon, Sauvignon Blanc, and Muscadelle<br><b>When:</b> Week 11",
        latitude: 44.58908221680509,
        longitude: -0.33498643599403144
      },
      {
        title: "Chateau Haut-Brisson",
        description: "<b>Location:</b> Saint-Émilion Grand Cru, Right Bank, Bordeaux, France<br><b>Grape(s):</b> Merlot and Cabernet Franc<br><b>When:</b> Week 11",
        latitude: 44.85465848148647,
        longitude: -0.1591926745531533
      },
      {
        title: "La Fleur de Bouard",
        description: "<b>Location:</b> Lalande de Pomerol, Right Bank, Bordeaux, France<br><b>Grape(s):</b> Merlot and Cabernet Sauvignon<br><b>When:</b> Week 11",
        latitude: 44.94800056756733,
        longitude: -0.16246234571322593
      },
      {
        title: "Chateau d’Armailhac",
        description: "<b>Location:</b> Pauillac, Left Bank, Bordeaux, France<br><b>Grape(s):</b> Cabernet Sauvignon, Merlot, Cabernet Franc, and Petit Verdot<br><b>When:</b> Week 11",
        latitude: 45.21161624254525,
        longitude: -0.7704050033687289
      },
      {
        title: "Petit Guiraud",
        description: "<b>Location:</b> Sauternes, Bordeaux, France<br><b>Grape(s):</b> Sémillon and Sauvignon Blanc<br><b>When:</b> Week 11",
        latitude: 44.533011607518844,
        longitude: -0.33337563224023264
      },
      {
        title: "Voga",
        description: "<b>Location:</b> Veneto, Italy<br><b>Grape(s):</b> Pinot Grigio<br><b>When:</b> Week 12",
        latitude: 45.50659456411894,
        longitude: 10.765629559162232
      },
      {
        title: "Da Vinci",
        description: "<b>Location:</b> Chianti DOCG, Tuscany, Italy<br><b>Grape(s):</b> Sangiovese<br><b>When:</b> Week 12",
        latitude: 43.74384524229999,
        longitude: 10.902067440081524
      },
      {
        title: "Silvio Grasso",
        description: "<b>Location:</b> Barolo DOCG, Piedmont, Italy<br><b>Grape(s):</b> Nebbiolo<br><b>When:</b> Week 12",
        latitude: 44.633428454643465,
        longitude: 7.961242296600033
      },
      {
        title: "Cusumano",
        description: "<b>Location:</b> Sicily, Italy<br><b>Grape(s):</b> Nero d’Avola<br><b>When:</b> Week 12",
        latitude: 38.06252663471525,
        longitude: 13.101379425102904
      },
      {
        title: "Riunite",
        description: "<b>Location:</b> Emilia IGT, Italy<br><b>Grape(s):</b> Lambrusco<br><b>When:</b> Week 12",
        latitude: 44.77397353810326,
        longitude: 10.513672054277402
      },
      {
        title: "Aveleda’s Casal Garcia",
        description: "<b>Location:</b> Vinho Verde, Minho, Portugal<br><b>Grape(s):</b> Trajadura, Loureiro, Arinto, and Fernão Pires<br><b>When:</b> Week 13",
        latitude: 41.20809269586078,
        longitude: -8.30717163241328
      },
      {
        title: "Hacienda Lopez de Haro Reserva",
        description: "<b>Location:</b> Rioja, Spain<br><b>Grape(s):</b> Tempranillo, Garnacha, and Graciano<br><b>When:</b> Week 13",
        latitude: 42.55202430470889,
        longitude: -2.7584163611795187
      },
      {
        title: "Condado de Haza Crianza",
        description: "<b>Location:</b> Ribera del Duero, Spain<br><b>Grape(s):</b> Tempranillo<br><b>When:</b> Week 13",
        latitude: 41.7060091217386,
        longitude: -3.8831395747183057
      },
      {
        title: "Ciconia",
        description: "<b>Location:</b> Alentejano, Portugal<br><b>Grape(s):</b> Touriga Nacional, Syrah, and Aragonez<br><b>When:</b> Week 13",
        latitude: 38.64086790271776,
        longitude: -7.740622376713753
      },
      {
        title: "Lustau “Los Arcos” Dry Amontillado Sherry",
        description: "<b>Location:</b> Jerez, Spain<br><b>Grape(s):</b> Palomino<br><b>When:</b> Week 13",
        latitude: 36.68435487516717,
        longitude: -6.1308907768052165
      },
      {
        title: "Graham’s 6 Grapes Reserve Porto",
        description: "<b>Location:</b> Douro Valley, Portugal<br><b>Grape(s):</b> Blend (more than 6 grape varieties)<br><b>When:</b> Week 13",
        latitude: 41.13825245507185,
        longitude: -8.624288488242408
      }
];

export {coffeeShops};