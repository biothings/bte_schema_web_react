import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import { Container, Message, Button } from "semantic-ui-react";
import axios from "axios";
import JSONEditor from 'jsoneditor'

function ResultViewer(){
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [msg, setMSG] = useState(false);

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

    function getJob(jobURL, download=false){
        setMSG(true);
        axios.get(jobURL).then((res) => {
            const data = res.data;
            if (download) {
                downloadResponse(data);
            }else{
                const container = document.getElementById("res");
                const options = {
                    mode: "view"
                };
                const editor = new JSONEditor(container, options);
                editor.set(data);
                // TODO: Not working - expand selected fields, open issue.
                // editor.expand({ path: ['returnvalue', 'response', 'message', 'knowledge_graph'] })
                // editor.expand({ path: ['returnvalue', 'response', 'message', 'results'] })
            }
            setTimeout(() => setMSG(false), 5000);
        }).catch((err) => {
            console.log('%c Job retrieval error:', 'color: red')
            console.log(err)
            setTimeout(() => setMSG(false), 5000);
        })
    }

    useEffect(()=> {
        let jobs = JSON.parse(localStorage.getItem('bte-jobs-main-site'));
        if (jobs && jobs.length) {
            let found = jobs.find(j => j.id === id);
            if (found){
                console.log('%c Job found', 'color: limegreen')
                setJob(found)
                getJob(found.url, false)
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
            <div style={{display:'flex'}}>
                <div>
                    {msg && <Message compact size="tiny" color={job?.id ? 'green' : 'red'} >{job?.id ? 'Viewing results for job ID: ' + job.id : 'This job ID does not exist: ' + id}</Message>}
                    <p>The results below are in TRAPI format, with relevant information returned in the <code>returnvalue.response.message.knowledge_graph</code> and <code>returnvalue.response.message.results</code> sections.</p>
                </div>
                <div>
                    {job?.url && <Button style={{margin: 10}} size="tiny" onClick={()=>getJob(job?.url, true)} color="blue">Download JSON response</Button>}
                </div>
            </div>
            <div style={{'maxHeight': '1000px', 'overflowY': 'scroll', 'marginBottom': '100px'}}>
                <div id="res" style={{margin: 0, height:'800px'}}></div>
            </div>
        </Container>
    </div>
}

export default ResultViewer