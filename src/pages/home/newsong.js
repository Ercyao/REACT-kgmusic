import React, { Component } from 'react';
import {formatTime} from '../../utils/Format';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';

export default class NewSong extends Component {
	constructor(props) {
        super(props);
        this.goNext=this.goNext.bind(this);
        this.goPrev=this.goPrev.bind(this);
        this.state = {
        	banner:[],    //轮播图数据
            Newsong: [],  //新歌数据
            totalNum:'',  //总记录数    
            totalPage:1,  //总页数
            current:1,    //当前页码
            pageSize:8,   //每页显示的条数
        }
    }
	//下一页
	goNext(){ 
	    let cur = this.state.current;  
	    if(cur < this.state.totalPage){  
	   	    this.setState({current:cur + 1})
		}
	}
	//上一页
	goPrev(){ 
	    let cur = this.state.current;  
	    if(cur > 1){   
	    	this.setState({current:cur - 1})
		}
	}
	componentDidMount(){
	    $.ajax({
	        url: '/kugou/',
	        data: { 
				json:true
			}, 
	        method: 'GET',
	        dataType: 'json',
	        success: (data) => {
	            this.setState({
	                banner:data.banner,
	                Newsong: data.data,
	                totalNum:data.data.length
	            });
	            let totalPage =Math.ceil( this.state.totalNum / this.state.pageSize);
	            this.setState({totalPage:totalPage});
	        },error: (error) => {console.log('未加载到数据');}
	    })
	}
	onPlayTap(m){
		global.hash = m.hash;
		global.songList = this.state.Newsong;
	}
    render() {
    	let banner = this.state.banner.map(function (m,i) {return <li key={i}><img src={m.imgurl}/></li>})
    	let bannerDot = this.state.banner.map(function (m,i) {return <span key={i}></span>})
		let Newsong = this.state.Newsong.map(function (m,i) {
            return <li key={i}>
 			  <Link to={'/play'} onClick={this.onPlayTap.bind(this,m)}>
           		<span className="song">{m.filename}</span><span className="time">{formatTime(m.duration)}</span>
			  </Link>
            </li>
       },this)
//		翻页设置
    	let current = this.state.current;
    	let pageSize = this.state.pageSize;
    	let page = [],x;
		for(x=pageSize*current-pageSize;x<(pageSize*current);x++){
			page.push(Newsong[x])
		}
        return (
			<div className="music_list_box">
				<div className="slider_box">
					<ul>{banner}</ul>
					<div className="slider_dot">{bannerDot}</div>
				</div>
				<div className="song_box">
					<div className="tag_title">新歌首发</div>
					<ul>{page}</ul>
					<div className="pagination">
					    <div className="previous"  onClick={this.goPrev}></div> {this.state.current} / {this.state.totalPage}<div className="next"  onClick={this.goNext}></div>
					</div>
				</div>
			</div>        
        )
    }
}