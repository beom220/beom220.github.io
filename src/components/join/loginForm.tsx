import {Button, Form} from "semantic-ui-react";
import {useForm, SubmitHandler} from "react-hook-form";
import {ChangeEvent, useEffect} from "react";
import {useLogin} from "@/api";
import useSession from "@/hooks/useSession";
import {MemberType} from "@/types/member";
import useModals from "@/hooks/useModals";
import styled from "@emotion/styled";
import {AlertPortal} from "@/components/common";
import {useRecoilState} from "recoil";
import {memberState} from "@/app/member";
import {useNavigate} from "react-router";

export default function LoginForm() {
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm();
    const {isOpen, handleModal, message, handleMessage} = useModals();
    const {GetSession, SetSession} = useSession();
    const [member, setMember] = useRecoilState(memberState);
    const navigate = useNavigate();

    /* 로그인 유저라면 페이지 이동*/
    useEffect(() => {
        if(member) navigate('/');
    },[member])

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue(name, value);
        await trigger(name.toString());
    }

    useEffect(() => {
        register("email", {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        });
        register("password", {
            required: true,
            minLength: 4
        });
    }, []);

    const checkErrorPoint = (name: string, isError: boolean) => {
        if (isError) {
            switch (name) {
                case "email" :
                    return {content: "양식에 맞지 않습니다."}
                default :
                    return {content: "필수 입력입니다."}
            }
        }
        return false;
    }

    const {mutate, isLoading, isError, error, isSuccess} = useLogin();
    const onSubmit: SubmitHandler<MemberType> = (inputs: MemberType) => {
        mutate(inputs, {
            onSuccess: (data) => {
                const {status, data: message} = data;
                if (status !== 200) {
                    handleMessage({
                        content: (message + ' error')
                    })
                    return handleModal(true);
                }
                SetSession('user', message);
                setMember(GetSession('user'))
            },
            onError: () => {navigate('/error')},
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="email"
                fluid
                icon='user'
                iconPosition='left'
                placeholder="email"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("email", !!errors.email)}
            />
            <Input
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                type="password"
                placeholder="password"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("password", !!errors.password)}
            />
            <Button loading={isLoading} disabled={isLoading} color="violet" fluid type="submit">로그인</Button>
            <AlertPortal message={message} isOpen={isOpen} handler={() => handleModal(false)}/>
        </Form>
    )
}


const Input = styled(Form.Input)`
  margin-bottom: 2rem !important;
  text-align: left !important;
`