import { useForm } from 'react-hook-form'
import './../static/css/login.css'
import { Link } from 'react-router-dom'
import { authMethod } from '../api/authMethods'
import { Toaster } from 'react-hot-toast';
import releaseToast from '../shared/Toasts';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { register, formState: {errors}, handleSubmit } = useForm()
    const url = process.env.REACT_APP_API_URL +'api/auth/local/register'
    const navigate = useNavigate()

    const onSubmit = (data) => {
        const misMatch = handlePassword(data)
        if(misMatch === 'error'){
            releaseToast('Las contraseñas no coinciden', 'error')
            return;
        }
        handleRegister(data)
    }

    const handlePassword = (e) => {
        if(e.password !== e.repassword){
            return 'error'
        }
        return 'ok'
    }

    const handleRegister = async (data) => {
        try{
            let res = await authMethod(url, data)
            await res.json()
            releaseToast('Usuario creado correctamente', 'success')
            navigate('/')
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
            <div className="registry_div">
                <div className="d-flex justify-content-center">
                    <div className="title">
                        <h1>Registro</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(manageErrors() && onSubmit)} className="login_form">
                    <div className="">
                        <label className="label">User</label>
                        <input className="input" type="text" autoComplete='true' {...register('username', 
                            {required: 'El username es requerido',
                            maxLength:{ value: 20, message: 'El username debe contener 20 caracteres como máximo' },
                            minLength:{ value:  3, message: 'El username debe contener 3 caracteres como mínimo' }}
                        )} />
                    </div>                
                    <div>
                        <label className="label">Email</label>
                        <input className="input" type="text" autoComplete='true' {...register('email', 
                            {required: 'El email es requerido',
                            maxLength:{ value: 40, message: 'El email debe contener 40 caracteres como máximo' },
                            minLength:{ value:  3, message: 'El email debe contener 3 caracteres como mínimo' },
                            pattern: {value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'El email no es válido' }}
                        )} />
                    </div>
                    <div className="">
                        <label className="label">Contraseña</label>
                        <input className="input" type="password" autoComplete='true' {...register('password',
                        {required: 'La contraseña es requerida',
                        maxLength:{ value: 25, message: 'La contraseña debe contener 25 caracteres como máximo' },
                        minLength:{ value:  8, message: 'La contraseña debe contener 8 caracteres como mínimo' },
                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/g, 
                        message: 'La contraseña no es válid' }} 
                        )} />
                    </div>
                    <div className="">
                        <label className="label">Repetir contraseña</label>
                        <input className="input" type="password" autoComplete='true' {...register('repassword', 
                            {required: 'La confirmación de la contraseña es requerida',
                            maxLength:{ value: 25, message: 'La confirmación de la contraseña debe contener 25 caracteres como máximo' },
                            minLength:{ value:  8, message: 'La confirmación de la contraseña debe contener 8 caracteres como mínimo' },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/g, 
                            message: 'La confirmación de la contraseña no es válida' }}
                    )} />
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
                <Toaster />
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