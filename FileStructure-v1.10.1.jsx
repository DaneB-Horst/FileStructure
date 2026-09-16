// ======================
// 🔧 Made by Dane 🔧
// File Structure v1.10.1
// ======================

(function buildUI(thisObj) {

    function runSetup(type) {
        app.beginUndoGroup("Switch to " + type + " Setup");

        var proj = app.project;
        if (!proj) {
            alert("No project open.");
            app.endUndoGroup();
            return;
        }

        // ======================
        // FOLDER HELPERS
        // ======================

        function findFolder(name, parent) {
            for (var i = 1; i <= proj.numItems; i++) {
                var item = proj.item(i);

                if (item instanceof FolderItem && item.name === name) {
                    if (
                        (parent && item.parentFolder === parent) ||
                        (!parent && item.parentFolder === proj.rootFolder)
                    ) {
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

                if (parent) {
                    folder.parentFolder = parent;
                }
            }

            return folder;
        }

        function nameInArray(name, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === name) {
                    return true;
                }
            }

            return false;
        }

        // ======================
        // TARGET FOLDER RULES
        // ======================

        function getAllowedFolderNames(type) {

            var common = [
                "01_ASSETS",
                "02_COMPS",
                "03_SOLIDS",
                "06_EXPORTS"
            ];

            if (type === "Basic") {
                return common.concat([
                    "Images",
                    "Video",
                    "Audio",
                    "SVG",
                    "AI",
                    "3D_RENDERS",
                    "MAIN",
                    "PRECOMPS"
                ]);
            }

            if (type === "Advanced") {
                return common.concat([
                    "04_PRESETS",
                    "05_REFERENCES",
                    "Images",
                    "Video",
                    "Audio",
                    "SVG",
                    "AI",
                    "3D_RENDERS",
                    "MAIN",
                    "PRECOMPS",
                    "RENDERS"
                ]);
            }

            if (type === "Broadcast") {
                return common.concat([
                    "04_PRERENDERS",
                    "05_REFERENCES",
                    "07_VERSIONS",
                    "Footage",
                    "Stock",
                    "Plates",
                    "Audio",
                    "GFX",
                    "Fonts",
                    "MASTER",
                    "SCENES",
                    "PRECOMPS",
                    "Client",
                    "Broadcast",
                    "Social",
                    "3D_RENDERS"
                ]);
            }

            return common;
        }

        function isAllowedFolderName(name, type) {

            // Scene folders are valid only for 3D render organization.
            if (/^Scene(0[1-9]|10)$/.test(name)) {
                return true;
            }

            return nameInArray(name, getAllowedFolderNames(type));
        }

        // ======================
        // FLATTEN UNKNOWN FOLDERS
        // ======================

        function flattenUnknownFolders(type) {

            var changed = true;
            var safety = 0;

            while (changed && safety < 100) {
                changed = false;
                safety++;

                // Work backwards because folders may be removed.
                for (var i = proj.numItems; i >= 1; i--) {

                    var item = proj.item(i);

                    if (
                        item instanceof FolderItem &&
                        !isAllowedFolderName(item.name, type)
                    ) {

                        var targetParent = item.parentFolder;

                        // Move everything out first.
                        while (item.numItems > 0) {
                            item.item(1).parentFolder = targetParent;
                        }

                        // Then remove the now-empty folder.
                        if (item.numItems === 0) {
                            item.remove();
                            changed = true;
                        }
                    }
                }
            }
        }

        // ======================
        // REMOVE LEFTOVER / MISPLACED EMPTY FOLDERS
        // ======================

        function isCanonicalFolder(folder, type) {

            var root = proj.rootFolder;
            var parent = folder.parentFolder;
            var name = folder.name;

            // Root folders
            if (
                name === "01_ASSETS" ||
                name === "02_COMPS" ||
                name === "03_SOLIDS" ||
                name === "06_EXPORTS"
            ) {
                return parent === root;
            }

            if (type === "Advanced") {
                if (name === "04_PRESETS" || name === "05_REFERENCES") {
                    return parent === root;
                }
            }

            if (type === "Broadcast") {
                if (
                    name === "04_PRERENDERS" ||
                    name === "05_REFERENCES" ||
                    name === "07_VERSIONS"
                ) {
                    return parent === root;
                }
            }

            var assets = findFolder("01_ASSETS");
            var comps = findFolder("02_COMPS");
            var exports = findFolder("06_EXPORTS");

            // Asset folders
            if (assets) {

                if (type === "Basic") {
                    if (
                        name === "Images" ||
                        name === "Video" ||
                        name === "Audio" ||
                        name === "SVG" ||
                        name === "AI" ||
                        name === "3D_RENDERS"
                    ) {
                        return parent === assets;
                    }
                }

                if (type === "Advanced") {
                    if (
                        name === "Images" ||
                        name === "Video" ||
                        name === "Audio" ||
                        name === "SVG" ||
                        name === "AI" ||
                        name === "3D" ||
                        name === "3D_RENDERS"
                    ) {
                        return parent === assets;
                    }
                }

                if (type === "Broadcast") {

                    if (
                        name === "Audio" ||
                        name === "GFX" ||
                        name === "Fonts" ||
                        name === "3D_RENDERS"
                    ) {
                        return parent === assets;
                    }

                    if (name === "Footage") {
                        return parent === assets;
                    }

                    var footage = findFolder("Footage", assets);

                    if (
                        footage &&
                        (name === "Stock" || name === "Plates")
                    ) {
                        return parent === footage;
                    }
                }

                // Scene folders are only valid directly inside 3D_RENDERS.
                if (/^Scene(0[1-9]|10)$/.test(name)) {
                    var renderFolder = findFolder("3D_RENDERS", assets);
                    return renderFolder && parent === renderFolder;
                }
            }

            // Comp folders
            if (comps) {

                if (type === "Basic" || type === "Advanced") {
                    if (name === "MAIN" || name === "PRECOMPS") {
                        return parent === comps;
                    }

                    if (type === "Advanced" && name === "RENDERS") {
                        return parent === comps;
                    }
                }

                if (type === "Broadcast") {
                    if (
                        name === "MASTER" ||
                        name === "SCENES" ||
                        name === "PRECOMPS"
                    ) {
                        return parent === comps;
                    }
                }
            }

            // Export folders
            if (type === "Broadcast" && exports) {
                if (
                    name === "Client" ||
                    name === "Broadcast" ||
                    name === "Social"
                ) {
                    return parent === exports;
                }
            }

            return false;
        }

        function removeEmptyUnknownFolders(type) {

            var removed = true;
            var safety = 0;

            while (removed && safety < 100) {
                removed = false;
                safety++;

                for (var i = proj.numItems; i >= 1; i--) {

                    var item = proj.item(i);

                    if (
                        item instanceof FolderItem &&
                        item.numItems === 0 &&
                        !isCanonicalFolder(item, type)
                    ) {
                        item.remove();
                        removed = true;
                    }
                }
            }
        }

        // ======================
        // MERGE DEFAULT AE SOLIDS
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
        // FILE HELPERS
        // ======================

        function getItemFileName(item) {

            if (item.file) {
                return item.file.name;
            }

            // Useful for offline / missing footage where the file
            // object may not be available.
            return item.name;
        }

        function getExtension(fileName) {

            if (!fileName) {
                return "";
            }

            var dot = fileName.lastIndexOf(".");

            if (dot === -1 || dot === fileName.length - 1) {
                return "";
            }

            return fileName.substring(dot + 1).toLowerCase();
        }

        function extensionInList(ext, list) {
            return nameInArray(ext, list);
        }

        // ======================
        // DETECT 3D RENDER SCENES
        // ======================

        function getSceneFolderName(fileName) {

            if (!fileName) {
                return null;
            }

            // Matches:
            // logo-scene01
            // logo scene01
            // logo_scene01
            // logo-scene-01
            // logo scene 01
            var match = fileName.match(/scene[\s\-_]*(0?[1-9]|10)(?=[^0-9]|$)/i);

            if (!match) {
                return null;
            }

            var number = parseInt(match[1], 10);

            if (number < 1 || number > 10) {
                return null;
            }

            return "Scene" + (number < 10 ? "0" + number : number);
        }

        // ======================
        // COMP JOB CODE DETECTION
        // ======================

        function compHasJobCode(comp) {

            if (!comp || !comp.name) {
                return false;
            }

            var name = comp.name;

            // Job codes normally start with letters followed directly by numbers.
            // Examples:
            // HWSB0958
            // AHWBM2144
            //
            // This also works when the script has added information after the
            // job code, for example:
            // HWSB0958-1920x1080-15s
            // AHWBM2144_1080x1920_30s
            //
            // 2-8 letters followed by 3-8 numbers.
            // The job code must be at the START of the comp name so that
            // names such as "Scene01" are not accidentally treated as jobs.

            var pattern = /^[A-Z]{2,8}[0-9]{3,8}(?=$|[-_ .])/i;

            return pattern.test(name);
        }

        // ======================
        // AUTO ORGANIZE
        // ======================

        function organizeAssets(type, assetsFolder, compsFolder, solidsFolder) {

            var imageFolder = findFolder("Images", assetsFolder);
            var videoFolder = findFolder("Video", assetsFolder);
            var audioFolder = findFolder("Audio", assetsFolder);
            var svgFolder = findFolder("SVG", assetsFolder);
            var aiFolder = findFolder("AI", assetsFolder);
            var renders3DFolder = getOrCreateFolder("3D_RENDERS", assetsFolder);

            var precompFolder = findFolder("PRECOMPS", compsFolder);
            var mainFolder = findFolder("MAIN", compsFolder);

            // Broadcast folders
            var broadcastAudioFolder = findFolder("Audio", assetsFolder);
            var broadcastGFXFolder = findFolder("GFX", assetsFolder);
            var broadcastFootageFolder = findFolder("Footage", assetsFolder);

            // Broader extension support for messy / older projects.
            var imageExt = [
                "png", "jpg", "jpeg", "jpe",
                "tif", "tiff",
                "psd", "psb",
                "gif", "bmp",
                "exr", "dpx", "cin",
                "rla", "rpf",
                "hdr", "heic", "heif",
                "webp", "tga"
            ];

            var videoExt = [
                "mp4", "mov", "avi",
                "mxf", "mkv", "webm",
                "m4v", "mpg", "mpeg",
                "mts", "m2ts", "ts",
                "wmv", "flv", "vob",
                "braw"
            ];

            var audioExt = [
                "mp3", "wav", "wave",
                "aif", "aiff",
                "ogg", "m4a",
                "aac", "flac",
                "wma"
            ];

            for (var i = 1; i <= proj.numItems; i++) {

                var item = proj.item(i);

                // ======================
                // SOLIDS
                // ======================

                if (
                    item instanceof FootageItem &&
                    item.mainSource instanceof SolidSource &&
                    solidsFolder
                ) {
                    item.parentFolder = solidsFolder;
                    continue;
                }

                // ======================
                // FOOTAGE
                // ======================

                if (item instanceof FootageItem) {

                    var fileName = getItemFileName(item);
                    var lowerName = fileName.toLowerCase();
                    var ext = getExtension(lowerName);

                    // Image sequences go into 3D_RENDERS.
                    // Scene names such as logo-scene01 are also placed into
                    // their matching Scene01-Scene10 folder.
                    var sceneFolderName = getSceneFolderName(fileName);
                    var isImageSequence = false;

                    if (extensionInList(ext, imageExt)) {
                        try {
                            isImageSequence = item.mainSource && item.mainSource.isStill === false;
                        } catch (sequenceError) {
                            isImageSequence = false;
                        }
                    }

                    if (sceneFolderName && extensionInList(ext, imageExt)) {
                        var sceneFolder = getOrCreateFolder(sceneFolderName, renders3DFolder);
                        item.parentFolder = sceneFolder;
                        continue;
                    }

                    if (isImageSequence) {
                        item.parentFolder = renders3DFolder;
                        continue;
                    }

                    if (type === "Broadcast") {

                        if (extensionInList(ext, audioExt) && broadcastAudioFolder) {
                            item.parentFolder = broadcastAudioFolder;
                        }
                        else if (extensionInList(ext, videoExt) && broadcastFootageFolder) {
                            item.parentFolder = broadcastFootageFolder;
                        }
                        else if (
                            (
                                extensionInList(ext, imageExt) ||
                                ext === "svg" ||
                                ext === "ai"
                            ) &&
                            broadcastGFXFolder
                        ) {
                            item.parentFolder = broadcastGFXFolder;
                        }

                        continue;
                    }

                    if (ext === "svg" && svgFolder) {
                        item.parentFolder = svgFolder;
                    }
                    else if (ext === "ai" && aiFolder) {
                        item.parentFolder = aiFolder;
                    }
                    else if (extensionInList(ext, imageExt) && imageFolder) {
                        item.parentFolder = imageFolder;
                    }
                    else if (extensionInList(ext, videoExt) && videoFolder) {
                        item.parentFolder = videoFolder;
                    }
                    else if (extensionInList(ext, audioExt) && audioFolder) {
                        item.parentFolder = audioFolder;
                    }
                }

                // ======================
                // COMPS
                // ======================

                if (item instanceof CompItem && precompFolder) {

                    var hasJobCode = compHasJobCode(item);

                    if (type === "Broadcast") {

                        // Broadcast uses MASTER for job-code comps and PRECOMPS for all others.
                        var masterFolder = findFolder("MASTER", compsFolder);

                        if (hasJobCode && masterFolder) {
                            item.parentFolder = masterFolder;
                        }
                        else {
                            item.parentFolder = precompFolder;
                        }
                    }
                    else {

                        // Job-code comps -> MAIN. Everything else -> PRECOMPS.
                        if (hasJobCode && mainFolder) {
                            item.parentFolder = mainFolder;
                        }
                        else {
                            item.parentFolder = precompFolder;
                        }
                    }
                }
            }
        }

        // ======================
        // NORMALIZE OLD ROOT FOLDERS
        // ======================

        (function normalizeFolders() {

            var mappings = [
                { oldName: "03_EXPORTS", newName: "06_EXPORTS" }
            ];

            for (var i = 0; i < mappings.length; i++) {

                var oldFolder = findFolder(mappings[i].oldName);
                var newFolder = findFolder(mappings[i].newName);

                if (oldFolder && !newFolder && oldFolder.numItems === 0) {
                    oldFolder.name = mappings[i].newName;
                }
            }
        })();

        // ======================
        // CLEAN MESSY STRUCTURE FIRST
        // ======================

        flattenUnknownFolders(type);

        // ======================
        // BUILD STRUCTURE
        // ======================

        var assets;
        var comps;
        var solids;
        var exports;

        if (type === "Basic") {

            assets = getOrCreateFolder("01_ASSETS");
            comps = getOrCreateFolder("02_COMPS");
            solids = getOrCreateFolder("03_SOLIDS");
            exports = getOrCreateFolder("06_EXPORTS");

            getOrCreateFolder("Images", assets);
            getOrCreateFolder("Video", assets);
            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("SVG", assets);
            getOrCreateFolder("AI", assets);
            getOrCreateFolder("3D_RENDERS", assets);

            getOrCreateFolder("MAIN", comps);
            getOrCreateFolder("PRECOMPS", comps);
        }

        if (type === "Advanced") {

            assets = getOrCreateFolder("01_ASSETS");
            comps = getOrCreateFolder("02_COMPS");
            solids = getOrCreateFolder("03_SOLIDS");

            getOrCreateFolder("04_PRESETS");
            getOrCreateFolder("05_REFERENCES");
            exports = getOrCreateFolder("06_EXPORTS");

            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("Video", assets);
            getOrCreateFolder("Images", assets);
            getOrCreateFolder("SVG", assets);
            getOrCreateFolder("AI", assets);
            getOrCreateFolder("3D_RENDERS", assets);

            getOrCreateFolder("MAIN", comps);
            getOrCreateFolder("PRECOMPS", comps);
            getOrCreateFolder("RENDERS", comps);
        }

        if (type === "Broadcast") {

            assets = getOrCreateFolder("01_ASSETS");
            comps = getOrCreateFolder("02_COMPS");
            solids = getOrCreateFolder("03_SOLIDS");

            getOrCreateFolder("04_PRERENDERS");
            getOrCreateFolder("05_REFERENCES");
            exports = getOrCreateFolder("06_EXPORTS");
            getOrCreateFolder("07_VERSIONS");

            var footage = getOrCreateFolder("Footage", assets);
            getOrCreateFolder("Stock", footage);
            getOrCreateFolder("Plates", footage);

            getOrCreateFolder("Audio", assets);
            getOrCreateFolder("GFX", assets);
            getOrCreateFolder("Fonts", assets);
            getOrCreateFolder("3D_RENDERS", assets);

            getOrCreateFolder("MASTER", comps);
            getOrCreateFolder("SCENES", comps);
            getOrCreateFolder("PRECOMPS", comps);

            getOrCreateFolder("Client", exports);
            getOrCreateFolder("Broadcast", exports);
            getOrCreateFolder("Social", exports);
        }

        // ======================
        // ORGANIZE EVERYTHING
        // ======================

        mergeSolidsFolder();
        organizeAssets(type, assets, comps, solids);

        // Files have now moved, so some messy folders that previously
        // contained items may have become empty. Remove them now.
        removeEmptyUnknownFolders(type);

        app.endUndoGroup();
    }

    // ======================
    // UI
    // ======================

    var panel = (thisObj instanceof Panel)
        ? thisObj
        : new Window(
            "palette",
            "Studio Setup",
            undefined,
            { resizeable: true }
        );

    panel.orientation = "column";
    panel.alignChildren = ["fill", "top"];

    panel.add("statictext", undefined, "Folder Setup");

    var btnBasic = panel.add("button", undefined, "Basic Setup");
    var btnAdvanced = panel.add("button", undefined, "Advanced Setup");
    var btnBroadcast = panel.add("button", undefined, "Broadcast Setup");

    btnBasic.onClick = function () {
        runSetup("Basic");
    };

    btnAdvanced.onClick = function () {
        runSetup("Advanced");
    };

    btnBroadcast.onClick = function () {
        runSetup("Broadcast");
    };

    panel.layout.layout(true);
    panel.layout.resize();

    panel.onResizing = panel.onResize = function () {
        this.layout.resize();
    };

    if (panel instanceof Window) {
        panel.center();
        panel.show();
    }

})(this);
