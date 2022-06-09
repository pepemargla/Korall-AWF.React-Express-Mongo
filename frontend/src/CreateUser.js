import axios from "axios";
import React, { useState, useEffect } from "react";


function Register() {

  const [language_id, setlanguage_id] = useState("");
  const [country_id, setcountry_id] = useState("");
  const [state_id, setstate_id] = useState("");
  const [city_id, setcity_id] = useState("");
  const [identification, setidentification] = useState("");
  const [name, setname] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [messageUser, setMessageuser] = useState('');

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const mail = event.target.value;
    if (emailRegex.test(mail)) {
      setIsValid(true);
      setMessage('');
      setemail(mail)
      console.log("correo "+email)
    } else {
      setIsValid(false);
      setMessage('Please enter a valid email!. Must contain "@" and " . "');
    }
  };

  const validateUsername = (event) => {
    const nameuser = event.target.value;
    if (emailRegex.test(nameuser)) {
      setIsValid(true);
      setMessageuser('');
      setusername(nameuser)
      console.log("correo "+username)
    } else {
      setIsValid(false);
      setMessageuser('Please enter a valid username!. Must contain "@" and " . "');
    }
  };


  async function registrar() {
    console.warn(language_id, country_id, state_id, city_id,
      identification, name, last_name, username, password, email)
    let item = {
      language_id, country_id, state_id, city_id,
      identification, name, last_name, username, password, email
    };

    axios.post('http://127.0.0.1:8000/api/auth/signup', item)
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /*DATA LANGUAGE*/
  const [dataLanguage, setDataLanguage] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    getData()
  }, [])
  const getData = async () => {
    const datos = await fetch('http://127.0.0.1:8000/api/languages')
    const language = await datos.json()
    console.log(language)
    setDataLanguage(language)
  }

  const handleCargar = function (e) {
    const opcion = e.target.value;
    console.log("opcion select1" + " - " + opcion)
    setlanguage_id(opcion)
  }
  /*FIN DATA PLAN*/

  /*DATA COUNTRY*/
  const [dataCountry, setDataCountry] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    getDataCountry()
  }, [])
  const getDataCountry = async () => {
    const datos = await fetch('http://127.0.0.1:8000/api/plans')
    const country = await datos.json()
    console.log(country)
    setDataCountry(country)
  }

  const handleCargarCountry = function (e) {
    const opcion = e.target.value;
    console.log("opcion select1" + " - " + opcion)
    setcountry_id(opcion)
    console.log("Adquirido desde combo : " + setcountry_id)
  }
  /*FIN DATA COUNTRY*/

  /*DATA STATE*/
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    getDataState()
  }, [])
  const getDataState = async () => {
    const datos = await fetch('http://127.0.0.1:8000/api/states')
    const state = await datos.json()
    console.log(state)
    setDataState(state)
  }

  const handleCargarState = function (e) {
    const opcion = e.target.value;
    console.log("opcion select1" + " - " + opcion)
    setstate_id(opcion)
  }
  /*FIN DATA STATE*/

  /*DATA CITY*/
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    getDataCity()
  }, [])
  const getDataCity = async () => {
    const datos = await fetch('http://127.0.0.1:8000/api/cities')
    const city = await datos.json()
    console.log(city)
    setDataCity(city)
  }

  const handleCargarCity = function (e) {
    const opcion = e.target.value;
    console.log("opcion select1" + " - " + opcion)
    setcity_id(opcion)
  }
  /*FIN DATA CITY*/

  return (
    <div className="col-sm-4 offset-sm-4" >
      <h1>FORMULARIO DE REGISTRO DE USUARIO</h1>
      <label>Escoger lenguaje</label>
      <br />
      <br />
      <select className="select" onClick={handleCargar}>

        {dataLanguage.map((plan) => (
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        ))}
      </select>
      <br />
      <br />
      <label>Escoger Country</label>
      <br />
      <br />
      <select className="select" onClick={handleCargarCountry} >

        {dataCountry.map((countryItem) => (
          <option key={countryItem.id} value={countryItem.id}>{countryItem.name}</option>
        ))}
      </select>
      <br />
      <br />
      <label>Escoger State</label>
      <br />
      <br />
      <select className="select" onClick={handleCargarState} >

        {dataState.map((stateItem) => (
          <option key={stateItem.id} value={stateItem.id}>{stateItem.name}</option>
        ))}
      </select>
      <br />
      <br />
      <label>Escoger City</label>
      <br />
      <br />
      <select className="select" onClick={handleCargarCity} >

        {dataCity.map((cityItem) => (
          <option key={cityItem.id} value={cityItem.id}>{cityItem.name}</option>
        ))}
      </select>
      <br />
      <br />
      <input type="text" placeholder="Ingrese su N° de Identificacion"
        onChange={(e) => setidentification(e.target.value)}
        className="form-control" />
      <br />
      <input type="text" placeholder="Ingrese su Nombre "
        onChange={(e) => setname(e.target.value)}
        className="form-control" />
      <br />
      <input type="text" placeholder="Ingrese su Apellido"
        onChange={(e) => setlast_name(e.target.value)}
        className="form-control" />
      <br />
      <input
        type="email"
        placeholder="Enter your user"
        className="email-input"
        onChange={validateUsername} 
      />
      <div className={`messageUser ${isValid ? 'success' : 'error'}`}>
        {messageUser}
      </div>
      <br />
     

      <input
        type="email"
        placeholder="Enter your email"
        className="email-input"
        onChange={validateEmail} 
      />
      <div className={`message ${isValid ? 'success' : 'error'}`}>
        {message}
      </div>


      <br />
      <input type="text" placeholder="Ingrese su contraseña"
        onChange={(e) => setpassword(e.target.value)}
        className="form-control" />
      <br />

      <div className="col-sm-4 offset-sm-5">
        <button onClick={registrar} className="btn btn-primary">Registrar Usuario</button>

      </div>
    </div>
  )
}

export default Register