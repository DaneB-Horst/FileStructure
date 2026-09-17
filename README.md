# After Effects Project Folder Structure Script

An Adobe After Effects ScriptUI panel that automatically creates, cleans, and organizes standardized project folder structures for different production workflows.

Designed for motion designers, editors, and studios that want clean, consistent After Effects projects with a single click.

**Created by Dane.**

---

## Features

* One-click project setup
* Three workflow presets:

  * **Basic**
  * **Advanced**
  * **Broadcast**
* Automatic asset organization
* Automatic composition organization
* Automatic 3D render organization
* Job-code detection for compositions
* Solids folder consolidation
* Cleanup of unknown and empty folders
* Automatic migration of older folder names
* Safe switching between setup types
* Dockable After Effects ScriptUI panel
* Supports existing and messy projects

The script can be used both when starting a new project and when cleaning up an existing After Effects project.

---

## Installation

### Windows

1. Download the `.jsx` file.
2. Copy it to:

```text
C:\Program Files\Adobe\Adobe After Effects\Support Files\Scripts\ScriptUI Panels\
```

### Mac

1. Download the `.jsx` file.
2. Copy it to:

```text
/Applications/Adobe After Effects/Scripts/ScriptUI Panels/
```

3. Restart After Effects.
4. Open the panel from:

```text
Window → Studio Setup
```

The script opens as a dockable **Studio Setup** panel with three setup buttons:

* Basic Setup
* Advanced Setup
* Broadcast Setup

---

# Folder Structures

## Basic Setup

The Basic setup is designed for simpler motion graphics and general-purpose projects.

### Structure

```text
01_ASSETS
├── Images
├── Video
├── Audio
├── SVG
├── AI
└── 3D_RENDERS

02_COMPS
├── MAIN
└── PRECOMPS

03_SOLIDS

06_EXPORTS
```

### Suitable for

* Social media content
* Simple motion graphics
* General After Effects projects
* Smaller productions
* Projects requiring basic 3D render organization

---

## Advanced Setup

The Advanced setup adds additional folders for larger and more complex motion graphics projects.

### Structure

```text
01_ASSETS
├── Images
├── Video
├── Audio
├── SVG
├── AI
└── 3D_RENDERS

02_COMPS
├── MAIN
├── PRECOMPS
└── RENDERS

03_SOLIDS

04_PRESETS

05_REFERENCES

06_EXPORTS
```

### Suitable for

* Larger motion graphics projects
* Multiple deliverables
* Projects using presets and references
* Projects containing 3D renders
* More complex production workflows

---

## Broadcast Setup

The Broadcast setup is designed for larger productions and broadcast-oriented workflows.

### Structure

