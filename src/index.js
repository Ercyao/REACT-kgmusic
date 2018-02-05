import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router/router';
import './global';
import './static/css/main.css';

const rootElement = document.getElementById('root');
let render = () => {
	ReactDOM.render(
		<Routers/>,
	    rootElement
	);
}

if (module.hot) {
const renderApp = render;
render = () => {
    try {
      renderApp();
    } catch (error) {
      console.error(error);
    }
};
const rerender = () => {
    setTimeout(render);
};
module.hot.accept('./router/router', rerender);
}

render();