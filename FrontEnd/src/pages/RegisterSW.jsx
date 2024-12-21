import React, { useEffect, useState } from "react";

import { useFirebase } from "../context/FirebaseSW";
import { useNavigate } from "react-router-dom";
import LoginLottie from "../components/lottie/login";
const RegisterPage = () => {
  const firebase = useFirebase();
  let navigate = useNavigate();
  // console.log(firebase);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing Up");
    const response = await firebase.signupwithEmailandPassword(email, password);
    console.log("SuccessFully Signed Up", response);
  }
  useEffect(() => {
    if (firebase.IsloggedIn) {
      navigate('/home');
    }
  }, [navigate, firebase])
  return (

    <div class="flex flex-col justify-center items-center font-[sans-serif]  md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-y-8 max-w-7xl w-full bg-slate-50 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] m-6 rounded-xl relative overflow-hidden">
        <div class="max-md:order-1  bg-gray-50 h-full">
          <LoginLottie/>
        </div>

        <div class="flex pt-20 p-6 max-w-md w-full h-full mx-auto">
          <form class="w-full">
            <div class="mb-12">
              <h3 class="text-blue-500 lg:text-3xl text-2xl font-extrabold max-md:text-center">Create an account</h3>
            </div>

            <div>
              <label class="text-gray-800 text-sm font-semibold block mb-3">Email</label>
              <div class="relative flex items-center">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="name" type="text" required class="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div>
              <label class="text-gray-800 text-sm font-semibold block mb-3 mt-3">Password</label>
              <div class="relative flex items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  name="name" type="password" required class="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div class="mt-12">
              <button
                onClick={handleSubmit}
                type="button" class="w-full shadow-xl py-3.5 px-8 text-sm tracking-wide font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white border focus:outline-none transition-all">
                SignUp Account
              </button>



            </div>
            <p class="text-gray-800 text-sm text-center mt-6">Don't have an account <a href="/" class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Have a Account?</a></p>
          </form>
        </div>
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400 max-sm:hidden"></div>
      </div>
    </div>
  );
}

export default RegisterPage;