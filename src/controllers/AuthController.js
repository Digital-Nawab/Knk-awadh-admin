import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/UserModel";

export const authController = {
    async login(email, password, rememberMe = false) {
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

        // Persistent 30-day session if rememberMe, otherwise 1-day session
        const expiresIn = rememberMe ? "30d" : "1d";

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "knk_awadh_jwt_secret_key_2026_secure",
            { expiresIn }
        );

        return {
            token,
            rememberMe: Boolean(rememberMe),
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    },
};
