import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import { Container, Message, Button } from "semantic-ui-react";
import axios from "axios";
import JSONEditor from 'jsoneditor'

import complete from '../assets/complete-01.svg';
import active from '../assets/active-01.svg';
import queued from '../assets/queued-01.svg';
import errorimg from '../assets/error-01.svg';

function ResultViewer(){
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [msg, showMSG] = useState(false);
    const [jobState, setJobState] = useState('');

    function downloadResponse(data) {
        var a = document.createElement("a");
        var file = new Blob(
          [
            "<sc" +
              'ript type="application/ld+json" >' +
              JSON.stringify(data, null, 2) +
              "</scr" +
              "ipt>",
          ],
          { type: "application/json" }
        );
        a.href = URL.createObjectURL(file);
        a.download = "bte-response-" + job?.id;
        a.click();
    }

    function openEditor(data){
        const container = document.getElementById("res");
        const options = {
            'mode': "view",
        };
        const editor = new JSONEditor(container, options);
        editor.set(data);
        function expandPath(path) {
            for (let i = 0; i < path.length; i++) {
                const parentPath = path.slice(0, i)
                editor.expand({ 
                    'path': parentPath, 
                    'isExpand': ['knowledge_graph', 'results'].includes(path) ? false : true, 
                    'recursive': false
                });
            }
        }
        expandPath(['returnvalue', 'response', 'message', 'knowledge_graph']);
        expandPath(['returnvalue', 'response', 'message', 'results']);
        console.log('Editor Loaded')
    }

    function getJob(jobURL, download=false){
        showMSG(true);
        // check protocol
        let prot = new URL(jobURL).protocol
        if (window.location.protocol !== prot) {
            jobURL = jobURL.replace(prot, window.location.protocol)
        }
        axios.get(jobURL).then((res) => {
            const data = res.data;
            setJobState(data?.status);
            if (download) {
                downloadResponse(data);
            }else if(data?.status === 'Completed'){
                openEditor(data);
            }
            setTimeout(() => showMSG(false), 5000);
        }).catch((err) => {
            openEditor(err)
            setJobState('error');
            setTimeout(() => showMSG(false), 5000);
        })
    }

    useEffect(()=> {
        let jobs = JSON.parse(localStorage.getItem('bte-jobs-main-site'));
        if (jobs && jobs.length) {
            let found = jobs.find(j => j.id === id);
            if (found){
                setJob(found)
                getJob(found.url, false)
            }else{
                showMSG(true);
                setJobState('Error');
                setTimeout(() => showMSG(false), 5000);
            }
        }else{
            console.log('%c No jobs yet', 'color: orange')
        }
    }, [id]);

    return <div className="text-left min-h-100">
        <Container color="black">
            <div style={{display:'flex', alignItems: 'center'}}>
                <div>
                    {jobState === 'Completed' && <img 
                    data-tippy-content="The return value's <code>response</code> field holds BTE's response, which follows the Translator consortium's <a target='_blank' rel='noopener noreferrer' href='https://github.com/NCATSTranslator/ReasonerAPI'>TRAPI standards</a>. The answers are in the results section and are represented as graphs that fill in the info we'd like to know in the query." 
                    src={complete} 
                    alt="Job Complete" 
                    width="80"/>}
                    {jobState === 'Active' && <img 
                    data-tippy-content="BTE is currently working on your request! Your results should be ready soon 🎉" 
                    src={active} 
                    alt="Job Active" 
                    width="80"/>}
                    {jobState === 'Queued' && <img 
                    data-tippy-content="BTE is experiencing a large number of requests at this time but your job will still be processed as soon as there's bandwidth to process it" 
                    src={queued} 
                    alt="Job Queued" 
                    width="80"/>}
                    {jobState === 'Error' && <img 
                    data-tippy-content="There seems to be an issue with this job ID, if you feel this is not normal please contact us!" 
                    src={errorimg} 
                    alt="Job Error" 
                    width="80"/>}
                </div>
                <div>
                    {msg && <Message compact size="tiny" color={job?.id ? 'green' : 'red'} >{job?.id ? 'Viewing results for job ID: ' + job.id : 'This job ID does not exist: ' + id}</Message>}
                    <p>When your job is complete, the results below will be in <a data-tippy-content="Learn more about TRAPI format" href="https://github.com/NCATSTranslator/ReasonerAPI" target="_blank" rel="nonopenner">TRAPI format</a>, with relevant information returned in the <code>returnvalue.response.message.knowledge_graph</code> and <code>returnvalue.response.message.results</code> sections.</p>
                </div>
                <div>
                    {job?.url && <Button style={{margin: 10}} size="tiny" onClick={()=>getJob(job?.url, true)} color="blue">Download JSON response</Button>}
                </div>
            </div>
            {jobState === 'completed' && <div style={{'maxHeight': '1000px', 'overflowY': 'scroll', 'marginBottom': '100px'}}>
                <div id="res" style={{margin: 0, height:'800px'}}></div>
            </div>}
            {jobState === 'active' && <Message
            color="blue" style={{height: '400px', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <img 
                        data-tippy-content="BTE is currently working on your request! Your results should be ready soon 🎉" 
                        src={active} 
                        alt="Job Active" 
                        width="200"/>
                    <h2>We are working on your request. <b style={{cursor: 'pointer', color: '#4a3fc9', textDecoration: 'underline'}} onClick={()=>{window.location.reload()}}>Refresh this page</b> to check again.</h2>
                </div>
            </Message>}
            {jobState === 'queued' && <Message
            color="purple" style={{height: '400px', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <img 
                        data-tippy-content="BTE is experiencing a large number of requests at this time but your job will still be processed as soon as there's bandwidth to process it" 
                        src={queued} 
                        alt="Job Queued" 
                        width="200"/>
                    <h2>We are experiencing heavy traffic but your job is in the queue.  <b style={{cursor: 'pointer', color: '#4a3fc9', textDecoration: 'underline'}} onClick={()=>{window.location.reload()}}>Refresh this page</b> to check again. </h2>
                </div>
            </Message>}
            {jobState === 'error' && <Message
            color="red" style={{height: '400px', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <img 
                        data-tippy-content="There's an issue with this job ID, please try again or create a new job." 
                        src={errorimg} 
                        alt="Job Error" 
                        width="200"/>
                    <h2>Oh no! This job ID seems to have caused an error. Please try again or create a new job.</h2>
                </div>
            </Message>}
        </Container>
    </div>
}

export default ResultViewer