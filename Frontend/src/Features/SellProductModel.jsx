import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"
import { lazy } from 'react'
import useFetch from '../hooks/useFetch.js'
import { apiCall } from '../utils/apiCall.js'
const FormInput = lazy(() => import('../components/FormInput'));

const SellProductForm = ({ setSellModel, toast }) => {

    const queryClient = useQueryClient();

    const navigate = useNavigate()

    const { data: isUserLogin } = useFetch(['auth'], { url: '/auth/is-auth' })

    const { mutate } = useMutation({
        mutationFn: (details) => apiCall({ url: '/sell-product' }, 'post', details),
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Sell Request sent Successfully", { autoClose: 2000 })
                queryClient.invalidateQueries({ queryKey: ['user'] });
                setSellModel(false)
            }
            setError("root", { message: data.message })
        }
    })

    const schema = yup.object().shape({
        Name: yup.string().required("Title is required"),
        Description: yup.string().required("Description is required"),
        Price: yup.number().typeError("Price is Required").required("Price is required"),
        Image: yup.mixed().test("fileSize", `File is too large (less than 300kb)`, (file) => {
            return file && file[0].size <= 300000
        }).test("fileType", "Only PNG or JPG files are allowed", (file) => {
            return file && ["image/png", "image/jpg", "image/jpeg"].includes(file[0]?.type)
        }).required("Image is required"),
        Stock: yup.number().typeError("Stock is Required").required("Stock is required"),
    })

    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (details) => {
        const formData = new FormData();
        formData.append('title', details.Name);
        formData.append('description', details.Description);
        formData.append('price', details.Price);
        formData.append('stock', details.Stock);
        formData.append('Image', details.Image[0]);
        if (isUserLogin) {
            mutate(formData)
        } else {
            alert('login to submit');
            navigate('/login')
        }
    }

    return (
        <div className='model shadow p-2'>
            <div className="card col-8 col-lg-4">
                <div className=" card-header d-flex justify-content-between">
                    <h1 className='text-center mb-3'>Add Product</h1>
                    <button className="btn-close" onClick={() => setSellModel(false)}></button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='card-body'>
                    <p className="text-danger">Please upload a clear image.</p>
                    <FormInput register={register} name={'Name'} type={'text'} />
                    <p className="text-danger">{errors.Name?.message}</p>
                    <FormInput register={register} name={'Description'} type={'text'} />
                    <p className="text-danger">{errors.Description?.message}</p>
                    <FormInput register={register} name={'Price'} type={'number'} />
                    <p className="text-danger">{errors.Price?.message}</p>
                    <FormInput register={register} name={'Stock'} type={'text'} />
                    <p className="text-danger">{errors.Stock?.message}</p>
                    <FormInput register={register} name={'Image'} type={'file'} />
                    <p className="text-danger">{errors.Image?.message}</p>
                    <p className="text-danger">{errors.root?.message}</p>

                    <button className="btn btn-primary mx-auto d-block my-3">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SellProductForm