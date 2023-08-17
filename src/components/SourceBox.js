import React, { useState, useEffect } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import loading_img from '../assets/loading.svg';
import axios from 'axios';
import EntityPill from './EntityPill'
import CytoNetworkSource from './CytoNetworkSource';

function SourceBox(props) {

    let [loading, setLoading] = useState(true);
    let [graphData, setGraphData] = useState({});
    let [smartDescription, setDesc] = useState('');
    let [smartURL, setUrl] = useState('');
    let [relationships, setRelationships] = useState([]);


    function getMetadata(id){
        setLoading(true);
        axios.get(`https://smart-api.info/api/query?q=${id}&fields=info`).then((res) => {
            if (res.data.hits?.[0]?.['info']?.['description']) {
                setDesc(res.data.hits[0]['info']['description'])
            }
            if (res.data.hits?.[0]?.['info']?.['contact']?.['url']) {
                setUrl(res.data.hits?.[0]?.['info']?.['contact']?.['url'])
            }
            
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }

    function makeGraphData(list){
        let data = {
            '_id':  Math.floor(Math.random() * (1000 - 200 + 1) + 200),
            'elements': {
                    'nodes': [
                    // { data: { id: 'dis', name: '⭐Disease\n(MONDO:0016575)', color: '#8d5bd4' } },
                    ],
                    'edges': [
                    // { data: { source: 'dis', target: 'ph', name:'⭐biolink:has_phenotype' } }
                    ]
            },
        }
        let nodes = new Set();

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if (!nodes.has(element.subject)) {
                nodes.add(element.subject)
            }
            if (!nodes.has(element.object)) {
                nodes.add(element.object)
            }
            data.elements.edges.push({
                data: { 
                    source: element.subject, 
                    target: element.object, 
                    name: element.predicate }
            })
        }

        let nodes_list = [...nodes];

        function getColor(name){
            switch (name) {
                case "Disease":
                    return '#8d5bd4'
                case "Gene":
                    return '#2c98f0'
                case "SmallMolecule":
                    return '#fe5c5c'
                case "CellularComponent":
                    return '#b5cb17'
                case "MolecularActivity":
                    return '#dd5181'
                case "Pathway":
                    return '#4bc0c0'
                case "GrossAnatomicalStructure":
                    return '#364485'
                case "SequenceVariant":
                    return '#02838f'
                case "PhenotypicFeature":
                    return '#ffa601'
                case "Polypeptide":
                    return '#b48484'
                case "Treatment":
                    return 'purple'
                case "Procedure":
                    return 'darkgray'
                case "ChemicalEntity":
                    return 'orange'
                case "ChemicalMixture":
                    return '#ea590a'
                case "OrganismTaxon":
                    return 'hotpink'
                case "InformationContentEntity":
                    return '#955196'
                case "OrganismAttribute":
                    return '#114068'
                case "AnatomicalEntity":
                    return '#4338c9'
                case "MolecularMixture":
                    return '#d65042'
                default:
                    return 'gray'
            }
        }

        for (let index = 0; index < nodes_list.length; index++) {
            const element = nodes_list[index];
            data.elements.nodes.push({
                data: { id: element, name: element, color: getColor(element) } 
            })
        }

        console.log(data)

        setGraphData(data);
    }

    function getMetaKG(name){
        setLoading(true);
        axios.get(`https://smart-api.info/api/metakg?q=api.name:("${name}")&fields=subject,object,predicate,api.name&size=40`).then((res) => {
            let pairs = new Set();
            for (let i = 0; i < res.data?.hits.length; i++) {
                pairs.add(res.data?.hits[i].subject + ":" + res.data?.hits[i].object)
            }
            let unique_pairs = [...pairs].map(p => {
                return {
                    'subject': p.split(":")[0],
                    'object': p.split(":")[1]
                }
            })
            setRelationships(unique_pairs)
            makeGraphData(unique_pairs)
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }

    useEffect(()=> {
        getMetadata(props.identifier);
        getMetaKG(props.name);
    }, [props.identifier, props.name]);


    return(
        <Grid.Column>
            <Message color="black" style={{margin: '5px'}}>
                <Message.Header>{props.name}</Message.Header>
                {loading && <img src={loading_img} alt="Loading" width="30"/>}
                {smartDescription?.length && <details style={{marginBottom: 10}}> <summary style={{color: 'orange'}}>See API description</summary>
                    <p>{smartDescription}</p>
                    </details>}
                <div className='d-flex'>
                    <div>
                        {graphData?.elements && <CytoNetworkSource query={graphData}></CytoNetworkSource>}
                    </div>
                <div style={{marginLeft: 20}}>
                    <div className='d-flex flex-wrap'>
                        {relationships.map((v, i) =>{
                            return <EntityPill key={i + v.subject + v.object} subject={v.subject} object={v.object}></EntityPill>
                        })}
                    </div>
                </div>
                </div>
                {smartURL && <div className='d-flex justify-content-between align-items-center' style={{marginTop: 10}}>
                    <a target="_blank" rel="noopener noreferrer" href={smartURL}>
                        <small>Learn More This API&nbsp;<i aria-hidden="true" className="share square icon"></i></small>
                    </a>
                </div>}
            </Message>
        </Grid.Column>
    )
}

export default SourceBox;