import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, lazy } from 'react'
import { toast } from 'react-toastify'
import SideBar from '../../layout/SideBar.jsx'
import { apiCall } from '../../utils/apiCall.js'
const FormInput = lazy(() => import('../../components/FormInput.jsx'));

const AddProductForm = () => {

    const [preview, setPreview] = useState("")
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (details)=>apiCall({url:'/product'},'post',details),
        onSuccess: (data) => {
            if (data.success) {
                reset()
                setPreview("")
                toast.success("Product added Successfully")
                queryClient.invalidateQueries({ queryKey: ['products'] })
            }
            setError("root",{message:data.message})

        }
    })

    const schema = yup.object().shape({
        Title: yup.string().required("Title is required"),
        Description: yup.string().required("Description is required"),
        Price: yup.number().required("Price is required"),
        Image: yup.mixed().test("fileSize", "File is too large", (file) => {
            return file && file[0].size <= 10 * 1000 * 1000
        }).test("fileType", "Only PNG or JPG files are allowed", (file) => {
            return file && ["image/png", "image/jpg", "image/jpeg"].includes(file[0]?.type)
        }).required("Image is required"),
        Stock: yup.number().required("Stock is required"),
    })

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (details) => {
        const formData = new FormData();
        formData.append('Title', details.Title);
        formData.append('Description', details.Description);
        formData.append('Price', details.Price);
        formData.append('Stock', details.Stock);
        formData.append('Image', details.Image[0]);
        mutate(formData)
    }

    return (
        <div className='row m-0 align-items-center'>
            <SideBar/>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='col col-lg-6 p-2 mx-auto'>
                <h1 className='text-center mb-3'>Add Product</h1>
                <FormInput register={register} name={'Title'} type={'text'} />
                <p className="text-danger">{errors.Title?.message}</p>
                <FormInput register={register} name={'Description'} type={'text'} />
                <p className="text-danger">{errors.Description?.message}</p>
                <FormInput register={register} name={'Price'} type={'number'} />
                <p className="text-danger">{errors.Price?.message}</p>
                <FormInput register={register} name={'Stock'} type={'text'} />
                <p className="text-danger">{errors.Stock?.message}</p>
                {preview && <img src={preview} className='my-2 d-block' alt="" width={100} height={70} />}
                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" {...register("Image")} name="Image" id="image" className="form-control" onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
                <p className="text-danger">{errors.Image?.message}</p>
                <p className="text-danger">{errors.root?.message}</p>

                <button className="btn btn-primary mx-auto d-block my-3" disabled={isPending}>{isPending ? "Uploading" : "Add"}</button>
            </form>
        </div>
    )
}

export default AddProductForm