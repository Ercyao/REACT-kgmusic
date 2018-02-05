import React, { Component } from 'react';
import PublicHeaderNav from '../../components/header/header-nav';
import PublicFooterNav from '../../components/footer/footer-nav';
import NewSong from './newsong.js';
import './home.css';


export default class extends Component {
    render() {
        return (
        	<div className="music_box">
				<PublicHeaderNav  {...this.props} />
				<NewSong/>
                <PublicFooterNav  {...this.props} />
            </div>
            
        )
    }
}