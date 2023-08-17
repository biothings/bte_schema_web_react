import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';

function drawGraph(props) {
    let cy = cytoscape({
        container: document.getElementById(props.query._id),
        elements: [...props.query.elements.edges, ...props.query.elements.nodes],
        hideEdgesOnViewport: true,
        layout:{
            name: 'grid',
            minNodeSpacing: 10
        },
        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                // 'content': 'data(name)',
                "text-valign": "top",
                "text-halign": "center",
                'color': 'white',
                'text-outline-width': 0,
                "font-size": "7px",
                'background-color': 'data(color)',
                'text-wrap': 'wrap',
                'height': '10',
                'width': '10',
            })
            .selector('edge')
            .css({
                'curve-style': 'unbundled-bezier',
                'content': 'data(name)',
                'color': 'lightyellow',
                'arrow-scale': '.5',
                'font-weight': 'bold',
                "font-size": "7px",
                'width': 1,
                'target-arrow-shape': 'triangle',
                'line-color': '#ea590a',
                'target-arrow-color': '#ea590a'
            })
            .selector(':selected')
            .css({
                'background-color': '#ea590a',
                'line-color': 'white',
                'target-arrow-color': 'white',
                'source-arrow-color': 'white',
                'text-outline-color': '#ea590a'
            }),
    })

    cy.on('mouseover', 'edge', function(evt){
        evt.target.select()
    });

    cy.on('mouseout', 'edge', function(evt){
        evt.target.deselect()
    });

    cy.maxZoom(2);
    cy.minZoom(1);
    cy.fit();
}

function CytoNetworkSource(props) {
    useEffect(()=> drawGraph(JSON.parse(JSON.stringify(props))))
    return(
        <div className="cy-source" id={props.query._id}></div>
    )
}

export default CytoNetworkSource;