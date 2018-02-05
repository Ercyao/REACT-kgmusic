import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';


export default class Singer extends Component {
	constructor() {
        super();
        this.state = {
            Singer: []
        }
  	}
	componentDidMount(){
	    $.ajax({
	        url: '/kugou/singer/class',
	        data: { 
				json:true
			}, 
	        method: 'GET',
	        dataType: 'json',
	        success: (data) => {
	            this.setState({
	                Singer:data.list
	            });
	        },error: (error) => {console.log('未加载到数据');}
	    })
	}
    render() {
		let Singer = this.state.Singer.map(function (m,i) {
            return <li key={i} className="list_box">
                    <Link to={{pathname:`singer/list/${m.classid}`,state:{classId:m.classid}}}>
		              <div className='category-tag'>{m.classname}</div><div className='category-bg'></div>
		            </Link>
		           </li>
     	})
        return (
			<div className="category_item">
				<div className="tag_title">歌手分类</div>
				<ul>{Singer}</ul>
			</div>    
        )
    }
}