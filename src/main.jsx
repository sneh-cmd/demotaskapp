import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Taskdemo from './Taskdemo'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Editdata from './Editdata';
import DeleteData from './Deletedata';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Router>
      <Routes>
        <Route path='/' element={<Taskdemo />} />
        <Route path='/edittask/:id' element={<Editdata />} />
        <Route path='/delete/:id' element={<DeleteData />} />
      </Routes>
    </Router>
  </StrictMode>,
)
