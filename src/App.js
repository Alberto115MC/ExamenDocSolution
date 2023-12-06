import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './views/login'
import TableData from './views/table'

function App() {
  return (
    // <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path="/table" element={<TableData/>}></Route>
        </Routes>
      </BrowserRouter>
    // </div>
  )
}

export default App;
