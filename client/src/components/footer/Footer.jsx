import React from 'react'
import "./footer.scss"
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='content'>
            <nav className='nav-link'>
              <p>Mentions Légales et CGU</p>
              <p>Protection des données</p>
              <p>Gestion des cookies</p>
              <p>Cookies</p>
            </nav>
            <div className='twitter'>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <BsTwitter size={24} color='white'/>
              </a>
            </div>
        </div>
    </footer>
  )
}


export default Footer;