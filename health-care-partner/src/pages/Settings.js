import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SocialShare from '../components/SocialShare';

const Settings = () => {

    const [fontSize, setFontSize] = useState(16);

    const handleIncreaseFontSize = () => {
        setFontSize(fontSize + 1);
        document.getElementById('root').style.fontSize = fontSize + 'px';
    }

    const handleDecreaseFontSize = () => {
        setFontSize(fontSize - 1);
        document.getElementById('root').style.fontSize = fontSize + 'px';
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({ 
            pageLanguage: 'en' 
          }, 'google_translate_element');
        };
      }, []);
    

    return (
        <div className='bg-brand'>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-brand fs-4">Share in Social Media</h2>
                <SocialShare />

                <h2 className="text-brand fs-4 mt-5">Contact Us</h2>
                {/* <p>Abdullah Al Imran <br /><a href="tel:01875500975">01875500975</a></p> */}
                <p>Eftykhar Rahman Raufu (For Development Version Only)<br /><a href="tel:01611404405">01611404405</a></p>

                <h2 className="text-brand fs-4 mt-5">Font Size</h2>
                <button onClick={() => handleIncreaseFontSize()} className='btn btn-success px-5'>+</button>
                <button onClick={() => handleDecreaseFontSize()} className='btn btn-danger px-5 ms-3'>-</button>
                
                <h2 className="text-brand fs-4 mt-5">Change Language</h2>
                <div id="google_translate_element"></div>
            </div>
        </div>
    );
};

export default Settings;