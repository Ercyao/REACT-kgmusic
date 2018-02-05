import React, { Component } from "react";
import 'regenerator-runtime/runtime';  //用到 async 函数的文件头部添加

export default function asyncComponent(importComponent) {  //asyncComponent 函数接受一个importComponent 的参数
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({component});
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}