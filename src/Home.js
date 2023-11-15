import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios'
import Navbar from './Navbar'
import mail1 from './gmail.png'
const Home = () => {
  
  const status = useContext(userContext);
  var notify = status.sent
  // console.log(notify,'home')
  const [sentMail,setSentMail] = useState([])
  const Email = useContext(userContext)
  const EMAIL = Email.userSelect
  setTimeout(()=>{
      status.setSent(false)
  },3500)
  // const names = 'kannan'
  useEffect(()=>{
    axios.post('https://bulkmailer.onrender.com/sent/',{EMAIL})
    .then(res=>{
      // console.log(res)
      setSentMail(res.data.reverse())
      
    })
    .catch(err=>console.log(err))
  },[])

  return (
    <div>
      <Navbar/>
    <div className='homepage'>

        <Link to='/sendmail'>
        <p className='composemail'>
        <span className="material-symbols-outlined pen">
        edit 
        </span>
        Compose
        </p></Link>
       
       
          {notify? <p className={notify?'status':'nostatus'}> Message Sent<span class="material-symbols-outlined check">
          done
          </span> </p> :null}

          <div className='sentContainer'>
              { sentMail.length?
                sentMail.map((a,i)=>
                <Link to={'/viewmail/'+a._id} >
                  <div className='perMail'>
                          <div className='justy'>
                                 
                                      <div className='profiledp homedp'>
                                                  {EMAIL.slice(0,1)}
                                      </div>
                                          <ul key={i} className='mailSent'>
                                            <li className='to'>To: {a.toMail.length>1?'BULK MAIL...':a.toMail}</li>
                                            <li className='sub'>Sub: {(a.sub).slice(0,20)+'...'}</li>
                                          </ul>
                                
                               
                            </div>
                          
                                    <div className='sentTime'> {a.sendtime} {(a.time).slice(4,10)}</div>
                            
                     </div>
                  </Link>
                ):<div className='empty'>
                  <div className='imgdiv'>
                    <img className='waitMail' src={mail1} alt="mailimage" />
                  </div>
                    <div className='logomail'>
                            <div className='color'> 
                                <span className='bulk y'>Bulk</span>
                                <span className='emaill y'>Mailer</span>
                                <span className='app y'></span>
                            </div>
                    </div>
                    
                </div>

                 
                
              }
          </div>
        
    </div>
    </div>
  )
}

export default Home