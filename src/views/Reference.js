import React, { useEffect } from "react";
import {marked} from 'marked'
import axios from "axios";
import { Container } from "semantic-ui-react";
import install from "../assets/download-01.svg"
import { useSelector } from "react-redux";

function RefPage(){
    let mdURL = useSelector(state => state.main.mdFiles.reference);

    useEffect(()=>{
        function compiledMarkdown() {
            axios.get(mdURL).then(res=>{
                document.getElementById('md').innerHTML = marked(res.data);
            });
        }
        compiledMarkdown()
    },[mdURL]);

    return <div className="text-left min-h-100">
        <Container color="gray">
            <h1 className="d-flex items-center"><img src={install} width="50" alt="install"/>  Useful variable references when using BioThings Explorer</h1>
            <div id="md" className="mb-4"></div>
        </Container>
    </div>
}

export default RefPage