import React, { useState } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import QueryBox from "../components/QueryBox";
import CodeEditor from "../components/CodeEditor";
import { useSelector } from "react-redux";

function TryIt(){

    let queries = useSelector(state => state.main.examples);
    let selectedQuery = useSelector(state => state.main.selectedQuery);

    const [jobs] = useState([]);
    const [jobURL] = useState('');

    function deleteJobs(){

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
                                        {queries.map((q) => {
                                            return <QueryBox query={q} key={q._id}></QueryBox>
                                        })}
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
                                <Grid.Column color="pink" span="2">
                                <h2>3. Check your results. <span>Pick a <b className="text-green">job ID</b> and see if BTE is done with your request.</span></h2>
                                    <p >Note: BioThings Explorer keeps your job history for up to a week.</p>
                                    <div className="d-flex justify-center items-center">
                                        {jobs?.length  > 0 && <div>
                                            <label for="job-select">Choose a job ID</label>
                                            <select v-model="JobURL" name="jobs" id="job-select">
                                                <option value="">Choose one</option>
                                                {jobs.map((job) => {
                                                    return <option value="job.url">{ job.id } { job?.description } - { job.date }</option>
                                                })}
                                            </select>
                                        </div>}
                                        {jobs?.length  === 0 && <p className="text-center"> No jobs have been created yet.</p>}
                                        {jobURL && <a target="_blank" href="JobURL" rel="noopener noreferrer">
                                            Check Results
                                        </a>}
                                        {jobs?.length  > 0 && <button onClick={deleteJobs()}>
                                            Delete All Jobs
                                        </button>}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Grid.Row>
            </Grid>
}

export default TryIt