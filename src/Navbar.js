import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { userContext } from './App';
import axios from 'axios';
import mail1 from './gmailogo.png'
import './Navbar.css'
const Navbar = () => {
        const[dp,setDp] = useState('')
        const[menu,setmenu] = useState(true)
        const[fname,setfname] = useState('')
        const[lname,setlname] = useState('')
        const[showmail,setShowMail] = useState(false)
        const profile = useContext(userContext)
        const navigate = useNavigate()
        // var {Email} = useParams()
        let Email = profile.userSelect
        
        // useEffect(()=>{
          if(Email){
            // console.log(Email);
            axios.post('https://bulkmailer.onrender.com/getProfile',{Email})
            .then(result=>{
              let fn = result.data[0].firstName[0]
              let ln = result.data[0].lastName[0]
              setfname(result.data[0].firstName)
              setlname(result.data[0].lastName)
              // console.log(fn+ln)
              let logo = fn+ln
              setDp(logo)
            })
            .catch(err => console.log(err))
          }
  return (
    <div >
      <div className='navbar'>
        <div className='navimg'>
          <div className='imgbur'>
                <div className='bur' onClick={()=>setmenu(!menu)} >
                                  { menu?
                                      <span class="material-symbols-outlined">
                                        menu
                                        </span>
                                  :<span class="material-symbols-outlined">
                                    close
                                    </span>
                                    }</div>
                <img className='mailLogo1' src={mail1} alt="image" />
        </div>
        <ul className={menu?'ul':'ulx'}>
                <NavLink
                to="/home"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "normal"
                }
                onClick={()=>setmenu(true)}
                >
                <div className='iconname'>
                  <span class="material-symbols-outlined">
                  Home
                  </span>
                  Home
                  </div>
                </NavLink>
      
                <NavLink
                to="/sendmail"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "normal"
                }
                onClick={()=>setmenu(true)} 
                >
                  <div className='iconname'>
                  <span class="material-symbols-outlined">
                  send
                  </span>
                  COMPOSE
                  </div>
                
                </NavLink>
      
        </ul>
        </div>
                <div>
                 
                    <div className='mailContainer' onClick={()=>setShowMail(!showmail)}>
                    {/* <p className='dpmail'>{Email?Email:'Choose account'}</p> */}
                          <p>Hi ! {fname}</p>
                          <div className='profiledp' title ={Email}>
                          {dp?dp:'+'}
                          </div>
                     
                          
                  </div>        
                    
                 

                  { showmail?<div className="vmail">
                    <p className='flname'>{fname} {lname}</p>
                    <p className='inemail'>{Email}</p>
                        <div className='innerbox' onClick={()=>navigate('/')}>
                        <span class="material-symbols-outlined person">
                            person_add
                            </span>
                            <p>LOG OUT</p>
                        </div>
                    
                  </div>:null}

                 
                </div>
               
                </div>
    </div>
    //
  )
}

export default Navbar

