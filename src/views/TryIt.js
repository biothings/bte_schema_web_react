import React, { useState, useEffect } from "react";
import { Container, Grid, Segment, Button } from "semantic-ui-react";
import QueryBox from "../components/QueryBox";
import CodeEditor from "../components/CodeEditor";
import { useSelector, useDispatch } from "react-redux";
import { deleteJobs, setJobs, updateJobs } from "../store";

function TryIt(){

    const dispatch = useDispatch();

    useEffect(()=> {
        // localStorage.setItem('bte-jobs-main-site', JSON.stringify([]))
        console.log('%c Checking jobs...', 'color: limegreen')
        let jobs = JSON.parse(localStorage.getItem('bte-jobs-main-site'));
        if (jobs && jobs.length) {
            console.log('%c Jobs found!', 'color: green')
            dispatch(setJobs(jobs))
            dispatch(updateJobs())
        }else{
            console.log('%c No jobs yet', 'color: orange')
        }
    }, []);

    let queries = useSelector(state => state.main.examples);
    let jobs = useSelector(state => state.main.jobs);
    let selectedQuery = useSelector(state => state.main.selectedQuery);

    const [jobURL, setJobURL] = useState('');

    function deleteAllJobs(){
        dispatch(deleteJobs());
        dispatch(updateJobs());
    }

    return <Grid className="gradient text-left min-h-100">
                <Grid.Row>
                    <Container>
                        <Segment color="black" inverted>
                            <h1>Example Queries</h1>
                            <p>
                                BioThings Explorer allows users to query a vast amount of biological and chemical databases in a central place to answer and predict complex biological questions.
                            </p>
                        </Segment>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <h2 className="text-white">1. Select a query</h2>
                                    <div className="d-flex flex-wrap justify-center">
                                        {queries.map(q => <QueryBox query={q} key={q._id}></QueryBox>)}
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <h2 className="text-white">2. Inspect/Edit/Execute your query</h2>
                                    <p className="text-left text-white">
                                        BTE queries work asynchronously so you will get a <b className="text-green">job ID</b>. While BTE works on this you can go grab some coffee or go pet your cat!
                                    </p>
                                    <div>
                                        <CodeEditor query={selectedQuery}></CodeEditor>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                <h2 className="text-white">3. Check your results. <span>Pick a <b className="text-green">job ID</b> and see if BTE is done with your request.</span></h2>
                                    <p className="text-white">Note: BioThings Explorer keeps your job history for up to a week.</p>
                                    <div className="d-flex justify-center items-center">
                                        <div>
                                            <label className="text-white">Choose a job ID</label>
                                            <select style={{padding: 10, margin: 20, borderRadius: 5}} onChange={e => setJobURL(e.target.value)} name="jobs" id="job-select">
                                                <option value="">Choose one</option>
                                                {jobs.map((job) => {
                                                    return <option value={job.url} key={job.id}>{ job.id } { job?.description } - { job.date }</option>
                                                })}
                                            </select>
                                        </div>
                                        {jobs?.length  === 0 && <p className="text-center text-yellow"> No jobs have been created yet.</p>}
                                        {jobURL && <a target="_blank" href={jobURL} rel="noopener noreferrer" style={{margin: 10}}>
                                            <Button color="green">Check Results</Button>
                                        </a>}
                                        {jobs?.length  > 0 && <Button inverted color="red" onClick={deleteAllJobs}>
                                            Delete All Jobs
                                        </Button>}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Grid.Row>
            </Grid>
}

export default TryIt