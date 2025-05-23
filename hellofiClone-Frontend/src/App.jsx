import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import DeviceList from './components/DeviceList'
import ValuationForm from './components/ValuationForm'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DeviceList />} />
        <Route path="/valuate/:id" element={<ValuationForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App