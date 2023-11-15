import React from 'react'

const Footer = () => {

    const date = new Date()
    const year = date.getFullYear()
    
  return (
    <div>
        <footer className='footercopy'>
                
                <div className='footerlogomail'>
                            <div className='colorall'> 
                                <span className='bulk yr'>Bulk-</span>
                                <span className='emaill yg'>-Mailer</span>
                                <span className='app yb'></span>
                            </div>
                            <p className='copy'>&copy; {year} All rights reserved</p>
                    </div>
                   
                <p className='desigh'>Developed by <span style={{color:'red'}}>Kannan RS</span></p>
        </footer>
    </div>
  )
}

export default Footer