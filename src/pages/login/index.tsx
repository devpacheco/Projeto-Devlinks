import { useState, FormEvent } from "react"
import { Input } from "../../Components/input"
import { Link, useNavigate } from "react-router-dom"
import { auth } from '../../Services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"


export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault()

        if(email === '' || password === ''){
         alert('Preencha Todos os Campos')
         return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            console.log('usuario logado com sucesso')
            navigate("/admin", {replace: true})
        })
        .catch((error)=>{
            console.log('ERROR AO FAZER O LOGIN:')
            console.log(error)
        })

    }

    return(
        <div className="flex justify-center items-center flex-col w-full h-screen">
            <Link to="/">
                <h1 className="text-white mt-11 mb-7 font-bold text-5xl">Dev
                <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
            <Input
            placeholder="Digite seu email..."
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <Input
            placeholder="Digite sua senha..."
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <button 
            type="submit"
            className="w-full h-9 text-white font-bold bg-blue-600 rounded-md border-0">
                Acessar
            </button>
            </form>
        </div>
    )
}