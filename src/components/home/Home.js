import React from 'react'
import { Button, Card, Image, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import predict from '../../assets/bte-predict.png';
import { Page } from '../Page';

const Home = () => (
  <Page >
    <Segment basic>
      <Card centered href="/explorer/query" color="purple" className="homeCard">
        <Image src={predict} wrapped ui={false} />
        <Card.Content textAlign="center">
          <Card.Header>Query</Card.Header>
          <Card.Description>
            Use the  query builder to query BTE or ARS.
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Link to='/query'><Button>Try it Out</Button></Link>
        </Card.Content>
      </Card>
    </Segment>
  </Page>
)

export default Home