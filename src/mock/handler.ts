import {rest} from "msw";


interface User {
    key: number;
    email: string;
    password: string;
}

const users = <User[]>[
    {
        key: 0,
        email: "test@test.com",
        password: "qwer1234",
    },
];

export const handlers = [
    rest.post("/login", (req, res, ctx) => {
        const {email, password} = <User>req.body;

        const checkEmail = users.filter((v) => v.email === email);
        if (!checkEmail.length) return res(ctx.status(201), ctx.json("email"));

        const checkPassword = users.filter((v) => v.password === password);
        if (!checkPassword.length)
            return res(ctx.status(201), ctx.json("password"));

        return res(ctx.status(200), ctx.json({email: email}));
    }),


    rest.get("/test", (req,res,ctx) => {
        return res(ctx.status(200), ctx.json(users))
    })

];
