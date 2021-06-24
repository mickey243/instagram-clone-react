import React from 'react'
import './App.css';
import './component/component.css';
//component import
import Header from './component/Header';


const App = () => {
  document.title = "Instagram";
  //state for open and close the modal,Modal is from material ui

 

  return (
    <div className="app">
      {/* <ParentComponent /> */}
      <Header />
    </div >
  );
}

export default App;
