require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/Expand",
    "esri/widgets/Measurement",
    "esri/widgets/ScaleBar",
    "esri/widgets/Track",
    "esri/widgets/Locate",
    "esri/Graphic",
    "esri/PopupTemplate",
    "esri/renderers/SimpleRenderer",
    "esri/renderers/ClassBreaksRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/renderers/UniqueValueRenderer"
], function(
    esriConfig,
    Map,
    MapView,
    BasemapToggle,
    BasemapGallery,
    FeatureLayer,
    LayerList,
    Legend,
    Search,
    Expand,
    Measurement,
    ScaleBar,
    Track,
    Locate,
    Graphic,
    PopupTemplate,
    SimpleRenderer,
    ClassBreaksRenderer,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    UniqueValueRenderer
) {

    esriConfig.apiKey =
        "AAPK1ab27aa020f449b4a6c8260c74094bdc3qGL8Egvdq7O7GCrTqOZQKj1NRDxqGBu6StxC5RB0dU6xTLP9zSfQBQ5942TQQHg";

    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        map: map,
        center: [-7.62, 33.59],
        zoom: 13,
        container: "viewDiv"
    });

    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
    });
    view.ui.add(basemapToggle, "bottom-right");

    const basemapGallery = new BasemapGallery({
        view: view
    });
    view.ui.add(new Expand({
        view: view,
        content: basemapGallery
    }), "top-right");

    const layerList = new LayerList({
        view: view
    });
    view.ui.add(new Expand({
        view: view,
        content: layerList
    }), "top-right");

    const legend = new Legend({
        view: view
    });
    view.ui.add(new Expand({
        view: view,
        content: legend
    }), "top-right");

    // Add the Measurement widget
    const search = new Search({
        view: view
    });
    view.ui.add(new Expand({
        view: view,
        content: search
    }), "top-right");

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
        goToOverride: function(view, options) {
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

    var popupCommune = new PopupTemplate({
        title: "<b>Commune: {COMMUNE_AR}</b>",
        content: "<p>PREFECTURE : {PREFECTURE}</p>" +
            "<p>Communes : {COMMUNE_AR}</p>" +
            "<p>Surface : {Shape_Area}</p>"
    });


    let noRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.9 ],
            style: "solid",
            outline: { // autocasts as new SimpleLineSymbol()
                color: "white",
                width: 1
            }
        }
    };

    let commRenderer = new ClassBreaksRenderer({
        field: "Shape_Area",
        classBreakInfos: [
            { minValue: 0, maxValue: 8000000, symbol: new SimpleFillSymbol({ color: [255, 255, 212], style: "solid", outline: { color: "white", width: 1 } }) },
            { minValue: 8000001, maxValue: 16000000, symbol: new SimpleFillSymbol({ color: [254, 227, 145], style: "solid", outline: { color: "white", width: 1 } }) },
            { minValue: 16000001, maxValue: 26000000, symbol: new SimpleFillSymbol({ color: [254, 196, 79], style: "solid", outline: { color: "white", width: 1 } }) },
            { minValue: 26000001, maxValue: 48000000, symbol: new SimpleFillSymbol({ color: [254, 153, 41], style: "solid", outline: { color: "white", width: 1 } }) },
            { minValue: 48000001, maxValue: 78000000, symbol: new SimpleFillSymbol({ color: [217, 95, 14], style: "solid", outline: { color: "white", width: 1 } }) },
            { minValue: 78000001, maxValue: 135000000, symbol: new SimpleFillSymbol({ color: [153, 52, 4], style: "solid", outline: { color: "white", width: 1 } }) }
        ]
    });

    const communesRenderer = new UniqueValueRenderer({
        field: "PREFECTURE",
        uniqueValueInfos: [
            {
                value: "PREFECTURE DE CASABLANCA",
                symbol: {
                    type: "simple-fill",
                    color: [255, 252, 212, 0.5],
                    outline: {
                        color: "red",
                        width: 1
                    }
                },
                label: "Prefecture de Casablanca"
            },
            {
                value: "PREFECTURE DE MOHAMMEDIA",
                symbol: {
                    type: "simple-fill",
                    color: [13, 38, 68, 0.5],
                    outline: {
                        color: "red",
                        width: 1
                    }
                },
                label: "Prefecture de Mohammedia"
            },
            {
                value: "PROVINCE DE BEN SLIMANE",
                symbol: {
                    type: "simple-fill",
                    color: [0, 100, 0, 0.5],
                    outline: {
                        color: "red",
                        width: 1
                    }
                },
                label: "Province de Ben Slimane"
            },
            {
                value: "PROVINCE DE MEDIOUNA",
                symbol: {
                    type: "simple-fill",
                    color: [255, 215, 0, 0.5],
                    outline: {
                        color: "red",
                        width: 1
                    }
                },
                label: "Province de Mediouna"
            },
            {
                value: "PROVINCE DE NOUACEUR",
                symbol: {
                    type: "simple-fill",
                    color: [138, 43, 226, 0.5],
                    outline: {
                        color: "red",
                        width: 1
                    }
                },
                label: "Province de Nouaceur"
            }
        ]
    });

    const communesLayer = new FeatureLayer({
        url: "https://services9.arcgis.com/j9Cwpg1kdJBl1jL4/arcgis/rest/services/commune_casablanca/FeatureServer/0",
        outFields: ["PREFECTURE", "COMMUNE_AR", "Shape_Area"],
        popupTemplate: popupCommune,
        renderer:noRenderer
    });

    map.add(communesLayer);

    document.getElementById("symbologySelect").addEventListener("change", function(event) {
        const selectedValue = event.target.value;
        if (selectedValue === "area") {
            communesLayer.renderer = commRenderer;
        } else if (selectedValue === "prefecture") {
            communesLayer.renderer = communesRenderer;
        }else {
            communesLayer.renderer = noRenderer;
        }
    });
});
