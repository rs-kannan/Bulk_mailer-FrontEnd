import React, { useContext,useState } from 'react'
import './Sendmail.css'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import spin from './spin.gif'
import { useNavigate } from 'react-router-dom'
import { userContext } from './App'
import Navbar from './Navbar'
import mailLogo from './gmail.png'
const Sendmail = () => {

    const[demo,setDemo] = useState(false)
    const[bulkMail,setBulkMail]  = useState(false)
    const [loading,setloading] = useState(false)
    const [file,setFile] = useState('')
    const navigate = useNavigate()
    const status = useContext(userContext);
    const selectAccount = useContext(userContext)
    const Email = selectAccount.userSelect
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()

    let minute = min<10 ? '0'+min:min
    let sendtime = hour<10?'0'+hour+':'+minute:hour+':'+minute

    const formik = useFormik({
    
        initialValues:{
            from: Email,
            to:'',
            subject:'',
            message:'',
            bulkmailId:''
        },
        validationSchema:yup.object({
            
            from:yup.string().email('Invalid email address')
            .required('Required'),
            
            to:!bulkMail?(yup.string().email('Invalid email address').required('Required')):null,
            subject:yup.string().required(' Sub Required'),
            message:yup.string().required('Message Required')
        }),

        onSubmit:(values,{resetForm})=>{
            
            setloading(true)
            const {from,to,subject,message,bulkmailId} = values
            const formData = new FormData();
            formData.append('from',from)
            formData.append('to',to)
            formData.append('subject',subject)
            formData.append('message',message)
            formData.append('bulkmailId',bulkmailId)
            formData.append('sendtime',sendtime)
            // console.log(formData,sendtime);

            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
              }

            setTimeout(()=>{
            axios.post('https://bulkmailer.onrender.com/sendmail', formData)
            .then(result => {console.log(result)
                if(result.data = 'success'){
                setloading(false)
                status.setSent(true)
                navigate('/home')
                }
            })
            .catch(err => console.log(err))

        },3000)
        }

    })
    // status.setSent(false)
    
    // console.log(hour+':'+min);
  return (

    <div>
         
        <Navbar/>
        <div className='watermark'><img src={mailLogo} alt="" /></div>
           {loading?<div className='load'> <img className='spin' src={spin} alt="" /> <p className='sending'>Please wait Sending... </p> </div>:
    <div className='sendForm'>
      {/* <div className='demo1'>
                    Enter the two step verification code from the google account  in the key input box
                    <span onClick={()=>setDemo(!demo)} className="material-symbols-outlined closex">
                    close
                    </span>
                </div> */}
                <div className="useCase1" onClick={()=>setDemo(!demo)}>
                <span class="material-symbols-outlined">
                speaker_notes
                </span>
                {demo?<div className='demo1'>
                   <div className='titleBulk'> Incase of bulk mail check to bulk mail box and enter the email in given format <br /> <span className='egmail'>(eg: john@gmail.com, angel@gmail.com, alex123@gmail.com)</span></div>
                    <span onClick={()=>setDemo(!demo)} className="material-symbols-outlined closex">
                    close
                    </span>
                </div>:null}
        </div>

        <form onSubmit={formik.handleSubmit} className='formdata'>


            <label className='label' htmlFor="from">From </label>
            <input className='inp' id='form' 
            onChange={formik.handleChange}type="text" placeholder='from email id'
            value={formik.values.from} name='from' />
             { formik.touched.from && formik.errors.from?
                            <p  className='err'> <span class="material-symbols-outlined eri">
                                error
                                </span>{formik.errors.from}</p>:null}

              {!bulkMail?<>
            <label className='label' htmlFor="from">To</label>
            <input className='inp' type="text" 
            onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='to email id'
            value={formik.values.to}  name='to' /> 
             { formik.touched.to && formik.errors.to ?
                            <p  className='err'> <span className="material-symbols-outlined eri">
                                error
                                </span>{formik.errors.to}</p> :null} </>:null}
            


             <div className='bulkmail'>
                    <input className='cbox' type="checkbox" 
                    onClick={()=>setBulkMail(!bulkMail)}  name='checkbox' />
                    <label className='label bulkmail' htmlFor="from">Bulk Mail</label>
             </div>


            {bulkMail? <><label className='label' htmlFor="from">Bulk Mail To</label> 
            <textarea className='multiplemail' type="text" placeholder='Eg: adc@gmail.com,xyz@gmail.com'
            onChange={formik.handleChange}
            value={formik.values.bulkmailId}  name='bulkmailId' /> </>:null}

            <label className='label' htmlFor="from">Subject</label>
            <input className='inp' type="text" placeholder='Subject'
            onChange={formik.handleChange}
            value={formik.values.subject}   name='subject' />
            {formik.touched.subject &&formik.errors.subject ?
                            <p  className='err'> <span className="material-symbols-outlined eri">
                                error
                                </span>{formik.errors.subject}</p> :null}


            <label className='label' htmlFor="from">Compose</label>
            <textarea className='inp txt' name="message" id="message" cols="30" 
            onChange={formik.handleChange}  rows="10" value={formik.values.message} ></textarea>
            {formik.touched.message &&formik.errors.message ?
                            <p  className='err'> <span className="material-symbols-outlined eri">
                                error
                                </span>{formik.errors.message}</p> :null}
            
            <div className='filebtn'>
                    <input type="file" multiple onChange={(e)=>setFile(e.target.files)}  />
                    <button type='submit' className='sendbtn'>Send<span className="material-symbols-outlined rck">
                    send
                    </span></button>
            </div>
        </form>
    </div>}
    </div>
  )
}

export default Sendmail