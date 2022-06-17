import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import './Footer.css';

function Footer(props) {
    return(
        <Grid style={{backgroundColor: '#9f7de8', padding: '1rem 5vw', marginTop: '2.5rem'}} textAlign='center' centered columns={2} stackable>
            <Grid.Column textAlign='left'>
                <h5>Biothings Explorer</h5>
                <p>© Copyright 2017-{new Date().getFullYear()} The Su/Wu Lab.</p>
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <h5>Contact Us</h5>
                <p><Icon name='mail' size='large' />: <a href="mailto:biothings@googlegroups.com" className="footer-link">biothings@googlegroups.com</a></p>
            </Grid.Column>
        </Grid>
    )
}

export default Footer;