import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { lazy } from 'react';
import { apiCall } from '../utils/apiCall.js';
import useFetch from '../hooks/useFetch.js';
const FormInput = lazy(() => import('../components/FormInput'));

const BookingModel = ({ setBookingModel, toast }) => {

    const { data: user, error: userError } = useFetch(['user'], { url: '/user' })

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({ url: '/book-visit' }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Your booking was successfully done", { autoClose: 2000 })
                setBookingModel(false)
            }
            setError('root', { message: data.message })
        },
        onError: (err) => {
            setError('root', { message: err.message })
        }
    })

    const today = new Date()

    const schema = yup.object().shape({
        Date: yup.date().typeError("Date required").min(today, "Select a valid date").required('Date is required'),
        Ticket: yup.number("required").typeError("Tickets required").required('Number of tickets is required')
    })

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (details) => {
        mutate(details)
    }

    return (
        <div className=" model"  >
            <div className="card col-8 col-lg-4">
                <div className="card-header d-flex justify-content-between">
                    <h1 className="card-title fs-5" >Enter Address</h1>
                    <button type="button" className="btn-close" onClick={() => setBookingModel(false)}></button>
                </div>
                <div className="card-body ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='text-danger'>Note: You cannot cancel booking!<br />Ticket price 50/-</p>
                        <p>Name: {user?.data.name}</p>
                        <p>Email: {user?.data.email}</p>
                        <FormInput register={register} name={'Date'} type={'date'} />
                        <p className="text-danger">{errors.Date?.message}</p>
                        <FormInput register={register} name={'Ticket'} type={'number'} />
                        <p className="text-danger">{errors.Ticket?.message}</p>
                        <p className="text-danger">{errors.root?.message}</p>
                        <button className="btn btn-primary mx-auto d-block mt-3" >Book</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingModel