import React from 'react';
// 导入 React-Router 路由模块
import { HashRouter, Switch, Route } from 'react-router-dom'

import Register from './register/register';
import Login from './login/login';
import Main from './main/main';



export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        {/* Switch 代表着只能匹配并显示一个路径组件 */}
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          {/* 当不写 path 属性时，代表着全局路径匹配， 即除了 /register 和 /login 外都会匹配到*/}
          <Route component={Main} />
        </Switch>
      </HashRouter>
    )
  }
}