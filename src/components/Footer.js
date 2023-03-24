import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

function Footer(props) {
    return(
        <Grid style={{padding: '2rem 6vw', color: 'white'}} className="gradient-rainbow" textAlign='center' centered columns={2} stackable>
            <Grid.Column textAlign='left'>
                <h5>Biothings Explorer</h5>
                <p>© Copyright 2017-{new Date().getFullYear()} The Su/Wu Lab.</p>
                <p>
                    Support for this work was provided by the <a href="https://ncats.nih.gov/" target="_blank" rel="noopener noreferrer">National Center for Advancing Translational Sciences</a>, National Institutes of Health, through the <a href="https://ncats.nih.gov/translator" target="_blank" rel="noopener noreferrer">Biomedical Data Translator program</a>, awards OT2TR003427 and OT2TR003445
                </p>
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <a href="https://biothings.io/" title="BioThings API"><img width="256px" src="http://biothings.io/static/img/powered-by-biothings.png" alt="BioThings"/></a>
                <h5>Contact Us</h5>
                <p><Icon name='mail' size='large' />: <a href="mailto:biothings@googlegroups.com" className="footer-link">biothings@googlegroups.com</a></p>
            </Grid.Column>
        </Grid>
    )
}

export default Footer;