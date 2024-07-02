import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import { auth } from "../../Services/firebaseConnection"
import { signOut } from "firebase/auth"


async function handleLogout(){
  await signOut(auth)
}

export function Header(){
    return(
        <header className="w-full max-w-2xl px-1 mt-4">
            <nav className="w-full bg-white rounded-md px-3 h-11 flex justify-between items-center">
                <div className="font-medium gap-4 flex ">
                    <Link to="/">
                    Home
                    </Link>
                    <Link to="/admin">
                    Links
                    </Link>
                    <Link to="/admin/social">
                    Rede Sociais
                    </Link>
                </div>

                <button onClick={handleLogout} >
                    <BiLogOut size={28} color="#db2628" />
                </button>
            </nav>
        </header>
    )
}