## Project Title: d3-molecule

**d3-molecule** is an open-source library for learning Chemical Bonding in an interactive way.

## ![Screenshot](https://github.com/wangyingxie/wangyingxie.github.io/blob/master/screenshot2.png)

## Version History
             				
| Version | Date      |Brief Description | Author(s)               | 
| --------|-----------|------------------|-------------------------|
| `v1.0.0`|2017/03/01 |Initial creation  |arpitnarechania@gmail.com|
| `v1.0.3`|2017/03/01 |Update Readme     |arpitnarechania@gmail.com|
| `v1.1.1`|2017/12/31 |Update Readme     |arpitnarechania@gmail.com|
| `v2.0.0`|2018/02/07 |Visualize organic chemical structures based on IUPAC conventions |wying102@vt.edu      shivramp@hotmail.com|
			
				
				
## Usage and Features
* Clicking the atom selects it
* Clicking on 2 atoms, joins them by a bond
* Clicking on a bond, toggles the bond type
* Clicking on a view port, locks and unlocks it from movement
* Double clicking a bond, removes it
* Double clicking an atom, removes it and its bonds
* Lock/ Unlock atoms to their position if needed.
* Hide/ Show atoms if needed.
* Drag and Resizing of molemethaneculecule container
* Option to Export molecule as a PNG image
* Configurable forces, constants of force directed graph for the molecule
* Configurable style parameters for canvas, atoms, bonds
* Visualize organic chemical structures based on IUPAC conventions.

## Features WIP
* Molecule Reaction components
* Loading examples directly from standard notations like SMILE
* 3-D support

