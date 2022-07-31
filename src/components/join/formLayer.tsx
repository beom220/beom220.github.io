import {Button, Form} from "semantic-ui-react";
import {useForm, SubmitHandler} from "react-hook-form";
import {ChangeEvent, useEffect} from "react";
import {useLogin} from "@/api";
import useSession from "@/hooks/useSession";
import {MemberType} from "@/types/member";

export default function FormLayer() {
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
            <Form.Input
                name="email"
                fluid
                label="email"
                placeholder="email"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("email", !!errors.email)}
            />
            <Form.Input
                name="password"
                fluid
                label="password"
                placeholder="password"
                type="password"
                disabled={isLoading}
                onChange={onChange}
                error={checkErrorPoint("password", !!errors.password)}
            />
            <Button loading={isLoading} primary type="submit">Submit</Button>
        </Form>
    )
}
