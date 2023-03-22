import { useState, useEffect } from "react"

export const AuthGuard = () => {

    const [jw_token, setJw_token] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('jw_token')){
            return setJw_token(localStorage.getItem('jw_token'))
        }
    }, [])  
    
    return jw_token
}