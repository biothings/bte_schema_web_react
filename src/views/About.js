import cytoscape from 'cytoscape';
import React, { useEffect } from 'react'
import { Grid, Container, Message } from 'semantic-ui-react'

import scripps from '../assets/scripps-logo.png';
import network from '../assets/network-figure-01.svg';
import logo from '../assets/biothings-explorer-text-2.svg';
import tryit from '../assets/try-01.svg';

let elements = {
  nodes: [
      { data: { id: 'andrew', name: 'Andrew Su \n Professor', color: 'hotpink' } },
      { data: { id: 'chunlei', name: 'Chunlei Wu \n Professor', color: 'coral' } },
      { data: { id: 'marco', name: 'Marco A. Cano \n Research Programmer III', color: '#ffc656' } },
      { data: { id: 'colleen', name: 'Colleen Xu \n Research Programmer', color: 'white' } },
      { data: { id: 'jackson', name: 'Jackson Callaghan \n Research Programmer', color: 'violet' } },
      { data: { id: 'ayushi', name: 'Ayushi Agrawal \n Bioinformatician II', color: 'lightpink' } },
      { data: { id: 'yao', name: 'Yao Yao \n Staff Scientist', color: 'lightblue' } },
      { data: { id: 'kristina', name: 'Kristina Hanspers \n Senior Research Associate', color: 'magenta' } },
      { data: { id: 'rohan', name: 'Rohan Juneja \n Intern', color: 'lightyellow' } },
      { data: { id: 'alex', name: 'Alex Pico \n Researcher', color: 'limegreen' } },
      { data: { id: 'yao', name: 'Yao Yao \n Staff Scientist', color: 'lightblue' } },
  ],
  edges: [
      { data: { source: 'andrew', target: 'chunlei' } },
      { data: { source: 'andrew', target: 'marco' } },
      { data: { source: 'andrew', target: 'alex' } },
      { data: { source: 'chunlei', target: 'chunlei' } },
      { data: { source: 'chunlei', target: 'jackson' } },
      { data: { source: 'chunlei', target: 'kristina' } },
      { data: { source: 'jackson', target: 'yao' } },
      { data: { source: 'jackson', target: 'rohan' } },
      { data: { source: 'jackson', target: 'andrew' } },
      { data: { source: 'rohan', target: 'andrew' } },
      { data: { source: 'alex', target: 'andrew' } },
      { data: { source: 'chunlei', target: 'marco' } },
      { data: { source: 'chunlei', target: 'alex' } },
      { data: { source: 'jackson', target: 'ayushi' } },
      { data: { source: 'ayushi', target: 'chunlei' } },
      { data: { source: 'ayushi', target: 'colleen' } },
      { data: { source: 'chunlei', target: 'colleen' } },
      { data: { source: 'andrew', target: 'andrew' } },
      { data: { source: 'colleen', target: 'chunlei' } },
      { data: { source: 'marco', target: 'yao' } }
  ]
  }
  
