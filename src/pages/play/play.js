import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';
import {parseLyric,formatTime} from '../../utils/Format';
import PublicNav from '../../components/footer/footer-nav';
import './play.css';

export default class Play extends Component {
	constructor(props) {
        super(props);
        this.state = {
			pValue:0,
			currentId:-1,
			isShowlist:false,
        	isShow:false,
        	isLove:false,
            song: [],
            lyrics:[],
            songList: global.songList,
            latelyList:[],
            collectList:[],
        }
        this.collectTap = this.collectTap.bind(this);
        this.hiddenSongList = this.hiddenSongList.bind(this);
        this.showSongList = this.showSongList.bind(this);
        this.playPrev = this.playPrev.bind(this);
        this.playNext = this.playNext.bind(this);
        this.playToggle = this.playToggle.bind(this);
        this.progressChange = this.progressChange.bind(this);
	}
	componentWillUnmount(){    //解决切换路由时，setState被卸载问题
        this.setState = (state,callback)=>{ //重写组件的setState方法，直接返回空
          return;
        };  
    }
	componentDidMount(){
	    if(global.hash){
	    	this.GetMusic(global.hash);
	    	this.playtimer = setInterval(() => {
	    		this.timeUpdate();
	    		this.setState({currentHash:global.hash});
	    		if(musicAudio.currentTime == musicAudio.duration){
					this.EndChangeSong();
			    }
	    	}, 500  );
	    	this.changeCollectShow();
	    	var timer = setTimeout(() => {musicAudio.play();this.latelyList();}, 500);
	    }else{
	    	musicAudio.pause()
	    	this.setState({
	    		isShow:true,
				isPlay:true
			})
	    }	   	
	}
	//获取音乐
	GetMusic(hash){
		$.ajax({
	        url: '/yy_kugou/index.php?r=play/getdata',
	        data: { 
	        	hash: hash
			}, 
	        method: 'GET',
	        dataType: 'json',
	        success: (data) => {
	        	let lyrics=parseLyric(data.data.lyrics)
	            this.setState({
	                song:data.data,
	                lyrics:lyrics
	            });
	        },error: (error) => {new Message('warning', '获取歌曲信息失败。');}
	    })
	}
	// 进度条改变触发事件
	progressChange (e) {
		const pValue =  parseFloat(e.target.value)
		const seek = pValue * (musicAudio.duration/100);
		musicAudio.currentTime=seek
		this.setState({pValue:pValue})
	}
	// 音频进度改变触发事件
	timeUpdate(){
		let pValue = musicAudio.currentTime / (musicAudio.duration/100);
		this.setState({pValue:pValue})
		this.lyrScroll()
	}
 	// 歌词面板事件
	lyrScroll() {
		let lyrArry = []
		this.state.lyrics.map(function (lyr,i) {lyrArry.push(lyr[0])})
		for (var j = 0; j <= lyrArry.length; j++) {
			if (musicAudio.currentTime > lyrArry[j]) {this.setState({ currentId: j})}
        }
	}
	//点击播放or暂停
	playToggle () {
		const hash = global.hash;
		if(hash){
			if(this.state.isPlay){
				musicAudio.play()
				this.playtimer = setInterval(() => { this.timeUpdate()}, 500  );
			}else{
				musicAudio.pause()
				clearInterval(this.playtimer)
			}
		    this.setState({
				isPlay:!this.state.isPlay
			})
		}
	}
	hiddenSongList(){
		this.setState({isShowlist: false});
	}
	showSongList(){
		this.setState({isShowlist: true});
	}
	//切歌
	changeSong(e){
		global.hash = e.hash;
		this.hiddenSongList();
		this.GetMusic(global.hash);
		this.changeCollectShow();
		var timer = setTimeout(() => {musicAudio.play();}, 500);  //解决换歌不能播放问题
	}
	//上一首
	playPrev() {
        const hash = global.hash;
        const songList = global.songList;
        let index = 0;
        if (songList.length > 0) {for (let i = 0; i < songList.length; i++) {if (songList[i].hash === hash) {index = i;}}}
        let currentIndex = index - 1 < 0 ? songList.length - 1 : --index;
        const currentSong = songList[currentIndex];
        global.hash = currentSong.hash
        this.GetMusic(currentSong.hash);
        this.changeCollectShow();
        this.setState({pValue:0,currentId:-1})
        if(this.state.isPlay){var timer = setTimeout(() => {musicAudio.play();}, 500);}
    }
	//下一首
    playNext() {
        const hash = global.hash;
        const songList = global.songList;
        let index = 0;
        if (songList.length > 0) {for (let i = 0; i < songList.length; i++) { if (songList[i].hash === hash) {index = i;}}}
        let currentIndex = index - 1 < 0 ? songList.length - 1 : --index;
        const currentSong = songList[currentIndex];
        global.hash = currentSong.hash
        this.GetMusic(currentSong.hash);
        this.changeCollectShow();
        this.setState({pValue:0,currentId:-1})
        if(!this.state.isPlay){var timer = setTimeout(() => {musicAudio.play();}, 500);}
    }
	//播放完自动随机切歌
	EndChangeSong (){
	    let len = global.songList.length;
		let k =  Math.floor(Math.random() * len);
		global.hash = global.songList[k].hash;
		this.GetMusic(global.hash);
		this.changeCollectShow();
		let timer = setTimeout(()=> {musicAudio.play();}, 500);
	}
	//添加最近听过的歌
	latelyList () {
	    let latelyList = this.state.latelyList;
	    let GlobalLatelyList = global.latelyList
	    if(GlobalLatelyList){
		    for (var i = 0; i < 20; i++) {
		        if (global.hash != global.latelyList[i].hash) {return global.latelyList.unshift(song);}else{return ;}
		    }
	    } else {
	        latelyList.push(song);
	        global.latelyList = latelyList;
	    }
	}
	//点击切换收藏或取消歌曲
	collectTap() {  
	    let collectList = this.state.collectList;
	    let GlobalCollectList = global.collectList
	    if (this.state.isLove){
	        for (var i = 0; i < global.collectList.length; i++) {
	          if (global.hash == global.collectList[i].hash) {
	          	global.collectList.splice(i, 1);
	            return this.setState({ isLove: false });
	          }
	        }
	    }else{
	        this.setState({ isLove: true});
	        collectList.push(song)
	        //解决页面重新渲染导致，collectList又为空数组，
			if(GlobalCollectList){
				//去掉重复的
				for (var i = 0 ; i < collectList.length ; i ++ ){
				   for(var j = 0 ; j < GlobalCollectList.length ; j ++ ){
				      if (collectList[i] === GlobalCollectList[j]){collectList.splice(i,1);}
				  	}
				}
				//重新存入
				for(var i = 0; i < GlobalCollectList.length; i++){collectList.push(GlobalCollectList[i]);}
				global.collectList = collectList;
			}else{global.collectList = collectList;}
	    }
	}
	//判断是否是收藏了的
	changeCollectShow() {
	    if (global.collectList) {
	      for (var i = 0; i < global.collectList.length; i++) {
	        if (global.hash == global.collectList[i].hash) {
	           return this.setState({ isLove: true });
	        }
	      }
	      return this.setState({ isLove: false });
	    } else {
	      this.setState({ isLove: false });
	    }
	}
    render() {  
    	global.song=this.state.song;
    	let {isShow, isShowlist, currentHash, isLove, isPlay, currentId, pValue, song} = this.state;
     	let lyrics = this.state.lyrics.map(function (lyr,i) {
            return <li key={i} className={currentId == i?'act':''}> {lyr[1]}</li>
     	})
     	let self = this;   //解决map添加事件报错
     	let songList = [];
     	if(this.state.songList){
     		songList = this.state.songList.map(function (e,i) {
            	return <li key={i} className={currentHash == e.hash?'red':''} onClick={self.changeSong.bind(self,e)}><span className='list-num'>{i+1}</span><span className='list-name'>{e.filename}</span></li>
     		})
     	}
     	if (song.error) {
            return (
                <div className="container">
                   <div id='prompt_popup'><span>很抱歉，当前音乐{song.error}！</span></div>
                   <PublicNav  {...this.props} />
                </div>
            )
        } else{
         return (
        	<div className="container">
			  <div className='audio-box'>
			 	 {/* 音乐名称  */}
			    <div className='audio-header'>
			       <div id='list-icon' onClick={this.showSongList}></div> 
			       <div id='love-icon' className={isLove?'love_yes':'love_no'}  onClick={this.collectTap}></div>
			       <div className='songname'> {song.song_name}</div> 
			       <div className='singername'>——<span className='sn'>{song.author_name}</span>——</div>
			    </div>
			     {/* 歌词面板  */}
			    <div className='lyrics-box'>
			      <ul className='lyrics-panels' style={{transform:'translateY(-' + currentId * 30 + 'px)'}}>{lyrics}</ul>
			    </div>
			     {/* 进度  */}
			    <div className='time-box'><span>{formatTime(musicAudio.currentTime)}</span><span>{formatTime(musicAudio.duration)}</span></div>
			    <div className='progress-bar'>
				   	<span className="progress-change" style={{width: pValue + '%'}}></span>
				    <input type='range' step='0.01' max={100} min={0} value={pValue || '0'}  onChange={this.progressChange} className="progress-range"/>
			    </div>
			     {/* 控制音乐按钮  */}
			    <div className='player-btn'>
			      <div className='player-item cut' onClick={this.playPrev}><div className='upcut'></div></div>
			      <div className='player-item control' onClick={this.playToggle}><div className={isPlay?'play':'pause'}></div></div>
			      <div className='player-item cut' onClick={this.playNext}><div className='downcut'></div></div>
			    </div>
			    {/* 播放列表  */}
				<div id='player-list' className={isShowlist?'block':'none'}>
			      <div className='list-bg' onClick={this.hiddenSongList}></div>
			      <div className='list-con'>
			        <div className="list-title">等待播放列表<span className="list-close" onClick={this.hiddenSongList}>X</span></div >
			        <ul>{songList}</ul>
			      </div >
			   </div>
				{/* 提示弹窗  */}
				<div id='prompt_popup' className={isShow?'block':'none'}><span>当前无音乐...</span></div>
			 </div>
              <PublicNav  {...this.props} />
            </div>         
          )
        }
    }
}