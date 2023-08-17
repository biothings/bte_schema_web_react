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
        'loading': false,
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

const sourcesSlice = createSlice({
    name: 'sources',
    initialState: {
        'api_list': [ // enabled for use in general and by_team endpoints
            // external (not Su / Wu Lab), non-TRAPI APIs
            // annotated with SmartAPI x-bte
            // also accessible by v1/team/Service Provider/ endpoints and by api-specific endpoints
            {
                id: 'd22b657426375a5295e7da8a303b9893',
                name: 'BioLink API'
                // also known as Monarch: https://monarchinitiative.org/
                // NOT the same as the Biolink-model
            },
            {
                id: '0212611d1c670f9107baf00b77f0889a',
                name: 'CTD API',
                primarySource: true
            },
            {
                id: '43af91b3d7cae43591083bff9d75c6dd',
                name: 'EBI Proteins API'
            },
            {
                id: 'dca415f2d792976af9d642b7e73f7a41',
                name: 'LitVar API'
            },
            {
                id: '1f277e1563fcfd124bfae2cc3c4bcdec',
                name: 'QuickGO API'
            },
            {
                id: '1c056ffc7ed0dd1229e71c4752239465',
                name: 'Ontology Lookup Service API'
            },
            // internal (Su / Wu Lab), non-TRAPI: "pending" BioThings APIs
            // annotated with SmartAPI x-bte
            // also accessible by v1/team/Service Provider/ endpoints and by api-specific endpoints
            {
                id: '38e9e5169a72aee3659c9ddba956790d',
                name: 'BioThings BindingDB API'
            },
            {
                id: '55a223c6c6e0291dbd05f2faf27d16f4',
                name: 'BioThings BioPlanet Pathway-Disease API'
            },
            {
                id: 'b99c6dd64abcefe87dcd0a51c249ee6d',
                name: 'BioThings BioPlanet Pathway-Gene API'
            },
            {
                id: '00fb85fc776279163199e6c50f6ddfc6',
                name: 'BioThings DDInter API'
            },
            {
                id: 'e3edd325c76f2992a111b43a907a4870',
                name: 'BioThings DGIdb API'
            },
            {
                id: 'a7f784626a426d054885a5f33f17d3f8',
                name: 'BioThings DISEASES API'
            },
            {
                id: '1f47552dabd67351d4c625adb0a10d00',
                name: 'BioThings EBIgene2phenotype API'
            },
            {
                id: 'cc857d5b7c8b7609b5bbb38ff990bfff',
                name: 'BioThings GO Biological Process API'
            },
            {
                id: 'f339b28426e7bf72028f60feefcd7465',
                name: 'BioThings GO Cellular Component API'
            },
            {
                id: '34bad236d77bea0a0ee6c6cba5be54a6',
                name: 'BioThings GO Molecular Function API'
            },
            {
                id: '316eab811fd9ef1097df98bcaa9f7361',
                name: 'BioThings GTRx API'
            },
            {
                id: 'a5b0ec6bfde5008984d4b6cde402d61f',
                name: 'BioThings HPO API'
            },
            {
                id: '32f36164fabed5d3abe6c2fd899c9418',
                name: 'BioThings IDISK API'
            },
            {
                id: '77ed27f111262d0289ed4f4071faa619',
                name: 'BioThings MGIgene2phenotype API'
            },
            {
                id: 'edeb26858bd27d0322af93e7a9e08761',
                name: 'BioThings PFOCR API'
            },
            {
                id: 'b772ebfbfa536bba37764d7fddb11d6f',
                name: 'BioThings RARe-SOURCE API'
            },
            {
                id: '03283cc2b21c077be6794e1704b1d230',
                name: 'BioThings Rhea API'
            },
            {
                id: '1d288b3a3caf75d541ffaae3aab386c8',
                name: 'BioThings SEMMEDDB API'
            },
            {
                id: 'ec6d76016ef40f284359d17fbf78df20',
                name: 'BioThings UBERON API'
            },
            // internal (Su / Wu Lab), non-TRAPI: Core BioThings APIs
            // annotated with SmartAPI x-bte
            // also accessible by v1/team/Service Provider/ endpoints and by api-specific endpoints
            {
                id: '8f08d1446e0bb9c2b323713ce83e2bd3',
                name: 'MyChem.info API'
            },
            {
                id: '671b45c0301c8624abbd26ae78449ca2',
                name: 'MyDisease.info API'
            },
            {
                id: '59dce17363dce279d389100834e43648',
                name: 'MyGene.info API'
            },
            {
                id: '09c8782d9f4027712e65b95424adba79',
                name: 'MyVariant.info API'
            },
            // non-TRAPI: pending BioThings APIs made in collab with Multiomics Provider
            // annotated with SmartAPI x-bte
            // also accessible by v1/team/Service Provider/ and v1/team/Multiomics Provider endpoints, and by api-specific endpoints
            {
                id: 'adf20dd6ff23dfe18e8e012bde686e31',
                name: 'Multiomics BigGIM-DrugResponse KP API'
            },
            {
                id: '08a5ddcde71b4bf838327ef469076acd',
                name: 'Multiomics ClinicalTrials KP'
            },
            {
                id: 'd86a24f6027ffe778f84ba10a7a1861a',
                name: 'Multiomics EHR Risk KP API'
            },
            {
                id: '02af7d098ab304e80d6f4806c3527027',
                name: 'Multiomics Wellness KP API'
            },
            // non-TRAPI: pending BioThings APIs made in collab with Text Mining Provider
            // annotated with SmartAPI x-bte
            // also accessible by v1/team/Service Provider/ and v1/team/Text Mining Provider endpoints, and by api-specific endpoints
            {
                id: '978fe380a147a8641caf72320862697b',
                name: 'Text Mining Targeted Association API'
            },
            // TRAPI (Translator standard) APIs: Automat
            // not accessible by team or api-specific endpoints
            // Notes: We don't ingest the following:
            // - Automat-robokop: seems to repeat a lot of data that is in the other APIs
            {
            // this API overlaps with our Biolink API registration, but we have bugs with our api-response-transform
            //   this may have been updated more recently / transformed data into TRAPI format
                id: 'ef0656900ff73f861611bcad87a94bce',
                name: 'Automat-biolink(Trapi v1.4.0)'
            },
            {
                // this may overlap with info we have in MyDisease, MyChem, and other APIs...
                id: '97da45e75266b021fae885735befad07',
                name: 'Automat-ctd(Trapi v1.4.0)'
            },
            {
                id: 'a80b9c70e756453d1ce8971b59fe1778',
                name: 'Automat-drug-central(Trapi v1.4.0)'
            },
            {
                id: '2575e053d0a631433b447995e1bc9602',
                name: 'Automat-gtex(Trapi v1.4.0)'
            },
            {
                id: '387f7a2c21656ddfcce5ccf9ea459049',
                name: 'Automat-gtopdb(Trapi v1.4.0)'
            },
            {
                id: 'cd9fc0ca8cc6d9f56bd56a34766de791',
                name: 'Automat-gwas-catalog(Trapi v1.4.0)'
            },
            {
                id: '8a1e2c2eade9fe3a932ba1dbb7f85688',
                name: 'Automat-hetio(Trapi v1.4.0)'
            },
            {
                id: '067d3a847117c6f42896cc8cd140a704',
                name: 'Automat-hgnc(Trapi v1.4.0)'
            },
            {
                id: '0658e8749b9601a5faba5157ba12eb06',
                name: 'Automat-hmdb(Trapi v1.4.0)'
            },
            {
            // this API overlaps with our BioThings GO APIs, but
            //   may have been updated more recently / transformed data into TRAPI format
                id: '43cf256c660cc5bdeac23fdd3063d474',
                name: 'Automat-human-goa(Trapi v1.4.0)'
            },
            {
                id: '76a164ff43e7ab39a5b98a782f6361bf',
                name: 'Automat-icees-kg(Trapi v1.4.0)'
            },
            {
                id: '0b0a4d48ccd9ad2fd34ee53c34f87e94',
                name: 'Automat-intact(Trapi v1.4.0)'
            },
            {
                id: '26ca4939d437c411bcb65b85a9dc2b99',
                name: 'Automat-panther(Trapi v1.4.0)'
            },
            {
                id: '1c71f68839a44b1b857e79ae7f7e3381',
                name: 'Automat-pharos(Trapi v1.4.0)'
            },
            {
                id: '465ff6de7ddf35ca8b2df6c0b01e6554',
                name: 'Automat-viral-proteome(Trapi v1.4.0)'
            },
            // TRAPI (Translator standard) APIs: COHD
            // not accessible by team or api-specific endpoints
            // notes on COHD:
            // - DON'T INGEST 'Columbia Open Health Data (COHD)'/70117385218edc9bc01633829011dfcf
            //   IT IS NOT TRAPI (and may be outdated?)
            // - COHD for COVID-19 should work but BTE gets a 500 when retrieving meta_knowledge_graph...
            //   smartapi ID fc8245e92c970298449294fc04211869
            {
                id: 'af364143267ad5235bf78c1511223875',
                name: 'COHD TRAPI'
            },
            // TRAPI (Translator standard) APIs: CHP
            // not accessible by team or api-specific endpoints
            {
                id: '23f770568b92b7a82063989b3ddd9706',
                name: 'Connections Hypothesis Provider API'
            },
        ]
    },
    reducers:{

    }
})

export const { updateJobs, selectQuery, deleteJobs, setLoading, addJob, setMessage, setJobs } = jobsSlice.actions;

export const store = configureStore({
    reducer: {
        'main': jobsSlice.reducer,
        'sources': sourcesSlice.reducer
    }
});

