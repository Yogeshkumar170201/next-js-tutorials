import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {
                    error: "User doesn't exist"
                },
                {
                    status:400
                }
            )
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        
        if(!validPassword){
            return NextResponse.json(
                {
                    error: "Invalid Password"
                },
                {
                    status:400
                }
            )
        }

        const tokenData = {
            id: user._id,
            name:user.name,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const res = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        res.cookies.set("token", token, {
            httpOnly: true
        })
        return res;

    } catch ( error : any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}