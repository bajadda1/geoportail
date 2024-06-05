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
    "esri/widgets/Editor"
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
    Editor
) {
    esriConfig.apiKey =
        "AAPK1ab27aa020f449b4a6c8260c74094bdc3qGL8Egvdq7O7GCrTqOZQKj1NRDxqGBu6StxC5RB0dU6xTLP9zSfQBQ5942TQQHg"

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

    // Add the Search widget
    const search = new Search({
        view: view,
    });
    const searchExpand = new Expand({
        view: view,
        content: search,
        expanded: true // Set to true to start expanded
    });
    view.ui.add(searchExpand, "top-right");

    // Add the Measurement widget
    const measurement = new Measurement({
        view: view,
        activeTool: "distance"
    });
    const measurementExpand = new Expand({
        view: view,
        content: measurement,
        expanded: true // Set to true to start expanded
    });
    view.ui.add(measurementExpand, "top-right");

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

    let recRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            size: 15,
            color: "cyan",
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }
    };

    // Ajout de la couche de la commune
    const reclamationLayer = new FeatureLayer({
        url:"https://services9.arcgis.com/j9Cwpg1kdJBl1jL4/arcgis/rest/services/reclamations/FeatureServer/0",
        renderer:recRenderer
    });
    map.add(reclamationLayer);

    // Configuration du widget Editor
    const editor = new Editor({
        view: view,
        layerInfos: [
            {
                layer: reclamationLayer,
                formTemplate: {
                    elements: [
                        {
                            type: "field",
                            fieldName: "Mail",
                            label: "Mail"
                        },
                        {
                            type: "field",
                            fieldName: "Objet",
                            label: "Objet",
                        },
                        {
                            type: "field",
                            fieldName: "Message",
                            label: "Message",
                        },
                        {
                            type: "field",
                            fieldName: "Demarche_d",
                            label: "Demarche_d",
                        },
                    ],
                },
                enabled: true,
                addEnabled: true,
                updateEnabled: true,
                deleteEnabled: true,
                attributeUpdatesEnabled: true,
                geometryUpdatesEnabled: true,
                attachmentsOnCreateEnabled: true,
                attachmentsOnUpdateEnabled: true,
            },
        ],
    });

    // Wrap the Editor widget with the Expand widget and add it to the view
    const editorExpand = new Expand({
        view: view,
        content: editor,
        expanded: true // Set to true to start expanded
    });

    view.ui.add(editorExpand, "top-right");
});
