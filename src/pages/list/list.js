import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';
import PublicGoback from '../../components/header/header-goback';
import {formatTime} from '../../utils/Format';
import './list.css';

export default class Ranklist extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	Rankinfo: [],
            Ranklist: [],
            Songlist: [],
            SonglistInfo:[],
            Singerlist: [],
            Collectlist:[],
            list:'',
        }
   }
	componentDidMount(e){
		if(this.props.location.state.rankId){
			let rankid  = this.props.location.state.rankId
			$.ajax({
		        url: '/kugou/rank/info',
		        data: { 
		        	rankid:rankid,
					json:true
				}, 
		        method: 'GET',
		        dataType: 'json',
		        success: (data) => {
		            this.setState({
		                Rankinfo:data.info,
		                Ranklist:data.songs.list
		            });
		        },error: (error) => {console.log('未加载到数据');}
		    })	
		    this.setState({list:1});
		}else if(this.props.location.state.specialId){
			let specialid = this.props.location.state.specialId
			$.ajax({
		        url: '/kugou/plist/list',
		        data: { 
		        	specialid:specialid,
					json:true
				}, 
		        method: 'GET',
		        dataType: 'json',
		        success: (data) => {
		            this.setState({
		            	SonglistInfo:data.info.list,
		                Songlist:data.list.list.info
		            });
		        },error: (error) => {console.log('未加载到数据');}
		    })
			this.setState({list:2});
		}else if(this.props.location.state.classId){
			let classid = this.props.location.state.classId
		    $.ajax({
		        url: '/kugou/singer/list',
		        data: { 
		        	classid:classid,
					json:true
				}, 
		        method: 'GET',
		        dataType: 'json',
		        success: (data) => {
		            this.setState({
		                Singerlist:data.singers.list.info
		            });
		        },error: (error) => {console.log('未加载到数据');}
		    })
			this.setState({list:3});
		}else if(this.props.location.state.love){
			this.setState({
		        Collectlist:global.collectList,
		        list:4
		  });
		}
	}
	onPlayTap(e){
		global.hash = e.hash;
		if(this.state.list == 1){
			global.songList = this.state.Ranklist;
		}else if(this.state.list == 2){
			global.songList = this.state.Songlist;
		}else{
			global.songList = this.state.Collectlist;
		}
	}
    render() {
    	if(this.state.list == 1){
    		let Rankinfo = this.state.Rankinfo
			let Ranklist = this.state.Ranklist.map(function (e,i) {
            return  <Link to={'/play'} onClick={this.onPlayTap.bind(this,e)} key={i}>
		                <li><span className="index">{i+1}</span><span className="song name">{e.filename}</span><span>{formatTime(e.duration)}</span></li>
		     		</Link>
			},this)
	        return (
				<div className="list-wrapper">
				  <PublicGoback  title={Rankinfo.rankname} subhead="那一天  闭目在经殿的香雾中  蓦然听见  你诵经的真言"/>
				  <ul className="list-box">{Ranklist}</ul> 
				</div>         
	        )
		}else if(this.state.list == 2){
			let SonglistInfo =  this.state.SonglistInfo
			let Songlist = this.state.Songlist.map(function (e,i) {
            return  <Link to={'/play'} onClick={this.onPlayTap.bind(this,e)} key={i}>
		               <li><span className="index">{i+1}</span><span className="song name">{e.filename}</span><span>{formatTime(e.duration)}</span></li>
		     	    </Link>
			},this)
	        return (
				<div className="list-wrapper">
				<PublicGoback  title={SonglistInfo.specialname} name={SonglistInfo.nickname} subhead={SonglistInfo.intro}/>
				  <ul className="list-box">{Songlist}</ul> 
				</div>         
	        )
		}else if(this.state.list == 3){
			let Singerlist = this.state.Singerlist.map(function (m,i) {
	            return <li key={i}><span className="index">{i+1}</span><span className="singer name">{m.singername}</span></li>
	     	})
	        return (
				<div className="list-wrapper">
				  <PublicGoback  title="歌手" subhead="那一月  我转动所有的经筒  不为超度  只为触摸你的指尖  "/>
				  <ul className="list-box">{Singerlist}</ul> 
				</div>         
	        )
		}else if(this.state.list == 4){
			let Collectlist = this.state.Collectlist.map(function (e,i) {
            return  <Link to={'/play'} onClick={this.onPlayTap.bind(this,e)} key={i}>
		               <li><span className="index">{i+1}</span><span className="singer name">{e.audio_name}</span></li>
		     	    </Link>
			},this)
	        return (
				<div className="list-wrapper">
				  <PublicGoback  title="收藏的歌曲" name="听喜欢的歌" subhead="那一世  我转山转水转佛塔呀  不为修来世  只为在途中与你相见  "/>
				  <ul className="list-box">{Collectlist}</ul> 
				</div>         
	        )
		}else{
			 return (
				<div className="list-wrapper">
				 <PublicGoback  title="报错" name="未加载的数据..." subhead="请返回刷新"/>
				</div>         
	        )
		}
		
		
    }
}