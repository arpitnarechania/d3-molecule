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

var Examples = {
  "NewMolecule":{
    "nodes": [
    ],
    "links": [
    ]
    },
    "Water": {
    "nodes": [
      {
        "id": 0,
        "atom": "O",
        "charge":""
      },
      {
        "id": 1,
        "atom": "H",
        "charge":""
      },
      {
        "id": 2,
        "atom": "H",
        "charge":""
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
  },
  "Methyne": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "H",
        "charge":""
      },
      {
        "id": 2,
        "atom": "C",
        "charge":""
      },
      {
        "id": 3,
        "atom": "H",
        "charge":""
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
        "bond": 3
      },
      {
        "source": 2,
        "target": 3,
        "bond": 1
      }
    ]
  },
  "Benzene": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "C",
        "charge":""
      },
      {
        "id": 3,
        "atom": "C",
        "charge":""
      },
      {
        "id": 4,
        "atom": "C",
        "charge":""
      },
      {
        "id": 5,
        "atom": "C",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
      },
      {
        "id": 8,
        "atom": "H",
        "charge":""
      },
      {
        "id": 9,
        "atom": "H",
        "charge":""
      },
      {
        "id": 10,
        "atom": "H",
        "charge":""
      },
      {
        "id": 11,
        "atom": "H",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      },
      {
        "source": 1,
        "target": 2,
        "bond": 2
      },
      {
        "source": 2,
        "target": 3,
        "bond": 1
      },
      {
        "source": 3,
        "target": 4,
        "bond": 2
      },
      {
        "source": 4,
        "target": 5,
        "bond": 1
      },
      {
        "source": 5,
        "target": 0,
        "bond": 2
      },
      {
        "source": 0,
        "target": 6,
        "bond": 1
      },
      {
        "source": 1,
        "target": 7,
        "bond": 1
      },
      {
        "source": 2,
        "target": 8,
        "bond": 1
      },
      {
        "source": 3,
        "target": 9,
        "bond": 1
      },
      {
        "source": 4,
        "target": 10,
        "bond": 1
      },
      {
        "source": 5,
        "target": 11,
        "bond": 1
      }
    ]
  },
  "Ethanol": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "O",
        "charge":""
      },
      {
        "id": 3,
        "atom": "H",
        "charge":""
      },
      {
        "id": 4,
        "atom": "H",
        "charge":""
      },
      {
        "id": 5,
        "atom": "H",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
      },
      {
        "id": 8,
        "atom": "H",
        "charge":""
      },
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      },
      {
        "source": 0,
        "target": 3,
        "bond": 1
      },
      {
        "source": 0,
        "target": 4,
        "bond": 1
      },
      {
        "source": 0,
        "target": 5,
        "bond": 1
      },
      {
        "source": 1,
        "target": 6,
        "bond": 1
      },
      {
        "source": 1,
        "target": 7,
        "bond": 1
      },
      {
        "source": 1,
        "target": 2,
        "bond": 1
      },
      {
        "source": 2,
        "target": 8,
        "bond": 1
      },
    ]
  },
  "Naphthalene": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "C",
        "charge":""
      },
      {
        "id": 3,
        "atom": "C",
        "charge":""
      },
      {
        "id": 4,
        "atom": "C",
        "charge":""
      },
      {
        "id": 5,
        "atom": "C",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
      },
      {
        "id": 8,
        "atom": "H",
        "charge":""
      },
      {
        "id": 9,
        "atom": "H",
        "charge":""
      },
      {
        "id": 10,
        "atom": "C",
        "charge":""
      },
      {
        "id": 11,
        "atom": "C",
        "charge":""
      },
      {
        "id": 12,
        "atom": "C",
        "charge":""
      },
      {
        "id": 13,
        "atom": "C",
        "charge":""
      },
      {
        "id": 14,
        "atom": "H",
        "charge":""
      },
      {
        "id": 15,
        "atom": "H",
        "charge":""
      },
      {
        "id": 16,
        "atom": "H",
        "charge":""
      },
      {
        "id": 17,
        "atom": "H",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      },
      {
        "source": 1,
        "target": 2,
        "bond": 2
      },
      {
        "source": 2,
        "target": 3,
        "bond": 1
      },
      {
        "source": 3,
        "target": 4,
        "bond": 2
      },
      {
        "source": 4,
        "target": 5,
        "bond": 1
      },
      {
        "source": 5,
        "target": 0,
        "bond": 2
      },
      {
        "source": 0,
        "target": 6,
        "bond": 1
      },
      {
        "source": 1,
        "target": 7,
        "bond": 1
      },
      {
        "source": 2,
        "target": 8,
        "bond": 1
      },
      {
        "source": 3,
        "target": 9,
        "bond": 1
      },
      {
        "source": 5,
        "target": 10,
        "bond": 1
      },
      {
        "source": 4,
        "target": 11,
        "bond": 1
      },
      {
        "source": 11,
        "target": 12,
        "bond": 2
      },
      {
        "source": 12,
        "target": 13,
        "bond": 1
      },
      {
        "source": 13,
        "target": 10,
        "bond": 2
      },
      {
        "source": 10,
        "target": 14,
        "bond": 1
      },
      {
        "source": 11,
        "target": 15,
        "bond": 1
      },
      {
        "source": 12,
        "target": 16,
        "bond": 1
      },
      {
        "source": 13,
        "target": 17,
        "bond": 1
      }
    ]
  },
  "Pyrrole": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "C",
        "charge":""
      },
      {
        "id": 3,
        "atom": "C",
        "charge":""
      },
      {
        "id": 4,
        "atom": "N",
        "charge":""
      },
      {
        "id": 5,
        "atom": "H",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
      },
      {
        "id": 8,
        "atom": "H",
        "charge":""
      },
      {
        "id": 9,
        "atom": "H",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 2
      },
      {
        "source": 1,
        "target": 2,
        "bond": 1
      },
      {
        "source": 2,
        "target": 3,
        "bond": 2
      },
      {
        "source": 3,
        "target": 4,
        "bond": 1
      },
      {
        "source": 4,
        "target": 0,
        "bond": 1
      },
      {
        "source": 0,
        "target": 5,
        "bond": 1
      },
      {
        "source": 1,
        "target": 6,
        "bond": 1
      },
      {
        "source": 2,
        "target": 7,
        "bond": 1
      },
      {
        "source": 3,
        "target": 8,
        "bond": 1
      },
      {
        "source": 4,
        "target": 9,
        "bond": 1
      }
    ]
  },
  "Cyclopropane": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "C",
        "charge":""
      },
      {
        "id": 3,
        "atom": "H",
        "charge":""
      },
      {
        "id": 4,
        "atom": "H",
        "charge":""
      },
      {
        "id": 5,
        "atom": "H",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
      },
      {
        "id": 8,
        "atom": "H",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      },
      {
        "source": 1,
        "target": 2,
        "bond": 1
      },
      {
        "source": 2,
        "target": 0,
        "bond": 1
      },
      {
        "source": 0,
        "target": 3,
        "bond": 1
      },
      {
        "source": 0,
        "target": 4,
        "bond": 1
      },
      {
        "source": 1,
        "target": 5,
        "bond": 1
      },
      {
        "source": 1,
        "target": 6,
        "bond": 1
      },
      {
        "source": 2,
        "target": 7,
        "bond": 1
      },
      {
        "source": 2,
        "target": 8,
        "bond": 1
      }
    ]
  },
  "Carbide": {
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 4
      }
    ]
  },
  "HydrochloricAcid":{
    "nodes": [
      {
        "id": 0,
        "atom": "H",
        "charge":""
      },
      {
        "id": 1,
        "atom": "Cl",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 1
      }
    ]
  },
  "AceticAcid":{
    "nodes": [
      {
        "id": 0,
        "atom": "C",
        "charge":""
      },
      {
        "id": 1,
        "atom": "C",
        "charge":""
      },
      {
        "id": 2,
        "atom": "O",
        "charge":""
      },
      {
        "id": 3,
        "atom": "O",
        "charge":""
      },
      {
        "id": 4,
        "atom": "H",
        "charge":""
      },
      {
        "id": 5,
        "atom": "H",
        "charge":""
      },
      {
        "id": 6,
        "atom": "H",
        "charge":""
      },
      {
        "id": 7,
        "atom": "H",
        "charge":""
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
        "target": 4,
        "bond": 1
      },
      {
        "source": 0,
        "target": 5,
        "bond": 1
      },
      {
        "source": 0,
        "target": 6,
        "bond": 1
      },
      {
        "source": 1,
        "target": 2,
        "bond": 2
      },
      {
        "source": 1,
        "target": 3,
        "bond": 1
      },
      {
        "source": 3,
        "target": 7,
        "bond": 1
      }
    ]
  },
  "SulphurDioxide": {
    "nodes": [
      {
        "id": 0,
        "atom": "S",
        "charge":""
      },
      {
        "id": 1,
        "atom": "O",
        "charge":""
      },
      {
        "id": 2,
        "atom": "O",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "bond": 2
      },
      {
        "source": 0,
        "target": 2,
        "bond": 2
      }
    ]
  },
  "MagnesiumChloride": {
    "nodes": [
      {
        "id": 0,
        "atom": "Mg",
        "charge":""
      },
      {
        "id": 1,
        "atom": "Cl",
        "charge":""
      },
      {
        "id": 2,
        "atom": "Cl",
        "charge":""
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
  },
  "FerricOxide":{
    "nodes": [
      {
        "id": 0,
        "atom": "Fe",
        "charge":""
      },
      {
        "id": 1,
        "atom": "Fe",
        "charge":""
      },
      {
        "id": 2,
        "atom": "Fe",
        "charge":""
      },
      {
        "id": 3,
        "atom": "O",
        "charge":""
      },
      {
        "id": 4,
        "atom": "O",
        "charge":""
      },
      {
        "id": 5,
        "atom": "O",
        "charge":""
      },
      {
        "id": 6,
        "atom": "O",
        "charge":""
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 3,
        "bond": 1
      },
      {
        "source": 0,
        "target": 4,
        "bond": 1
      },
      {
        "source": 0,
        "target": 5,
        "bond": 1
      },
      {
        "source": 1,
        "target": 3,
        "bond": 1
      },
      {
        "source": 1,
        "target": 4,
        "bond": 1
      },
      {
        "source": 1,
        "target": 6,
        "bond": 1
      },
      {
        "source": 2,
        "target": 5,
        "bond": 1
      },
      {
        "source": 2,
        "target": 6,
        "bond": 1
      }
    ]
  }
}
