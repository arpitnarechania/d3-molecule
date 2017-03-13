var assert = chai.assert;
var expect = chai.expect;
chai.should();

describe('default settings', function() {

    describe('canvas', function() {

        it('default canvas width should be set and equal to 500', function() {
            var val = getCanvasWidth();
            assert.equal(val, 500);
        });

        it('default canvas height should be set and equal to 500', function() {
            var val = getCanvasHeight();
            assert.equal(val, 500);
        });

        it('default canvas background colour should be set and equal to #efefef', function() {
            var val = getCanvasBackgroundColor();
            assert.equal(val, "#efefef");
        });

        it('default canvas border thickness should be set and equal to 1', function() {
            var val = getCanvasBorderThickness();
            assert.equal(val, 3);
        });

        it('default canvas border colour should be set and equal to #000000', function() {
            var val = getCanvasBorderColor();
            assert.equal(val, "#000000");
        });

        it('default canvas bounding box setting should be set and equal to true', function() {
            var val = isCanvasBoundingBox();
            assert.equal(val, true);
        });
    });

    describe('molecular forces', function() {

        it('default molecule charge should be set and equal to -1000', function() {
            var val = getMoleculeCharge();
            assert.equal(val, -1000);
        });
        it('default molecule alpha should be set and equal to 0.1', function() {
            var val = getMoleculeAlpha();
            assert.equal(val, 0.1);
        });
        it('default molecule theta should be set and equal to 0.8', function() {
            var val = getMoleculeTheta();
            assert.equal(val, 0.8);
        });
        it('default molecule gravity should be set and equal to 0.1', function() {
            var val = getMoleculeGravity();
            assert.equal(val, 0.1);
        });
        it('default molecule friction should be set and equal to 0.9', function() {
            var val = getMoleculeFriction();
            assert.equal(val, 0.9);
        });
        it('default molecule linkStrength should be set and equal to 1', function() {
            var val = getMoleculeLinkStrength();
            assert.equal(val, 1);
        });
    });


    describe('atom', function() {

        it('default atom size basis should be set and equal to Atomic Weight', function() {
            var val = getAtomSizeBasis();
            assert.equal(val, "Atomic Weight");
        });
        it('default max atom radius should be set and equal to 6', function() {
            var val = getMaxAtomRadius();
            assert.equal(val, 6);
        });
        it('default atom text color should be set and equal to #000000', function() {
            var val = getAtomTextColor();
            assert.equal(val, "#000000");
        });
        it('default atom border thickness should be set and equal to 1', function() {
            var val = getAtomBorderThickness();
            assert.equal(val, 1);
        });
        it('default atom border color should be set and equal to #000000', function() {
            var val = getAtomBorderColor();
            assert.equal(val, "#000000");
        });
    });

    describe('bond', function() {

        it('default bond thickness should be set and equal to 2', function() {
            var val = getBondThickness();
            assert.equal(val, 2);
        });
        it('default bond color should be set and equal to #000000', function() {
            var val = getBondColor();
            assert.equal(val, "#000000");
        });
    });

});

describe('load elements and examples', function() {

    it('elements list from periodic table should be loaded and of length 118', function() {
        var options_count = $('select#Atom option').length;
        assert.equal(options_count, 118);
    });

    it('default selected atom is to be Hydrogen', function() {
        var atomElement = document.getElementById("Atom");
        var atom = atomElement.options[atomElement.selectedIndex].value;
        assert.equal(atom, "H");
    });

    it('examples list from Examples.js should be loaded and of length 14', function() {
        var options_count = $('select#MoleculeId option').length;
        assert.equal(options_count, 14);
    });

    it('default selected example is to be NewMolecule', function() {
        var exampleElement = document.getElementById("MoleculeId");
        var val = exampleElement.options[exampleElement.selectedIndex].innerHTML;
        assert.equal(val, "NewMolecule");
    });

});

describe('validate examples', function() {

    it('examples must be an Object', function() {
        // assert.isObject(Examples, 'Examples must be an Object');
        expect(Examples).to.be.an('object');
    });

    it('all Example names must be of type string', function() {
        Object.keys(Examples).forEach(function(key){
            expect(key).to.be.a('string');
        });
    });

    it('each Example must have the nodes property', function() {
        Object.keys(Examples).forEach(function(key){
            assert.property(Examples[key], 'nodes');
        });
    });

    it('the nodes property must be an array', function() {
        Object.keys(Examples).forEach(function(key){
            expect(Examples[key]['nodes']).to.be.an('array');
        });
    });

    it('each Example must have the links property', function() {
        Object.keys(Examples).forEach(function(key){
            assert.property(Examples[key], 'links');
        });
    });

    it('the links property must be an array', function() {
        Object.keys(Examples).forEach(function(key){
            expect(Examples[key]['links']).to.be.an('array');
        });
    });

    it('the nodes property must be an array of objects with "atom","id" properties', function() {
        Object.keys(Examples).forEach(function(key){
            Examples[key].nodes.should.all.keys('atom','id');
        });
    });

    it('the links property must be an array of objects with "source","bond","target" properties', function() {
        Object.keys(Examples).forEach(function(key){
            Examples[key].links.should.all.keys('source','target','bond');
        });
    });

    it('the "source","bond","target" properties must be integers', function() {
        Object.keys(Examples).forEach(function(key){

            Examples[key].links.forEach(function(object){

                assert.isNumber(object.source);
                var isInt = object.source % 1 === 0;
                assert(isInt, 'not an integer:' + object.source);

                assert.isNumber(object.target);
                var isInt = object.target % 1 === 0;
                assert(isInt, 'not an integer:' + object.target);

                assert.isNumber(object.bond);
                var isInt = object.bond % 1 === 0;
                assert(isInt, 'not an integer:' + object.bond);

            });
        });
    });

    it('the "bond" property must be either 1,2,3 or 4', function() {
        Object.keys(Examples).forEach(function(key){

            Examples[key].links.forEach(function(object){
                expect(object.bond).to.be.oneOf([1,2,3,4]);
            });
        });
    });

    it('the "id" property of nodes must be an integer', function() {
        Object.keys(Examples).forEach(function(key){
            Examples[key].nodes.forEach(function(object){
                assert.isNumber(object.id);
                var isInt = object.id % 1 === 0;
                assert(isInt, 'not an integer:' + object.id);
            });
        });
    });

    it('the "atom" property of nodes must be a string of length 1 or 2', function() {
        Object.keys(Examples).forEach(function(key){
            Examples[key].nodes.forEach(function(object){
                assert.isString(object.atom);
                // assert.typeOf(objec.atom, 'string');

                expect(object.atom).to.have.length.within(1,2); //IUPAC naming standards for Element Symbols

            });
        });
    });

});

describe('validate elements', function() {

        /* Alternative:
            Have separate test cases for all properties like below.
            
            1) periodicTableData.should.all.have.property('Atomic Number');
            2) periodicTableData.should.all.have.property('Density');            
            ...so on...
            but its not necessary...
        */

    it("each Element from Periodic Table Dataset must have the required keys properties", function() {

        periodicTableData.should.all.keys('Atomic Number','Symbol','Element','Atomic Radius','Atomic Weight','Period','Group','Phase','Most Stable Crystal','Type','Ionic Radius','Electronegativity','First Ionization Potential','Density','Melting Point (K)','Boiling Point (K)','Isotopes','Discoverer','Year of Discovery','Specific Heat Capacity','Electron Configuration','Display Row','Display Column');
    });
});