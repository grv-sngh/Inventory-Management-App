import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ItemDetail from './pages/ItemDetail'
import Search from './pages/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/items/:id' element={<ItemDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