Check out an example here. [Demo](https://arpitnarechania.github.io/d3-molecule/)

## Installation

Download d3-molecule using npm.

```
npm install d3-molecule --save-dev
cd d3-molecule
npm install
```

To use this library then, simply include d3.js, jquery, Molecule.js and Molecule.css:

``` html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/d3.min.js"></script>
<link href="/path/to/dist/css/Molecule.css">
<script src="/path/to/dist/js/Molecule.js"></script>
```

## Basic Usage

To use this library, you must create a container element and instantiate a new Molecule:

```html
<div id="container"></div>
```


Data
```
var data = {
    "nodes": [
      {
        "id": 0,
        "atom": "Mg",
        "charge":""
        "size": 24
      },
      {
        "id": 1,
        "atom": "Cl",
        "charge":""
        "size": 35
      },
      {
        "id": 2,
        "atom": "Cl",
        "charge":""
        "size": 35
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      },
      {
        "source": 0,
        "target": 2,
        "bond": 1
      }
    ]
  }
```

Setting chart parameters
``` javascript

    var options = {
        domElement: "#container",
        uniqueId: 1,
        width: 500, 
        height: 500,
        borderThickness: 1,
        borderColor: "#ffffff",
        background: "#ffffff",
        charge: -1000,
        friction: 0.9,
        alpha: 0.1,
        theta: 0.8,
        linkStrength: 1,
        gravity: 0.1,
        maxAtomRadius: 6,
        colorScheme:["#2AA9CC", "#FCF78A"],
        bondThickness: 2,
        bondColor: "#000000",
        atomBorderThickness: 2,
        atomBorderColor: "#000000",
        atomTextColor: "#000000",
        atomSizeBasis: "Atomic Radius",
        boundingBox: true,
        borderRadiusX: 5,
        borderRadiusY: 5,
        detailedTooltips: true
    };

    var molecule = new Molecule(data,options);
    molecule.render();

```

## Options

| Option                        | Description                                                               | Type     | Example
| ----------------------------- | ------------------------------------------------------------------------- | -------- | -------------------------- |
| `domElement`                  | The DOM element to append the molecule to                                 | string   | `'#container'`             |
| `uniqueId`                    | A Unique ID in case multiple molecules are added (as in the demo)         | number   | `1`                        |
| `width`                       | Width of the svg container                                                | number   | `500`                      |
| `height`                      | Height of the svg container                                               | number   | `500`                      |
| `borderThickness`             | Thickness of the border of the svg container                              | number   | `1`                        |  
| `borderColor`                 | Color of the border of the svg container                                  | string   | `'#000000'`                |
| `background`                  | Background color of the svg container                                     | string   | `'#FFFFFF'`                |
| `charge`                      | The Repulsion/ Attraction force between atoms                             | number   | `-1000`                    |
| `friction`                    | The friction parameter of a force directed graph                          | number   | `0.9`                      |
| `alpha`                       | The alpha parameter of a force directed graph                             | number   | `0.1`                      |
| `theta`                       | The theta parameter of a force directed graph                             | number   | `0.8`                      |
| `linkStrength`                | The linkStrength parameter of a force directed graph                      | number   | `1`                        |
| `gravity`                     | The gravity parameter of a force directed graph                           | number   | `0.1`                      |
| `maxAtomRadius`               | Radius of the biggest atom in the molecule                                | number   | `6`                        |
| `colorScheme`                 | Color scheme of the atoms                                                 | list     | `["#2AA9CC", "#FCF78A"]`   |
| `bondThickness`               | Bond thickness                                                            | number   | `1`                        |
| `bondColor`                   | Bond Color                                                                | string   | `'#000000'`                |
| `atomBorderThickness`         | Atom border thickness                                                     | string   | `1`                        |
| `atomBorderColor`             | Atom border color                                                         | string   | `'#000000'`                |
| `atomTextColor`               | Atom text color                                                           | string   | `'#000000'`                |
| `atomSizeBasis`               | Basis on which the atom circle svgs be rendered                           | string   | `'Atomic Radius'` | '`Atomic Weight '` |
| `boundingBox`                 | If the molecule should be constrained inside the svg container            | boolean  | `true`                     |
| `borderRadiusX`               | SVG container's border (X) parameter                                      | number   | `5`                        |
| `borderRadiusY`               | SVG container's border (Y) parameter                                      | number   | `5`                        |
| `detailedTooltips`            | If detailed info about the element to be shown on hover or not            | boolean  | `true`                     |

## Bond Types include :- 

* Single
* Double
* Triple
* Quadruple
* Wedged
* Wavy
* Dotted
* Dashed (Stripes)
* Dashed (Gradient)
* Arc

# Test (WIP)
* Unit test cases in the testrunner.html
* Start a simple HTTP server and go to http://localhost:<post>/testrunner.html
* The test cases will run for the demo example


## Author
Arpit Narechania
arpitnarechania@gmail.com




---------------------------------------------------------------------------------------------------------------------------------------
## New Feature of Organic Compounds (added on Jan-2018)

* The new module IUPACname.js adds functionality of searching organic compounds using IUPAC names.  
* This library allows you to add the side groups including methyl, ethyl and propyl on the main chain.
* Note that the library doesn't cover all names for organic compounds.

## Types of organic compounds:  

| Organic Compounds | 
| ------------------|
| `Alkanes`         |
| `Alkenes`         |
| `Alkynes`         |
| `Alkyl halides`   |
| `Alcohols`        |
| `Ethers`          |
| `Aldehydes`       |
| `Ketones`         |
| `Carboxylic Acids`|
| `Esters`          |
| `Amines`          |
| `Amides`          |
	

## Limitations for IUPAC name search:
* The maximum number of carbon is 12.
* The double bond, triple bond, -OH, -C=O- are at the end of the main chain. 
* The amide is always primary amide. 
* More diverse functionality will be updated.

## Examples for using organic compounds

| Organic Compounds | Example                           |
| ------------------|-----------------------------------|
| `Alkanes`         |`methane`, `2-methyl-4-ethyloctane`|
| `Alkenes`         |`ethene`, `2-methyl-4-ethyloctene` |
| `Alkynes`         |`ethyne`, `2-methyl-4-ethyloctyne` |
| `Alkyl halides`   |`3-fluoro-4-ethyloctyne`           |
| `Alcohols`        |`ethanol`                          |
| `Ethers`          |`ethyl methyl ether`               |
| `Aldehydes`       |`3-methylbutanal`                  |
| `Ketones`         |`propanone`                        |
| `Carboxylic Acids`|`ethanoic acid`                    |
| `Esters`          |`methyl propanoate`                |
| `Amines`          |`ethyl methyl amine`               |
| `Amides`          |`butamide`                         |

## Author for Organic Compounds
* Ying Wang <wying102@vt.edu>
* Shivaram Sitaram <shivramp@hotmail.com>

## License

MIT (https://opensource.org/licenses/MIT.)