# CSV and TXT file reader/merger

- this uses streams to read in multiple files in from the input folder and will go through and read each line and pick out the first item comma delimited;
- the additinal features may be turned off and it can stream / merge files without edits by removing the items in the lineParser function

# Installation

- should have Node JS 13 or higher installed.

```
git clone https://github.com/gngenius02/csv-text-filemerger.git
cd csv-text-filemerger
npm i
npm run build
chmod +x dist/index.js
npm link
```

or as a 1 liner;

`git clone https://github.com/gngenius02/csv-text-filemerger.git; cd csv-text-filemerger; npm i; npm run build; chmod +x dist/index.js; npm link;`

- if you no longer want to keep the symlink navigate back into the main directory and run

`npm unlink`

# Usage

`readcsv path/to/input/folder`

- example:

`readcsv input`

- or go navicate to your Documents folder and run

`readcsv .`

# TODO

- add more error checking, and
- make it useable for a bigger variety of use cases.
