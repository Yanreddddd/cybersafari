"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
// Email and Password Requirements Parameters
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine(function (value) { return /[A-Z]/.test(value); }, {
        message: "Password must contain at least 1 capital letter",
    })
        .refine(function (value) { return /\d/.test(value); }, {
        message: "Password must contain at least 1 number",
    })
        .refine(function (value) { return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value); }, {
        message: "Password must contain at least 1 special character",
    }),
    // confirmPassword: z.string(), Confirm Password
});
