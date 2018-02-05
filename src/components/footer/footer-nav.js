import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import bar_act from '../../static/img/bar_act.png';
import './footer-nav.css';
 
export default class PublicNav extends Component {
    render() {
        return (
            <ul className="footer-nav">
                {
                  this.props.tabs.map((item, i) => (
                    <li className={this.props.location.pathname === item.path ? 'active' : ''} key={i} id={this.props.location.pathname}>
                    	<Link to={`${item.path}`}>
	                    	<img src={this.props.location.pathname === item.path ? bar_act : item.icon} className="nav-icon"/>
	                    	<p>{item.text}</p>
                    	</Link>
                    </li>
                  ))
                }
            </ul>
        )
    }
};
PublicNav.defaultProps = {
    tabs: [
        {
            text: '乐库',
            path: '/',
            icon:require('../../static/img/bar_1.png')
        },
        {
            text: '歌单',
            path: '/songmenu',
            icon:require('../../static/img/bar_2.png')
        },
        {
            text: '正在播放',
            path: '/play',
            icon:require('../../static/img/bar_3.png')
        },
        {
            text: '我的',
            path: '/profile',
            icon:require('../../static/img/bar_4.png')
        }
    ]
};