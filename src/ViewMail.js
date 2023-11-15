import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import './View.css'
const ViewMail = () => {
    const{id} = useParams()
    const[detail,setDetail] = useState([])
    const [Files,setFiles] = useState()
    const [view,setView] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('https://bulkmailer.onrender.com/getmail/'+id)
        .then(result =>
        {
            // console.log(result.data._id)
            setDetail(result.data)
            setFiles(result.data.files)
    })
        .catch(err => console.log(err))
    },[])

    function viewImage(data){
        // console.log('working',data);
       
        setView(data) 

    }

    function handleDelete(id){
        // console.log(id,'kkk');
        if(window.confirm('You want to delete the mail')){
            
         axios.delete('https://bulkmailer.onrender.com/deletemail/'+id)
        .then(result => {console.log(result)
            if(result.data=='deleted'){
                // window.location.reload();
                alert('mail Sucessfully deleted')
                navigate('/home')
            }
        })
        .catch(err => console.log(err))
    }
    }
  
  return (
    <div><Navbar/>
        <div className='viewmail'>
             {/* {console.log(Files)
             } */}
                    <ul className='view1'>
                        <li className='viewto'>To: <p className='paramsg'> {detail.toMail != undefined ?detail.toMail.map(a=>
                        <p><a className='multimails' href={"mailto:"+a}>{a}</a></p>):null}</p></li>
                        <hr className='vline' />
                        <li className='viewsub'>Subject:<br></br> <p className='paramsg'>{detail.sub}</p> </li>
                        <hr className='vline' />
                        <li className='viewmsg'>Message:<br></br> <p className='paramsg'>{detail.message!=undefined?detail.message.split(',').join(' '):null}</p></li>
                        <hr className='vline' />
                        
                        <button className='deletemail' onClick={()=>handleDelete(detail._id)}>
                            <span class="material-symbols-outlined del">
                                delete
                                </span>
                        </button>
                        <div className="imgContainer">
                        {
                            Files != undefined ?Files.map(data=>
                                <div className='positionimg' onClick={()=>viewImage(data)}>
                                         <img className='sendImage' src={'https://bulkmailer.onrender.com/images/'+data} alt="images"  />
                                </div>
                                ):null
                        }
                        </div>

                        {view?
                        <img className='openView' src={'https://bulkmailer.onrender.com/images/'+view}  alt="" />
                        :null}
                        <div className='timedone'><span class="material-symbols-outlined">
                        done_all
                        </span>{detail.sendtime} {detail.time!=undefined?(detail.time).slice(4,15):null}</div>
                                            </ul>
                    {/* {a.sendtime} {(a.time).slice(4,10)} */}
        </div>
    </div>
  )
}

export default ViewMail