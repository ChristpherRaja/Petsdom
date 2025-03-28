import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { lazy } from 'react';
import { apiCall } from '../utils/apiCall';
const FormInput = lazy(() => import('../components/FormInput'));

const AddressModel = ({ cartTotal, setAddressModel }) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (details) => apiCall({ url: '/checkout' }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['cart'] })
                alert(`Payment of ${cartTotal()}$ done successfully. Your Order will be Delivered Soon`)
                navigate('/')
            } else {
                alert(data.message)
            }
        }
    })

    const addressMutate = useMutation({
        mutationFn: (details) => apiCall({ url: '/address' }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ['user'] })
                mutate({ address: data.data, total: cartTotal() })
                setAddressModel(false)
            }
            setError('root', { message: data.response.data.message })
        },
        onError: (error) => {
            setError('root', { message: error.message })
        }
    })

    const schema = yup.object().shape({
        DoorNo: yup.string().required('Door number is required'),
        Street: yup.string().required('Street is required'),
        City: yup.string().required('City is required'),
        State: yup.string().required('State is required'),
        PinCode: yup.number().typeError('Pin code must be a number').required('Pin code is required').min(100000, 'Pin code must be at least 6 digits').max(999999, 'Pin code must be at most 6 digits'),
        Mobile: yup.number().typeError('Mobile number must be a number').required('Mobile number is required').min(1000000000, 'Mobile number must be at least 10 digits').max(9999999999, 'Mobile number must be at most 10 digits')
    })

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (details) => {
        if (confirm(`Confirm to Pay ${cartTotal()}$`)) {
            addressMutate.mutate(details)
        }
    }

    return (
        <div className=" model "  >
            <div className="card col-8 col-lg-4">
                <div className="card-header d-flex justify-content-between">
                    <h1 className="card-title fs-5" >Enter Address</h1>
                    <button type="button" className="btn-close" onClick={() => setAddressModel(false)}></button>
                </div>
                <div className="card-body d-flex justify-content-evenly">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput register={register} name={'DoorNo'} />
                        <p className="text-danger">{errors.DoorNo?.message}</p>
                        <FormInput register={register} name={'Street'} />
                        <p className="text-danger">{errors.Street?.message}</p>
                        <FormInput register={register} name={'City'} />
                        <p className="text-danger">{errors.City?.message}</p>
                        <FormInput register={register} name={'State'} />
                        <p className="text-danger">{errors.State?.message}</p>
                        <FormInput register={register} name={'PinCode'} type={'number'} />
                        <p className="text-danger">{errors.PinCode?.message}</p>
                        <FormInput register={register} name={'Mobile'} type={'number'} />
                        <p className="text-danger">{errors.Mobile?.message}</p>
                        <p className="text-danger">{errors.root?.message}</p>
                        <button className="btn btn-primary mx-auto d-block mt-3" disabled={isPending}>{isPending ? "Submitting" : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressModel