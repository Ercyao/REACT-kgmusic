import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';


export default class Rank extends Component {
	constructor() {
        super();
        this.state = {
            Rank: []
        }
  	}
	componentDidMount(){
	    $.ajax({
	        url: '/kugou/rank/list',
	        data: { 
				json:true
			}, 
	        method: 'GET',
	        dataType: 'json',
	        success: (data) => {
	            this.setState({
	                Rank:data.rank.list
	            });
	        },error: (error) => {console.log('未加载到数据');}
	    })
	}
    render() {
		let Rank = this.state.Rank.map(function (m,i) {
            return <li key={i} className="list_box">
            		 <Link to={{pathname:`rank/list/${m.rankid}`,state:{rankId:m.rankid}}}>
			          <div className='category-tag'>{m.rankname}</div><div className='category-bg'></div>
			         </Link>
		           </li>
     	})
        return (
			<div className="category_item">
				<div className="tag_title">排行榜分类</div>
				<ul>{Rank}</ul>
			</div>           
        )
    }
}