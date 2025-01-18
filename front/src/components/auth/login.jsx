// Dependincies
import TwoLabelInput from '../../reusable/inputs/twoLabelInput/twoLabelInput';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { message, Spin } from 'antd';

// Main
function Login() {
  // Hooks
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Log in function
  const handleLogin = async () => {
    if(!loading){                                                           // Check if there is a request already sent
      try {                                                                 // Error handling
        setLoading(true);                                                   // Disable log in function
        const response = await fetch(`${apiURL}/api/users/login`, {         // Fetch
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY                       // Auth middleware
          },
          body: JSON.stringify({ name: username, password: password })
        });
        const data = await response.json();                                 // Get json data from response
        if (response.ok) {                                                  // If request succesfull
          message.success("Başarıyla giriş yaptın!");                       // Send message
          const sessionEnd = new Date();                                    // Session for auto log out
          sessionEnd.setDate(sessionEnd.getDate() + 1);                     // Session ends in 1 24 hours (+1 = + 1 Day)
          localStorage.setItem('user', JSON.stringify({                     // Set localstorage data
            id: data.id,
            sessionEnd
          }))
        }
        else { message.error(data.error); }                                 // If request error send error message
      } catch (error) {                                                     // If function error
        console.error(error);                                               // Send error data to console
        message.error(error);                                               // Send error to user
      }
      finally { setLoading(false); }                                        // Enable  log in function
    }
  }

  // Return
  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
      <div className="flex col jcc aic g1-5">
        <TwoLabelInput label="Kullanıcı adı" type="text" keyDown={(e) => e.key === "Enter" && handleLogin()} change={(value) => setUsername(value)} />
        <TwoLabelInput label="Şifre" type="password" keyDown={(e) => e.key === "Enter" && handleLogin()} change={(value) => setPassword(value)} />
        <button className='mainButton' onClick={() => handleLogin()}>Giriş yap</button>
      </div>
    </Spin>
  )
}

export default Login
