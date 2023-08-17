import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import bte from '../assets/biothings-explorer-logo.png';
import { Menu, Dropdown } from 'semantic-ui-react';

export function Header() {
    let [clicked, setClicked] = useState('HOME');

    return(
        <>
            <Menu size='large' inverted color='black' style={{borderRadius: 0}}>
                <Menu.Item 
                    name='HOME'
                    as={Link}
                    to='/'
                    active={clicked === 'HOME'}
                    onClick={()=>{setClicked('HOME')}}
                >
                    <img src={bte} alt="BioThings Explorer" width="30"/>
                    <span style={{fontSize: 18}}><b>&nbsp;&nbsp; BioThings Explorer</b></span>
                </Menu.Item>
                <Menu.Item
                    name='ABOUT'
                    as={Link}
                    to='/about'
                    active={clicked === 'ABOUT'}
                    onClick={()=>{setClicked('ABOUT')}}
                    >
                    About
                </Menu.Item>
                <Menu.Item
                    name='SOURCES'
                    as={Link}
                    to='/sources'
                    active={clicked === 'SOURCES'}
                    onClick={()=>{setClicked('SOURCES')}}
                    >
                    Sources
                </Menu.Item>
                {/* <Menu.Item
                    name='QUERY'
                    as={Link}
                    to='/query'
                    active={clicked === 'QUERY'}
                    onClick={()=>{setClicked('QUERY')}}
                    >
                    Advanced Query Builder
                </Menu.Item> */}
                <Dropdown item text='Getting Started'>
                    <Dropdown.Menu>
                        <Dropdown.Item 
                            name='INSTALL'
                            as={Link}
                            to='/install'
                            active={clicked === 'INSTALL'}
                            onClick={()=>{setClicked('INSTALL')}}
                            >
                            Installation
                        </Dropdown.Item>
                        <Dropdown.Item 
                            name='USAGE'
                            as={Link}
                            to='/usage'
                            active={clicked === 'USAGE'}
                            onClick={()=>{setClicked('USAGE')}}
                            >
                            Usage
                        </Dropdown.Item>
                        <Dropdown.Item 
                            name='REFERENCE'
                            as={Link}
                            to='/reference'
                            active={clicked === 'REF'}
                            onClick={()=>{setClicked('REF')}}
                            >
                            Reference Sheet
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    name='TRY'
                    as={Link}
                    to='/try-it'
                    active={clicked === 'TRY'}
                    onClick={()=>{setClicked('TRY')}}
                    >
                    Try It
                </Menu.Item>
                <Menu.Item
                    name='DOCS'
                    target="_blank"
                    rel="noopener noreferrer"
                    href='https://smart-api.info/ui/dc91716f44207d2e1287c727f281d339'
                    active={clicked === 'DOCS'}
                    onClick={()=>{setClicked('DOCS')}}
                    >
                    Docs&nbsp;<i aria-hidden="true" className="share square icon"></i>
                </Menu.Item>
            </Menu>
        </>
    )
}