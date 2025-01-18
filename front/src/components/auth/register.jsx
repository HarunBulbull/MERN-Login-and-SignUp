// Dependincies
import TwoLabelInput from '../../reusable/inputs/twoLabelInput/twoLabelInput';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { message, Spin } from 'antd';

// Main
function Register() {
  // Hooks
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Register function
  const handleRegister = async () => {
    // Check sended datas is valid
    if (username == "" || email == "" || password1 == "" || password2 == "") { return message.error("Lütfen bütün boşlukları doldurunuz!") }
    if (username.length < 5) { return message.error("Kullanıcı adı 5 haneden kısa olamaz!") }
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { return message.error("Geçersiz e-posta adresi!") }
    if (password1 != password2) { return message.error("Şifreler uyuşmuyor!") }
    if (!password1.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&]{8,}$/)) { return message.error("Şifre minimum 8 hane uzunlukta olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir sembol içermek zorunda!") }
    // Check datas end ------

    if(!loading){                                                                       // Check if there is a request already sent
      try {                                                                             // Error handling
        setLoading(true);                                                               // Disable register function
        const response = await fetch(`${apiURL}/api/users/register`, {                  // Fetch
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY                                   // Auth middleware
          },
          body: JSON.stringify({ name: username, email: email, password: password1}),
        });
        const data = await response.json();                                             // Get json data from response
        if (response.ok) {                                                              // If request succesfull
          message.success("Başarıyla kayıt oldun!");                                    // Send message
          const sessionEnd = new Date();                                                // Session for auto log out
          sessionEnd.setDate(sessionEnd.getDate() + 1);                                 // Session ends in 1 24 hours (+1 = + 1 Day)
          localStorage.setItem('user', JSON.stringify({                                 // Set localstorage data
            id: data.id,
            sessionEnd
          }))
        }
        else { message.error(data.error); }                                             // If request error send error message
      } catch (error) {                                                                 // If function error
        console.error(error);                                                           // Send error data to console
        message.error(error);                                                           // Send error to user
      }
      finally { setLoading(false); }                                                    // Enable  register function
    }
  }

  // Return
  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
      <div className="flex col jcc aic g1-5">
        <TwoLabelInput label="Kullanıcı adı" type="text" keyDown={(e) => e.key === "Enter" && handleRegister()} change={(value) => setUsername(value)} />
        <TwoLabelInput label="E-Posta" type="text" keyDown={(e) => e.key === "Enter" && handleRegister()} change={(value) => setEmail(value)} />
        <TwoLabelInput label="Şifre" type="password" keyDown={(e) => e.key === "Enter" && handleRegister()} change={(value) => setPassword1(value)} />
        <TwoLabelInput label="Şifre Tekrar" type="password" keyDown={(e) => e.key === "Enter" && handleRegister()} change={(value) => setPassword2(value)} />
        <button className='mainButton' onClick={() => handleRegister()}>Kayıt ol</button>
      </div>
    </Spin>
  )
}

export default Register
