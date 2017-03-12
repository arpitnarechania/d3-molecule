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
        "atom": "O"
      },
      {
        "id": 1,
        "atom": "H"
      },
      {
        "id": 2,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "H"
      },
      {
        "id": 2,
        "atom": "C"
      },
      {
        "id": 3,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "C"
      },
      {
        "id": 3,
        "atom": "C"
      },
      {
        "id": 4,
        "atom": "C"
      },
      {
        "id": 5,
        "atom": "C"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
      },
      {
        "id": 8,
        "atom": "H"
      },
      {
        "id": 9,
        "atom": "H"
      },
      {
        "id": 10,
        "atom": "H"
      },
      {
        "id": 11,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "O"
      },
      {
        "id": 3,
        "atom": "H"
      },
      {
        "id": 4,
        "atom": "H"
      },
      {
        "id": 5,
        "atom": "H"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
      },
      {
        "id": 8,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "C"
      },
      {
        "id": 3,
        "atom": "C"
      },
      {
        "id": 4,
        "atom": "C"
      },
      {
        "id": 5,
        "atom": "C"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
      },
      {
        "id": 8,
        "atom": "H"
      },
      {
        "id": 9,
        "atom": "H"
      },
      {
        "id": 10,
        "atom": "C"
      },
      {
        "id": 11,
        "atom": "C"
      },
      {
        "id": 12,
        "atom": "C"
      },
      {
        "id": 13,
        "atom": "C"
      },
      {
        "id": 14,
        "atom": "H"
      },
      {
        "id": 15,
        "atom": "H"
      },
      {
        "id": 16,
        "atom": "H"
      },
      {
        "id": 17,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "C"
      },
      {
        "id": 3,
        "atom": "C"
      },
      {
        "id": 4,
        "atom": "N"
      },
      {
        "id": 5,
        "atom": "H"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
      },
      {
        "id": 8,
        "atom": "H"
      },
      {
        "id": 9,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "C"
      },
      {
        "id": 3,
        "atom": "H"
      },
      {
        "id": 4,
        "atom": "H"
      },
      {
        "id": 5,
        "atom": "H"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
      },
      {
        "id": 8,
        "atom": "H"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
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
        "atom": "H"
      },
      {
        "id": 1,
        "atom": "Cl"
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
        "atom": "C"
      },
      {
        "id": 1,
        "atom": "C"
      },
      {
        "id": 2,
        "atom": "O"
      },
      {
        "id": 3,
        "atom": "O"
      },
      {
        "id": 4,
        "atom": "H"
      },
      {
        "id": 5,
        "atom": "H"
      },
      {
        "id": 6,
        "atom": "H"
      },
      {
        "id": 7,
        "atom": "H"
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
        "atom": "S"
      },
      {
        "id": 1,
        "atom": "O"
      },
      {
        "id": 2,
        "atom": "O"
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
        "atom": "Mg"
      },
      {
        "id": 1,
        "atom": "Cl"
      },
      {
        "id": 2,
        "atom": "Cl"
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
        "atom": "Fe"
      },
      {
        "id": 1,
        "atom": "Fe"
      },
      {
        "id": 2,
        "atom": "Fe"
      },
      {
        "id": 3,
        "atom": "O"
      },
      {
        "id": 4,
        "atom": "O"
      },
      {
        "id": 5,
        "atom": "O"
      },
      {
        "id": 6,
        "atom": "O"
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
