import {Button, Dimmer, Form} from "semantic-ui-react";
import {useForm, SubmitHandler} from "react-hook-form";
import {ChangeEvent, useEffect} from "react";
import {useLogin} from "@/api";
import useSession from "@/hooks/useSession";
import {MemberType} from "@/types/member";
import styled from "@emotion/styled";
import FormInput from "semantic-ui-react/dist/commonjs/collections/Form/FormInput";

export default function LoginForm() {
    const {register, handleSubmit, setValue, trigger, formState: {errors}} = useForm();
    const [GetSession, SetSession] = useSession();
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
            onSuccess: (data, variables, context) => {
                const {status, data: message} = data;
                if (status !== 200) {
                    return alert(message + ' error');
                }
                SetSession('user', message);
                console.log('getSession :: ',GetSession("user", ""))
                alert('성공');
                // navigate('/');
            },
            onError: () => { }
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="email"
                fluid
                icon='user'
                iconPosition='left'
                // label="email"
                placeholder="email"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("email", !!errors.email)}
            />
            <Input
                name="password"
                fluid
                // label="password"
                icon='lock'
                iconPosition='left'
                type="password"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("password", !!errors.password)}
            />
            <Button loading={isLoading} fluid primary type="submit">로그인</Button>
        </Form>
    )
}


const Input = styled(Form.Input)`
  margin-bottom: 2rem !important;
  text-align: left !important;
`