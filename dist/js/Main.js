// Load the Example Molecules into the Dropdown.
function fillDropdownWithExamples(){
    var uniqueMoleculeIds = document.getElementById("MoleculeId");
    var j=0;
    Object.keys(Examples).forEach(function(key){
        j+=1;
        var option = document.createElement("option");
        option.text = key;
        option.value = j;
        uniqueMoleculeIds.add(option);

    });
}

// Return the unique molecule ID
function getUniqueMoleculeId(){
    var moleculeIdElement = document.getElementById("MoleculeId");
    var moleculeUniqueId = moleculeIdElement.options[moleculeIdElement.selectedIndex].value;
    return moleculeUniqueId;
}

// Return the unique molecule text which is its name
function getUniqueMoleculeText(){
    var moleculeIdElement = document.getElementById("MoleculeId");
    var moleculeUniqueText = moleculeIdElement.options[moleculeIdElement.selectedIndex].innerHTML;
    return moleculeUniqueText;
}

// Returns the Width of the viewport
function getCanvasWidth(){
    var canvasWidth = parseFloat($("#canvasWidth").val());
    if(isNaN(canvasWidth)){
       throw Error("canvasWidth must be a numeric entity");
    }
    return canvasWidth;
}

// Returns the Height of the viewport
function getCanvasHeight(){
    var canvasHeight = parseFloat($("#canvasHeight").val());
    if(isNaN(canvasHeight)){
       throw Error("canvasHeight must be a numeric entity");
    }
    return canvasHeight;
}

// Returns the Background color of the viewport
function getCanvasBackgroundColor(){
    var canvasBackgroundColor = $("#canvasBackgroundColor").val();
    return canvasBackgroundColor;
}

// Returns the Border thickness of the viewport
function getCanvasBorderThickness(){
    var canvasBorderThickness = parseFloat($("#canvasBorderThickness").val());
    if(isNaN(canvasBorderThickness)){
       throw Error("canvasBorderThickness must be a numeric entity");
    }
    return canvasBorderThickness;
}

// Returns the Border color of the viewport
function getCanvasBorderColor(){
    var canvasBorderColor = $("#canvasBorderColor").val();
    return canvasBorderColor;
}

// Returns the Charge between atoms in the molecule
// +ve is attraction. -ve is repulsion.
function getMoleculeCharge(){
    var charge = parseFloat($("#charge").val());
    if(isNaN(charge)){
       throw Error("charge must be a numeric entity");
    }
    return charge;
}

// Returns the Charge between atoms in the molecule
// +ve is attraction. -ve is repulsion.
function getMoleculeCharge(){
    var charge = parseFloat($("#charge").val());
    if(isNaN(charge)){
       throw Error("Charge must be a numeric entity");
    }
    return charge;
}

// Returns the Friction value for the force directed graph
function getMoleculeFriction(){
    var friction = parseFloat($("#friction").val());
    if(isNaN(friction)){
       throw Error("Friction must be a numeric entity");
    }
    return friction;
}

// Returns the Alpha value between atoms in the molecule
function getMoleculeAlpha(){
    var alpha = parseFloat($("#alpha").val());
    if(isNaN(alpha)){
       throw Error("Alpha must be a numeric entity");
    }
    return alpha;
}

// Returns the Theta between atoms in the molecule
function getMoleculeTheta(){
    var theta = parseFloat($("#theta").val());
    if(isNaN(theta)){
       throw Error("Theta must be a numeric entity");
    }
    return theta;
}

// Returns the Gravity between atoms in the molecule
function getMoleculeGravity(){
    var gravity = parseFloat($("#gravity").val());
    if(isNaN(gravity)){
       throw Error("gravity must be a numeric entity");
    }
    return gravity;
}

// Returns the Link Strength between atoms in the molecule
function getMoleculeLinkStrength(){
    var linkStrength = parseFloat($("#linkStrength").val());
    if(isNaN(linkStrength)){
       throw Error("linkStrength must be a numeric entity");
    }
    return linkStrength;
}

// Returns the Atom Size Basis
function getAtomSizeBasis(){
    var atomSizeBasisElement = document.getElementById("atomSizeBasis");
    var atomSizeBasis = atomSizeBasisElement.options[atomSizeBasisElement.selectedIndex].value;
    return atomSizeBasis;
}

// Returns the Bond thickness
function getBondThickness(){
   var bondThickness = parseFloat($("#bondThickness").val());
    if(isNaN(bondThickness)){
       throw Error("bondThickness must be a numeric entity");
    }
    return bondThickness;
}

// Returns the Bond Color
function getBondColor(){
    var bondColor = $("#bondColor").val();
    return bondColor;
}

// Returns the atom border thickness
function getAtomBorderThickness(){
    var atomBondThickness = parseFloat($("#atomBorderThickness").val());
    if(isNaN(atomBondThickness)){
       throw Error("atomBondThickness must be a numeric entity");
    }
    return atomBondThickness;
}

// Returns the atom text color
function getAtomTextColor(){
    var atomTextColor = $("#atomTextColor").val();
    return atomTextColor;
}

