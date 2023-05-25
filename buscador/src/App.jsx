import './style.css'
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

async function handleSearch(){
 // 01001000/json/
 if(input === ''){
  alert("Preencha o campo de CEP")
  return
 }
 try{
  const response = await api.get(`${input}/json`)
  setCep(response.data)
  console.log(response.data)
  setInput("")

 }
 catch{
  alert("OPS, Algo deu errado!")
  setInput("")
 }

}

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu CEP..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch} >Buscar</button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>Estado: {cep.uf}</span>
        <span>Localidade: {cep.localidade}</span>
        <span>DDD: +{cep.ddd}</span>
        <span>IBGE: {cep.ibge}</span>
        <span>Logradouro: {cep.logradouro}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;
