import { Link } from "react-router-dom";

export function ErrorPage(){
    return(
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <h1 className="text-white font-medium text-3xl mb-2">Página não encontrada!</h1>
            <p className="text-white text-lg mb-3">Você acessou Uma Página que não Existe</p>

            <Link to="/" className="bg-gray-50/20 py-1 px-4 rounded-md font-medium text-sm text-white">
            Voltar para a Home
            </Link>
        </div>
    )
}