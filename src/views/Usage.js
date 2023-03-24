import React, { useEffect } from "react";
import {marked} from 'marked'
import axios from "axios";
import { Container } from "semantic-ui-react";
import install from "../assets/download-01.svg"

let mdURL = "https://raw.githubusercontent.com/biothings/BioThings_Explorer_TRAPI/main/docs/USAGE.md";

function compiledMarkdown() {
    axios.get(mdURL).then(res=>{
        document.getElementById('md').innerHTML = marked(res.data);
    });
}

function UsagePage(){
    useEffect(()=>{
        compiledMarkdown()
    },[]);

    return <div className="text-left min-h-100">
        <Container color="gray">
            <h1 className="d-flex items-center"><img src={install} width="50" alt="install"/>  Getting started with BioThings Explorer</h1>
            <div id="md"></div>
        </Container>
    </div>
}

export default UsagePage