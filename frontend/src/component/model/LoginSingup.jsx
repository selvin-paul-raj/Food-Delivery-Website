import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFacebookOption, GrGithub, GrGooglePlus } from "react-icons/gr";
import { AuthContext } from "../../context/AuthProvider";
import CustomModal from "./CustomModal"; // Import the custom modal
import { Link, useNavigate } from "react-router-dom";

const LoginSignup = () => {
    const { googlelogin, login, error, setError, createUser ,isModalOpen, setIsModalOpen,model, setModel,facebookLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const handleModelChange = (modelName) => {
        setModel(modelName);
        setError(null);
        reset();
    };

    const onSubmitLoginForm = async (data) => {
        await login(data.email, data.password);
        navigate("/");
    };

    const onSubmitSignupForm = async (data) => {
        await createUser(data.name,data.email, data.password);
        navigate("/");
    };

   

    return (
        <>
            <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={model === "login" ? "Please Login" : "Please Signup"}>
                <form onSubmit={model === "login" ? handleSubmit(onSubmitLoginForm) : handleSubmit(onSubmitSignupForm)} className="">

                {model !=="login" && (
                         <div className="flex flex-col gap-2">
                         <label className="mt-2">Name</label>
                         <input
                             type="text"
                             placeholder="Enter Your Name"
                             className="input input-bordered"
                             {...register("name", { required: "Name is required" })}
                         />
                         {errors.name && <p className="text-red text-sm">{errors.name.message}</p>}
                     </div>
                    )}


                    <div className="flex flex-col gap-2">
                        <label className="mt-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="input input-bordered"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red text-sm">{errors.email.message}</p>}
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="mt-4">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            autoComplete="off"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red text-sm">{errors.password.message}</p>}
                    </div>

                    {error && <p className="text-red font-semibold text-sm mt-3">{error}</p>}
                    {model === "login" && <p className="text-sm mt-4"><Link to="">Forget Password?</Link></p>}

                    <button type="submit" className="btn bg-green w-full text-white mt-5">
                        {model === "login" ? "Login" : "Signup"}
                    </button>

                    <p className="mt-5 text-textColor text-center">
                        {model === "login" ? "Don't have an account?" : "Have an Account?"}
                        <span className="text-red underline font-medium ml-1 cursor-pointer" onClick={() => handleModelChange(model === "login" ? "signup" : "login")}>
                            {model === "login" ? "Signup" : "Login"}
                        </span>
                    </p>
                </form>


            </CustomModal>
        </>
    );
};

export default LoginSignup;
