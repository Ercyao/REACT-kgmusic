import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import img_404 from '../../static/img/404.png';
export default class extends Component {
    render() {
        return (
            <div className="notFound">
                <img src={img_404}/>
                <div>抱歉，页面出错了！你访问的页面已经离开地球</div>
                <Link to={'/'}>返回首页</Link>
            </div>
        )
    }
}