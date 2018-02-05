import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './header-nav.css';
 
export default class PublicNav extends Component {
    render() {
        return (
            <ul className="header h_nav">
                {
                  this.props.tabs.map((item, i) => (
                    <li className={this.props.location.pathname === item.path ? 'active' : ''} key={i} id={this.props.location.pathname}>
                    	<Link to={`${item.path}`}>
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
            text: '推荐',
            path: '/',
        },
        {
            text: '分类',
            path: '/category',
        },
        {
            text: '搜索',
            path: '/search',
        }
    ]
};