import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PublicNav from '../../components/footer/footer-nav';
import './profile.css';

export default class extends Component {
	constructor() {
        super();
        this.state = {
            latelySong: [],
            isShowlately:false,
            isShow:true,
            collectlen:0,
            latelylen:0,
            collectList: global.collectList,
      		latelyList: global.latelyList,
        }
    }
	componentDidMount(e){
	    //收藏歌曲的数量
	    let collectList = this.state.collectList;
	    if (collectList) {
	      this.setState({
	        collectlen: collectList.length
	      });
	    }
	    //最近听过的歌的数量
	    let latelyList = this.state.latelyList;
	    if (latelyList){
	      this.setState({
	        latelylen: latelyList.length
	      });
	    }
	    //是否最近听过歌
	    if (this.state.latelyList) {
	      this.setState({isShow: true});
	    } else {
	      this.setState({isShow: false});
	    }
	}
	latelySongTap(){
		this.setState({
	      isShowlately: !this.state.isShowlately,
	   });
	}
	onPlayTap(e){
		global.hash = e.hash;
		global.songList = this.state.latelyList;
	}
	Collectlist(){
		this.props.history.push({pathname: '/collect/list', state: {love: 1}});
	}
    render() {
    	let {collectlen, latelylen, isShowlately, isShow} = this.state;
    	let latelyList = [];
    	if(this.state.latelyList){
    		latelyList = this.state.latelyList.map(function (e,i) {
    		return <Link to={'/play'} key={i}>
    		        <li onClick={this.onPlayTap.bind(this,e)}><span className='song name'>{e.audio_name}</span></li>
    	           </Link>
    		},this)
    	}
    	
        return (
            <div className="container">
				<div className='pro_box'>
				  <div className='pro_title'>面朝大海，春暖花开。</div>
				  <div className='pro_row' onClick={this.Collectlist.bind(this)}>
				    <span>收藏的歌曲</span>
				    <span className='num'>({collectlen})</span>
				  </div>
				  <div className='pro_row' onClick={this.latelySongTap.bind(this)}>
				    <span>最近听的歌</span>
				    <span  className='num'>({latelylen})</span>
				    <span className={isShowlately?'bottom':'top'} id='arrows'></span>
				  </div>
				  {/*歌曲列表 */}
				  <div id="latelySong-wrapper" className={isShowlately?'block':'none'}>
				    <div  className={isShow?'block':'none'}><ul>{latelyList}</ul> </div>
				    <div id='hint' className={isShow?'none':'block'}>最近未听歌...</div>
				  </div>
				</div>
                <PublicNav  {...this.props} />
            </div>
        )
    }
}