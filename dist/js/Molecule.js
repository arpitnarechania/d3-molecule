/*****************************************************************************************
    @author: Arpit Narechania
    @email: arpitnarechania@gmail.com
    @project: d3-molecule

    Copyright 2017 Arpit Narechania

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
    this.borderRadiusX = options.borderRadiusX; // Border radius x component
    this.borderRadiusY = options.borderRadiusY; // Border radius y component
    this.detailedTooltips = options.detailedTooltips; // Border radius y component

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
    var emptyContainerContents = function() {
        $(parent.domElement).empty(); // Clear the DOM and redraw the svg molecule every time.
    }

    var drawContainerContents = function() {
        parent.svg = d3.select(parent.domElement).append("svg")
            .attr("viewBox", "0 0 " + parent.width + " " + parent.height)
            .attr("preserveAspectRatio", "xMinYMid")
            .attr("class", "svg" + parent.uniqueId)
            .attr("width", parent.width)
            .attr("height", parent.height)
            .style("background-color", parent.background);

        // This aspect of code takes care of the Responsive nature of the div.
        var aspect = parent.width / parent.height;
        $(window).on("resize", function() {
            var targetWidth = $(parent.domElement).width();
            // Otherwise the default settings of width and height will be compromised.        
            if (targetWidth > parent.width || targetWidth == "-2" || targetWidth == "0" || parent.uniqueId == 1) {
                return;
            }  
            d3.select(".svg" + parent.uniqueId)
                .attr("width", targetWidth)
                .attr("height", Math.round(targetWidth / aspect));
        }).trigger("resize");

        
        var borderPath = parent.svg.append("rect")
            .attr("class","svgBorder")
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", parent.borderRadiusX)
            .attr("ry", parent.borderRadiusY)
            .attr("height", parent.height)
            .attr("width", parent.width)
            .style("stroke", parent.borderColor)
            .style("fill", "none")
            .style("stroke-width", parent.borderThickness + "px");
    }

    var drawAtoms = function() {

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
            .attr("class", "atomsText")
            .style("font-size", "0.85em")
            .attr("text-anchor", "middle")
            .attr("fill", parent.atomTextColor)
            .style("pointer-events", "none")
            .text(function(d) {
                return d.atom;
            });

        nodeg.append("text")
            .attr("dy", "-.40em")
            .attr("dx", ".50em")
            .attr("class", "atomsText")
            .style("font-size", "0.85em")
            .attr("text-anchor", "start")
            .attr("fill", parent.atomTextColor)
            .style("pointer-events", "none")
            .text(function(d) {
                return d.charge;
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

    var compute_translation = function(d, dir, bond_type, raw=false) {
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

        if(raw){
            return {x:x,y:y};
        }

        return "translate(" + x + "," + y + ")";
    }

    var distancBetweenPoints = function(x1,y1,x2,y2){
        return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
    }

   //This is the accessor function 
    var lineFunction = d3.svg.line()
                     .x(function(d) { return d.x; })
                     .y(function(d) { return d.y; })
                     .interpolate("linear");

    var diagonalFunction = d3.svg.diagonal()
      .source(function (d) { return { x: d[0].y, y: d[0].x }; })            
      .target(function (d) { return { x: d[1].y, y: d[1].x }; })
      .projection(function (d) { 
        return [d.y, d.x];
    });

    var Vector2 = function(x,y) {
      this.magnitude = Math.sqrt(x*x+y*y);
      this.X = x;
      this.Y = y;
    };

    Vector2.prototype.perpendicularClockwise = function(){
      return new Vector2(-this.Y, this.X);
    };

    Vector2.prototype.perpendicularCounterClockwise = function(){
      return new Vector2(this.Y, -this.X);
    };

    Vector2.prototype.getUnitVector = function(){
      return new Vector2(this.X/this.magnitude, this.Y/this.magnitude);
    };

    Vector2.prototype.scale = function(ratio){
      return new Vector2(ratio*this.X, ratio*this.Y);
    };

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

        var arc_bond = parent.link.filter(function(d) {
            return d.bond == 10;
        });

        arc_bond.selectAll('path').attr("d", function(d) {
           var dx = d.target.x - d.source.x,
               dy = d.target.y - d.source.y,
               dr = Math.sqrt(dx * dx + dy * dy);
              return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

        var wavy_bond = parent.link.filter(function(d) {
            return d.bond == 9;
        });

        wavy_bond.selectAll('path')
        .attr('d', function(d){
            var curveData = [{ x: d.source.x, y: d.source.y }, { x: d.target.x, y: d.target.y }];
            return diagonalFunction(curveData);
        })

        var dashed_gradient_bond = parent.link.filter(function(d){
            return d.bond == 6;
        });

        dashed_gradient_bond.selectAll("path")
                    .attr("d", function(d){
                        left_points = compute_translation(d,'left','double',true);
                        right_points = compute_translation(d,'right','double',true);
                        var lineData = [{ "x": d.target.x, "y": d.target.y},{ "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},
                                        { "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},{ "x": d.source.x, "y": d.source.y},
                                        { "x": d.source.x, "y": d.source.y},{ "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},
                                        { "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},{ "x": d.target.x, "y": d.target.y}];

                        var linkVector = new Vector2(d.target.x-d.source.x,d.target.y-d.source.y).getUnitVector();        
                        var gradientVector = linkVector.scale(0.5);

                        parent.grad_gradient
                        .attr("x1", 0.5-gradientVector.X)
                        .attr("y1", 0.5-gradientVector.Y)
                        .attr("x2", 0.5+gradientVector.X)
                        .attr("y2", 0.5+gradientVector.Y)
                        .attr("spreadMethod", "pad");
                        //add an .attr of repeat as spreadMethod
                        //but it does not work well when bond is being rotated..

                        return lineFunction(lineData);
                    })
                    .style("fill","url(#gradient)")
                    .style("stroke","url(#gradient)")
                    .style("stroke-width",parent.bondThickness);

        var dashed_striped_bond = parent.link.filter(function(d){
            return d.bond == 7;
        });


        dashed_striped_bond.selectAll("path")
                    .attr("d", function(d){
                        left_points = compute_translation(d,'left','double',true);
                        right_points = compute_translation(d,'right','double',true);
                        var lineData = [{ "x": d.target.x, "y": d.target.y},{ "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},
                                        { "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},{ "x": d.source.x, "y": d.source.y},
                                        { "x": d.source.x, "y": d.source.y},{ "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},
                                        { "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},{ "x": d.target.x, "y": d.target.y}];

                        var linkVector = new Vector2(d.target.x-d.source.x,d.target.y-d.source.y).getUnitVector();        
                        var gradientVector = linkVector.scale(1);

                        parent.grad_striped
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "10%")
                        .attr("y2", "10%")
                        .attr("spreadMethod", "repeat");
                        //add an .attr of repeat as spreadMethod
                        //but it does not work well when bond is being rotated..

                        return lineFunction(lineData);
                    })
                    .style("fill","url(#gradientStriped)")
                    .style("stroke","url(#gradientStriped)")
                    .style("stroke-width",parent.bondThickness);

        var wedged_bond = parent.link.filter(function(d){
            return d.bond == 8;
        });

        wedged_bond.selectAll("path")
                    .attr("d", function(d){                         
                        left_points = compute_translation(d,'left','double',true);
                        right_points = compute_translation(d,'right','double',true);

                        var lineData = [{ "x": d.target.x, "y": d.target.y},{ "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},
                                        { "x": d.target.x + left_points.x, "y": d.target.y + left_points.y},{ "x": d.source.x, "y": d.source.y},
                                        { "x": d.source.x, "y": d.source.y},{ "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},
                                        { "x": d.target.x + right_points.x, "y": d.target.y + right_points.y},{ "x": d.target.x, "y": d.target.y}];

                        return lineFunction(lineData);
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

    var drawBonds = function() {

        parent.link = parent.svg.selectAll(".link")
            .data(parent.graph.links)

        var linkg = parent.link.enter()
            .append("g")
            .attr("class", "link")

        var arc_bond = parent.link.filter(function(d) {
            return d.bond == 10;
        });

        arc_bond.append('path')
          .attr('stroke', parent.bondColor)
          .attr('stroke-width', parent.bondThickness)
          .attr('fill', 'none');

        var wavy_bond = parent.link.filter(function(d) {
            return d.bond == 9;
        });

        wavy_bond.append('path')
          .attr('stroke', parent.bondColor)
          .attr('stroke-width', parent.bondThickness)
          .attr('fill', 'none');

        var dotted_bond = parent.link.filter(function(d) {
            return d.bond == 5;
        });

        dotted_bond
            .append("line")
            .attr("class", "center")
            .style("stroke", parent.bondColor)
            .style("stroke-dasharray", (parent.bondThickness + "," + parent.bondThickness*1.5))
            .style("stroke-width", parent.bondThickness + "px");


        var wedged_bond = parent.link.filter(function(d){
            return d.bond == 8;
        });

        wedged_bond.append("path")
                    .style("fill",parent.bondColor)
                    .style("stroke",parent.bondColor)
                    .style("stroke-width",parent.bondThickness*2);

        var dashed_striped_bond = parent.link.filter(function(d){
            return d.bond == 7;
        });

        parent.grad_striped = parent.svg
        .append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradientStriped")
        .attr("spreadMethod", "pad");

        parent.grad_striped
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", parent.bondColor)
        .attr("stop-opacity", 1);

        parent.grad_striped
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", parent.background)
        .attr("stop-opacity", 1);

        dashed_striped_bond.append("path")
                    .style("fill","url(#gradientStriped)")
                    .style("stroke","url(#gradientStriped)")
                    .style("stroke-width",parent.bondThickness);

        var dashed_gradient_bond = parent.link.filter(function(d){
            return d.bond == 6;
        });

        parent.grad_gradient = parent.svg
        .append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("spreadMethod", "pad");

        parent.grad_gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", parent.bondColor)
        .attr("stop-opacity", 1);

        parent.grad_gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", parent.background)
        .attr("stop-opacity", 1);

        dashed_gradient_bond.append("path")
                    .style("fill","url(#gradient)")
                    .style("stroke","url(#gradient)")
                    .style("stroke-width",parent.bondThickness);

        var single_bond = parent.link.filter(function(d) {
            return d.bond == 1;
        });

        single_bond
            .append("line")
            .attr("class", "center")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var double_bonds = parent.link.filter(function(d) {
            return d.bond == 2;
        });

        double_bonds
            .append("line")
            .attr("class", "right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        double_bonds
            .append("line")
            .attr("class", "left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var triple_bonds = parent.link.filter(function(d) {
            return d.bond == 3;
        });

        triple_bonds
            .append("line")
            .attr("class", "right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        triple_bonds
            .append("line")
            .attr("class", "left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        triple_bonds
            .append("line")
            .attr("class", "center")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        var quad_bonds = parent.link.filter(function(d) {
            return d.bond == 4;
        });

        quad_bonds
            .append("line")
            .attr("class", "right")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "left")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "right2")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

        quad_bonds
            .append("line")
            .attr("class", "left2")
            .style("stroke", parent.bondColor)
            .style("stroke-width", parent.bondThickness + "px");

    }

    function callback() {
        // Animation has completed. Do Something If you wish to.
    }

    var configureForces = function() {

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
            .on("end", callback)
            .nodes(parent.graph.nodes)
            .links(parent.graph.links)
            .start();
    }

    function singleDoubleClickHandler() {
        var event = d3.dispatch('click', 'dblclick');

        function cc(selection) {
            var down,
                tolerance = 5,
                last,
                wait = null;
            // euclidean distance
            function dist(a, b) {
                return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
            }
            selection.on('mousedown', function() {
                down = d3.mouse(document.body);
                last = +new Date();
            });
            selection.on('mouseup', function() {
                if (dist(down, d3.mouse(document.body)) > tolerance) {
                    return;
                } else {
                    if (wait) {
                        window.clearTimeout(wait);
                        wait = null;
                        event.dblclick(d3.event);
                    } else {
                        wait = window.setTimeout((function(e) {
                            return function() {
                                event.click(e);
                                wait = null;
                            };
                        })(d3.event), 300);
                    }
                }
            });
        };
        return d3.rebind(cc, event, 'on');
    }

    var configureTooltips = function() {
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
                
                if(parent.detailedTooltips){
                    Object.keys(Elements[d.atom]).forEach(function(key) {
                        rows += "<tr><td>" + key + "</td><td>" + Elements[d.atom][key] + "</td></tr>";
                    })
                }
                var html = "<table><tbody>" + rows + "</tbody></table>";
                node_tooltip.select('.value').html(html);

                node_tooltip.style('display', 'block');
                node_tooltip.style('opacity', 2);

            })
            .on('mousemove', function(d) {
                node_tooltip.style('top', (d3.event.layerY + 10) + 'px')
                    .style('left', (d3.event.layerX - 25) + 'px');
            })
            .on('mouseout', function(d) {
                node_tooltip.style('display', 'none');
                node_tooltip.style('opacity', 0);
            });

        var nodeHandler = singleDoubleClickHandler();
        parent.svg.selectAll('.atoms').call(nodeHandler);
        nodeHandler
            .on('click', function(el) {

                var selection = el.srcElement;
                
                var d = d3.select(selection).data()[0];

                $("#nodeId").val(d.id);

                if(d.selected != true){
                    d.selected = true;
                    d3.select(selection).classed("selectedNode", true);                    
                }else{
                    d.selected = false;
                    d3.select(selection).classed("selectedNode", false);                    
                }

                // 1) Check if 2 nodes are fixed, if yes then connect them with bonds.
                var to_join = [];
                parent.graph.nodes.forEach(function(d){
                    if(d.selected){
                        to_join.push(d.id);
                    }
                });

                if(to_join.length == 2){
                    if(noExistingLink(to_join[0],to_join[1])){
                        // Join them using Single Bonds.
                        addLink(to_join[0],to_join[1],1);
                        render();                        
                    }else{
                        console.log("trying to act smart, eh! Link already exists buddy!");
                    }
                }

                if(to_join.length >= 2){
                    to_join.forEach(function(id){
                        parent.graph.nodes[findNodeIndexFromId(id)].selected = false;
                        parent.svg.selectAll(".atoms").classed("selectedNode", false);
                    });
                }

            })
            .on('dblclick', function(el) {
                var selection = el.srcElement;
                console.log("dblclick, data: ");
                var d = d3.select(selection).data()[0];
                removeNode(d.id);
                render();
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
            .on('mouseout', function(d) {
                link_tooltip.style('display', 'none');
                link_tooltip.style('opacity', 0);
            });

        var linkHandler = singleDoubleClickHandler();
        parent.svg.selectAll('.link').call(linkHandler);
        linkHandler
            .on('click', function(el) {
                var selection = el.srcElement;
                console.log("click, data: ");
                var d = d3.select(selection).data()[0];
                console.log(d.source.id + " - " + d.target.id + " selected");
                removeLink(d.source.id, d.target.id);
                addLink(d.source.id, d.target.id, d.bond == 10 ? 1 : d.bond + 1);
                render();
            })
            .on('dblclick', function(el) {
                var selection = el.srcElement;
                console.log("dblclick, data: ");
                var d = d3.select(selection).data()[0];
                console.log(d.source.id + " - " + d.target.id + " selected");
                removeLink(d.source.id, d.target.id);
                render();
            });
    }

    // Use it for Rendering the molecule in the window / Refreshing it
    var render = function() {
        emptyContainerContents();
        drawContainerContents();
        configureForces();
        drawBonds();
        drawAtoms();
        configureTooltips();

        parent.svg.on('click', function () {
            var text = parent.domElement;
            substring = text.substring(10,text.length)
            $("#MoleculeId option").filter(function() {
                //may want to use $.trim in here
                return $(this).text() == substring;
            }).prop('selected', true);

            if($(parent.domElement + " .svgBorder").hasClass("selectedSVG")){
                    $(parent.domElement + " .svgBorder").removeClass("selectedSVG");
                    $(parent.domElement).draggable({disabled: false});
            }
            else{
                    d3.selectAll(".svgBorder").classed("selectedSVG", false);
                    $("#container").children().draggable({disabled: false});

                    $(parent.domElement + " .svgBorder").addClass("selectedSVG");
                    $(parent.domElement).draggable({disabled: true});
            }

            //    $("#MoleculeId").val("4");
            //    var coordinates = [0, 0];
            //    coordinates = d3.mouse(this);
            //    var x = coordinates[0];
            //    var y = coordinates[1];
            //    console.log(x,y);
        });
    }

    var noExistingLink = function(source_id,target_id){
        var i = 0;
        while (i < parent.graph.links.length) {
            if (parent.graph.links[i]['source']['id'] == source_id && parent.graph.links[i]['target']['id'] == target_id) {
                return false;
            }
            i++;
        }
        return true;
    };

    var findNodeIndexFromId = function(id) {

        // Find the Index for a particular Node
        var i = 0;
        while (i < parent.graph.nodes.length) {
            if (parent.graph.nodes[i]['id'] == id) {
                return i;
            }
            i++;
        }
    };

    var findNodeIdFromIndex = function(index) {

        // Find the Index for a particular Node
        var i = 0;
        while (i < parent.graph.nodes.length) {
            if (index == id) {
                return parent.graph.nodes[i]['id'];
            }
            i++;
        }
    };

    // Add and remove Elements on the graph object
    var addNode = function(atom, size, chargeString) {
        parent.maxNodeId += 1;
        parent.graph.nodes.push({
            "id": parent.maxNodeId,
            "atom": atom,
            "size": size,
            "charge":chargeString
        });
    };

    var removeNode = function(id) {
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

    var removeLink = function(source_id, target_id) {
        for (var i = 0; i < parent.graph.links.length; i++) {
            if (parent.graph.links[i].source.id == source_id && parent.graph.links[i].target.id == target_id) {
                parent.graph.links.splice(i, 1);
                break;
            }
        }
    }

    var addLink = function(source_id, target_id, bond) {
        var source_index = findNodeIndexFromId(source_id);
        var target_index = findNodeIndexFromId(target_id);

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

    var fixNode = function(id){
        parent.graph.nodes[findNodeIndexFromId(id)].fixed = true;
        d3.selectAll(".atoms").each(function(d){
            if(d.fixed){
                d3.select(this).classed("fixedNode",true);
            }

        });
   }

    var unfixNode = function(id){
        parent.graph.nodes[findNodeIndexFromId(id)].fixed = false;
        d3.selectAll(".atoms").each(function(d){
            if(d.fixed){
                d3.select(this).classed("fixedNode",false);
            }
        });
    }

    var fixAllNodes = function() {
        parent.graph.nodes.forEach(function(d){
            d.fixed = true;
        });

        var fixedNodes = parent.graph.nodes.filter(function(d) {
            return d.fixed == true;
        });

        d3.selectAll(".atoms").data(fixedNodes).classed("fixedNode",true);

    };

    var unfixAllNodes = function() {
        parent.graph.nodes.forEach(function(d){
            d.fixed = false;
        });

        var unfixedNodes = parent.graph.nodes.filter(function(d) {
            return d.fixed == false;
        });

        d3.selectAll(".atoms").data(unfixedNodes).classed("fixedNode",false);
    };

    var showAllNodes = function() {
        d3.selectAll(".atoms").style("opacity", 1);
        d3.selectAll(".atomsText").style("opacity", 1);
    };

    var hideAllNodes = function() {
        d3.selectAll(".atoms").style("opacity", 0);
        d3.selectAll(".atomsText").style("opacity", 0);
    };

    var showNode = function(id) {
        var nodeToShow = parent.graph.nodes.filter(function(d) {
            return d.id == id;
        });
        d3.selectAll(".atoms").data(nodeToShow).style("opacity", 1);
        d3.selectAll(".atomsText").data(nodeToShow).style("opacity", 1);
    };

    var hideNode = function(id) {
        var nodeToHide = parent.graph.nodes.filter(function(d) {
            return d.id == id;
        });
        d3.selectAll(".atoms").data(nodeToHide).style("opacity", 0);
        d3.selectAll(".atomsText").data(nodeToHide).style("opacity", 0);

    };

    var exportAsPNG = function(uniqueMoleculeText,filename) {

        var svgString = getSVGString(d3.select(".svg" + uniqueMoleculeText).node());
        svgString2Image(svgString, 2 * parent.width, 2 * parent.height, 'png', save); // passes Blob and filesize String to the callback

        function save(dataBlob, filesize) {
            saveAs(dataBlob, filename + '.png'); // FileSaver.js function
        }

    }

    return {
        render: render,
        fixNode:fixNode,
        unfixNode:unfixNode,
        fixAllNodes:fixAllNodes,
        unfixAllNodes:unfixAllNodes,
        drawBonds: drawBonds,
        drawAtoms: drawAtoms,
        findNodeIndexFromId: findNodeIndexFromId,
        addNode: addNode,
        removeNode: removeNode,
        removeAllNodes: removeAllNodes,
        hideNode:hideNode,
        showNode:showNode,
        hideAllNodes: hideAllNodes,
        showAllNodes: showAllNodes,
        addLink: addLink,
        removeLink: removeLink,
        removeAllLinks: removeAllLinks,
        exportAsPNG: exportAsPNG,
        configureForces: configureForces,
        configureTooltips: configureTooltips,
        drawContainerContents: drawContainerContents,
        emptyContainerContents: emptyContainerContents
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
