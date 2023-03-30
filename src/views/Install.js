import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import {marked} from 'marked'
import axios from "axios";
import { Container, Segment, Message } from "semantic-ui-react";
import install from "../assets/download-01.svg"

let mdURL = "https://raw.githubusercontent.com/biothings/BioThings_Explorer_TRAPI/main/docs/INSTALLATION.md";

function compiledMarkdown() {
    axios.get(mdURL).then(res=>{
        document.getElementById('md').innerHTML = marked(res.data);
    });
}

function InstallPage(){
    useEffect(()=>{
        compiledMarkdown()
    },[]);

    return <div className="text-left min-h-100">
        <Container color="gray">
            <h1 className="d-flex items-center"><img src={install} width="50" alt="install"/>  Install BioThings Explorer</h1>
            <Message color="orange">
                <p>Are you having issues or need more information? <a 
                rel="noopener noreferrer"
                target="_blank"
                href='https://github.com/biothings/BioThings_Explorer_TRAPI#local-installations'>
                Visit us on GitHub <i aria-hidden="true" className="share square icon"></i>
                </a>.</p>
            </Message>
            <div id="md"></div>
            <Segment inverted color="purple" className="text-center text-white" style={{marginBottom: '5vh', padding: 90}}>
                <h2>BTE Usage</h2>
                <Link to='/usage'>
                    <h3 className="text-white">Continue to learn how to use BioThings Explorer <i aria-hidden="true" className="angle right icon"></i></h3>
                </Link>
            </Segment>
        </Container>
    </div>
}

export default InstallPage