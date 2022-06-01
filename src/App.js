import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize = 9;
  const [progress,setProgress] = useState(0);

    return (
      <div>
        {document.body.style.backgroundColor = "black"}
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height = "4px"
          />
          <Routes>
            <Route path="/" element={<News setProgress = {setProgress} key="general" pageSize={pageSize} country='in' category='general' />} />
            <Route path="/business" element={<News setProgress = {setProgress} key="business" pageSize={pageSize} country='in' category='business' />} />

            <Route path="/entertainment" element={<News setProgress = {setProgress} key="entertainment" pageSize={pageSize} country='in' category='entertainment' />} />
            <Route path="/health" element={<News setProgress = {setProgress} key="health" pageSize={pageSize} country='in' category='health' />} />
            <Route path="/science" element={<News setProgress = {setProgress} key="science" pageSize={pageSize} country='in' category='science' />} />
            <Route path="/sports" element={<News setProgress = {setProgress} key="sports" pageSize={pageSize} country='in' category='sports' />} />
            <Route path="/technology" element={<News setProgress = {setProgress} key="technology" pageSize={pageSize} country='in' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
}
export default App

