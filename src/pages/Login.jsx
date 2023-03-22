import { useForm } from 'react-hook-form'
import './../static/css/login.css'
import photo from './../static/imgs/pokedex.webp'
import { Link } from 'react-router-dom'
import { authMethod, storageSave } from './../api/authMethods.js'

const Login = () => {

    const { register, formState: {errors}, handleSubmit } = useForm()
    let url = process.env.API_URL + 'api/auth/local' 

    const onSubmit = async (data) => {
        const res = await authMethod(url, data)
        const { jwt, user } = res
        const { username, email, nombre } = user
        storageSave({jw_token: jwt, username, email, nombre})
        return window.location.href = '/pokedex'
    }

    const manageHeight = () => {
        return localStorage.getItem('jw_token') ? '90vh' : '100vh';
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: manageHeight()}}>
            <div className="login_div">
                <div className="d-flex justify-content-center">
                    <img style={{width: '300px', marginBottom: '20px'}} src={photo} alt="pokedex" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="login_form">
                    <div className="">
                        <label className="label">Email o User</label>
                        <input className="input" type="email" {...register('identifier', 
                            {required: true, maxLength: 30, minLength: 6, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g}
                        )} />
                        {errors?.identifier && <p style={{"color": "red"}}>Email no válido</p>}
                    </div>
                
                    <div className="">
                        <label className="label">Contraseña</label>
                        <input className="input" type="password" {...register('password', 
                            {required: true, maxLength: 20, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/g}
                        )} />
                        {errors?.password && <p style={{"color": "red"}}>Contraseña no válida</p>}
                    </div>
                    <input className="btn btn-dark" type="submit" value="Acceder" style={{marginBottom: '10px'}} />
                </form>
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