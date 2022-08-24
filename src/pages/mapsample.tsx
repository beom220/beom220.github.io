import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {useSession} from "@/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginAPI} from "@/api";
import {Box, CardActions, CardContent, Container, Divider, styled, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {useEffect} from "react";

interface IFormInput {
    admin_id: string;
    password: string;
}

export default function MapSample() {
    const navigate = useNavigate();
    const {SetSession} = useSession();
    const {mutate, isLoading} = useMutation(loginAPI);

    const schema = yup.object({
        admin_id: yup.string().required().matches(/^(a-zA-Z\d)/),
        password: yup.string().required(),
    }).required();

    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInput> = (formData) => {
        mutate(formData, {
            onSuccess: (data) => {
                const {data: token} = data;
                // SetSession('auth', token.accessToken);
                // navigate('/test')
                alert('로그인')
            },
            onError: (error:any) => {
                if(error.response.status >= 500){
                    return alert('위험')
                }
                alert('로그인 실패')
            }
        })
    }

    return (
        <LoginContainer>
            <LoginCard>
                <Typography p={3} variant="h3" component="div" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <TextField
                            sx={{mb: 3}}
                            fullWidth
                            label="ID"
                            error={errors.admin_id?.type === 'required' || errors.admin_id?.type === 'matches'}
                            {...register("admin_id")}
                            helperText={!errors.admin_id ? "ID를 입력해주세요" : "필수 입력입니다."}
                        />
                        <TextField
                            fullWidth
                            label="PASSWORD"
                            type="password"
                            error={errors.password?.type === 'required'}
                            {...register("password")}
                            helperText={!errors.password ? "PASSWORD를 입력해주세요" : "필수 입력입니다."}
                        />
                    </CardContent>

                    <Divider/>

                    <CardActions>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            로그인
                        </LoadingButton>
                    </CardActions>
                </form>
            </LoginCard>
        </LoginContainer>
    )
}


const LoginContainer = styled(Container)(({theme}) => ({
    backgroundColor: "#6f3ee7",
    transition: "all ease 0.5s 0s",

    [theme.breakpoints.up("xs")]: {
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        padding: 0,
        margin: 0,
        height: "100vh",
        overflow: "hidden",
    },
}));

const LoginCard = styled(Box)(({theme}) => ({
    borderRadius: "12px",
    transition: "all ease 0.5s 0s",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    [theme.breakpoints.down("sm")]: {
        backgroundColor: "white",
        width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
        backgroundColor: "white",
        width: "500px",
        minWidth: "500px",
    },
}));