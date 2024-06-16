import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ItemDetail from './pages/ItemDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/items/:id' element={<ItemDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
