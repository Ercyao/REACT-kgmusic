import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './header-nav.css';
 
export default class PublicGoback extends Component {
	handleBack(){
	   window.history.back();
	}
    render() {
        return (
            <div className="list-header-box">
                <div className="list-header-bg"></div>
                <div className="list-header-title"><span className="goback-icon" onClick={this.handleBack}></span> <span className="goback-txt">{this.props.title}</span></div>
				<div className="list-header-con">
				    <div className='list-header-txt'>
						<span className='list-header-name'>{this.props.name}</span>
				    </div>
					<div className='list-header-longtxt'>{this.props.subhead}</div>
					<div className='list-header-icon'></div>
				</div>
            </div>
            
        )
    }
};