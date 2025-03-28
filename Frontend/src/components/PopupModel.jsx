import avatar from '../assets/avatar-3814081_1920.png'

const PopupModel = ({ model, head, handleModelEdit, setModelState }) => {
  return (
    <div className='model '>
      <div className="card col-8">
      <div className="card-header d-flex justify-content-between" >
          <h1 className=" fs-5" >{model.title || model.name}</h1>
          <button type="button" className="btn-close" onClick={() => setModelState(false)}></button>
        </div>
        <div className="card-body d-flex justify-content-evenly gap-2">
          <img className='rounded' src={!(model.avatar || model.image) ? avatar : import.meta.env.VITE_BASE_URL + (model?.image ||  model.avatar)} alt="" width={model.image ? 170 : 150} height={150} />
          <div className="content ">
            {head.map((item,index)=><p key={index}>{item !== "Image" && model[item.toLowerCase()]}</p>)}
            <button className="btn btn-danger ms-1" data-bs-dismiss="model" onClick={() => handleModelEdit(model._id, model.role)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupModel