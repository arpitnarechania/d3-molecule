# d3-molecule

**d3-molecule** is an open-source library for learning Chemical Bonding in an interactive way.

![Screenshot](https://raw.githubusercontent.com/arpitnarechania/d3-molecule/master/assets/screenshot2.png)

# Usage and Features
* Clicking the atom selects it
* Clicking on 2 atoms, joins them by a bond
* Clicking on a bond, toggles the bond type
* Clicking on a view port, locks and unlocks it from movement
* Double clicking a bond, removes it
* Double clicking an atom, removes it and its bonds
* Lock/ Unlock atoms to their position if needed.
* Hide/ Show atoms if needed.
* Drag and Resizing of molecule container
* Option to Export molecule as a PNG image
* Configurable forces, constants of force directed graph for the molecule
* Configurable style parameters for canvas, atoms, bonds

# New Feature of Organic Compounds (added on Jan-2018)

* The new module IUPACname.js adds functionality of searching organic compounds using IUPAC names.  
* This library allows you to add the side groups including methyl, ethyl and propyl on the main chain.
* Note that the library doesn't cover all names for organic compounds.

# Types of organic compounds:  

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
	

# Limitations for IUPAC name search:
* The maximum number of carbon is 12.
* The double bond, triple bond, -OH, -C=O- are at the end of the main chain. 
* The amide is always primary amide. 
* More diverse functionality will be updated.

# Examples for using organic compounds

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

# Author

Arpit Narechania
arpitnarechania@gmail.com

# Author(s) for Organic Compounds

* Ying Wang <wying102@vt.edu>
* Shivaram Sitaram <shivramp@hotmail.com>

# License

MIT