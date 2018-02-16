/*****************************************************************************************
    @author: Ying Wang; Shivaram Sitaram;
    @email: wying102@vt.edu; shivramp@hotmail.com;
    @project: d3-molecule
    @brief This new module adds functionality of searching organic compound using IUPAC names. 
    Copyright 2018 Ying Wang

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
    OR OTHER DEALINGS IN THE SOFTWARE.
******************************************************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////
// @brief Main Execution Logic starts  here.
//
// This is the entry point when you click 'submit' from the  'Organic Compounds' Tab.
// Here, we feed proper inputs into molcule.js using the generated "dataset".
// The main function here is called "organicCompounds()".
function organicCompounds() {
    compoundNameSplit();
    // The parameter "valid" is used to check the legitimate of the input strings. If valid = 0, which means the input is not valuable. 
    if (valid == 0) {
        //The input is invalid. 
        return;
    }
    deriveChemType();
    if (valid == 4) {
        //If valid = 4, saying that the user decline the recommendated name of the organic compound.  	
        alert("Please check the IUPAC name of the organic compound. If there is no error, this function might not cover the expected chemcial structure. Please check the available structures in the Readme File!")
        return;
    } 

    deriveNumAtoms();
    buildNodes();
    buildLinks();

    if (valid == 3) {
        //If valid = 3, which means the number of carbons on the main chain is invalid.  
        alert("Please check the mainchain of the organic compound. If there is no error, this function might not cover the expected chemcial structure. Please check the available structures in the Readme File!")
        $("#output").empty();
		return;
    }

    // Fill in the name of the molecules.
    names = document.getElementById("names");
    updatedName = newMolecules.join('-')

    //The input can still be usedt o generate structure. However, there might be errors in the naming of main chains. 
    if (parsedNames != "") {
        alert("The typed name might contain errors in the main chain, please double check the name!")
        $("#output").empty();
        return;
    }

    //Fill in the type of the molecules.	
    //Special case for the alkyl halides.
    if (numF + numCl + numBr + numI != 0) {
        type = 'Alkyl halides';
    }
    types.innerHTML = '<span style="font-size:16px;">' + 'Type: ' + type + ' || ' + '</span>';

    //Obtain the expected data structure, containing nodes and links. 
    //Transform data structure from row based to column based, for rendering into d3.js
    var source = data,
        target = {};
    Object.keys(source).forEach(function(k) {
        target[k] = target[k] || [];
        Object.keys(source[k]).forEach(function(l) {
            var i;
            for (i = 0; i < source[k][l].length; i++) {
                target[k][i] = target[k][i] || {};
                target[k][i][l] = source[k][l][i];
                //        ^--------------------^
            }
        });
    });
    // Two variables "dataset" and "options" required for the molecule.js
    var dataset = target;
    var options = {
        domElement: "#containerNew",
        uniqueId: 1,
        width: 1500,
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
        colorScheme: ["#2AA9CC", "#FCF78A", "#7FFFD4", "#FF1493", "#FFD700", "#FFB6C1"],
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
    //Render the molecule structure to the molecule.js. 
    molecule = Molecule(dataset, options);
    molecule.render();
	// Update the input box with correct name og organic compound. 
    checkUpdate();

}

// @brief Analyze and split the input IUPAC name and generate "parsedNames" and "positions" for the side groups.  
function compoundNameSplit() {
    //Get the entered name from user
    moleculeName = document.getElementById("moleculeName").value.toLowerCase();
    //A special case for acid naming
    if (moleculeName.indexOf("anoic acid") != -1) {
        moleculeName = moleculeName.replace(/\s/g, '');
    }
    //Trim the input to remove the spaces before and after the entered names
    molecules = $.trim(moleculeName).split(/[ -]+/);
    //To check if the input organic compound is legitimate under this rule. 
    if (molecules.join("-") == "") {
        alert("Input box is empty, please enter IUPAC name of an organic compound!")
        return valid = 0;
    } else if (!isNaN(molecules.join("-"))) {
        alert("Please enter IUPAC name of an organic compound!")
        return valid = 0;
    } else if (isSpecialChar(moleculeName) == false) {
        alert("Please remove special characters other than '-' in the organic compounds!");
        return valid = 0;
    } else if (moleculeName.length < 6 || moleculeName.length > 50) {
        alert("The length of input IUPAC name is out-of-range, it should be between 6 to 50.");
        return valid = 0;
    } else {
        valid = 1;
    }

}

// @brief Derive the type of entered organic compounds. 
function deriveChemType() {
    nameList = [{
            name: "anol",
            type: 'Alcohols'
        },
        {
            name: "ether",
            type: 'Ethers'
        },
        {
            name: "anal",
            type: 'Aldehydes'
        },
        {
            name: "anone",
            type: 'Ketones'
        },
        {
            name: "anoicacid",
            type: 'Carboxylic Acids'
        },
        {
            name: "anoate",
            type: 'Esters'
        },
        {
            name: "amine",
            type: 'Amines'
        },
        {
            name: "amide",
            type: 'Amides'
        },
        {
            name: "ane",
            type: 'Alkanes'
        },
        {
            name: "ene",
            type: 'Alkenes'
        },
        {
            name: "yne",
            type: 'Alkynes'
        }
    ]
    //Correlate the traditional name and its corresponding number of carbons. 
    numNameList = [{
            name: "meth",
            numCarbon: 1
        },
        {
            name: "eth",
            numCarbon: 2
        },
        {
            name: "prop",
            numCarbon: 3
        },
        {
            name: "but",
            numCarbon: 4
        },
        {
            name: "pent",
            numCarbon: 5
        },
        {
            name: "hex",
            numCarbon: 6
        },
        {
            name: "hept",
            numCarbon: 7
        },
        {
            name: "oct",
            numCarbon: 8
        },
        {
            name: "non",
            numCarbon: 9
        },
        {
            name: "undec",
            numCarbon: 11
        },
        {
            name: "dec",
            numCarbon: 10
        },
        {
            name: "dode",
            numCarbon: 12
        }
    ]

    // An array contains the correct format to validate the input text. 
    checkNameList = ['methyl', 'ethyl', 'propyl', 'fluoro', 'chloro', 'bromo', 'iodo',
        'methane', 'ethane', 'propane', 'butane', 'pentane', 'hexane', 'octane', 'nonane', 'decane', 'undecane', 'dodeane',
        'ethene', 'propene', 'butene', 'pentene', 'hexene', 'octene', 'nonene', 'decene', 'undecene', 'dodeene',
        'ethyne', 'propyne', 'butyne', 'pentyne', 'hexyne', 'octyne', 'nonyne', 'decyne', 'undecyne', 'dodeyne',
        'methanal', 'ethanal', 'propanal', 'butanal', 'pentanal', 'hexanal', 'octanal', 'nonanal', 'decanal', 'undecanal', 'dodeanal',
        'methanone', 'ethanone', 'propanone', 'butanone', 'pentanone', 'hexanone', 'octanone', 'nonanone', 'decanone', 'undecanone', 'dodeanone',
        'methanol', 'ethanol', 'propanol', 'butanol', 'pentanol', 'hexanol', 'octanol', 'nonanol', 'decanol', 'undecanol', 'dodeanol',
        'methamide', 'ethamide', 'propamide', 'butamide', 'pentamide', 'hexamide', 'octamide', 'nonamide', 'decamide', 'undecamide', 'dodeamide',
        'methanone', 'ethanone', 'propanone', 'butanone', 'pentanone', 'hexanone', 'octanone', 'nonanone', 'decanone', 'undecanone', 'dodeanone',
        'methanoicacid', 'ethanoicacid', 'propanoicacid', 'butanoicacid', 'pentanoicacid', 'hexanoicacid', 'octanoicacid', 'nonanoicacid', 'decanoicacid', 'undecanoicacid', 'dodeanoicacid',
        'methanoate', 'ethanoate', 'propanoate', 'butanoate', 'pentanoate', 'hexanoate', 'octanoate', 'nonanoate', 'decanoate', 'undecanoate', 'dodeanoate'
    ]
    // Looking for the closet item in the checklist to correct the input value. If molecules.length == 1, then start = 7, end = checkListName.length, since the first 6 are side groups. If molecules.length != 1, then start = 0, end = 7, this is used to check the side groups. 
    function closetName(str,start,end) {
        commonLength = 0;
        matchName = "";
        for (i = start; i < end; i++) {
            commonChar = 0
            for (j = 0; j < str.length; j++) {
                if (checkNameList[i].indexOf(str[j]) != -1) {
                    commonChar += 1
                }
            }
            if (commonChar > commonLength) {
                commonLength = commonChar
                matchName = checkNameList[i]
            }
        }
        return matchName
    }

    // Generating the correct name and define it as newMolecules. 
    newMolecules = []
    if (molecules.length == 1) {
        if (checkNameList.slice(7, checkNameList.length).indexOf(molecules[0]) != -1) {
            newMolecules = molecules
        } else {
            newMolecules.push(closetName(molecules[0], 7, checkNameList.length))
        }
    } else {
        for (k = 0; k < molecules.length - 1; k++) {
            if (isNaN(molecules[k]) && checkNameList.indexOf(molecules[k]) == -1) {
                newMolecules.push(closetName(molecules[k], 0, 7))
            } else {
                newMolecules.push(molecules[k])
            }
        }
        newMolecules.push(molecules[molecules.length - 1])
    }

    if (newMolecules.join('-') != molecules.join('-')) {
        validation = confirm("Do you mean " + newMolecules.join('-') + " ?");
        if (validation == false) {
            return valid = 4;
        }
    }

    //Define the variables, storing strings of "parsedNames" and "positions" to buld up the molecular structure. 
    parsedNames = ""
    positions = ""
    mainCarb = ""
    for (i = 0; i < newMolecules.length; i++) {
        if (isNaN(newMolecules[i])) {
            parsedNames += newMolecules[i]
        } else if (!isNaN(newMolecules[i])) {
            positions += newMolecules[i]
        }
    }
    // Looking for the type of the molecules. 
    nameList.forEach(function(item) {
        if (parsedNames.indexOf(item.name) !== -1) {
            parsedNames = parsedNames.replace(item.name, "");
            types = document.getElementById("types");
            type = item.type;
            //Initiate the number of atoms in the organic compounds. 
            numCarb = 0;
            numHydro = 0;
            numOxy = 0;
            numNitro = 0;
            numCl = 0;
            numF = 0;
            numBr = 0;
            numI = 0;
            numSide = 0;
            valid = 2;
        }
    })
}

// @brief Derive the number of carbon, hydrogen, nitrogen or oxygen etc ...
function deriveNumCarb() {
    while (parsedNames.indexOf('methyl') !== -1) {
        parsedNames = parsedNames.replace('methyl', "");
        numCarb += 1;
        numSide += 1;
    }
    while (parsedNames.indexOf('ethyl') !== -1) {
        parsedNames = parsedNames.replace('ethyl', "");
        numCarb += 2;
        numSide += 1;
    }
    while (parsedNames.indexOf('propyl') !== -1) {
        parsedNames = parsedNames.replace('propyl', "");
        numCarb += 3;
        numSide += 1;
    }
    while (parsedNames.indexOf('fluoro') !== -1) {
        parsedNames = parsedNames.replace('fluoro', "");
        numF += 1;
        numSide += 1;
    }
    while (parsedNames.indexOf('chloro') !== -1) {
        parsedNames = parsedNames.replace('chloro', "");
        numCl += 1;
        numSide += 1;
    }
    while (parsedNames.indexOf('bromo') !== -1) {
        parsedNames = parsedNames.replace('bromo', "");
        numBr += 1;
        numSide += 1;
    }
    while (parsedNames.indexOf('iodo') !== -1) {
        parsedNames = parsedNames.replace('iodo', "");
        numI += 1;
        numSide += 1;
    }

    //Calculating the carbon on the main chain and accumulate it to the side chains. 
    numNameList.some(function(item) {
        if (parsedNames.indexOf(item.name) !== -1) {
            parsedNames = parsedNames.replace(item.name, "");
            numCarb += item.numCarbon;
            mainCarb = item.numCarbon;
        }
    })

    if (typeof(mainCarb) == 'undefined' || mainCarb == "") {
        mainCarb = 0;
    }
}

// @Check the mainchain
function checkMainchian() {
    if (mainCarb == 0) {
        return valid = 3;
    }
}

// @brief Dispaly the formular of the organic compounds. 
function formular() {
	// Define an atomlist to generate the corresponding formula of the organic compounds.
		atomList = [{
            name: "C",
            numAtom: numCarb
        },
        {
            name: "H",
            numAtom: numHydro
        },
        {
            name: "O",
            numAtom: numOxy
        },
        {
            name: "N",
            numAtom: numNitro
        },
        {
            name: "F",
            numAtom: numF
        },
        {
            name: "Cl",
            numAtom: numCl
        },
        {
            name: "Br",
            numAtom: numBr
        },
        {
            name: "I",
            numAtom: numI
        }
    ];
	output.innerHTML = '<span style="font-size:16px;">' + 'Formula: ' 
	    for (i = 0; i < atomList.length; i++) {
			if (atomList[i].numAtom == 1) {
				output.innerHTML +=  atomList[i].name 
			} else if (atomList[i].numAtom != 1 && atomList[i].numAtom != 0) {
				output.innerHTML += atomList[i].name + atomList[i].numAtom.toString().sub() 
			} else {
				output.innerHTML += ""
			}
		}
		output.innerHTML += '</span>';
}

// @brief Derive the number of other atoms based on the number of carbons
function deriveNumAtoms() {
    if (type == 'Alkanes') {
        //Calculating the number of carbons. 
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb + 2 - (numF + numCl + numBr + numI);
		formular();
    }

    if (type == 'Alkenes') {
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb - (numF + numCl + numBr + numI);
        formular();
    }
	
    if (type == 'Alkynes') {
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb - 2 - (numF + numCl + numBr + numI);
		formular();
    }
	
    if (type == 'Alcohols') {
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb + 2 -(numF + numCl + numBr + numI);
        numOxy = 1;
		formular();
    }
	
    if (type == 'Ethers') {
        for (i = 0; i < newMolecules.length - 1; i++) {
            numNameList.forEach(function(item) {
                if (item.name + 'yl' == newMolecules[i]) {
                    numCarb += item.numCarbon
                    parsedNames = parsedNames.replace(item.name + 'yl', "");
                }
            })
        }
        mainCarb = numCarb
        output = document.getElementById("output");
        numHydro = 2 * numCarb + 2 - (numF + numCl + numBr + numI);
        numOxy = 1;
		formular();
    }
	
    if (type == 'Amines') {
        for (i = 0; i < newMolecules.length - 1; i++) {
            numNameList.forEach(function(item) {
                if (item.name + 'yl' == newMolecules[i]) {
                    numCarb += item.numCarbon
                    parsedNames = parsedNames.replace(item.name + 'yl', "");
                }
            })
        }
        mainCarb = numCarb
        output = document.getElementById("output");
        numHydro = 2 * numCarb + 3 - (numF + numCl + numBr + numI);
        numNitro = 1;
		formular();
    }
	
    if (type == 'Aldehydes') {
        deriveNumCarb();
        checkMainchian()
        output = document.getElementById("output");
        numHydro = 2 * numCarb - (numF + numCl + numBr + numI);
        numOxy = 1;
		formular();
    }
	
    if (type == 'Ketones') {
        parsedNames = parsedNames.replace('anone', 'one');
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb - (numF + numCl + numBr + numI);
        numOxy = 1;
		formular();
    }

    if (type == 'Carboxylic Acids' || type == 'Esters') {
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb - (numF + numCl + numBr + numI);
        numOxy = 2;
		formular();
    }
	
    if (type == 'Amides') {
        deriveNumCarb();
        checkMainchian();
        output = document.getElementById("output");
        numHydro = 2 * numCarb + 1 - (numF + numCl + numBr + numI);
        numOxy = 1;
        numNitro = 1;
		formular();
    }
}


// @brief Check if the name is legitimate.
function checkSidechain() {
    if (positions.length != numSide) {
        return valid = 3;
    }
}

// @brief Generating the nodes("C", "H", "O",....) of the molecular chain based on the values of atom numbers. 
function buildNodes() {
    data = {};
    data["nodes"] = [];
    data["nodes"]["id"] = [];
    data["nodes"]["atom"] = [];
    data["nodes"]["charge"] = [];
    data["nodes"]["size"] = [];

    for (i = 0; i < numCarb; i++) {
        data["nodes"]["id"].push(i);
        data["nodes"]["atom"].push('C');
        data["nodes"]["charge"].push(' ');
        data["nodes"]["size"].push(16);
    }

    for (i = numCarb; i < numCarb + numHydro; i++) {
        data["nodes"]["id"].push(i);
        data["nodes"]["atom"].push('H');
        data["nodes"]["charge"].push(' ');
        data["nodes"]["size"].push(2);
    }
    if (numOxy != 0) {
        for (i = numCarb + numHydro; i < numCarb + numHydro + numOxy; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('O');
            data["nodes"]["charge"].push(' ');
            data["nodes"]["size"].push(20);
        }
    }
    if (numNitro != 0) {
        for (i = numCarb + numHydro + numOxy; i < numCarb + numHydro + numOxy + numNitro; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('N');
            data["nodes"]["charge"].push(' ');
            data["nodes"]["size"].push(18);
        }
    }
    if (numF != 0) {
        for (i = numCarb + numHydro + numOxy + numNitro; i < numCarb + numHydro + numOxy + numNitro + numF; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('F');
            data["nodes"]["charge"].push(' ');
            data["nodes"]["size"].push(22);
        }
    }
    if (numCl != 0) {
        for (i = numCarb + numHydro + numOxy + numNitro + numF; i < numCarb + numHydro + numOxy + numNitro + numF + numCl; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('Cl');
            data["nodes"]["charge"].push(' ');
            data["nodes"]["size"].push(26);
        }
    }
    if (numBr != 0) {
        for (i = numCarb + numHydro + numOxy + numNitro + numF + numCl; i < numCarb + numHydro + numOxy + numNitro + numF + numCl + numBr; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('Br');
            data["nodes"]["charge"].push('');
            data["nodes"]["size"].push(30);
        }
    }
    if (numI != 0) {
        for (i = numCarb + numHydro + numOxy + numNitro + numF + numCl + numBr; i < numCarb + numHydro + numOxy + numNitro + numF + numCl + numBr + numI; i++) {
            data["nodes"]["id"].push(i);
            data["nodes"]["atom"].push('I');
            data["nodes"]["charge"].push(' ');
            data["nodes"]["size"].push(35);
        }
    }
}

// @brief Build the links for the side chains/groups. ("methyl", "ethyl","propyl"...)
function buildSideLinks() {

    // Form your side groups, when needed
    for (p = 0; p < positions.length; p++) {
        if (positions[p] == i + 1) {
            data["links"]["source"].push(i);
            if (newMolecules[2 * p + 1].indexOf('methyl') !== -1) {
                data["links"]["target"].push(mainCarb + completedSideChain);
                data["links"]["bond"].push(1);
                completedSideChain += 1

                for (j = label; j < label + 3; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;
            } else if (newMolecules[2 * p + 1].indexOf('ethyl') !== -1) {
                data["links"]["target"].push(mainCarb + completedSideChain);
                data["links"]["bond"].push(1);
                completedSideChain += 1

                for (j = label; j < label + 2; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;

                data["links"]["source"].push(mainCarb + completedSideChain - 1);
                data["links"]["target"].push(mainCarb + completedSideChain);
                data["links"]["bond"].push(1);
                completedSideChain += 1

                for (j = label; j < label + 3; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;

            } else if (newMolecules[2 * p + 1].indexOf('propyl') !== -1) {
                data["links"]["target"].push(mainCarb + completedSideChain)
                data["links"]["bond"].push(1);
                completedSideChain += 1
                for (j = label; j < label + 2; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;
                data["links"]["source"].push(mainCarb + completedSideChain - 1);
                data["links"]["target"].push(mainCarb + completedSideChain);
                data["links"]["bond"].push(1);
                completedSideChain += 1
                for (j = label; j < label + 2; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;
                data["links"]["source"].push(mainCarb + completedSideChain - 1);
                data["links"]["target"].push(mainCarb + completedSideChain);
                data["links"]["bond"].push(1);
                completedSideChain += 1
                for (j = label; j < label + 3; j++) {
                    data["links"]["source"].push(mainCarb + completedSideChain - 1);
                    data["links"]["target"].push(j);
                    data["links"]["bond"].push(1);
                }
                label = j;
            } else if (newMolecules[2 * p + 1].indexOf('chloro') !== -1) {
                data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro + p)
                data["links"]["bond"].push(1);
            } else if (newMolecules[2 * p + 1].indexOf('fluoro') !== -1) {
                data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro + p)
                data["links"]["bond"].push(1);
            } else if (newMolecules[2 * p + 1].indexOf('bromo') !== -1) {
                data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro + p)
                data["links"]["bond"].push(1);
            } else if (newMolecules[2 * p + 1].indexOf('iodo') !== -1) {
                data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro + p)
                data["links"]["bond"].push(1);
            }
        }
    }
}

// @brief Adding links between the nodes for the main chain.
function buildLinks() {

    data["links"] = [];
    data["links"]["source"] = [];
    data["links"]["target"] = [];
    data["links"]["bond"] = [];
    if (type === 'Alkanes') {
        // Alkanes are saturated compounds, only single bonds will be added to the links. 
        if (positions.length == 0) {
            //For methane
            for (i = 0; i < numCarb; i++) {
                if (i == 0 && i == numCarb - 1) {
                    for (j = numCarb + numHydro - 4; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                // For numCarb > 1, first assign all of the C links
                if (i + 1 < numCarb) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for the first carbon
                if (i == 0 && i != numCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon 
                if (i != 0 && i != numCarb - 1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the last Carbon
                if (i == numCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }

                // Assign the the hydrogen for the first carbon
                if (i == 0 && i != mainCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone  
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone with side chains 
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the last Carbon
                if (i == mainCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                buildSideLinks();
            }
        }
    }

    // c
    if (type === 'Alkenes') {
        //Alkenes are unsaturated compounds, double bonds will be added to the links. 
        if (positions.length == 0) {
            for (i = 0; i < numCarb; i++) {
                //For ethene  
                if (numCarb == 2) {
                    //Assign the carbons
                    if (i == 0) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(2);
                    }
                    //Assign the hydrogens
                    for (j = 2 * (i + 1); j < 2 * (i + 1) + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                // For numCarb > 2, first assign all of the C links

                if (i == 0 && numCarb != 2) {
                    //The double bond is located at the position 1. 
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(2);
                }
                if (i + 1 < numCarb && i != 0 && numCarb != 2) {
                    //Other carbon without double bond. 
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == 0 && i != numCarb - 1 && numCarb != 2) {
                    for (j = numCarb; j < numCarb + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for second carbon
                if (i == 1 && i != numCarb - 1 && numCarb != 2) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon
                if (i != 0 && i != 1 && i != numCarb - 1 && numCarb != 2) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for last carbon
                if (i == numCarb - 1 && i != 0 && numCarb != 2) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carbon on the main chain
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    //Carbon with double bond.
                    if (i == 0) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(2);
                    }
                    //Carbon without double bond. 
                    if (i + 1 < numCarb && i != 0 && numCarb != 2) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(1);
                    }

                    // Assign the the hydrogen for the first carbon
                    if (i == 0 && i != mainCarb - 1) {
                        for (j = numCarb; j < numCarb + 2; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                    // Assign the hydrogen for second carbon
                    if (i == 1 && i != numCarb - 1 && numCarb != 2 && positions.indexOf(i + 1) == -1) {
                        for (j = label; j < label + 1; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                    // Assign the hydrogen for middle carbon on the main backbone  
                    if (i != 0 && i != 1 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                        for (j = label; j < label + 2; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                    // Assign the hydrogen for middle carbon on the main backbone with side chains. 
                    if (i != 0 && i != 1 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                        for (j = label; j < label + 1; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                }
                //Assign the hydrogen on the last carbon of main chain. 
                if (i == mainCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                buildSideLinks();
            }
        }
    }

    if (type === 'Alkynes') {
        //Alkynes are unsaturated compounds, triple bonds will be added to the links.
        if (positions.length == 0) {
            for (i = 0; i < numCarb; i++) {
                //For ethyne  
                if (numCarb == 2) {
                    //Carbon with triple bond.
                    if (i == 0) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(3);
                    }
                    for (j = i + 2; j < i + 3; j++) {
                        //Carbon without triple bond.
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                // For numCarb > 1, first assign all of the C links
                //Carbon with triple bond.
                if (i == 0 && numCarb != 2) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(3);
                }
                if (i + 1 < numCarb && i + 1 != 1 && numCarb != 2) {
                    //Carbon without triple bond.
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == 0 && i != numCarb - 1 && numCarb != 2) {
                    for (j = numCarb; j < numCarb + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon
                if (i != 0 && i != 1 && i != numCarb - 1 && numCarb != 2) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for last carbon
                if (i == numCarb - 1 && i != 0 && numCarb != 2) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                //Carbon with triple bond
                if (i != mainCarb - 1) {
                    if (i == 0) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(3);
                    }
                    //carbon without triple bond
                    if (i + 1 < numCarb && i != 0 && numCarb != 2) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(i + 1);
                        data["links"]["bond"].push(1);
                    }
                    // Assign the the hydrogen for the first carbon
                    if (i == 0 && i != mainCarb - 1) {
                        for (j = numCarb; j < numCarb + 1; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                    // Assign the hydrogen for middle carbon on the main backbone  
                    if (i != 0 && i != 1 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                        for (j = label; j < label + 2; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                    // Assign the hydrogen for middle carbon on the main backbone with side chains
                    if (i != 0 && i != 1 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                        for (j = label; j < label + 1; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                }
                //Assign the hydrogen for the last carbon
                if (i == mainCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                buildSideLinks();
            }
        }
    }

    if (type === 'Alcohols') {
        if (positions.length == 0) {
            for (i = 0; i < numCarb; i++) {
                //first assign all of the C links
                if (i != numCarb - 1) {
                    //Assign the carbon before the last one
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                } else {
                    //Assign the last carbon
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);
                    data["links"]["source"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 2);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == 0) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (i != 0) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                //Carbon with triple bond
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                } else {
                    //carbon without triple bond
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);
                    data["links"]["source"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 2);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == 0) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (i != 0) {
                    if (positions.indexOf(i + 1) == -1) {
                        for (j = label; j < label + 2; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                    } else {
                        //Assign the hydrogen for the middle carbon with side chain
                        for (j = label; j < label + 1; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                    }
                    label = j;
                }
                buildSideLinks();
            }
        }
    }

    if (type === 'Ethers') {
        Carb = 0
        for (k = 0; k < newMolecules.length - 1; k++) {
            numNameList.forEach(function(item) {
                if (item.name + 'yl' == newMolecules[k]) {
                    initCarb = Carb;
                    Carb += item.numCarbon;
                }
            })
            for (i = initCarb; i < Carb; i++) {
                //Assign all of the Carbon before the last one
                if (i != Carb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                } else {
                    //Assign the last carbon
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == initCarb) {
                    for (j = numCarb + 2 * initCarb + k; j < numCarb + 2 * initCarb + k + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (i != initCarb) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
            }
        }
    }

    if (type === 'Esters') {
        Carb = 0
        for (k = 0; k < newMolecules.length; k++) {
            numNameList.forEach(function(item) {
                if (item.name + 'yl' == newMolecules[k] || item.name == newMolecules[k].slice(0, -6)) {
                    initCarb = Carb;
                    Carb += item.numCarbon;
                }
            })
            for (i = initCarb; i < Carb; i++) {
                //first assign all of the C links
                if (i != Carb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                } else {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == initCarb) {
                    for (j = numCarb + 2 * initCarb + k; j < numCarb + 2 * initCarb + k + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (k == 0) {
                    if (i != initCarb) {
                        for (j = label; j < label + 2; j++) {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(j);
                            data["links"]["bond"].push(1);
                        }
                        label = j;
                    }
                } else {
                    if (i != initCarb) {
                        if (i != Carb - 1) {
                            for (j = label; j < label + 2; j++) {
                                data["links"]["source"].push(i);
                                data["links"]["target"].push(j);
                                data["links"]["bond"].push(1);
                            }
                            label = j;
                        } else {
                            data["links"]["source"].push(i);
                            data["links"]["target"].push(numCarb + numHydro + numOxy - 2);
                            data["links"]["bond"].push(2);
                        }
                    }
                }
            }
        }
    }

    if (type === 'Amines') {
        Carb = 0
        data["links"]["source"].push(numCarb + numHydro + numNitro - 1);
        data["links"]["target"].push(numCarb + numHydro - 1);
        data["links"]["bond"].push(1);
        for (k = 0; k < newMolecules.length - 1; k++) {
            numNameList.forEach(function(item) {
                if (item.name + 'yl' == newMolecules[k]) {
                    initCarb = Carb;
                    Carb += item.numCarbon;
                }
            })
            for (i = initCarb; i < Carb; i++) {
                //first assign all of the C links
                if (i != Carb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                } else {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numNitro - 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for first carbon
                if (i == initCarb) {
                    for (j = numCarb + 2 * initCarb + k; j < numCarb + 2 * initCarb + k + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen fo the middle carbon
                if (i != initCarb) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
            }
        }
    }

    if (type === 'Aldehydes') {
        if (positions.length == 0) {
            //For numCarb = 1
            for (i = 0; i < numCarb; i++) {
                if (i == 0 && i == numCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(2);
                    for (j = numCarb; j < numCarb + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                // For numCarb > 1, first assign all of the C links
                if (i + 1 < numCarb) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for the first carbon
                if (i == 0 && i != numCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (i != 0 && i != numCarb - 1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the last carbon
                if (i == numCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(2);
                    for (j = numCarb + numHydro - 1; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carnon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }

                // Assign the the hydrogen for the first carbon
                if (i == 0 && i != mainCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone  
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone with out side chain
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the lst carbon
                if (i == mainCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(2);
                    for (j = numCarb + numHydro - 1; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                buildSideLinks();
            }
        }
    }

    if (type === 'Ketones') {
        if (positions.length == 0) {
            // For numCarb > 1, first assign all of the C links
            for (i = 0; i < numCarb; i++) {
                if (i + 1 < numCarb) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for the first carbon
                if (i == 0 && i != numCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle carbon
                if (i != 0 && i < numCarb - 2) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the carbon connect to Oxy
                if (i == numCarb - 2) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro);
                    data["links"]["bond"].push(2);
                }
                //Assign the hydrogen for the last Carbon
                if (i == numCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }

                // Assign the the hydrogen for the first carbon
                if (i == 0 && i != mainCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone  
                if (i != 0 && i < mainCarb - 2 && positions.indexOf(i + 1) == -1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone with out side chain
                if (i != 0 && i < mainCarb - 2 && positions.indexOf(i + 1) !== -1) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the carbon connect to Oxy
                if (i == mainCarb - 2) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro);
                    data["links"]["bond"].push(2);
                }
                //Assign the hydrogen for the last Carbon
                if (i == mainCarb - 1 && i != 0) {
                    for (j = numCarb + numHydro - 3; j < numCarb + numHydro; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                }
                buildSideLinks();
            }
        }
    }

    if (type === 'Carboxylic Acids') {
        if (positions.length == 0) {
            //For methanoic aclid
            for (i = 0; i < numCarb; i++) {
                if (i == 0 && i == numCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + 1);
                    data["links"]["target"].push(i + 2);
                    data["links"]["bond"].push(1);
                }
                // For numCarb > 1, first assign all of the C links
                if (i + 1 < numCarb) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for the first carbon
                if (i == 0 && i != numCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle Carbon
                if (i != 0 && i != numCarb - 1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the last Carbon
                if (i == numCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 2);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["target"].push(numCarb + numHydro - 1);
                    data["links"]["bond"].push(1);
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }

                // Assign the the hydrogen for the first carbon
                if (i == 0 && i != mainCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone  
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone without side chain  
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the last Carbon
                if (i == mainCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 2);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["target"].push(numCarb + numHydro - 1);
                    data["links"]["bond"].push(1);

                }

                buildSideLinks();
            }
        }
    }

    if (type === 'Amides') {
        if (positions.length == 0) {
            // For numCarb = 1
            for (i = 0; i < numCarb; i++) {
                if (i == 0 && i == numCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + 1);
                    data["links"]["target"].push(i + 2);
                    data["links"]["bond"].push(1);
                    data["links"]["source"].push(numCarb + numHydro + 1);
                    data["links"]["target"].push(i + 3);
                    data["links"]["bond"].push(1);
                }
                // For numCarb > 1, first assign all of the C links
                if (i + 1 < numCarb) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }
                // Assign the hydrogen for the first carbon
                if (i == 0 && i != numCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for the middle Carbon
                if (i != 0 && i != numCarb - 1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the last Carbon
                if (i == numCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["target"].push(numCarb + numHydro - 2);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["target"].push(numCarb + numHydro - 1);
                    data["links"]["bond"].push(1);
                }
            }
        } else {
            //Check if the name is legitimate.
            checkSidechain();
            completedSideChain = 0;
            //The carbon on the main backbone
            for (i = 0; i < mainCarb; i++) {
                if (i != mainCarb - 1) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(i + 1);
                    data["links"]["bond"].push(1);
                }

                // Assign the the hydrogen for the first carbon
                if (i == 0 && i != mainCarb - 1) {
                    for (j = numCarb; j < numCarb + 3; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone  
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) == -1) {
                    for (j = label; j < label + 2; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                // Assign the hydrogen for middle carbon on the main backbone without side chain
                if (i != 0 && i != mainCarb - 1 && positions.indexOf(i + 1) !== -1) {
                    for (j = label; j < label + 1; j++) {
                        data["links"]["source"].push(i);
                        data["links"]["target"].push(j);
                        data["links"]["bond"].push(1);
                    }
                    label = j;
                }
                //Assign the hydrogen for the last Carbon
                if (i == mainCarb - 1 && i != 0) {
                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy - 1);
                    data["links"]["bond"].push(2);

                    data["links"]["source"].push(i);
                    data["links"]["target"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["target"].push(numCarb + numHydro - 2);
                    data["links"]["bond"].push(1);

                    data["links"]["source"].push(numCarb + numHydro + numOxy + numNitro - 1);
                    data["links"]["target"].push(numCarb + numHydro - 1);
                    data["links"]["bond"].push(1);
                }
                buildSideLinks();
            }
        }
    }
}

//@brief Deletes a Molecule
function deleteOrganicMolecule() {
    $('#containerNew').empty();
}

//@brief Get the molecule text information to export.
function getUniqueOrganicMoleculeText() {
    var moleculeIdElement = document.getElementById("moleculeName");
    var moleculeUniqueText = moleculeIdElement;
    return moleculeUniqueText;
}

//@brief Assign the export button and call the Object method from the container.
function exportOrganicAsPNG() {
    var filenameOrganic = document.getElementById("filenameOragnic").value;
    if (filenameOrganic == "") {
        filenameOrganic = molecules.join('-')
    }
    var svgString = getSVGString(d3.select(".svg1").node());
    svgString2Image(svgString, 1500, 500, filenameOrganic, save); // From Aprit, passes Blob and filesize String to the callback.   
    function save(dataBlob, filesize) {
        saveAs(dataBlob, filenameOrganic + '.png'); // FileSaver.js function
    }
}

//@brief Refresh the molecule.
function refreshOrganicMolecule() {
    organicCompounds();
}

//@brief Update the input name in the text input box.
function checkUpdate() {
    if (type == "Carboxylic Acids") {
        document.getElementById('moleculeName').value = updatedName.replace("anoicacid", "anoic acid");
        names.innerHTML = '<span style="font-size:16px;">' + 'Name: ' + updatedName.replace("anoicacid", "anoic acid") + ' || ' + '</span>';
    } else if (positions.length == 0) {
        document.getElementById('moleculeName').value = newMolecules.join(" ");
        names.innerHTML = '<span style="font-size:16px;">' + 'Name: ' + newMolecules.join(" ") + ' || ' + '</span>';
    } else {
        document.getElementById('moleculeName').value = newMolecules.join("-");
        names.innerHTML = '<span style="font-size:16px;">' + 'Name: ' + newMolecules.join("-") + ' || ' + '</span>';
    }

}

//@brief Check if the string of input containing special characters. 
function isSpecialChar(str) {
    return !/[~`!#$%\^&*@+=\\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

//@brief Link the function to the navigation tabs. 
function bindClick() {
    if ($("#organicCompounds").hasClass("active") || $("#readMe").hasClass("active")) {
        $("#container").hide()
    } else {
        $(document).ready(function() {
            $("#container").show();
        })
    }
}