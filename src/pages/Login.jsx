import { useForm } from 'react-hook-form'
import './../static/css/login.css'
import photo from './../static/imgs/pokedex.webp'
import { Link } from 'react-router-dom'
import { authMethod, storageSave } from './../api/authMethods.js'
import releaseToast from '../shared/Toasts'
import { Toaster } from 'react-hot-toast'

const Login = () => {

    const { register, formState: {errors}, handleSubmit } = useForm()
    const url = process.env.REACT_APP_API_URL + 'api/auth/local'
    
    const onSubmit = async (data) => {
        try{
            const res = await authMethod(url, data)
            const { jwt, user } = res
            const { username, email, nombre } = user
            storageSave({jw_token: jwt, username, email, nombre})
            window.location.href = '/pokedex'
            return;
        }catch(e){
            releaseToast('Ha ocurrido un error inesperado, inténtelo de nuevo más tarde', 'error')
            return;
        }
    }

    const manageHeight = () => {
        return localStorage.getItem('jw_token') ? '90vh' : '100vh';
    }

    const manageErrors = () => {
        if(errors){
            for(let error in errors){
                releaseToast(errors[error].message, 'error')
                break
            }
        }
        return true
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: manageHeight()}}>
            <div className="login_div">
                <div className="d-flex justify-content-center">
                    <img style={{width: '300px', marginBottom: '20px'}} src={photo} alt="pokedex" />
                </div>
                <form onSubmit={handleSubmit(manageErrors() && onSubmit)} className="login_form">
                    <div className="">
                        <label className="label">Email o User</label>
                        <input className="input" type="email" autoComplete='true' {...register('identifier', 
                            {required: 'El email o el user son requeridos para iniciar sesión'}
                        )} />
                    </div>
                
                    <div className="">
                        <label className="label">Contraseña</label>
                        <input className="input" type="password" autoComplete='true' {...register('password', 
                            {required: 'La contraseña es requerida'}
                        )} />
                    </div>
                    <input className="btn btn-dark" type="submit" value="Acceder" style={{marginBottom: '10px'}} />
                </form>
                <Toaster />
                <Link to="/register">
                    <div className="d-flex justify-content-center">
                        <div className="no-account">¿No tienes cuenta? Registrate</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Login