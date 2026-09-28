import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/UserModel";

export const authController = {
    async login(email, password) {
        if (!email || !password) {
            return { error: "Email and password are required", status: 422 };
        }

        const user = await UserModel.findByEmail(email);
        if (!user) {
            return { error: "Invalid email or password", status: 401 };
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return { error: "Invalid email or password", status: 401 };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    },
};