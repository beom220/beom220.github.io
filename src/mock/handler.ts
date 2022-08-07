import {rest} from "msw";
import {MemberType} from "@/types/member";
import {products} from "@/mock/product";

const users = <MemberType[]>[
    {
        key: 0,
        email: "test@test.com",
        password: "qwer1234",
    },
    {
        key: 1,
        email: "qwer@qwer.com",
        password: "qwer1234",
    },
];


export const handlers = [
    rest.get('/product/:id', (req, res, ctx) => {
        const result = products.filter((v) => v.id === String(req.params.id))

        if(!result.length) res(ctx.status(404), ctx.json("요청한 자료를 찾을 수 없습니다."))
        return res(ctx.status(200), ctx.json(result[0]))
    }),

    rest.get('/products', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products))
    }),

    rest.post("/login", (req, res, ctx) => {
        const {email, password} = <MemberType>req.body;

        const checkEmail = users.filter((v) => v.email === email);
        if (!checkEmail.length) return res(ctx.status(401), ctx.json("해당 이메일로 가입된 정보가 없습니다."));

        const checkPassword = users.filter((v) => v.password === password);
        if (!checkPassword.length)
            return res(ctx.status(401), ctx.json("비밀번호가 틀렸습니다."));

        return res(ctx.status(200), ctx.json({email: email}));
    }),

    rest.post('/register', (req, res, ctx) => {
        const {email, password} = <MemberType>req.body;
        const checkEmail = users.filter((v) => v.email !== email);
        if (!!checkEmail.length) return res(ctx.status(201), ctx.json("이미 사용하고있는 이메일입니다."));

        const newKey = Number(users[users.length - 1].key) + 1;
        users.push({
            key: newKey,
            email: email,
            password: password
        })

        return res(ctx.status(200), ctx.json({email: email}));
    }),


    rest.get("/test", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users))
    })

];
