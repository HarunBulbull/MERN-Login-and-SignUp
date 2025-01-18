// Dependinciew
import React, { useState, useRef } from 'react';
import './auth.css'
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';

// Main
function Auth() {
  // Hooks
  const [type, setType] = useState("login");
  const animateArea = useRef(null);

  // Changing animation
  const change = (type) => {
    animateArea.current.style.transform = "translateY(5rem)"
    animateArea.current.style.scale = .8
    animateArea.current.style.opacity = 0
    setTimeout(() => {
      setType(type)
      animateArea.current.style.transform = "translateY(-5rem)"
      animateArea.current.style.transition = "0s"
      setTimeout(() => {
        animateArea.current.style.transition = "ease .4s"
        animateArea.current.style.transform = "translateY(0)"
        animateArea.current.style.scale = 1
        animateArea.current.style.opacity = 1
      }, 1);
    }, 400);
  }

  // Return
  return (
    <div className="auth_background">
      <div className="mainArea">
        <div className="animateIn" ref={animateArea}>
          {type === "login" ?
            <div className="flex col jcc aic g1">
              <Login />
              <p className='flex g-3 jcc aic'>
                Hesabın yok mu?
                <span
                  className='re_hoverToMainColor'
                  onClick={() => change("register")}>
                  Kayıt ol!
                </span>
              </p>
            </div>
            :
            <div className="flex col jcc aic g1">
              <Register/>
              <p className='flex g-3 jcc aic'>
                Hesabın var mı?
                <span
                  className='re_hoverToMainColor'
                  onClick={() => change("login")}>
                  Giriş yap!
                </span>
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth
