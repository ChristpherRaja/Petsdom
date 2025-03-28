import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import avatar from '../assets/avatar-3814081_1920.png'
import useFetch from '../hooks/useFetch'
import { apiCall } from '../utils/apiCall'
import { toast, ToastContainer } from 'react-toastify'

const EditProfile = () => {

    const queryClient = useQueryClient()

    const [preview, setPreview] = useState("")
    const [profileModelState, setProfilModelState] = useState(false)

    const fileRef = useRef()

    const { data: user } = useFetch(['user'], { url: '/user' })

    const { mutate, isPending } = useMutation({
        mutationFn: (details) => apiCall({ url: '/user' }, 'put', details),
        onSuccess: () => {
            toast.success("Profile updated!", { autoClose: 2000 });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setPreview("");
        },
        onError: (data) => {
            setError("root", { message: data.message })
        }
    })

    const { mutate: removeAvatar } = useMutation({
        mutationFn: () => apiCall({ url: '/remove-avatar' }, 'delete'),
        onSuccess: () => {
            toast.success("Profile Picture Removed", { autoClose: 2000 });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is required"),
        Image: yup.mixed().test("fileSize", "File is too large", (file) => {
            return file && file.size <= 10 * 1024 * 1024;
        }).test("fileType", "Only PNG or JPG files are allowed", (file) => {
            return file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
        }),
    });

    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (details) => {
        const formData = new FormData()
        formData.append('name', details.name)
        formData.append('email', details.email)
        if (details.Image) {
            formData.append('Image', details.Image)
        }
        mutate(formData)
    }

    const handleProfileChange = () => {
        if (fileRef.current) {
            fileRef.current.click();
            setProfilModelState(false);
        }
    }

    const handleDelete = () => {
        removeAvatar()
        setProfilModelState(false)
    }

    const handleUpload = (e) => {
        const img = e.target.files[0];
        setPreview(URL.createObjectURL(img));
        if (img) {
            setValue("Image", img)
        }
    }

    return (
        <div className='container my-3'>
            <h1 className='text-center'>Edit Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className=''>
                <div className="profile-container position-relative" onClick={() => setProfilModelState(true)}>
                    <img src={preview || user?.data.avatar && import.meta.env.VITE_BASE_URL + user?.data.avatar || avatar} alt="" className="rounded-circle d-block mx-auto border" width={150} height={150} />
                    <i className="bi-pencil h1 position-absolute top-50 start-50 translate-middle "></i>
                </div>
                <input type="file" className='visually-hidden' ref={fileRef} onChange={handleUpload} name="Image" />
                <input type="hidden" {...register('Image')} />
                <p className="text-danger">{errors.Image?.message}</p>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" {...register('name')} className='form-control' defaultValue={user?.data.name} placeholder='Enter your Name' />
                <p className="text-danger">{errors.name?.message}</p>
                <label htmlFor="name" className="form-label">Email</label>
                <input type="text" {...register('email')} className='form-control' defaultValue={user?.data.email} placeholder='Enter your Email' />
                <p className="text-danger">{errors.email?.message}</p>
                <p className="text-danger">{errors.root?.message}</p>

                <button className="btn btn-primary mx-auto d-block my-3" disabled={isPending}>{isPending ? "Updating" : "Update"}</button>
            </form>
            {profileModelState && <div className='model'>
                <div className="card col-4 p-2 text-center">
                    <button className="btn-close h6 ms-auto" onClick={() => setProfilModelState(false)}></button>
                    <p className="" onClick={handleProfileChange}>Change Profile Picture</p>
                    {user?.data.avatar && <p onClick={handleDelete} className='text-danger'>Remove Profile Picture</p>}
                </div></div>}
            <ToastContainer />
        </div>
    )
}

export default EditProfile