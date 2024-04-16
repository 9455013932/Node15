import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [aspires, setApiRes] = useState('No Response')
  const [registerdata, setRegisterData] = useState({
    password: '', email: '', age: '', gender: '', name: ''
  })
  const [logindata, setLoginData] = useState({
    password: '', email: ''
  })
  const checkApi = () => {
    fetch('http://localhost:8000', {
      method: "GET",
    })
      .then(res => res.json())  //setting respose as json format as data comes in string format
      .then(data => {                //printing th data
        console.log(data)
      })
      .catch(err => console.log(err))         //if its not work
  }
  useEffect(() => {
    checkApi()
  }, [])

  const handleRegister = () => {
    // console.log(Register)
    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerdata)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
      })
      .catch(err => console.log(err))
  }
  const handleLogin = () => {
    // console.log(Register)
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        console.log(data.accesstoken)
        localStorage.setItem('accessstoken', data.accesstoken)
      })
      .catch(err => console.log(err))
  }

  const getSavedToken = () => {
    const token = localStorage.getItem('accesstoken')
    console.log(token)

  }
  return (
    <div className="App">
      <h1>Register Form</h1>
      <input type="text" placeholder="Name"
        onChange={(e) => {
          setRegisterData({ ...registerdata, name: e.target.value })
        }} />
      <input type="text" placeholder="Email"
        onChange={(e) => {
          setRegisterData({ ...registerdata, email: e.target.value })
        }} />
      <input type="text" placeholder="Password"
        onChange={(e) => {
          setRegisterData({ ...registerdata, password: e.target.value })
        }} />
      <input type="text" placeholder="Age"
        onChange={(e) => {
          setRegisterData({ ...registerdata, age: e.target.value })
        }} />
      <button
        onClick={handleRegister}>
        register
      </button>

      <br></br>
      <br></br>
      <br></br>

      <h1>Login Form </h1>
      <input type="text" placeholder="Email"
        onChange={(e) => {
          setLoginData({ ...logindata, email: e.target.value })
        }} />
      <input type="text" placeholder="Password"
        onChange={(e) => {
          setLoginData({ ...logindata, password: e.target.value })
        }} />

      <button
        onClick={handleLogin}>
        Login
      </button>

        <br></br>
        <br></br>
        <br></br>

        <button
        onClick={getSavedToken}>
        Get Saved Token
      </button>

    </div>
  );
}

export default App;
