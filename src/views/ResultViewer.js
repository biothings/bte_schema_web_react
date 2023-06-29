import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import { Container, Message } from "semantic-ui-react";
import axios from "axios";
import JSONEditor from 'jsoneditor'

function ResultViewer(){
    const { id } = useParams();
    const [job, setJob] = useState({});

    function getJob(jobURL){
        axios.get(jobURL).then((res) => {
            const container = document.getElementById("res");
            const options = {
                mode: "view"
            };
            const editor = new JSONEditor(container, options);
            const data = res.data;
            editor.set(data);
        }).catch((err) => {
            console.log('%c Job retrieval error:', 'color: red')
            console.log(err)
        })
    }

    useEffect(()=> {
        let jobs = JSON.parse(localStorage.getItem('bte-jobs-main-site'));
        if (jobs && jobs.length) {
            let found = jobs.find(j => j.id === id);
            if (found){
                console.log('%c Job found', 'color: limegreen')
                setJob(found)
                getJob(found.url)
            }else{
                console.log('%c Job not found', 'color: red')
                alert('Job ID not found. Try another example.')
            }
        }else{
            console.log('%c No jobs yet', 'color: orange')
        }
    }, [id]);

    return <div className="text-left min-h-100">
        <Container color="black">
            <Message compact size="tiny" color={job?.id ? 'green' : 'red'} >{job?.id ? 'Viewing results for job ID: ' + job.id : 'This job ID does not exist: ' + id}</Message>
            {job?.url && <a style={{float: 'right'}} target="_blank" href={job?.url}>view raw data</a>}
            <p>The results below are in TRAPI format, with relevant information returned in the <code>returnvalue.response.message.knowledge_graph</code> and <code>returnvalue.response.message.results</code> sections.</p>
            <div style={{'maxHeight': '1000px', 'overflowY': 'scroll', 'marginBottom': '100px'}}>
                <div id="res" style={{margin: 0, height:'800px'}}></div>
            </div>
        </Container>
    </div>
}

export default ResultViewer