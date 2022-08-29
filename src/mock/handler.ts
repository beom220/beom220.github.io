import {rest} from "msw";
import {MemberType} from "@/types/member";
import {products, categories} from "@/mock/product";
import {members} from "@/mock/members";
import alliance from "@/mock/alliance"


export const handlers = [
    rest.get("/alliance/:id", (req, res, ctx) => {
        const id = String(req.params.id);

        const rows = alliance.filter((value) => {
            return value.objectId === id
        })

        if(!rows.length){
            return res(ctx.status(200), ctx.json('자료가없다'))
        }
        return res(ctx.status(200), ctx.json(rows[0]))
    }),

    rest.get("/alliance", (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page'));
        const sort = req.url.searchParams.get('sort');
        const limit = Number(req.url.searchParams.get('limit'));
        const name = req.url.searchParams.get('name');
        const tag = req.url.searchParams.get('tag');

        if (!page && !sort && !limit && !name && !tag) {
            return res(ctx.status(200), ctx.json(alliance))
        }

        // name 으로 검색시
        if (name) {
            const rows = alliance.filter((value) => {
                if (value.name.includes(name)) return value;
                if (value.category.includes(name)) return value;
                if (value.address.includes(name)) return value;
                return false;
            })

            return res(ctx.status(200), ctx.json(
                {
                    rows: rows.slice(limit * (page), limit * (page + 1)),
                    totalPage: Math.ceil(rows.length / limit)
                }
            ))
        }

        if (tag) {
            if (tag === '전체') {
                return res(ctx.status(200), ctx.json(
                    {
                        rows: alliance.slice(limit * (page), limit * (page + 1)),
                        totalPage: Math.ceil(alliance.length / limit)
                    }
                ))
            }
            const rows = alliance.filter((value) => {
                if (value.category.includes(tag)) return value;
                return false;
            })
            return res(ctx.status(200), ctx.json(
                {
                    rows: rows.slice(limit * (page), limit * (page + 1)),
                    totalPage: Math.ceil(rows.length / limit)
                }
            ))
        }

        return res(ctx.status(200), ctx.json(
            {
                rows: alliance.slice(limit * (page), limit * (page + 1)),
                totalPage: Math.ceil(alliance.length / limit)
            }
        ))
    }),
    
    rest.get('/product/:id', (req, res, ctx) => {
        const result = products.filter((v) => v.id === String(req.params.id))

        if (!result.length) return res(ctx.status(404), ctx.json("요청한 자료를 찾을 수 없습니다."))
        return res(ctx.status(200), ctx.json(result[0]))
    }),

    rest.get('/products', (req, res, ctx) => {
        // return res(ctx.status(200), ctx.json(products))
        const category = req.url.searchParams.get('category');

        if (category === "전체") {
            const row = products.slice(0).sort((a,b) =>
                (new Date(a.openAt).getTime() - new Date(b.openAt).getTime()) * -1);
            return res(ctx.status(200), ctx.json(row))
        }

        if(!categories.includes(category as string)){
            return res(ctx.status(404), ctx.json('잘못된 요청입니다.'))
        }

        const row = products.filter(v => v.category === category).slice(0).sort((a,b) =>
            (new Date(a.openAt).getTime() - new Date(b.openAt).getTime()) * -1);

        if (!row.length)
            return res(ctx.status(200), ctx.json([]))

        return res(ctx.status(200), ctx.json(row))
    }),

    rest.post("/login", (req, res, ctx) => {
        const {email, password} = req.body as MemberType;

        const checkEmail = members.filter((v) => v.email === email);
        if (!checkEmail.length) return res(ctx.status(401), ctx.json("해당 이메일로 가입된 정보가 없습니다."));

        const checkPassword = members.filter((v) => v.password === password);
        if (!checkPassword.length)
            return res(ctx.status(401), ctx.json("비밀번호가 틀렸습니다."));

        return res(ctx.status(200), ctx.json({email: email}));
    }),

    rest.post('/register', (req, res, ctx) => {
        const {email, password} = req.body as MemberType;
        const checkEmail = members.filter((v) => v.email === email);
        if (!!checkEmail.length) return res(ctx.status(201), ctx.json("이미 사용하고있는 이메일입니다."));

        const newKey = Number(members[members.length - 1].key) + 1;
        members.push({
            key: newKey,
            email: email,
            password: password
        })

        return res(ctx.status(200), ctx.json({email: email}));
    }),


    rest.get("/test", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(members))
    })

];
