import prisma from "@/util/db";
import { NextResponse } from "next/server";
const crypto = require("crypto");

export const POST = async (req) => {
	try {
		console.log("hello login");
		const { email, password } = await req.json();

		const user = await prisma.$queryRaw`
        SELECT password FROM user WHERE email=${email}
        `;
		console.log(user);

		if (!user[0]) {
			return NextResponse.json({ message: "No user Exists", error }, { status: 404 });
		}
		const inputString = password;

		const hashPass = crypto.createHash("md5").update(inputString).digest("hex");

		if (user[0].password != hashPass) {
			return NextResponse.json(
				{ message: "Incorrect Password Error" },
				{ status: 401 }
			);
		}

		return NextResponse.json({ message: "OK" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
};