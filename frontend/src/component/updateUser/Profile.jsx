import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';

const Profile = () => {
    const { updateUser, user } = useContext(AuthContext);  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
     
      updateUser(data.email,data.name,data.phone,data.gender,data.photo)
    };
  
    return (
      <div className="flex items-center justify-center py-28 ">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered"
                {...register("name")}
                defaultValue={user?.name}
              />
            </div>
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="input input-bordered"
                {...register("email")}
                defaultValue={user?.email}
                readOnly
              />
            </div>
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile No</span>
              </label>
              <input
                type="number"
                placeholder="Enter Your Mobile Number"
                className="input input-bordered"
                {...register("phone")}
                defaultValue={user?.phone}
              />
            </div>
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("gender")}  defaultValue={user?.gender}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                {...register("photo")}
              />
            </div>
  
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Profile
