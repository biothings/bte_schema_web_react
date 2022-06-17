import React from 'react';
import { Link } from 'react-router-dom';
import bte from '../assets/biothings-explorer-logo.png';
import network from '../assets/network.png';
import { Menu, Grid, Image } from 'semantic-ui-react';

export function Header(props) {
    return(
        <>
            <Menu color="violet" size='large' inverted style={{ borderRadius: 0 }}>
                <Menu.Item 
                    name='HOME'
                    as={Link}
                    exact to='/'
                    active={false}
                >
                    <img src={bte} alt="BioThings Explorer" />
                    <span style={{fontSize: 18}}><b>&nbsp;&nbsp; BioThings Explorer</b></span>
                </Menu.Item>

                <Menu.Item
                    name='QUERY'
                    as={Link}
                    exact to='/query'
                    active={false}
                    >
                    Query
                </Menu.Item>
            </Menu>
            {
                props.banner && 
                <Grid style={{'backgroundColor': '#9f7de8', marginBottom: '2rem'}} textAlign='center'>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Image src={network} />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <br></br>
                        <br></br>
                        <h1 style={{'color': '#e2e1e6', 'fontSize': '3rem'}}>BioThings Explorer</h1>
                        <br></br>
                        <h3 style={{'color': '#e2e1e6', 'fontSize': '1.5rem'}}>BioThings Explorer allows users to query a vast amount of biological and chemical databases in a central place by calling APIs which distribute these data on the fly. </h3>
                    </Grid.Column>
                </Grid>
            }
        </>
    )
}