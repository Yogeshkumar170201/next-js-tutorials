"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
    const [registerRequest, setRegisterRequest] =  useState(
        {
          "name":"",
          "email":"",
          "password":""
        }
      )
    
      const handleChange = (e: { target: { name: any; value: any; }; })=>{
        setRegisterRequest({...registerRequest, [e.target.name]:e.target.value})
      }
      
    
      const registerUser = async ()=>{
        try {
          const res = await axios.post('/api/users/signup', registerRequest);
          console.log(res.data)
          router.push('/login');
        } catch (error: any) {
          console.log("Signup failed", error.message);
          toast.error(error.message);
        }finally{
          setRegisterRequest(
            {
              "name":"",
              "email":"",
              "password":""
            }
          );
        }
      }
  return (
    <div className="flex flex-row justify-center items-center h-[100vh] bg-gradient-to-r from-[#b6cdf2] to-[#3252e3]">
        <div className=" flex flex-col border-[10px] h-[500px] w-[400px] mr-[2%] bg-[#EFEAE2] border-[#FFFFFF] rounded-[20px] text-[#2C2987] left-resp-850px p-[20px]">
        <div className='flex flex-col gap-y-[20px]'>
            <p className='font-bold text-[50px]'>Register</p>
            <div className="flex flex-col justify-between gap-y-[15px]">
            <input placeholder="Enter your name" type="text" className="p-[10px] text-[20px] rounded-[10px] rounded-[10px] border-[4px] border-[#b9cceb]" name="name" value={registerRequest.name} onChange={handleChange}/>
            <input placeholder="Enter your email" type="email" className="p-[10px] text-[20px] rounded-[10px] border-[4px] border-[#b9cceb]" name="email" value={registerRequest.email} onChange={handleChange}/>
            <input placeholder="Enter your password" type="password" className="p-[10px] text-[20px] rounded-[10px] border-[4px] border-[#b9cceb]" name="password" value={registerRequest.password} onChange={handleChange} />
            <button className="p-[10px] text-[20px] rounded-[30px] bg-[#f294ad] text-white font-bold hover:bg-[#ed668a]" onClick={registerUser}> Register</button>
            <div className='self-end text-[15px]'>
                <Link href={'/login'}>
                <p>Already Registered?</p>
                </Link>
                <Link href={'/forgotPassword'}>
                <p>Forgot password?</p>
                </Link>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Signup