import { useForm } from 'react-hook-form'
import './../static/css/login.css'
import { Link } from 'react-router-dom'
import { authMethod } from '../api/authMethods'

const Register = () => {

    const { register, formState: {errors}, handleSubmit } = useForm()
    const url = process.env.API_URL +'api/auth/local/register' 

    const onSubmit = (data) => {
        const misMatch = handlePassword(data)
        if(misMatch === 'error'){
            console.log('error')
            return;
        }
        data = {...data, nombre: data.username}
        console.log(data)
        handleRegister(data)
    }

    const handlePassword = (e) => {
        if(e.password !== e.repassword){
            return 'error'
        }
        return 'ok'
    }

    const handleRegister = async (data) => {
        let res = await authMethod(url, data)
        res = await res.json()
        console.log(res)

    }

    const manageHeight = () => {
        return localStorage.getItem('jw_token') ? '90vh' : '100vh';
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: manageHeight()}}>
            <div className="registry_div">
                <div className="d-flex justify-content-center">
                    <div className="title">
                        <h1>Registro</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="login_form">
                    <div className="">
                        <label className="label">User</label>
                        <input className="input" type="text" {...register('username', 
                            {required: true, maxLength: 20, minLength: 3}
                        )} />
                        {errors?.username && <p style={{"color": "red"}}>User no válido</p>}
                    </div>                
                    <div>
                        <label className="label">Email</label>
                        <input className="input" type="email" {...register('email', 
                            {required: true, maxLength: 20, minLength: 3, pattern: /^\S+@\S+$/i}
                        )} />
                        {errors?.email && <p style={{"color": "red"}}>Email no válido</p>}
                    </div>
                    <div className="">
                        <label className="label">Contraseña</label>
                        <input className="input" type="password" {...register('password', 
                            {required: true, maxLength: 20, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/g}
                        )} />
                        {errors?.password && <p style={{"color": "red"}}>Contraseña no válida</p>}
                    </div>
                    <div className="">
                        <label className="label">Repetir contraseña</label>
                        <input className="input" type="password" {...register('repassword', 
                            {required: true, maxLength: 20, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/g}
                        )} />
                        {errors?.repassword && <p style={{"color": "red"}}>Repetir contraseña no válida</p>}
                    </div>
                    {/* <div>
                        <label className="label">País</label>
                        <select className="input" name="country" {...register('country', 
                            {required: true}
                        )} >
                            <option value="es">España</option>
                            <option value="fr">Francia</option>
                            <option value="ge">Alemania</option>
                            <option value="it">Italia</option>

                        </select>
                    </div> */}
                    <input className="btn btn-dark" type="submit" value="Registrarse" style={{marginBottom: '10px'}} />
                </form>
                <Link to="/">
                    <div className="d-flex justify-content-center">
                        <div className="no-account">¿Ya tienes cuenta? Haz log-in</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Register