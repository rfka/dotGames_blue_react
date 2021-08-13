import React from 'react';
import './Nav.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default class Nav extends React.Component {
    render(){
        return(
            <>
            <div className='tudo'>
                <div className='menu'>
                    <div className='logo'>
                        
                    </div>
                    <div className='links'>
                        <nav>
                            <ul>
                                <li><AnchorLink href='#home'>Home</AnchorLink></li>
                                <li><AnchorLink href='#jogos' offset='200'>Jogos</AnchorLink></li>
                                <li><AnchorLink href='#incluir'>Incluir</AnchorLink></li>

                                {/* <li><a href="#">home</a></li>
                                <li><a href="#">jogos</a></li>
                                <li><a href="#">incluir</a></li> */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            </>
        );
    }
}