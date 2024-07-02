import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../Components/Header"
import { Input } from "../../Components/input"
import { db } from "../../Services/firebaseConnection";
import {
    setDoc,
    doc,
    getDoc
} from "firebase/firestore";

export function Networks(){
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    function handleRegister(e: FormEvent){
        e.preventDefault()

        setDoc(doc(db, "social", "links"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(()=>{
            console.log('CADASTRADO COM SUCESSO')
        })
        .catch((error)=>{
            console.log('ERROR AO BUSCAR ITEM', error)
        })
    }

    useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db, "social", "links")
            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
            .catch((error)=>{
                console.log('ERROR AO BUSCAR ITEM', error)
            })

        }

        loadLinks();

    },[])

    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">
                Minhas redes Sociais
            </h1>

            <form className="flex flex-col w-11/12 max-w-xl" onSubmit={handleRegister} >
                <label className="text-white font-medium mt-2 mb-2">Link Facebook</label>
                <Input 
                type="url"
                placeholder="Digite a url do facebook..." 
                value={facebook}
                onChange={(e)=> setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link Instagram</label>
                <Input 
                type="url"
                placeholder="Digite a url do instagram" 
                value={instagram}
                onChange={(e)=> setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link Youtube</label>
                <Input 
                type="url"
                placeholder="Digite a url do youtube" 
                value={youtube}
                onChange={(e)=> setYoutube(e.target.value)}
                />

                <button type="submit" className="text-white bg-blue-600 h-9 items-center justify-center flex mb-7 rounded-md">
                Salva Links
                </button>

            </form>


        </div>
    )
}