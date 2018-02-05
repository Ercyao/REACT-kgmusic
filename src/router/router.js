import React, { Component }  from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

import Home from '../pages/home/home';
const Category = asyncComponent(()=>import("../pages/category/category"));
const Search = asyncComponent(()=>import("../pages/search/search"));
const Songmenu = asyncComponent(()=>import("../pages/songmenu/songmenu"));
const Play = asyncComponent(()=>import("../pages/play/play"));
const Profile = asyncComponent(()=>import("../pages/profile/profile"));

const Ranklist = asyncComponent(()=>import("../pages/list/list"));
const Singerlist = asyncComponent(()=>import("../pages//list/list"));
const Songlist = asyncComponent(()=>import("../pages/list/list"));
const Collectlist = asyncComponent(()=>import("../pages/list/list"));

const Audio = asyncComponent(()=>import("../pages/play/Audio"));

const NotFound = asyncComponent(()=>import("../components/common/NotFound"));

export default class RouteConfig extends Component{
  render(){
    return(
      <div>
    	  <Audio/>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/category" exact component={Category}/>
            <Route path="/rank/list/:id" component={Ranklist}/>
            <Route path="/singer/list/:id" component={Singerlist}/>
            <Route path="/search" component={Search}/>
            <Route path="/songmenu" component={Songmenu}/>
            <Route path="/song/list/:id" component={Songlist}/>
            <Route path="/play" exact component={Play}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/collect/list" component={Collectlist}/>
            <Route path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}