// Returns the atom border color
function getAtomBorderColor(){
    var atomBorderColor = $("#atomBorderColor").val();
    return atomBorderColor;
}

// Returns boolean true/false if the molecule is to be confined in the viewport
function isCanvasBoundingBox(){
    var isCanvasBoundingBox = $("#canvasAsBoundingBox").prop('checked');
    return isCanvasBoundingBox;
}

// Returns the maximum atomic radius
function getMaxAtomRadius(){
    var maxAtomRadius = parseFloat($("#maxAtomRadius").val())
    if(isNaN(maxAtomRadius)){
       throw Error("maxAtomRadius must be a numeric entity");
    }
    return maxAtomRadius;
}

// Refresh a Molecule with modified parameters.
function refreshMolecule(){
    var key = getUniqueMoleculeText();
    $('#Molecule' + key).remove();
    newMolecule();
}

// Deletes a Molecule
function deleteMolecule(){
    var key = getUniqueMoleculeText();
    $('#Molecule' + key).remove();
}

// Adds a new Molecule
function newMolecule(){
    var key = getUniqueMoleculeText();

    // Dont add to DOM if ID already exists. Up for
    // modifications in case multiple drafts of New Molecule need to be
    // simultaneously worked upon.
    if($('#Molecule' + key).length !== 0) {
        return;
    }

    // Load the Unique Molecule Ids into the select
    var container = document.getElementById("container");

    var div = document.createElement("div");
    div.id = "Molecule"+key;
    // div.width= options.width;
    div.className += " col-md-4";
    container.insertBefore(div, container.firstChild);
    // container.append(div);

    var colorScheme = ["#2AA9CC","#FCF78A","#4FFFC5","#FFA09B","#CC3F87","#32FF47","#E8C72E","#942EE8","#3FD6FF"];

    var options = {
        domElement: "#Molecule1",
        uniqueId:1,
        width: $('.col-md-4').width(),//getCanvasWidth()
        height: $('.col-md-4').width(),//getCanvasHeight()
        borderThickness : getCanvasBorderThickness(),
        borderColor : getCanvasBorderColor(),
        background: getCanvasBackgroundColor(),
        charge: getMoleculeCharge(),
        friction: getMoleculeFriction(),
        alpha: getMoleculeAlpha(),
        theta: getMoleculeTheta(),
        linkStrength: getMoleculeLinkStrength(),
        gravity: getMoleculeGravity(),
        maxAtomRadius: getMaxAtomRadius(),
        colorScheme: colorScheme,
        bondThickness: getBondThickness(),
        bondColor: getBondColor(),
        atomBorderThickness: getAtomBorderThickness(),
        atomBorderColor: getAtomBorderColor(),
        atomTextColor:getAtomTextColor(),
        atomSizeBasis: getAtomSizeBasis(),
        boundingBox: isCanvasBoundingBox()
    };


    for(var i=0; i < Examples[key].nodes.length ; i++){
        Examples[key].nodes[i]["size"] = Elements[Examples[key].nodes[i]["atom"]][getAtomSizeBasis()];
    }

    eval("var options" + key + "=JSON.parse(JSON.stringify(options))");
    eval("options"+key)["domElement"] = "#Molecule"+key;
    eval("options"+key)["uniqueId"] = key;
    eval("molecule"+key+"=new Molecule(JSON.parse(JSON.stringify(Examples[key])),eval('options'+key))");

}

// Adds a new Atom in the Molecule
function addNewNode(){
    var moleculeUniqueText = getUniqueMoleculeText();
    var atomElement = document.getElementById("Atom");
    var atom = atomElement.options[atomElement.selectedIndex].value;

    var atomSizeBasis = getAtomSizeBasis();
    var size = Elements[atom][atomSizeBasis];

    eval("molecule" + moleculeUniqueText).addNode(atom,size);
}

// Adds a Bond between 2 Atoms.
function addNewLink(){
    var moleculeUniqueText = getUniqueMoleculeText();

    var source_id = parseInt(document.getElementById("sourceId").value);
    var target_id = parseInt(document.getElementById("targetId").value);
    var bondElement = document.getElementById("Bond");
    var bond = bondElement.options[bondElement.selectedIndex].value;

    eval("molecule" + moleculeUniqueText).addLink(source_id,target_id,bond);
}

// Removes a Bond between 2 Atoms.
function removeExistingLink(){
    var moleculeUniqueText = getUniqueMoleculeText();
    var source_id = parseInt(document.getElementById("linkSourceId").value);
    var target_id = parseInt(document.getElementById("linkTargetId").value);
    eval("molecule" + moleculeUniqueId).removeLink(source_id,target_id);
}

// Removes an Atom from a Molecule.
function removeExistingNode(){
    var moleculeUniqueText = getUniqueMoleculeText();
    var id = parseInt(document.getElementById("nodeId").value);
    eval("molecule" + moleculeUniqueText).removeNode(id);
}

// Set-up the export button and call the Object method to do the actual export
function exportSvgAsPNG(){
    var moleculeUniqueText = getUniqueMoleculeText();
    eval("molecule" + moleculeUniqueText).exportAsPNG(moleculeUniqueText);
}