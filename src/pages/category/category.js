import React, { Component } from 'react';
import PublicHeaderNav from '../../components/header/header-nav';
import PublicFooterNav from '../../components/footer/footer-nav';
import Rank from './rank.js';
import Singer from './singer.js';
import './category.css';


export default class extends Component {
    render() {
        return (
        	<div className="music_box">
				<PublicHeaderNav  {...this.props} />
				<div className="category_list_box">
					<Rank/>
					<Singer/>
				</div>
                <PublicFooterNav  {...this.props} />
            </div> 
        )
    }
}