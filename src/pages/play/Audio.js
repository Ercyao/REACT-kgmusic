import React, { Component } from 'react';
import $ from 'jquery';
import ajax from '../../utils/Ajax';
import {parseLyric} from '../../utils/Format';
import './play.css';

export default class Audio extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	song:[],
        }
	}
	componentWillMount (){	
		var musicAudio = document.getElementById(musicAudio);
		var collectList = [];
	}
	componentDidMount(){
		if(!global.song){
     		this.hashtimer = setInterval(() => { this.setState({song:global.song});}, 500  );
        }else{
            clearInterval(this.hashtimer);
            this.setState({song:global.song});
        }
   }
//	//播放完自动随机切歌
//	EndChangeSong (){
//		const songList = global.songList;
//	    const len = songList.length;
//		const currentIndex =  Math.floor(Math.random() * len);
//		const currentSong = songList[currentIndex];
//      global.hash = currentSong.hash
//      this.GetMusic(currentSong.hash);
////      musicAudio.play();
//		var timer = setTimeout(() => {musicAudio.play();}, 500);
//		console.log(2,global.hash,currentIndex,currentSong.filename)
//	} onEnded={this.EndChangeSong.bind(this)}
// 	//获取音乐
//	GetMusic(hash){
//		$.ajax({
//	        url: '/yy_kugou/index.php?r=play/getdata',
//	        data: { 
//	        	hash: hash
//			}, 
//	        method: 'GET',
//	        dataType: 'json',
//	        success: (data) => {
//	        	let lyrics=parseLyric(data.data.lyrics)
//	            this.setState({
//	                song:data.data
//	            });
//	        },error: (error) => {new Message('warning', '获取歌曲信息失败。');}
//	    })
//	}
    render() {
    	const currentSong = this.state.song
        return (
			<audio src={currentSong ? currentSong.play_url : null} id="musicAudio"></audio>
        )
    }
}
