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
    "esri/renderers/UniqueValueRenderer",
    "esri/renderers/PieChartRenderer"
], function (
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
    UniqueValueRenderer,
    PieChartRenderer
) {

    esriConfig.apiKey = "AAPK1ab27aa020f449b4a6c8260c74094bdc3qGL8Egvdq7O7GCrTqOZQKj1NRDxqGBu6StxC5RB0dU6xTLP9zSfQBQ5942TQQHg";

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


    var popupPopulation = new PopupTemplate({
        title: "<b>Population de : {ARRONDISSE}</b>",
        content: [{
            type: "media",
            mediaInfos: [{
                type: "column-chart",
                caption: "Statistiques de la population",
                value: {
                    fields: ["TOTAL1994", "TOTAL2004"],
                    normalizeField: null,
                    tooltipField: ""
                }
            }]
        }]
    });

    let popRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            size: 15,
            color: "green",
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }
    };

    const sizeVisualVariable04 = {
        type: "size",
        field: "TOTAL2004",
        minDataValue: 3365,
        maxDataValue: 323944,
        minSize: 8,
        maxSize: 30
    };

    const sizeVisualVariable94 = {
        type: "size",
        field: "TOTAL1994",
        minDataValue: 808,
        maxDataValue: 55754,
        minSize: 8,
        maxSize: 30
    };




    //popRenderer.visualVariables = [ sizeVisualVariable ];

    const populationLayer = new FeatureLayer({
        url: "https://services9.arcgis.com/j9Cwpg1kdJBl1jL4/arcgis/rest/services/population_casa/FeatureServer/0",
        outFields: ["TOTAL1994", "TOTAL2004"],
        popupTemplate: popupPopulation,
        renderer:popRenderer

    });



    map.add(populationLayer);

    const title=document.getElementById("title");
    document.getElementById("symbologySelect").addEventListener("change", function (event) {
        const selectedValue = event.target.value;
        if (selectedValue === "pop94") {
            title.innerHTML="pop94";
            popRenderer.visualVariables = [sizeVisualVariable94];
            populationLayer.renderer = popRenderer;
        } else if (selectedValue === "pop04") {
            title.innerHTML="pop04";
            popRenderer.visualVariables = [sizeVisualVariable04];
            populationLayer.renderer = popRenderer;
        } else if (selectedValue === "pop-evo") {
            title.innerHTML="pop-evo";
            popRenderer.visualVariables = null;
            // const renderer = new PieChartRenderer();
            populationLayer.renderer = {
                type: "pie-chart", // autocasts as new PieChartRenderer()
                attributes: [
                    {
                        field: "TOTAL2004",
                        label: "Population 2004",
                        color: "red",
                    },
                    {

                        field: "TOTAL1994",
                        label: "Population 1994",
                        color: "blue"
                    }]
            }
        } else {
            title.innerHTML="pop";
            popRenderer.visualVariables = null;
            populationLayer.renderer = popRenderer;
        }
    });
});
