import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { lazy } from 'react'
import { apiCall } from '../utils/apiCall.js'
const FormInput = lazy(() => import('../components/FormInput'));

const Register = () => {

    const queryClient = useQueryClient()

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (details)=>apiCall({url:'/auth/register'},'post',details),
        onSuccess: (data) => {
            if (!data.success) {
                setError('root', { message: data.message })
            } else {
                queryClient.invalidateQueries({ queryKey: ['user'] })
                navigate('/')
            }
        }
    })

    const schema = yup.object().shape({
        Name: yup.string().required("Name is required"),
        Email: yup.string().email().required("Email is required"),
        Password: yup.string().required("Password is required"),
        ConfirmPassword: yup.string().required("Confirm your Password").oneOf([yup.ref('Password'), null], "Password must Match"),
    })

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (details) => {
        mutate(details)
    }


    return (
        <div className='row justify-content-center align-items-center m-0' style={{height:'80vh'}}>
            <form onSubmit={handleSubmit(onSubmit)} className='card col-8 col-lg-4 p-3'>
                <h1 className='text-center'>Sign in</h1>
                <FormInput register={register} name={'Name'} type={'text'} />
                <p className="text-danger">{errors.Name?.message}</p>
                <FormInput register={register} name={'Email'} type={'email'} />
                <p className="text-danger">{errors.Email?.message}</p>
                <FormInput register={register} name={'Password'} type={'password'} />
                <p className="text-danger">{errors.Password?.message}</p>
                <FormInput register={register} name={'ConfirmPassword'} type={'password'} />
                <p className="text-danger">{errors.ConfirmPassword?.message}</p>
                <p className="text-danger">{errors.root?.message}</p>

                <button className="btn btn-primary mx-auto d-block my-3" disabled={isPending}>{isPending ? "Signing In" : "Sign In"}</button>


                <p>Already have an Account <Link to={'/login'}>Login</Link></p>
            </form>
        </div>
    )
}

export default Register