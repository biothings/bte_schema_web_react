import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import ncats from '../assets/ncats-logo.png'

function Footer() {
    return(
        <Grid style={{padding: '2rem 6vw', color: 'white'}} className="gradient-rainbow" textAlign='center' centered columns={2} stackable>
            <Grid.Column textAlign='left'>
                <h5>Biothings Explorer</h5>
                <p>© Copyright 2017-{new Date().getFullYear()} The Su/Wu Lab.</p>
                <div className='d-flex items-center'>
                    <img src={ncats} width='150' alt='NCATS' style={{marginBottom: 20}}/>
                </div>
                <p>
                    Support for this work was provided by the <a href="https://ncats.nih.gov/" target="_blank" rel="noopener noreferrer">National Center for Advancing Translational Sciences</a>, National Institutes of Health, through the <a href="https://ncats.nih.gov/translator" target="_blank" rel="noopener noreferrer">Biomedical Data Translator program</a>, awards OT2TR003427 and OT2TR003445
                </p>
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <a href="https://biothings.io/" title="BioThings API"><img width="256px" src="http://biothings.io/static/img/powered-by-biothings.png" alt="BioThings"/></a>
                <h5>Contact Us</h5>
                <p>
                    <a href="https://twitter.com/biothingsapi" target="_blank" rel="noopener noreferrer">
                        <Icon name='twitter' size='large' />
                    </a>
                    <a href="https://github.com/biothings/BioThings_Explorer_TRAPI" target="_blank" rel="noopener noreferrer">
                        <Icon name='github' size='large' />
                    </a>
                </p>
                <p><Icon name='mail' size='large' />: <a href="mailto:biothings@googlegroups.com" className="footer-link">biothings@googlegroups.com</a></p>
            </Grid.Column>
        </Grid>
    )
}

export default Footer;