// This must be global so multiple instances of the Molecule class share the same
// static Elements instead of each having its own instance of Elements.
var Elements = {};

function loadPeriodicTableElements() {
    // Load the Periodic Table Elements
    var x = document.getElementById("Atom");

    for (var i = 0; i < periodicTableData.length; i++) {

        // Filling the "#Atom" dropdown with the Elements
        var option = document.createElement("option");
        option.text = periodicTableData[i]["Symbol"] + " - " + periodicTableData[i]["Element"];
        option.value = periodicTableData[i]["Symbol"];
        x.add(option);

        // Preparing a Javascript Object of all Elements
        Elements[periodicTableData[i]["Symbol"]] = periodicTableData[i];
    }
}

function Molecule(graph, options) {

    this.graph = graph; // making the graph object available in the class/function scope.
    this.options = options; // making the chart options object available in the class/function scope.

    this.width = options.width; // Width of svg container
    this.height = options.height; // Height of svg container
    this.charge = options.charge; // Positive for Attraction. Negative for Repulsion.
    this.theta = options.theta;
    this.gravity = options.gravity;
    this.linkStrength = options.linkStrength;
    this.alpha = options.alpha;
    this.friction = options.friction;
    this.maxAtomRadius = options.maxAtomRadius; // Maximum radius for largest atomicSize
    this.domElement = options.domElement; // The dom element to which the svg will be appended
    this.uniqueId = options.uniqueId; // Unique Id which differentiates multiple instances (objects) of this class.
    this.colorScheme = options.colorScheme; // The color scheme to color unique atoms with.
    this.bondThickness = options.bondThickness; // The width of a bond.
    this.bondColor = options.bondColor; // The color of a bond.
    this.atomBorderColor = options.atomBorderColor; // The color of the border of atoms.
    this.atomTextColor = options.atomTextColor; // The color of the text of atoms.
    this.atomBorderThickness = options.atomBorderThickness; // The width of the border of atoms.
    this.background = options.background; // The view port background.
    this.borderThickness = options.borderThickness; // The viewport border thickness
    this.borderColor = options.borderColor; // The viewport border color
    this.boundingBox = options.boundingBox; // Whether to restrict farther atoms to be in viewport or not

    var parent = this;

    // to ensure new nodes added after some nodes removed don't get duplicate ids.
    this.maxNodeId = d3.max(this.graph.nodes, function(d) {
        return d.id
    });

    if (this.graph.nodes.length == 0) {
        this.maxNodeId = 0;
    }

    var colorScale = d3.scale.ordinal().range(this.colorScheme); // The colorScale to use to color same atoms alike but different atoms in different colors.
    var radiusScale = d3.scale.sqrt().range([0, this.maxAtomRadius]); // The radiusScale

    var emptyContainerContents = function(){
        $(parent.domElement).empty(); // Clear the DOM and redraw the svg molecule every time.
    }

    var drawContainerContents = function(){
        
        parent.svg = d3.select(parent.domElement).append("svg")
            .attr("viewBox","0 0 " + parent.width + " " + parent.height)
            .attr("perserveAspectRatio","xMinYMid")
            .attr("class", "svg" + parent.uniqueId)
            .attr("width", parent.width)
            .attr("height", parent.height)
            .style("background-color", parent.background);

        // This aspect of code takes care of the Responsive nature of the div.
        var aspect = parent.width / parent.height;
        $(window).on("resize", function() {
            var targetWidth = $(parent.domElement).width();

            // Otherwise the default settings of width and height will be compromised.        
            if(targetWidth > parent.width){
                return;
            }

            d3.select(".svg"+parent.uniqueId)
            .attr("width", targetWidth)
            .attr("height", Math.round(targetWidth / aspect));
        }).trigger("resize");

        var borderPath = parent.svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", parent.height)
            .attr("width", parent.width)
            .style("stroke", parent.borderColor)
            .style("fill", "none")
            .style("stroke-width", parent.borderThickness + "px");

    }

    var drawAtoms = function(){

        parent.node = parent.svg.selectAll(".node")
            .data(parent.graph.nodes)

        var nodeg = parent.node.enter()
            .append("g")
            .attr("class", "node")
            .call(parent.force.drag);

        nodeg.append("circle")
            .attr("class", "atoms")
            .style("stroke", parent.atomBorderColor)
            .attr("stroke-width", parent.atomBorderThickness + "px")
            .attr("r", function(d) {
                return radiusScale(d.size);
            })
            .style("fill", function(d) {
                return colorScale(d.atom);
            })

        nodeg.append("text")
            .attr("dy", ".35em")
            .style("font-size", "10px")
            .attr("text-anchor", "middle")
            .attr("fill", parent.atomTextColor)
            .style("pointer-events", "none")
            .text(function(d) {
                return d.atom;
            });        
    }

    var thetaXScale = d3.scale.linear()
        .range([0.1, this.bondThickness])
        .domain([0, 90]);

    var thetaYScale = d3.scale.linear()
        .range([this.bondThickness, 0.1])
        .domain([0, 90]);

    var compute_angle = function(x1, y1, x2, y2) {
        var tan_theta = (parseFloat(y2) - parseFloat(y1)) / (parseFloat(x2) - parseFloat(x1));
        var slope = Math.atan(tan_theta);
        return slope;
    }

    var compute_translation = function(d, dir, bond_type) {
        var x = 0;
        var y = 0;
        var slope = compute_angle(d.source.x, d.source.y, d.target.x, d.target.y) * 180 / Math.PI;

        if (dir == 'left' && slope < 0) {
            x = bond_type == "triple" ? -thetaXScale(Math.abs(slope)) * 3 : -thetaXScale(Math.abs(slope)) * 2;
            y = bond_type == "triple" ? -thetaYScale(Math.abs(slope)) * 3 : -thetaYScale(Math.abs(slope)) * 2;
        } else if (dir == 'left' && slope > 0) {
            x = bond_type == "triple" ? thetaXScale(Math.abs(slope)) * 3 : thetaXScale(Math.abs(slope)) * 2;
            y = bond_type == "triple" ? -thetaYScale(Math.abs(slope)) * 3 : -thetaYScale(Math.abs(slope)) * 2;
        } else if (dir == 'right' && slope < 0) {
            x = bond_type == "triple" ? thetaXScale(Math.abs(slope)) * 3 : thetaXScale(Math.abs(slope)) * 2;
            y = bond_type == "triple" ? thetaYScale(Math.abs(slope)) * 3 : thetaYScale(Math.abs(slope)) * 2;
        } else if (dir == 'right' && slope > 0) {
            x = bond_type == "triple" ? -thetaXScale(Math.abs(slope)) * 3 : -thetaXScale(Math.abs(slope)) * 2;
            y = bond_type == "triple" ? thetaYScale(Math.abs(slope)) * 3 : thetaYScale(Math.abs(slope)) * 2;
        } else if (dir == 'left2' && slope < 0) {
            x = -thetaXScale(Math.abs(slope)) * 6;
            y = -thetaYScale(Math.abs(slope)) * 6;
        } else if (dir == 'left2' && slope > 0) {
            x = thetaXScale(Math.abs(slope)) * 6;
            y = -thetaYScale(Math.abs(slope)) * 6;
        } else if (dir == 'right2' && slope < 0) {
            x = thetaXScale(Math.abs(slope)) * 6;
            y = thetaYScale(Math.abs(slope)) * 6;
        } else if (dir == 'right2' && slope > 0) {
            x = -thetaXScale(Math.abs(slope)) * 6;
            y = thetaYScale(Math.abs(slope)) * 6;
        }

        return "translate(" + x + "," + y + ")";
    }

    var tick = function() {

        parent.node.attr("transform", function(d) {

            // If false, then let the farther atoms go out of the viewport
            // If true, restrict the x and y to width-radius and height-radius respectively
            if (parent.boundingBox) {
                d.x = Math.max(radiusScale(d.size), Math.min(parent.width - radiusScale(d.size), d.x));
                d.y = Math.max(radiusScale(d.size), Math.min(parent.height - radiusScale(d.size), d.y));
            }

            return "translate(" + d.x + "," + d.y + ")";
        });

        parent.link.selectAll("line")
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });

        var double_bonds = parent.link.filter(function(d) {
            return d.bond == 2;
        });

        double_bonds.selectAll(".right")
            .attr("transform", function(d) {
                return compute_translation(d, 'right', 'double');
            })

        double_bonds.selectAll(".left")
            .attr("transform", function(d) {
                return compute_translation(d, 'left', 'double');
            })

        var triple_bonds = parent.link.filter(function(d) {
            return d.bond == 3;
        });

        triple_bonds.selectAll(".right")
            .attr("transform", function(d) {
                return compute_translation(d, 'right', 'triple');
            })

        triple_bonds.selectAll(".left")
            .attr("transform", function(d) {
                return compute_translation(d, 'left', 'triple');
            })

        var quad_bonds = parent.link.filter(function(d) {
            return d.bond == 4;
        });

        quad_bonds.selectAll(".right")
            .attr("transform", function(d) {
                return compute_translation(d, 'right', 'quad');
            })

        quad_bonds.selectAll(".left")
            .attr("transform", function(d) {
                return compute_translation(d, 'left', 'quad');
            })

        quad_bonds.selectAll(".right2")
            .attr("transform", function(d) {
                return compute_translation(d, 'right2', 'quad');
            })

        quad_bonds.selectAll(".left2")
            .attr("transform", function(d) {
                return compute_translation(d, 'left2', 'quad');
            })
    }

    var drawBonds = function(){
    
        parent.link = parent.svg.selectAll(".link")
            .data(parent.graph.links)

        var linkg = parent.link.enter()
            .append("g")
            .attr("class", "link")

        var single_bond = parent.link.filter(function(d) {
            return d.bond == 1;
        });

        single_bond
            .append("line")
            .attr("class", "link center")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var double_bonds = parent.link.filter(function(d) {
            return d.bond == 2;
        });

        double_bonds
            .append("line")
            .attr("class", "link right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        double_bonds
            .append("line")
            .attr("class", "link left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var triple_bonds = parent.link.filter(function(d) {
            return d.bond == 3;
        });

        triple_bonds
            .append("line")
            .attr("class", "link right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        triple_bonds
            .append("line")
            .attr("class", "link left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        triple_bonds
            .append("line")
            .attr("class", "link center")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var quad_bonds = parent.link.filter(function(d) {
            return d.bond == 4;
        });

        quad_bonds
            .append("line")
            .attr("class", "link right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "link left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "link right2")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "link left2")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

    }

    function callback() {
        // Animation has completed. Do Something If you wish to.
        // link.append("line").style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; })
    }

    var configureForces = function(){

        parent.force = d3.layout.force()
            .size([parent.width, parent.height])
            .charge(parent.charge) // attract or repel
            .theta(parent.theta) // range = [0,1]. Default= 0.8 (Barnes Hut Approximation coefficient)
            .gravity(parent.gravity) // range = [0,1]. Default = 0.1
            .friction(parent.friction) // range = [0,1]. Default = 0.9
            .linkStrength(parent.linkStrength) // range=[0,1]. Default = 1
            .alpha(parent.alpha) // range=[0,1]. Default = 0.1
            .linkDistance(function(d) {
                return radiusScale(d.source.size) + radiusScale(d.target.size) + radiusScale(5);
            });

        parent.force
            .on("tick", tick) // start the ticking
            .on("end", callback);

        parent.force
            .nodes(parent.graph.nodes)
            .links(parent.graph.links)
            .start();
    }

    var configureTooltips = function(){
            // Adding a tooltip on the nodes
        var node_tooltip = d3.select(parent.domElement)
            .append('div')
            .attr('class', 'tooltip');

        node_tooltip.append('div')
            .attr('class', 'value');

        parent.svg.selectAll(".atoms")
            .on('mouseover', function(d) {

                var rows = "";
                rows += "<tr><td>" + "Node Id" + "</td><td>" + d.id + "</td></tr>";
                Object.keys(Elements[d.atom]).forEach(function(key) {
                    rows += "<tr><td>" + key + "</td><td>" + Elements[d.atom][key] + "</td></tr>";
                })
                var html = "<table><tbody>" + rows + "</tbody></table>";
                node_tooltip.select('.value').html(html);

                node_tooltip.style('display', 'block');
                node_tooltip.style('opacity', 2);

            })
            .on('mousemove', function(d) {
                node_tooltip.style('top', (d3.event.layerY + 10) + 'px')
                    .style('left', (d3.event.layerX - 25) + 'px');
            })
            .on('click', function(d) {
                d.fixed = true;
                d3.select(this).classed("fixedNode", true);
            })
            .on('dblclick', function(d) {
                d.fixed = false;
                d3.select(this).classed("fixedNode", false);
            })
            .on('mouseout', function(d) {
                node_tooltip.style('display', 'none');
                node_tooltip.style('opacity', 0);
            });

        // Adding a tooltip on the links
        var link_tooltip = d3.select(parent.domElement)
            .append('div')
            .attr('class', 'tooltip');

        link_tooltip.append('div')
            .attr('class', 'value');

        parent.svg.selectAll(".link")
            .on('mouseover', function(d) {

                var rows = "";
                rows += "<tr><td>" + "Source Id" + "</td><td>" + d.source.id + "</td></tr>";
                rows += "<tr><td>" + "Target Id" + "</td><td>" + d.target.id + "</td></tr>";
                rows += "<tr><td>" + "Bond Type" + "</td><td>" + d.bond + "</td></tr>";
                var html = "<table><tbody>" + rows + "</tbody></table>";

                link_tooltip.select('.value').html(html);

                link_tooltip.style('display', 'block');
                link_tooltip.style('opacity', 2);

            })
            .on('mousemove', function(d) {
                link_tooltip.style('top', (d3.event.layerY + 10) + 'px')
                    .style('left', (d3.event.layerX - 25) + 'px');
            })
            .on('click', function(d) {
                console.log(d.source.id + " - " + d.target.id + " selected");
            })
            .on('mouseout', function(d) {
                link_tooltip.style('display', 'none');
                link_tooltip.style('opacity', 0);
            });

    }

    // emptyContainerContents();
    // drawContainerContents();
    // configureForces();
    // drawBonds();
    // drawAtoms();
    // configureTooltips();

    //    this.svg.on('click', function () {
    //        var coordinates = [0, 0];
    //        coordinates = d3.mouse(this);
    //        var x = coordinates[0];
    //        var y = coordinates[1];
    //        console.log(x,y);
    //    });

    var findNodeIdIndex = function(id){
            // Find the Index for a particular Node
        var i = 0;
        while (i < parent.graph.nodes.length) {
            if (parent.graph.nodes[i]['id'] == id) {
                return i;
            }
            i++;
        }
    }

    // Add and remove Elements on the graph object
    var addNode = function(atom, size) {
        parent.maxNodeId += 1;
        parent.graph.nodes.push({
            "id": parent.maxNodeId,
            "atom": atom,
            "size": size
        });
    };

    var removeNode = function(id){
        var j = 0;
        var i = 0;
        while (i < parent.graph.links.length) {
            if (parent.graph.links[i]['source']['id'] == id || parent.graph.links[i]['target']['id'] == id) {
                parent.graph.links.splice(i, 1);
            } else i++;
        }

        while (j < parent.graph.nodes.length) {
            if (parent.graph.nodes[j]['id'] == id) {
                parent.graph.nodes.splice(j, 1);
            } else j++;
        }
    };

    var removeLink = function(source_id,target_id){
        for (var i = 0; i < parent.graph.links.length; i++) {
            if (parent.graph.links[i].source.id == source_id && parent.graph.links[i].target.id == target_id) {
                parent.graph.links.splice(i, 1);
                break;
            }
        }
    }

    var addLink = function(source_id, target_id, bond) {
        var source_index = findNodeIdIndex(source_id);
        var target_index = findNodeIdIndex(target_id);

        var link_object = {
            "source": source_index,
            "target": target_index,
            "bond": bond
        };
        parent.graph.links.push(link_object);
    };

    var removeAllLinks = function() {
        parent.graph.links.splice(0, parent.graph.links.length);
    };

    var removeAllNodes = function() {
        parent.graph.nodes.splice(0, parent.graph.nodes.length);
    };

    var hideAllNodes = function() {
        d3.selectAll(".atoms").style("opacity",0);
    };

    var showAllNodes = function() {
        d3.selectAll(".atoms").style("opacity",1);
    };

    var exportAsPNG = function(uniqueMoleculeText) {

        var svgString = getSVGString(d3.select(".svg" + uniqueMoleculeText).node());
        svgString2Image(svgString, 2 * parent.width, 2 * parent.height, 'png', save); // passes Blob and filesize String to the callback

        function save(dataBlob, filesize) {
            saveAs(dataBlob, uniqueMoleculeText + '.png'); // FileSaver.js function
        }

    }

    return {
        drawBonds:drawBonds,
        drawAtoms:drawAtoms,
        findNodeIdIndex:findNodeIdIndex,
        addNode:addNode,
        removeNode:removeNode,
        removeAllNodes:removeAllNodes,
        hideAllNodes:hideAllNodes,
        showAllNodes:showAllNodes,
        addLink:addLink,
        removeLink:removeLink,
        removeAllLinks:removeAllLinks,
        exportAsPNG:exportAsPNG,
        configureForces:configureForces,
        configureTooltips:configureTooltips,
        drawContainerContents:drawContainerContents,
        emptyContainerContents:emptyContainerContents
    }
}


// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

    return svgString;

    function getCSSStyles(parentElement) {
        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push('#' + parentElement.id);
        for (var c = 0; c < parentElement.classList.length; c++)
            if (!contains('.' + parentElement.classList[c], selectorTextArr))
                selectorTextArr.push('.' + parentElement.classList[c]);

            // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
            var id = nodes[i].id;
            if (!contains('#' + id, selectorTextArr))
                selectorTextArr.push('#' + id);

            var classes = nodes[i].classList;
            for (var c = 0; c < classes.length; c++)
                if (!contains('.' + classes[c], selectorTextArr))
                    selectorTextArr.push('.' + classes[c]);
        }

        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
            var s = document.styleSheets[i];

            try {
                if (!s.cssRules) continue;
            } catch (e) {
                if (e.name !== 'SecurityError') throw e; // for Firefox
                continue;
            }

            var cssRules = s.cssRules;
            for (var r = 0; r < cssRules.length; r++) {
                if (contains(cssRules[r].selectorText, selectorTextArr))
                    extractedCSSText += cssRules[r].cssText;
            }
        }


        return extractedCSSText;

        function contains(str, arr) {
            return arr.indexOf(str) === -1 ? false : true;
        }

    }

    function appendCSS(cssText, element) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore(styleElement, refNode);
    }
}

function svgString2Image(svgString, width, height, format, callback) {
    var format = format ? format : 'png';

    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var image = new Image();
    image.onload = function() {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(function(blob) {
            var filesize = Math.round(blob.length / 1024) + ' KB';
            if (callback) callback(blob, filesize);
        });
    };
    image.src = imgsrc;
}