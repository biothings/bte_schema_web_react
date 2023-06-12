import React from 'react'
import { Button, Image, Grid, Container, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
import logo from '../assets/biothings-explorer-text.svg';
import install from '../assets/download-01.svg';
import github from '../assets/github-01.svg';
import read from '../assets/read-01.svg';


const Home = () => (
  <div>
    <Grid className="gradient min-h-100">
      <Grid.Row className="network-background m-0">
        <Grid.Column website={16} className="text-center">
          <Image src={logo} width="500" className="m-auto"/> 
          <h2 className='text-white caps'>A query engine for a federated knowledge graph of biomedical APIs</h2>
          <div>
            <Link to='/try-it'><Button color='orange' size='massive'>Try BioThings Explorer Now <i aria-hidden="true" className="angle right icon"></i></Button></Link>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="text-center gradient-black text-white">
        <Grid.Column width={16}>
          <Container>
            <AnimatedLogo/>
            <h2>Exploring Biological Data Through Linked API Services</h2>
            <h3>
            BioThings Explorer allows users to query a vast amount of biological and chemical databases<br></br> in a central place by calling APIs which distribute these data on the fly.
            </h3>
            <Link to='/about'><Button inverted color='teal' size='big'>Learn More About BioThings Explorer</Button></Link>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Grid columns={3}>
    <Grid.Row className="text-center text-white">
        <Grid.Column color="orange">
          <Image src={install} width="100" className="m-auto"/>
            <Link className='text-white'  to='/install'>
              <h3>Learn how  to install BioThings Explorer locally</h3>
            </Link>
        </Grid.Column>
        <Grid.Column color="yellow">
          <Image src={read} width="100" className="m-auto"/>
            <a href='https://arxiv.org/abs/2304.09344'
            rel="noopener noreferrer"
            style={{color: '#3a4892'}}
            target="_blank">
              <h3>Read the preprint <i aria-hidden="true" className="share square icon"></i></h3>
            </a>
        </Grid.Column>
        <Grid.Column color="purple">
          <Image src={github} width="100" className="m-auto"/> 
            <a className='text-white' 
            rel="noopener noreferrer"
            target="_blank"
            href='https://github.com/biothings/BioThings_Explorer_TRAPI'>
              <h3>Join us on GitHub <i aria-hidden="true" className="share square icon"></i></h3>
            </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default Home