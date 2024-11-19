import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; 
export default function Taskdemo() {
    const [task,setTask]=useState(0);
    useEffect(()=>{
        axios.get(`http://localhost:5000/tasks`).then((res)=>{
            setTask(res.data);
        })
    },[task])
    /* const serviceID="service_iygv5bp";
const templateID="template_wo13miw";
const publicKey="l9pD_R63xrhCDDnMe"; */
    const newtask=useRef('');
    const details=useRef('');
    const navigate=useNavigate();
    const taskhandle=(e)=>{
        e.preventDefault();
        /* emailjs.sendForm(serviceID,templateID,e.target,publicKey); */
        var insert={
            newtask:newtask.current.value,
            details:details.current.value
        }
        axios.post(`http://localhost:5000/tasks`,insert).then(()=>{
            Swal.fire({
                title: "Good job!",
                text: "Your task successfully added!",
                icon: "success"
              });
              e.target.reset();
        })
        
    }
  return (
    <div>
        <div className='bg-secondary p-3 text-white h2 text-center'><i className="bi bi-journal-text"></i> Task manager</div>
      <Container className='p-4 w-50 mx-auto'>
        <h1>Add New Task Here <button type='button' className='btn btn-warning border border-0 float-end'>Total Task <span className='badge rounded-pill badge-sm bg-secondary'>{task.length}</span></button></h1>
        <form onSubmit={taskhandle}>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                <input type="text" ref={newtask} name="newtask" className="form-control" placeholder="New Task"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                <input type="text" ref={details} name="details" className="form-control" placeholder="Details"/>
            </div>
            <button type="submit" className="btn btn-warning shadow">Create <i className="bi bi-arrow-right-circle-fill"></i></button>
        </form>
        <table className='table table-resposive table-bordered mt-3'>
            {task && task.map((item)=>{
                return(
                    <>
                    <tr>
                        <td>{item.newtask}</td>
                        <td>{item.details}</td>
                        <td><button type='button' onClick={()=>{navigate(`/delete/${item.id}`)}} className='btn btn-warning text-white bg-warning'><i className="bi bi-trash3-fill"></i></button></td>
                        <td><button type='button' onClick={()=>{navigate(`/edittask/${item.id}`)}} className='btn btn-secondary text-white bg-secondary'><i className="bi bi-pencil"></i></button></td>
                    </tr>
                    </>
                )
            })}
        </table>
      </Container>
    </div>
  )
}