function drawGraph() {
    let cy = cytoscape({
        container: document.getElementById("about-cy"),
        elements: [...elements.edges, ...elements.nodes],
        hideEdgesOnViewport: true,
        layout:{
            name: 'cose',
            directed: true,
            padding: 10
        },
        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'height': 180,
                'width': 180,
                'border-width': 6,
                'border-color': 'data(color)',
                'content': 'data(name)',
                "text-valign": "top",
                "text-halign": "center",
                'color': 'white',
                'text-outline-width': 0,
                'background-fit': 'cover',
                'text-wrap': 'wrap',
                'font-size': '2em'
            })
            .selector('edge')
            .css({
                'curve-style': 'unbundled-bezier',
                'width': 7,
                'target-arrow-shape': 'triangle',
                'line-color': 'gray',
                'target-arrow-color': 'gray'
            })
            .selector(':selected')
            .css({
                'background-color': '#ea590a',
                'line-color': 'white',
                'target-arrow-color': 'white',
                // 'source-arrow-color': 'white',
                'text-outline-color': '#ea590a'
            }).selector('#chunlei')
                .css({
                    'background-image': 'https://i.postimg.cc/xqWf8n0Y/chunlei.jpg'
                })
                .selector('#andrew')
                .css({
                    'background-image': 'https://i.postimg.cc/V5SszdPD/andrew.jpg'
                })
            .selector('#marco')
                .css({
                    'background-image': 'https://i.postimg.cc/hJPg6G08/marco.jpg'
                })
            .selector('#colleen')
                .css({
                    'background-image': 'https://i.postimg.cc/SJCyz3s9/colleen.jpg'
                })
            .selector('#jackson')
                .css({
                    'background-image': 'https://i.postimg.cc/XGtbrk6x/jackson.jpg'
                })
            .selector('#yao')
                .css({
                    'background-image': 'https://i.postimg.cc/FYxNTS0s/yao.jpg'
                })
            .selector('#ayushi')
                .css({
                    'background-image': 'https://i.postimg.cc/wy1zxbZ7/ayushi.jpg'
                })
            .selector('#alex')
                .css({
                    'background-image': 'https://i.postimg.cc/CxSJBQQ9/alex.png'
                })
            .selector('#rohan')
                .css({
                    'background-image': 'https://i.postimg.cc/T3sLMygQ/biothings-explorer-md.png'
                })
            .selector('#kristina')
                .css({
                    'background-image': 'https://i.postimg.cc/T3sLMygQ/biothings-explorer-md.png'
                }),
    })

    cy.on('mouseover', 'edge', function(evt){
        evt.target.select()
    });

    cy.on('mouseout', 'edge', function(evt){
        evt.target.deselect()
    });

    // cy.maxZoom(2);
    // cy.minZoom(.4)
    cy.userZoomingEnabled( false );
    cy.fit();
}


function About(){

    useEffect(()=>{
      drawGraph();
    }, []);

    return <Grid className="gradient text-left min-h-100">
      <Grid.Row className="m-0">
        <Grid.Column website={16}>
          <Container>
            <div className="m-auto">
                <h1 className="text-white d-flex items-center">About <img src={logo} alt="biological network" width="400"/></h1>
                <p className="text-white">
                    BioThings Explorer is an application that creates a federated knowledge graph that is composed of a network of biomedical web services. 
                    BioThings Explorer leverages semantically precise annotations of inputs and outputs for each resource, and automates the chaining of web service calls to execute multi-step graph queries. Because there is no large, centralized knowledge graph to maintain, BioThing Explorer is distributed as a lightweight application that dynamically retrieves information at query time.  <a className="text-blue-400" href="https://biothings.io/" target="_blank" rel="noopener noreferrer">Learn more about BioThings</a>.
                </p>
            </div>
            <hr></hr>
          </Container>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column website={16}>
            <Container>
                <div>
                    <h1 className="text-white d-flex items-center"><img src={tryit} alt="biological network" width="200"/> BTE's Meta-Knowledge Graph</h1>
                    <div>
                        <figure className="text-center">
                            <img src={network} alt="biological network" width="700"/>
                            <Message className='text-left text-white' color='violet'>
                            A visualization of the meta-knowledge graph for BioThings Explorer. The nodes in this graph are the semantic types that BioThings Explorer can query on (limited to the top 10 most common semantic types). The edges between nodes represent mappings between node types that are provided by the APIs accessed by BioThings Explorer. The edge width reflects the number of APIs for each meta-edge, which is also shown as the edge label.
                            </Message>
                        </figure>
                    </div>
                </div>
                <hr></hr>
            </Container>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="network-simple-background">
        <Grid.Column website={16}>
            <Container>
                <div className="bg-network-2">
                    <h1 className="text-white">Our Team</h1>
                    <div className="d-flex justify-end">
                        <img src={scripps} alt="Scripps Research" width="300"/>
                    </div>
                    <div id="about-cy"></div>
                    <div className="text-white">
                        <h5>Past Contributors:</h5>
                        <ul className='text-left'>
                            <li>Jiwen Xin</li>
                            <li>Anders Riutta</li>
                            <li>Eric Zhou</li>
                            <li>Madhumita Narayan</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
}

export default About