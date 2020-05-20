import React from 'react';
import './App.css';
import Navigation from './Component/Navigation/Navigation';
import Content from './Component/Content/Content';
import Header from './Component/Header/Header';
import 'antd/dist/antd.css';

function App() {
  require('events').EventEmitter.defaultMaxListeners = 0;

  return (
    <>
      <Header></Header>
      <div className="main-container">
        <Navigation></Navigation>
        <Content></Content>
      </div>
    </>
  );
}

export default App;
