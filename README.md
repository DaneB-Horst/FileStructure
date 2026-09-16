# After Effects Project Folder Structure Script

An Adobe After Effects script that automatically creates and organizes project folder structures for different production workflows.

Designed for motion designers, editors, and studios that want clean, consistent project organization with a single click.

Created by Dane.

---

## Features

* One-click project setup
* Three workflow presets:

  * **Basic**
  * **Advanced**
  * **Broadcast**
* Automatic asset sorting
* Automatic comp organization
* Solids folder merging
* Cleanup of unused folders
* Safe mode switching between setups
* Dockable After Effects panel

The script builds standardized folder structures and automatically organizes imported files by type.

---

## Installation

1. Download the `.jsx` file.
2. Copy it to:

### Windows

```text
C:\Program Files\Adobe\Adobe After Effects\Support Files\Scripts\ScriptUI Panels\
```

### Mac

```text
/Applications/Adobe After Effects/Scripts/ScriptUI Panels/
```

3. Restart After Effects.
4. Open the panel:

```text
Window → Studio Setup
```

The script creates a dockable panel with three setup buttons.

---

## Folder Structures

### Basic Setup

Ideal for:

* Social media content
* Simple motion graphics
* Small projects

```text
01_ASSETS
├── Images
├── Video
├── Audio
├── SVG
└── AI

02_COMPS
├── MAIN
└── PRECOMPS

03_SOLIDS
06_EXPORTS
```

Created automatically by the script.

---

### Advanced Setup

Ideal for:

* Larger motion graphics projects
* Multiple deliverables
* Projects using 3D assets

```text
01_ASSETS
├── Images
├── Video
├── Audio
├── SVG
├── AI
└── 3D

02_COMPS
├── MAIN
├── PRECOMPS
└── RENDERS

03_SOLIDS
04_PRESETS
05_REFERENCES
06_EXPORTS
```

Generated automatically by the Advanced preset.

---

### Broadcast Setup

Ideal for:

* TV production
* Commercial work
* Large studio pipelines

```text
01_ASSETS
├── Footage
│   ├── Stock
│   └── Plates
├── Audio
├── GFX
└── Fonts

02_COMPS
├── MASTER
├── SCENES
└── PRECOMPS

03_SOLIDS
04_PRERENDERS
05_REFERENCES

06_EXPORTS
├── Client
├── Broadcast
└── Social

07_VERSIONS
```

Generated automatically by the Broadcast preset.

---

## Automatic Organization

### Assets

Imported files are automatically sorted into folders based on extension:

| Type        | Extensions                                    |
| ----------- | --------------------------------------------- |
| Images      | png, jpg, jpeg, tif, tiff, psd, gif, bmp, exr |
| Video       | mp4, mov, avi, mxf, mkv, webm, braw           |
| Audio       | mp3, wav, aif, aiff, ogg                      |
| Vector      | svg                                           |
| Illustrator | ai                                            |

---

### Compositions

The script automatically detects:

* **Precomps** → moved into `PRECOMPS`
* **Main comps** → moved into `MAIN`

This is determined by checking whether a comp is used inside another composition.

---

## Cleanup Features

The script includes automatic maintenance tools:

* Removes empty unknown folders
* Merges duplicate Solids folders
* Cleans old setup structures
* Safely switches between project presets

---

## Usage

1. Open an After Effects project.
2. Launch **Studio Setup** from the Window menu.
3. Select:

   * Basic
   * Advanced
   * Broadcast
4. The script creates and organizes your project automatically.

---

## Compatibility

* Adobe After Effects
* ExtendScript (.jsx)
* Works as a ScriptUI Panel

---

## Future Ideas

* Custom templates
* User-defined folder structures
* Preset saving
* Project naming automation
* Render queue integration

---

## License

MIT License

---

## Author

**Dane**

Built to make After Effects projects faster, cleaner, and more consistent.
