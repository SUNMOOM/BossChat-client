import React from 'react';
import ReactDOM from 'react-dom';
// 导入 react-redux 工具库包装 redux
import { Provider } from 'react-redux'
// import './socketIO/socket_client'

// 导入 App 组件
import App from './containers/app'
// 导入 store 文件（即，redux 托管 state 状态的文件）
import {store} from './redux/store'
import './assets/css/index.css'

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));
