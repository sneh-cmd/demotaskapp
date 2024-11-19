import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

export default function Editdata() {
    const [edit,setEdit]=useState();
    const newtask=useRef('');
    const details=useRef('');
    const navigate=useNavigate();
    const{id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/tasks/${id}`).then((res)=>{
            setEdit(res.data);
            newtask.current.value=res.data.newtask,
            details.current.value=res.data.details
        })
    },[])
    const updatetask=(e)=>{
        e.preventDefault();
        var insert={
            newtask:newtask.current.value,
            details:details.current.value
        }
        axios.put(`http://localhost:5000/tasks/${id}`,insert).then(()=>{
            Swal.fire({
                title: "Good job!",
                text: "Your task successfully updated!",
                icon: "success"
              });
              navigate('/');
        })
    }
  return (
    <div>
    <div className='bg-secondary p-3 text-white h2 text-center'><i className="bi bi-journal-text"></i> Task manager</div>
  <Container className='p-4 w-50 mx-auto'>
    <h1>Add New Task Here <button type='button' className='btn btn-warning border border-0 float-end'>Total Task <span className='badge rounded-pill badge-sm bg-secondary'>0</span></button></h1>
    <form>
        <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-pencil"></i></span>
            <input type="text" ref={newtask} className="form-control" placeholder="New Task"/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-pencil"></i></span>
            <input type="text" ref={details} className="form-control" placeholder="Details"/>
        </div>
        <button type="button" onClick={updatetask} className="btn btn-warning shadow">Update <i className="bi bi-arrow-right-circle-fill"></i></button>
    </form>
  </Container>
</div>
  )
}
