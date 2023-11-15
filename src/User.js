import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from './App'
import {useFormik} from 'formik'
import * as yup from 'yup'
import './user.css'
import mailLogo from './gmail.png'

const User = () => {

    const [intro,setintro] = useState(true)
    const[add,setAdd] = useState(false)
    const[demo,setDemo] = useState(false)
    const navigate = useNavigate()
    const [user,setUser] = useState()
    const selectAccount = useContext(userContext);
    //
   
    const date = new Date()
    const year = date.getFullYear()

    //
    useEffect(()=>{
        axios.get('https://bulkmailer.onrender.com/getUser')
        .then(result=>{console.log(result)
            setintro(false)
            if(result){
                setUser(result.data)
            }
            
    })
        .catch(err =>{console.log(err)
        
            setInterval(()=>{
                window.location.reload()
            },5000)
        })
    },[])
    function switchaccount(email){
        selectAccount.setUserSelect(email);
        console.log(selectAccount.userSelect);
        navigate('/home')
    }
    

    const formik = useFormik({

        initialValues:{
            firstName: '',
            lastName:'',
            email:'',
            key:'',
            
        },
        validationSchema:yup.object({
            
            email:yup.string().email('Invalid email address')
            .required('Required'),
            
            firstName:yup.string().min(3,'minimum 3 characters required').required('Required'),

            lastName:yup.string().required('Required'),

            key:yup.string().min(5,'minimum 20 characters required').required('Required')
        }),

        onSubmit:(values,{resetForm})=>{
            
            const{firstName,lastName,email,key} = values
            
            console.log(firstName,key);
             axios.post('https://bulkmailer.onrender.com/register',{firstName,lastName,email,key})
        .then(result => {console.log(result.data)
            if(result.data == 'registered'){
                window.location.reload()
                // navigate('/home')
            }
        })
        .catch(err => console.log(err))
        }

    })

  return (
    <div className='initial' >
        <header>
        <div className='footerlogomail'>
                            <div className='colorall' style={{fontSize:'20px',margin:'20px'}}> 
                                <span className='bulk yr'>Bulk </span>
                                <span className='emaill yg'> mailer</span>
                                <span className='app yb'></span>
                            </div>
            
                    </div>
        </header>
        <main>
        {intro?<div className='watermark1'><img src={mailLogo} alt="" /></div>:null}
        <div className="useCase"  onClick={()=>setDemo(!demo)}>
                <span class="material-symbols-outlined">
                speaker_notes
                </span>
                {demo?<div className='demo'>
                    To ADD new account, enter the two step verification code from the google account in key input box!
                    <span onClick={()=>setDemo(!demo)} className="material-symbols-outlined closex">
                    close
                    </span>
                </div>:null}
        </div>
        <div className='registerBox'>
            <div className='boxmail'>
                <div className="email">
                        <span class="material-symbols-outlined plus" onClick={()=>setAdd(!add)}>
                        person_add
                            </span><p className='newAccount'>Add another account</p>
                </div>
        {add?
        <form className='inputForms' onSubmit={formik.handleSubmit}>
           
             {/* firstname */}
            <input className='inp' type="text" placeholder='Enter First name'
            onChange={formik.handleChange}
            value={formik.values.firstName}  name='firstName'
            onBlur={formik.handleBlur} />            
               
            { formik.touched.firstName && formik.errors.firstName?
                            <p  className='errl'> <span class="material-symbols-outlined eril">
                                error
                                </span>{formik.errors.firstName}</p>:null}
            
            
            {/* lastname */}
            <input className='inp' type="text" placeholder='Enter Last name' 
            onChange={formik.handleChange}
            value={formik.values.lastName}  name='lastName'
            onBlur={formik.handleBlur} />

            { formik.touched.lastName && formik.errors.lastName?
            <p  className='errl'> <span class="material-symbols-outlined eril">
                error
                </span>{formik.errors.lastName}</p>:null}
            

            {/* Email */}
            <input className='inp' type="text" placeholder='Enter emailID'
            onChange={formik.handleChange}
            value={formik.values.email}  name='email' onBlur={formik.handleBlur} />

            { formik.touched.email && formik.errors.email?
            <p  className='errl'> <span class="material-symbols-outlined eril">
                error
                </span>{formik.errors.email}</p>:null}
            


            {/* key */}
            <input className='inp' type="text" placeholder='Two Step Verification Key' 
            onChange={formik.handleChange}
            value={formik.values.key}  name='key'
            onBlur={formik.handleBlur} />

            { formik.touched.key && formik.errors.key?
            <p  className='errl'> <span class="material-symbols-outlined eril">
                error
            </span>{formik.errors.key}</p>:null}
            
            <button type='submit' className='registerbtn'>Register</button>
        </form>:<div className='logomail'>
        <span className="material-symbols-outlined maill">
            mail
            </span>
            <div className='color'> 
                <span className='bulk q'>Bulk mailer</span>
                            </div>
            </div>}
        </div>
        <div className="userregister">
        {/* <hr className='hr' /> */}
        <p className='rga'>REGISTERED ACCOUNT  <span style={{color:'red',fontSize:'20px',fontWeight:'800'}}>!</span></p>
            <div className='overflow'>
                {/* {console.log(user)} */}
            {
                user!== undefined?user.map((a,i)=>
                    <div key={i} className='loginAccount' onClick={()=>switchaccount(a.email)}>
                            <p className={i==0?'aa a':i%2==0?'aa b': i%3==0?'aa c':'aa d'}>{a.firstName.slice(0,1)}</p>
                            <div className='nameMail'>
                            <p className='nm'>{a.firstName} {a.lastName}</p>
                            <p className='em'>{a.email}</p>
                        </div>
                    </div>
                    
                    ):<div className='connection'>No internet connection</div>
            }
                </div>
        </div>
        </div>
        </main>

    </div>
    
  )
}

export default User