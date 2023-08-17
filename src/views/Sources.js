import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { useSelector} from "react-redux";
import SourceBox from "../components/SourceBox";

function Sources(){
    let api_list = useSelector(state => state.sources.api_list);

    return <div className="text-left min-h-100">
        <Container color="black"> 
            <Grid columns={2}>
                <Grid.Row><h1>({api_list.length}) Sources</h1></Grid.Row>
                <Grid.Row>
                {api_list.map((value) => {
                    return <SourceBox key={value.id} name={value.name} identifier={value.id}></SourceBox>
                })}
                </Grid.Row>
            </Grid>
        </Container>
    </div>
}

export default Sources