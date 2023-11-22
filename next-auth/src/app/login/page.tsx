"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
    const [loginRequest, setLoginRequest] =  useState(
        {
          "email":"",
          "password":""
        }
      )
    
      const handleChange = (e: { target: { name: any; value: any; }; })=>{
        setLoginRequest({...loginRequest, [e.target.name]:e.target.value})
      }
      
    
      const LoginUser = async ()=>{
      
        try {
          const res = await axios.post("/api/users/login", loginRequest);
          console.log("Login Success", res.data);
          router.push("/profile")
        } catch (error : any) {
          console.log("Login failed", error.message);
        }finally{
          setLoginRequest(
            {
              "email":"",
              "password":""
            }
          )
          }

      }
  return (
    <div className="flex flex-row justify-center items-center h-[100vh] bg-gradient-to-r from-[#b6cdf2] to-[#3252e3]">
        <div className=" flex flex-col border-[10px] w-[400px] h-[500px] mr-[2%] bg-[#EFEAE2] border-[#FFFFFF] rounded-[20px] text-[#2C2987] left-resp-850px p-[20px]">
        <div className='flex flex-col gap-y-[20px]'>
            <p className='font-bold text-[50px]'>Login</p>
            <div className="flex flex-col justify-between gap-y-[15px]">
            <input placeholder="Enter your email" type="email" className="p-[10px] text-[20px] rounded-[10px] border-[4px] border-[#b9cceb]" name="email" value={loginRequest.email} onChange={handleChange}/>
            <input placeholder="Enter your password" type="password" className="p-[10px] text-[20px] rounded-[10px] border-[4px] border-[#b9cceb]" name="password" value={loginRequest.password} onChange={handleChange} />
            <button className="p-[10px] text-[20px] rounded-[30px] bg-[#f294ad] text-white font-bold hover:bg-[#ed668a]" onClick={LoginUser}> Login</button>
            <div className='self-end text-[15px]'>
                <Link href={'/signup'}>
                <p>New User?</p>
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

export default Login