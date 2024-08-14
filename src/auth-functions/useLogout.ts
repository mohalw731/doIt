import { useNavigate } from 'react-router-dom'
import { auth } from '../configs/Firebase'

export default function useLogout() {

    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return {handleSignOut}
}
