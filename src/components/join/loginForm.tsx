import {ChangeEvent, useEffect} from "react";
import {Button, Form, Grid} from "semantic-ui-react";
import {useForm, SubmitHandler} from "react-hook-form";
import {MemberType} from "@/types/member";
import useSession from "@/hooks/useSession";
import useModals from "@/hooks/useModals";
import {AlertPortal} from "@/components/common";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";
import {useNavigate} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getLoginInfoAPI, postLoginAPI} from "@/api/member/login";
import {testKeys} from "@/types/queryKey";

export default function LoginForm() {
    const [member, setMember] = useRecoilState(memberState);
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm();
    const {isOpen, handleModal, message, handleMessage} = useModals();
    const {GetSession, SetSession} = useSession();
    const navigate = useNavigate();
    const refreshPage = () => window.location.reload();


    /* input validation */
    useEffect(() => {
        register("admin_id", {
            required: true,
            // pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        });
        register("password", {
            required: true,
            minLength: 4
        });
    }, [register]);

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue(name, value);
        await trigger(name.toString());
    }

    const checkErrorPoint = (name: string, isError: boolean) => {
        if (isError) {
            switch (name) {
                case "admin_id" :
                    return {content: "양식에 맞지 않습니다."}
                default :
                    return {content: "필수 입력입니다."}
            }
        }
        return false;
    }

    const {mutate, isLoading, isSuccess} = useMutation(postLoginAPI);

    const onSubmit: SubmitHandler<MemberType> = (inputs: MemberType) => {
        mutate(inputs, {
            /*
            * Response 있는 에러 && 500 미만인 에러들은 화면에서 처리
            * 그 이상의 에러는 에러화면으로 이동
            * */
            onError: (error: any) => {
                if (error.response) {
                    const {status, data} = error.response;
                    if (status >= 500) return navigate('/error')
                    handleMessage({
                        content: (data)
                    })
                    return handleModal(true);
                }
                return navigate('/error')
            },
            onSuccess: (data:any) => {
                const {data: token} = data;
                SetSession('user', token.data.accessToken);
                alert('로그인')
                refreshPage()
                // navigate('/')
            }
        })
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
                <Grid.Row>
                    <Grid.Column
                        as={Form.Input}
                        name="admin_id"
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder="email"
                        disabled={isLoading}
                        onChange={onChange}
                        error={checkErrorPoint("admin_id", !!errors.email)}
                        style={{fontSize: '16px'}}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column
                        as={Form.Input}
                        name="password"
                        fluid
                        icon='lock'
                        iconPosition='left'
                        type="password"
                        placeholder="password"
                        disabled={isLoading}
                        onChange={onChange}
                        error={checkErrorPoint("password", !!errors.password)}
                        style={{fontSize: '16px'}}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button loading={isLoading} disabled={isLoading} color="violet" fluid type="submit">로그인</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <AlertPortal message={message} isOpen={isOpen} handler={() => handleModal(false)}/>
        </Form>
    )
}

