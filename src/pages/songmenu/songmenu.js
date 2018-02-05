import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';
import PublicNav from '../../components/footer/footer-nav';
import './songmenu.css';

export default class extends Component {
	constructor() {
        super();
        this.state = {
            Songmenu: []
        }
    }
	componentDidMount(){
	    $.ajax({
	        url: '/kugou/plist/index',
	        data: { 
				json:true
			}, 
	        method: 'GET',
	        dataType: 'json',
	        success: (data) => {
	            this.setState({
	                Songmenu:data.plist.list.info
	            });
	        },error: (error) => {console.log('未加载到数据');}
	    })
	}
    render() {
		let Songmenu = this.state.Songmenu.map(function (m,i) {
            return <li key={i} className='songmenu-item' data-id={m.specialid}> 
                      <Link to={{pathname:`song/list/${m.specialid}`,state:{specialId:m.specialid}}}>
					    <img src={m.user_avatar} className="songmenu-img"/>
					    <div className="songmenu-bg"></div>
					    <div className="songmenu-con">
					      <div className="songmenu-icon"></div>
					      <span>{m.specialname}</span>
					    </div> 
				      </Link>
           			</li>
     	})
        return (
        	<main className="container">
				<ul className='songmenu-wrapper'>{Songmenu}</ul>
                <PublicNav  {...this.props} />
            </main>
			         
        )
    }
}