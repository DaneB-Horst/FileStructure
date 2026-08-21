// ======================
// 🔧 Made by Dane 🔧
// ======================

(function buildUI(thisObj) {

    function runSetup(type) {
        app.beginUndoGroup("Switch to " + type + " Setup");

        var proj = app.project;
        if (!proj) {
            alert("No project open.");
            return;
        }

        function findFolder(name, parent) {
            for (var i = 1; i <= proj.numItems; i++) {
                var item = proj.item(i);
                if (item instanceof FolderItem && item.name === name) {
                    if ((parent && item.parentFolder === parent) || (!parent && item.parentFolder === proj.rootFolder)) {
                        return item;
                    }
                }
            }
            return null;
        }

        function getOrCreateFolder(name, parent) {
            var folder = findFolder(name, parent);
            if (!folder) {
                folder = proj.items.addFolder(name);
                if (parent) folder.parentFolder = parent;
            }
            return folder;
        }

        // ======================
        // 🔧 FLATTEN FOLDER
        // ======================
        function flattenFolder(name) {
            var folder = findFolder(name);
            if (!folder) return;

            while (folder.numItems > 0) {
                folder.item(1).parentFolder = folder.parentFolder;
            }

            if (folder.numItems === 0) {
                folder.remove();
            }
        }

        // ======================
        // 🔧 MERGE DEFAULT SOLIDS
        // ======================
        function mergeSolidsFolder() {

            var oldSolids = findFolder("Solids");
            var newSolids = findFolder("03_SOLIDS");

            if (oldSolids && newSolids && oldSolids !== newSolids) {

                while (oldSolids.numItems > 0) {
                    oldSolids.item(1).parentFolder = newSolids;
                }

                if (oldSolids.numItems === 0) {
                    oldSolids.remove();
                }
            }
        }

        // ======================
        // 🔧 CLEAN UNKNOWN FOLDERS
        // ======================
        function cleanUnknownFolders() {

            var allowed = [
                "01_ASSETS","02_COMPS","03_SOLIDS","04_PRESETS","05_REFERENCES",
                "06_EXPORTS","07_VERSIONS","04_PRERENDERS",
                "Images","Video","Audio","SVG","AI","3D",
                "MAIN","PRECOMPS","RENDERS",
                "Footage","Stock","Plates","GFX","Fonts",
                "MASTER","SCENES",
                "Client","Broadcast","Social"
            ];

            for (var i = proj.numItems; i >= 1; i--) {
                var item = proj.item(i);

                if (item instanceof FolderItem) {
                    var isAllowed = false;

                    for (var j = 0; j < allowed.length; j++) {
                        if (item.name === allowed[j]) {
                            isAllowed = true;
                            break;
                        }
                    }

                    if (!isAllowed && item.numItems === 0) {
                        item.remove();
                    }
                }
            }
        }

        // ======================
        // 🔧 AUTO ORGANIZE
        // ======================
        function organizeAssets(assetsFolder, compsFolder) {

            var imageFolder = findFolder("Images", assetsFolder);
            var videoFolder = findFolder("Video", assetsFolder);
            var audioFolder = findFolder("Audio", assetsFolder);
            var svgFolder = findFolder("SVG", assetsFolder);
            var aiFolder = findFolder("AI", assetsFolder);

            var precompFolder = findFolder("PRECOMPS", compsFolder);
            var mainFolder = findFolder("MAIN", compsFolder);

            var imageExt = ["png","jpg","jpeg","tif","tiff","psd","gif","bmp","exr"];
            var videoExt = ["mp4","mov","avi","mxf","mkv","webm"];
            var audioExt = ["mp3","wav","aif","aiff","ogg"];

            for (var i = 1; i <= proj.numItems; i++) {
                var item = proj.item(i);

                if (item instanceof FootageItem && item.file) {
                    var fileName = item.file.name.toLowerCase();
                    var ext = fileName.split(".").pop();

                    if (ext === "svg" && svgFolder) item.parentFolder = svgFolder;
                    else if (ext === "ai" && aiFolder) item.parentFolder = aiFolder;
                    else if (imageExt.indexOf(ext) !== -1 && imageFolder) item.parentFolder = imageFolder;
                    else if (videoExt.indexOf(ext) !== -1 && videoFolder) item.parentFolder = videoFolder;
                    else if (audioExt.indexOf(ext) !== -1 && audioFolder) item.parentFolder = audioFolder;
                }

                if (item instanceof CompItem && precompFolder) {

                    var isUsed = false;

                    for (var j = 1; j <= proj.numItems; j++) {
                        var other = proj.item(j);

                        if (other instanceof CompItem && other !== item) {
                            for (var k = 1; k <= other.numLayers; k++) {
                                if (other.layer(k).source === item) {
                                    isUsed = true;
                                    break;
                                }
                            }
                        }
                        if (isUsed) break;
                    }

                    if (isUsed) item.parentFolder = precompFolder;
                    else if (mainFolder) item.parentFolder = mainFolder;
                }
            }
        }

        // ======================
        // 🔥 MODE SWITCH CLEANUP
        // ======================
        if (type === "Basic") {

            flattenFolder("04_PRESETS");
            flattenFolder("05_REFERENCES");
            flattenFolder("07_VERSIONS");
            flattenFolder("04_PRERENDERS");
            flattenFolder("RENDERS");
        }

        if (type === "Advanced") {

            flattenFolder("04_PRERENDERS");
            flattenFolder("07_VERSIONS");
        }

        cleanUnknownFolders();

        // ======================
        // BUILD STRUCTURE
        // ======================
        if (type === "Basic") {

            var assets = getOrCreateFolder("01_ASSETS");
            var comps = getOrCreateFolder("02_COMPS");
            getOrCreateFolder("03_SOLIDS");
            getOrCreateFolder("06_EXPORTS");

            getOrCreateFolder("Images", assets);
            getOrCreateFolder("Video", assets);
            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("SVG", assets);
            getOrCreateFolder("AI", assets);

            getOrCreateFolder("MAIN", comps);
            getOrCreateFolder("PRECOMPS", comps);

            mergeSolidsFolder();
            organizeAssets(assets, comps);
        }

        if (type === "Advanced") {

            var assets = getOrCreateFolder("01_ASSETS");
            var comps = getOrCreateFolder("02_COMPS");
            getOrCreateFolder("03_SOLIDS");
            getOrCreateFolder("04_PRESETS");
            getOrCreateFolder("05_REFERENCES");
            var exports = getOrCreateFolder("06_EXPORTS");

            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("Video", assets);
            getOrCreateFolder("Images", assets);
            getOrCreateFolder("SVG", assets);
            getOrCreateFolder("AI", assets);
            getOrCreateFolder("3D", assets);

            getOrCreateFolder("MAIN", comps);
            getOrCreateFolder("PRECOMPS", comps);
            getOrCreateFolder("RENDERS", comps);

            mergeSolidsFolder();
            organizeAssets(assets, comps);
        }

        if (type === "Broadcast") {

            var assets = getOrCreateFolder("01_ASSETS");
            var comps = getOrCreateFolder("02_COMPS");
            getOrCreateFolder("03_SOLIDS");
            getOrCreateFolder("04_PRERENDERS");
            getOrCreateFolder("05_REFERENCES");
            var exports = getOrCreateFolder("06_EXPORTS");
            getOrCreateFolder("07_VERSIONS");

            var footage = getOrCreateFolder("Footage", assets);
            getOrCreateFolder("Stock", footage);
            getOrCreateFolder("Plates", footage);

            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("GFX", assets);
            getOrCreateFolder("Fonts", assets);

            getOrCreateFolder("MASTER", comps);
            getOrCreateFolder("SCENES", comps);
            getOrCreateFolder("PRECOMPS", comps);

            getOrCreateFolder("Client", exports);
            getOrCreateFolder("Broadcast", exports);
            getOrCreateFolder("Social", exports);

            mergeSolidsFolder();
        }

        app.endUndoGroup();
    }

    var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Studio Setup", undefined, {resizeable:true});
    panel.orientation = "column";
    panel.alignChildren = ["fill", "top"];

    panel.add("statictext", undefined, "Folder Setup");

    var btnBasic = panel.add("button", undefined, "Basic Setup");
    var btnAdvanced = panel.add("button", undefined, "Advanced Setup");
    var btnBroadcast = panel.add("button", undefined, "Broadcast Setup");

    btnBasic.onClick = function () { runSetup("Basic"); };
    btnAdvanced.onClick = function () { runSetup("Advanced"); };
    btnBroadcast.onClick = function () { runSetup("Broadcast"); };

    panel.layout.layout(true);
    panel.layout.resize();
    panel.onResizing = panel.onResize = function () { this.layout.resize(); };

    if (panel instanceof Window) {
        panel.center();
        panel.show();
    }

})(this);