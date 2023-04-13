import { configureStore, createSlice } from '@reduxjs/toolkit';


const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        'examples': [
            {
            'selected': false,
            'name' :'Disease (Kartagener syndrome) has phenotypic feature',
            '_id': '0001',
            'elements': {
                    'nodes': [
                    { data: { id: 'dis', name: '⭐Disease\n(MONDO:0016575)', color: '#8d5bd4' } },
                    { data: { id: 'ph', name: 'PhenotypicFeature', color: '#2abcbd' } },
                    ],
                    'edges': [
                    { data: { source: 'dis', target: 'ph', name:'⭐biolink:has_phenotype' } }
                    ]
            },
            'query': 
            {
                "message": {
                    "query_graph": {
                        "nodes": {
                            "n0": {
                                "categories": ["biolink:Disease"],
                                "ids": ["MONDO:0016575"]
                            },
                            "n1": {
                                "categories": ["biolink:PhenotypicFeature"]
                            }
                        },
                        "edges": {
                            "e01": {
                                "subject": "n0",
                                "object": "n1",
                                "predicates": ["biolink:has_phenotype"]
                            }
                        }
                    }
                }
            }
            },
            {
              'selected': false,
            'name' :'Disease (Kartagener syndrome) relation to genes',
            '_id': '0002',
            'elements': {
                    'nodes': [
                      { data: { id: 'dis', name: '⭐Disease\n(MONDO:0016575)', color: '#8d5bd4' } },
                      { data: { id: 'gene', name: 'Gene', color: '#369ac1' } },
                    ],
                    'edges': [
                    { data: { source: 'dis', target: 'gene', name:'' } }
                    ]
                },
              "query":{
                  "message": {
                      "query_graph": {
                          "nodes": {
                              "n0": {
                                  "categories": ["biolink:Disease"],
                                  "ids": ["MONDO:0005737"]
                              },
                              "n1": {
                                  "categories": ["biolink:Gene"]
                              }
                          },
                          "edges": {
                              "e01": {
                                  "subject": "n0",
                                  "object": "n1"
                              }
                          }
                      }
                  }
              }
            },
            {
              'selected': false,
            'name' :'Disease (Ebola hemorrhagic fever) gene relation to small molecules',
            '_id': '0003',
            'elements': {
                    'nodes': [
                    
                    { data: { id: 'dis', name: '⭐Disease\n(MONDO:0005737)', color: '#8d5bd4' } },
                    { data: { id: 'gene', name: 'Gene', color: '#369ac1' } },
                    { data: { id: 'sm', name: 'SmallMolecule', color: 'hotpink' } },
                    ],
                    'edges': [
                    { data: { source: 'dis', target: 'gene', name:'' } },
                    { data: { source: 'gene', target: 'sm', name:'' } },
                    ]
                },
                "query": {
                  "message": {
                      "query_graph": {
                          "nodes": {
                              "n0": {
                                  "categories": ["biolink:Disease"],
                                  "ids": ["MONDO:0005737"]
                              },
                              "n1": {
                                  "categories": ["biolink:Gene"]
                              },
                              "n2": {
                                  "categories": ["biolink:SmallMolecule"]
                              }
                          },
                          "edges": {
                              "e01": {
                                  "subject": "n0",
                                  "object": "n1"
                              },
                              "e02": {
                                  "subject": "n1",
                                  "object": "n2"
                              }
                          }
                      }
                  }
              }
            },
            {
              'selected': false,
            'name' :'Gene (KCNMA1) relation to small molecules via other genes',
            '_id': '0004',
            'elements': {
                    'nodes': [
                      { data: { id: 'gene', name: '⭐Gene\n(NCBIGene:3778)', color: '#369ac1' } },
                      { data: { id: 'gene2', name: 'Gene', color: '#369ac1' } },
                      { data: { id: 'sm', name: 'SmallMolecule', color: 'hotpink' } },
                    ],
                    'edges': [
                    { data: { source: 'gene', target: 'gene2', name:'' } },
                    { data: { source: 'gene2', target: 'sm', name:'' } },
                    ]
                },
              "query": {
                  "message": {
                    "query_graph": {
                      "nodes": {
                        "n0": {
                          "categories": ["biolink:Gene"],
                          "ids": ["NCBIGene:3778"]
                        },
                        "n1": {
                          "categories": ["biolink:Gene"]
                        },
                        "n2": {
                          "categories": ["biolink:SmallMolecule"]
                        }
                      },
                      "edges": {
                        "e01": {
                          "subject": "n0",
                          "object": "n1"
                        },
                        "e02": {
                          "subject": "n1",
                          "object": "n2"
                        }
                      }
                    }
                  }
                }
            },
        ],
        'mdFiles':{
            'install': 'https://raw.githubusercontent.com/biothings/biothings_explorer/main/docs/INSTALLATION.md',
            'usage': 'https://raw.githubusercontent.com/biothings/biothings_explorer/main/docs/USAGE.md',
            'reference': 'https://raw.githubusercontent.com/biothings/biothings_explorer/main/docs/REFERENCE.md',
        },
        'jobs': [],
        'selectedQuery': {},
        'message': '',
        'loading': false
    },
    reducers:{
        updateJobs: (state)=>{
            console.log('%c Saving jobs: ' + state.jobs.length, 'color: blue')
            localStorage.setItem('bte-jobs-main-site', JSON.stringify(state.jobs));
        },
        setLoading: (state, action)=>{
            state.loading = action.payload
        },
        setJobs: (state, action)=>{
            state.jobs = action.payload
        },
        addJob: (state, action)=>{
            console.log('%c Adding job...', 'color: violet')
            console.log(action.payload)
            state.jobs.push(action.payload);
            console.log('%c Jobs available: ' + state.jobs.length, 'color: purple')
        },
        setMessage: (state, action)=>{
            state.message = action.payload
        },
        deleteJobs:(state)=>{
            localStorage.removeItem('bte-jobs-main-site');
            state.jobs = [];
        },
        selectQuery: (state, action)=>{
            state.examples.forEach((query) => {
                if ( query._id === action.payload._id) {
                    query.selected = !query.selected
                    // Save selected
                    if (query.selected) {
                        state.selectedQuery = query.query
                    } else {
                        state.selectedQuery = {}
                    }
                }else{
                    query.selected = false;
                }
            });
        },
    }
});

export const { updateJobs, selectQuery, deleteJobs, setLoading, addJob, setMessage, setJobs } = jobsSlice.actions;

export const store = configureStore({
    reducer: {
        'main': jobsSlice.reducer
    }
});

