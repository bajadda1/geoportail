require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Measurement",
    "esri/widgets/ScaleBar",
    "esri/widgets/Track",
    "esri/widgets/Locate",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
], function (
    esriConfig,
    Map,
    MapView,
    BasemapToggle,
    BasemapGallery,
    FeatureLayer,
    LayerList,
    Legend,
    Expand,
    Measurement,
    ScaleBar,
    Track,
    Locate,
    Graphic,
    GraphicsLayer
) {
    esriConfig.apiKey =
        "AAPK1ab27aa020f449b4a6c8260c74094bdc3qGL8Egvdq7O7GCrTqOZQKj1NRDxqGBu6StxC5RB0dU6xTLP9zSfQBQ5942TQQHg";

    const map = new Map({
        basemap: "arcgis-topographic",
    });

    const view = new MapView({
        map: map,
        center: [-7.62, 33.59],
        zoom: 13,
        container: "viewDiv",
    });

    // Add the BasemapToggle widget
    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery",
    });
    view.ui.add(basemapToggle, "bottom-right");

    // Add the BasemapGallery widget
    const basemapGallery = new BasemapGallery({
        view: view,
    });
    view.ui.add(new Expand({
        view: view,
        content: basemapGallery
    }), "top-right");

    // Add the LayerList widget
    const layerList = new LayerList({
        view: view,
    });
    view.ui.add(new Expand({
        view: view,
        content: layerList
    }), "top-right");

    // Add the Legend widget
    const legend = new Legend({
        view: view,
    });
    view.ui.add(new Expand({
        view: view,
        content: legend
    }), "top-right");

    // Add the Measurement widget
    const measurement = new Measurement({
        view: view,
        activeTool: "distance"
    });
    view.ui.add(new Expand({
        view: view,
        content: measurement
    }), "top-right");

    const scaleBar = new ScaleBar({
        view: view
    });

    view.ui.add(scaleBar, {
        position: "bottom-left"
    });

    const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    view.ui.add(locate, "top-left");

    const track = new Track({
        view: view,
        graphic: new Graphic({
            symbol: {
                type: "simple-marker",
                size: "12px",
                color: "green",
                outline: {
                    color: "#efefef",
                    width: "1.5px"
                }
            }
        }),
        useHeadingEnabled: false
    });
    view.ui.add(track, "top-left");

    let hospitalRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            size: 20,
            color: "green",
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }
    };

    // Hotels Feature Layer
    const hotelsLayer = new FeatureLayer({
        url: "https://services9.arcgis.com/j9Cwpg1kdJBl1jL4/arcgis/rest/services/hotels/FeatureServer/0",
        outFields: ["CATÉGORIE", "ADRESSE", "HOTEL"],
        popupTemplate: {
            title: "{HOTEL}",
            content: "<b>Category:</b> {CATÉGORIE}<br><b>Address:</b> {ADRESSE}",
        },
        renderer: hospitalRenderer
    });

    map.add(hotelsLayer);

    // Add GraphicsLayer to the map
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Function to apply filters based on user input
    function queryFeatureLayer(whereClause) {
        const parcelQuery = {
            where: whereClause,
            outFields: ["CATÉGORIE", "ADRESSE", "HOTEL"],
            returnGeometry: true,
        };

        hotelsLayer
            .queryFeatures(parcelQuery)
            .then((results) => {
                console.log(results);
                displayResults(results);
            })
            .catch((error) => {
                console.error(error);
            });

        hotelsLayer.definitionExpression = whereClause;
    }

    // Function to display the results of the query
    function displayResults(results) {
        graphicsLayer.removeAll(); // Clear existing graphics

        results.features.forEach((feature) => {
            const symbol = {
                type: "simple-marker",
                color: [0, 255, 0],
                outline: {
                    color: [255, 255, 255],
                    width: 2,
                },
            };

            const graphic = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: symbol,
                popupTemplate: {
                    title: "Hotel {HOTEL}",
                    content: "Category: {CATÉGORIE}<br>Address: {ADRESSE}",
                },
            });

            graphicsLayer.add(graphic);
        });
    }

    // Event listener for the Apply Filters button
    document
        .getElementById("applyFilters")
        .addEventListener("click", function () {
            const hotelCategory = document
                .getElementById("hotelCategory")
                .value.trim();
            let sql = `CATÉGORIE = '${hotelCategory}'`;

            if (hotelCategory === "") {
                sql = "1=1"; // Show all features if the input is empty
            }

            queryFeatureLayer(sql);
        });

    // Initial query to show all hotels
    queryFeatureLayer("1=1");
});