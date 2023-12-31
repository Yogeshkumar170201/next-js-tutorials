import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {name, email, password} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {
                    error: "User already exist"
                },
                {
                    status:400
                }
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User(
            {
                name,
                email,
                password : hashedPassword
            }
        );

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser
            },
            {
                status:201
            }
        )

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