```text
01_ASSETS
├── Footage
│   ├── Stock
│   └── Plates
├── Audio
├── GFX
├── Fonts
└── 3D_RENDERS

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

### Suitable for

* Broadcast production
* TV projects
* Commercial work
* Larger studio workflows
* Projects with separate client, broadcast, and social deliverables

---

# Automatic Organization

The script doesn't only create folders. It also analyzes the contents of the current After Effects project and moves items into the appropriate folders.

---

## Asset Organization

### Basic & Advanced

Footage is organized according to file type.

### Images

Supported image formats include:

```text
png
jpg
jpeg
jpe
tif
tiff
psd
psb
gif
bmp
exr
dpx
cin
rla
rpf
hdr
heic
heif
webp
tga
```

These are placed in:

```text
01_ASSETS/Images
```

### Video

Supported video formats include:

```text
mp4
mov
avi
mxf
mkv
webm
m4v
mpg
mpeg
mts
m2ts
ts
wmv
flv
vob
braw
```

These are placed in:

```text
01_ASSETS/Video
```

### Audio

Supported audio formats include:

```text
mp3
wav
wave
aif
aiff
ogg
m4a
aac
flac
wma
```

These are placed in:

```text
01_ASSETS/Audio
```

### SVG

SVG files are placed in:

```text
01_ASSETS/SVG
```

### Illustrator

Illustrator `.ai` files are placed in:

```text
01_ASSETS/AI
```

---

# Broadcast Asset Organization

The Broadcast preset uses a different asset structure.

### Footage

Video files are placed in:

```text
01_ASSETS/Footage
```

### Audio

Audio files are placed in:

```text
01_ASSETS/Audio
```

### GFX

Images, SVG and Illustrator files are placed in:

```text
01_ASSETS/GFX
```

### Fonts

The Broadcast structure also creates:

```text
01_ASSETS/Fonts
```

---

# 3D Render Organization

The script automatically creates:

```text
01_ASSETS/3D_RENDERS
```

Image sequences are automatically detected and moved into this folder.

The script also detects scene names in filenames.

For example:

```text
logo-scene01.png
logo_scene02.png
logo scene03.png
logo-scene-04.png
```

will be organized into:

```text
3D_RENDERS
├── Scene01
├── Scene02
├── Scene03
└── Scene04
```

Scene folders from **Scene01** through **Scene10** are supported.

This allows rendered 3D image sequences to remain organized by scene.

---

# Composition Organization

The script automatically organizes compositions based on their names.

## Job-Code Detection

The script detects job codes at the beginning of a composition name.

For example:

```text
HWSB0958
AHWBM2144
HWSB0958-1920x1080-15s
AHWBM2144_1080x1920_30s
```

The expected format is:

```text
2–8 letters + 3–8 numbers
```

The job code must appear at the **start** of the composition name.

---

## Basic & Advanced

Compositions with a detected job code are moved to:

```text
02_COMPS/MAIN
```

Other compositions are moved to:

```text
02_COMPS/PRECOMPS
```

For the Advanced setup, the additional:

```text
02_COMPS/RENDERS
```

folder is also created.

---

## Broadcast

Broadcast uses a slightly different composition structure.

Compositions with a detected job code are moved to:

```text
02_COMPS/MASTER
```

All other compositions are moved to:

```text
02_COMPS/PRECOMPS
```

The Broadcast setup also creates:

```text
02_COMPS/SCENES
```

for the broadcast workflow.

---

# Solids Organization

After Effects commonly creates a default folder named:

```text
Solids
```

The script consolidates this into the standardized:

```text
03_SOLIDS
```

Any items inside the existing `Solids` folder are moved into `03_SOLIDS`.

The old `Solids` folder is then removed once it is empty.

This prevents duplicate Solids folders from building up in projects.

---

# Project Cleanup

The script can also be used to clean up an existing, messy After Effects project.

## Unknown Folder Cleanup

Folders that are not part of the selected setup are flattened.

The contents are moved out of the unknown folder and the empty folder is removed.

This helps convert older or inconsistently organized projects into the selected standardized structure.

---

## Empty Folder Cleanup

After assets have been reorganized, the script performs another cleanup pass.

Empty folders that are not part of the selected standardized structure are removed.

Canonical folders belonging to the selected setup are preserved.

---

# Switching Between Setups

The script is designed to allow you to switch between:

```text
Basic
Advanced
Broadcast
```

without manually rebuilding the project structure.

When a new setup is selected, the script:

1. Cleans up unknown folders.
2. Creates the required folder structure.
3. Organizes assets.
4. Organizes compositions.
5. Consolidates Solids.
6. Removes leftover empty folders.

Each setup is therefore applied as a complete project-organization workflow.

---

# Legacy Folder Normalization

The script also contains a small migration system for older versions of the folder structure.

For example:

```text
03_EXPORTS
```

can be renamed to:

```text
06_EXPORTS
```

when the newer folder does not already exist.

This helps maintain consistency when working with projects created using an earlier version of the script.

---

# Usage

1. Open an After Effects project.
2. Open:

```text
Window → Studio Setup
```

3. Choose one of the three options:

```text
Basic Setup
Advanced Setup
Broadcast Setup
```

4. The script automatically creates the required structure.
5. Existing project items are then organized into the appropriate folders.

The script works on the **currently open After Effects project** and will display an alert if no project is open.

---

# Workflow Example

A messy project might contain:

```text
Project
├── Footage
├── Images
├── Old Assets
├── Solids
├── Random Folder
├── Comp 01
└── HWSB0958-1920x1080
```

After running the appropriate setup, the project can be reorganized into a standardized structure such as:

```text
01_ASSETS
├── Images
├── Video
├── Audio
├── SVG
├── AI
└── 3D_RENDERS

02_COMPS
├── MAIN
└── PRECOMPS

03_SOLIDS

06_EXPORTS
```

with the imported footage, solids, and compositions automatically moved into their appropriate locations.

---

# Compatibility

* Adobe After Effects
* ExtendScript (`.jsx`)
* ScriptUI
* Dockable ScriptUI Panel

The script is designed to run directly inside After Effects.

---

# Version

**File Structure v1.10.1**

Current script features include:

* Basic setup
* Advanced setup
* Broadcast setup
* Automatic asset sorting
* Job-code composition detection
* 3D render detection
* Scene01–Scene10 organization
* Solids consolidation
* Unknown folder flattening
* Empty folder cleanup
* Legacy folder normalization
* Dockable Studio Setup panel

---

# Future Ideas

Potential future improvements could include:

* Custom folder templates
* User-defined folder structures
* Custom preset saving
* Project naming automation
* Render Queue integration
* Additional file-type rules
* Custom job-code formats
* User-configurable asset categories

---

# License

MIT License

---

# Author

**Dane**

Built to make After Effects projects faster, cleaner, and more consistent.
