import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Search from './pages/search'
import './index.css'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/search" element={<Search />} />
        
      </Routes>
    </Router>
      
    </>
  )
}

export default App

/*
to-do:
- search logic
- export calender
- backend
- style
*/