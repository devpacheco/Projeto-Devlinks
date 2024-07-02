import { FormEvent, useState, useEffect } from "react"
import { Header } from "../../Components/Header"
import { Input } from "../../Components/input"
import { FiTrash } from "react-icons/fi"
import { db } from "../../Services/firebaseConnection"

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}


export function Admin(){
    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [textColorInput, setTextColorInput] = useState('#f1f1f1')
    const [backgroundColorInput, setBackgroundColoInput] = useState('#121212')

    const [links, setLinks] = useState<LinkProps[]>([])

        useEffect(()=>{
            const linkRef = collection(db, "links")
            const queryRef = query(linkRef, orderBy("created", "asc"));

            const unsub = onSnapshot(queryRef, (snapshot)=>{
                let lista = [] as LinkProps[];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })
                
                setLinks(lista)

            })

            return () => {
                unsub();
            }

        },[])



        function handleRegister(e: FormEvent){
        e.preventDefault()
        
        if(nameInput === '' || urlInput === ''){
            alert('Preencha todos os campos')
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(()=>{
            console.log('Item Cadastrado com Sucesso!')
            setNameInput('')
            setUrlInput('')
        })
        .catch((error)=>{
            console.log('ERRO AO CADATRAR ITEM' + error)
        })

    }

    async function handleDelete(id: string){
       const docRef = doc(db, "links", id);
       await deleteDoc(docRef)
    }

    return(
        <div className="flex flex-col items-center pb-7 min-h-screen px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2 text-lg">Nome do Link</label>
                <Input
                placeholder="Digite O Nome do Seu Link"
                value={nameInput}
                onChange={(e)=> setNameInput(e.target.value)}
                />

                <label className="text-white mb-2 text-lg">URL do Link</label>
                <Input
                type="url"
                placeholder="Digite a url"
                value={urlInput}
                onChange={(e)=> setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                <div className="flex gap-2">
                <label className="text-white font-medium mt-2 mb-2 text-lg">Fundo do Link</label>
                <input
                className="rounded-md"
                type="color" 
                value={backgroundColorInput}
                onChange={(e)=> setBackgroundColoInput(e.target.value)}
                />
                </div>

                <div className="flex gap-2">
                <label className="text-white font-medium mt-2 mb-2 text-lg">Cor do Link</label>
                <input
                className="rounded-md"
                type="color" 
                value={textColorInput}
                onChange={(e)=> setTextColorInput(e.target.value)}
                />
                </div>
                </section>

                {nameInput !== '' && (
                <div className="flex items-center justify-center flex-col mb-7 px-1 border-gray-100/25 border rounded-md">
                <label className="text-white font-medium mt-2 mb-2 text-lg">Veja como está ficando:</label>
                <article
                className="w-11/12 max-w-lg flex flex-col justify-between items-center bg-zinc-900 rounded px-1 py-3"
                style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}
                >
                    <p className="font-medium" style={{color: textColorInput}}> {nameInput} </p>
                </article>
                </div>
                )}

                <button 
                type="submit" 
                className="mb-7 bg-blue-600 h-9 text-white font-medium gap-4 flex justify-center items-center rounded-md"
                >
                Cadastrar
                </button>

            </form>

                <h2 className="text-white font-bold mb-4 text-2xl">
                    Meus Links
                </h2>

                {links.map((link)=>(
                    <article 
                    key={link.id}
                    className="flex items-center s justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                    style={{backgroundColor: link.bg , color: link.color }}
                    >
                        <p> {link.name} </p>
                        <div>
                            <button 
                            onClick={()=> handleDelete(link.id)}
                            className="border border-dashed p-1 rounded bg-neutral-900"
                            >
                                <FiTrash size={18} color="#FFF" />
                            </button>
                        </div>
                    </article>
                ))}

        </div>
    )
}