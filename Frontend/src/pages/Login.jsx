import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { lazy } from 'react'
import { apiCall } from '../utils/apiCall'
const FormInput = lazy(() => import('../components/FormInput'));

const Login = () => {

    const queryClient = useQueryClient()

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (details)=>apiCall({url:'/auth/login'},'post',details),
        onSuccess: (data) => {
            if (!data?.success) {
                setError('root', { message: data.message })
            } else {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                queryClient.invalidateQueries({ queryKey: ['auth'] });
                navigate('/')
            }
        }
    })

    const schema = yup.object().shape({
        Email: yup.string().email().required("Email is required"),
        Password: yup.string().required("Password is required")
    })

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (details) => {
        mutate(details);
    }

    return (
        <div className=' row justify-content-center align-items-center m-0' style={{ height: '80vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} className='card col-8 col-lg-4 p-3'>
                <h1 className='text-center'>Login</h1>
                <FormInput register={register} name={'Email'} type={'email'} />
                <p className="text-danger">{errors.Email?.message}</p>
                <FormInput register={register} name={'Password'} type={'password'} />
                <p className="text-danger">{errors.Password?.message}</p>
                <p className="text-danger text-center">{errors.root?.message}</p>

                <button className="btn btn-primary mx-auto d-block my-3" disabled={isPending}>{isPending ? "Signing Up" : "Login"}</button>

                <p>Don't have an Account <Link to={'/register'} >Sign in</Link></p>
            </form>
        </div>
    )
}

export default Login