import React, { Component } from 'react';
import PublicHeaderNav from '../../components/header/header-nav';
import PublicFooterNav from '../../components/footer/footer-nav';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ajax from '../../utils/Ajax';
import * as localStore from '../../utils/localStorage';
import './search.css';

export default class extends Component {
	constructor() {
        super();
        this.state = {
        	value:'',
        	Hotsearch: [],               // 热门搜索
		    Searchlist: [],              // 搜索结果
		    iconClearShow: false,        // 搜索框删除文本框的icon是否显示
		    searchHotShow: true,         // 热门搜索是否显示
		    searchHistoryShow: false,    // 搜索历史是否显示
		    searchResultShow: false,     // 搜索结果是否显示
		    searchHistorys: localStore.getItem('search_history') ? localStore.getItem('search_history').split(',') : [],    // 搜索历史记录
        }
        this.clearText = this.clearText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clickHistory = this.clickHistory.bind(this);
        this.clearAll = this.clearAll.bind(this);
   }
	componentDidMount(){
	    this.getHotSearch();
	}
	/*获取热门搜索*/
	getHotSearch() {
	  	$.ajax({
		    url: '/mobilecdn/api/v3/search/hot',
		    data: { 
				format: 'json',
				plat: 0,
     			count:30
			}, 
		    method: 'GET',
		    dataType: 'json',
		    success: (data) => {
		        this.setState({
		            Hotsearch:data.data.info
		    	});
		    },error: (error) => {console.log('未加载到数据');}
		})
	}
	/*获取搜索结果*/
	getSearchMusic(keyword) {
		$.ajax({
		    url: '/mobilecdn/api/v3/search/song',
		    data: { 
				format: 'json',
				keyword: keyword,
		        page:1,
		        pagesize:20,
		        showtype:1
			}, 
		    method: 'GET',
		    dataType: 'json',
		    success: (data) => {
		        this.setState({
		            Searchlist:this.state.Searchlist.concat(data.data.info)
		    	});
		    },error: (error) => {console.log('未加载到数据');}
		})
	}
	/*清空文本框*/
	clearText() {
        this.setState({value: '', iconClearShow: false, searchHotShow: true, searchHistoryShow: false,  searchResultShow: false });
    }
	/*文本框内发生改变*/
	handleChange(e) {
        this.setState({value: e.target.value});
    }
    /*键盘按键被松开时发生*/
    keyUp(e) {
        this.setState({iconClearShow: true});
        e.keyCode === 13 && this.handleSearch();
        this.setState({ searchHotShow: false, searchHistoryShow: true,  searchResultShow: false });
    }
    /*文本框提交*/
    handleSearch() {
        const keyword = this.state.value.trim();
        if (keyword !== '') {
        	this.setState({ searchHotShow: false, searchHistoryShow: false,  searchResultShow: true });
        	this.getSearchMusic(keyword);
        	this.setHistory(keyword);
        }
    }
    /*存储搜索历史*/
	setHistory(keyword) {
		const searchValue = this.state.searchHistorys.push(keyword);
        this.setState({searchHistorys: searchValue });
        const searchHistory = this.state.searchHistorys;
        let newHistory = [];
        for (let i = 0; i < searchHistory.length; i++) {
            if (newHistory.indexOf(searchHistory[i]) === -1) {
                newHistory.push(searchHistory[i])
            }
        }
        localStore.setItem('search_history', newHistory);
    }
	clickHistory(text){
		this.setState({value: text});
	}
    clearAll() {
        localStore.setItem('search_history', '');
        this.setState({history: []});
    }
	onPlayTap(m){
		global.hash = m.hash;
		global.songList = this.state.Newsong;
	}
    render() {
    	let Hotsearch = this.state.Hotsearch.map(function (m,i) { return <li key={i}>{m.keyword}</li>})
    	let searchHistorys = [];
    	if( this.state.searchHistorys.length > 0 ){
    		searchHistorys = this.state.searchHistorys.map(function (m,i) {
            	return <li key={i} onClick={() => this.clickHistory(m)}>{m}</li>
       	    },this)
    	}
		let Searchlist = this.state.Searchlist.map(function (m,i) {
            return <li key={i}><Link to={'/play'} onClick={this.onPlayTap.bind(this,m)}>{m.filename}</Link></li>
        },this)
        return (
        	<div className="search_box">
				<PublicHeaderNav  {...this.props} />
				 {/*搜索框*/}
				<div className="search">
			        <div className="search-bar">
			          <div className="search-box">
			            <input type="text" value={this.state.value} onKeyUp={this.keyUp} onChange={this.handleChange} className="search-input" placeholder="搜索歌曲、歌单、专辑"/>
			            <i className="icon-clear" onClick={this.clearText} style={{display: this.state.iconClearShow ? 'block' : 'none'}}>X</i>
			          </div>
			          <div onClick={this.handleSearch}>搜索</div>
			        </div>
			        {/*热门搜索*/}
			        <div className="search-hot" style={{display: this.state.searchHotShow ? 'block' : 'none'}}>
			            <span className="hot-title">热门搜索</span>
			            <ul>{Hotsearch}</ul>
			        </div> 
			        {/*搜索历史*/}
			        <div className='search-history' style={{display: this.state.searchHistoryShow ? 'block' : 'none'}}>
			            <div className="record_allDel"><span>搜索历史</span><span className="del-btn" onClick={this.clearAll}>清空</span></div>
			            <ul>{searchHistorys}</ul>
			        </div> 
			        {/*搜索结果*/}
			        <div className="search-result" style={{display: this.state.searchResultShow ? 'block' : 'none'}}>
			            <div className="record_allDel">搜索结果</div>
			            <ul>{Searchlist}</ul>
			        </div>  
		        </div>
                <PublicFooterNav  {...this.props} />
            </div>
            
        )
    }
}