import {rest} from "msw";

export const handlers = [
    rest.post("/admin/login", (req, res, ctx) => {
        const {admin_id, password} = req.body as any;
        if(admin_id === 'admin' && password === '000000'){
            return res(ctx.status(200), ctx.json({
                success: true
            }))
        }
        return res(ctx.status(400), ctx.json({
            success: false
        }))
    })
];
