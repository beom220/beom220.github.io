import '@toast-ui/editor/dist/toastui-editor.css'; // editor css
import '@toast-ui/editor/dist/i18n/ko-kr' // region
import 'tui-color-picker/dist/tui-color-picker.css'; // color-picker-ui
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'; // color-syntax-css-plugin
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import {Editor} from '@toast-ui/react-editor';
import {ChangeEvent, FormEvent,  useEffect, useRef, useState} from "react";
import {Button, Divider, Form, Segment, Dropdown} from "semantic-ui-react";
import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProductTopics} from "@/api/product/product";
import {queryKeys} from "@/types/queryKey";

interface PostDataTypes {
    title: string | undefined;
    content: string | undefined;
    category: string | number | boolean | (string | number | boolean)[] | undefined;
}

export default function ToastEditor() {
    const navigate = useNavigate();
    const [postData, setPostData] = useState<PostDataTypes>({
        title: '',
        content: '',
        category:''
    })
    const initSelectOption = [{
        key:0,
        value:'옵션',
        text:'옵션'
    }]
    const [selectOption, setSelectOption] = useState(initSelectOption);

    const gotoBack = (): void => {
        navigate(-1);
    }
    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPostData({
            ...postData,
            title: e.target.value
        })
    }
    const onChangeContent = () => {
        setPostData({
            ...postData,
            content: editorRef.current?.getInstance().getHTML()
        })
    }

    // editor control
    const editorRef = useRef<Editor>(null);

    const {data, isLoading} = useQuery(
        queryKeys.products_topics,
        () => getProductTopics(),
        {staleTime: 60 * 1000}
    );
    useEffect(() => {
        if (data) {
            setSelectOption(data.map((v:string, i:number) => {
                return {
                    key:i,
                    value:v,
                    text:v
                }
            }));
        }
    }, [data])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const data = editorRef.current?.getInstance().getHTML();
        console.log(postData);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Dropdown
                placeholder='카테고리'
                fluid
                search
                selection
                options={selectOption}
                loading={isLoading}
                onChange={(event, data) => {
                    console.log(data.value);
                    setPostData({...postData, category:data.value})
                }}
            />
            <Segment vertical>
                <Form.Input
                    placeholder="제목을 입력해주세요"
                    value={postData.title}
                    style={{fontSize: '16px'}}
                    onChange={onChangeValue}
                />
                <Editor
                    ref={editorRef}
                    language="ko-KR"
                    height="auto"
                    initialEditType="wysiwyg"
                    // hideModeSwitch // 에디터 모드 off
                    initialValue={postData.content}
                    onChange={onChangeContent}
                    plugins={[
                        colorSyntax,
                    ]}
                />
                <Divider hidden/>
                <div style={{textAlign: "right"}}>
                    <Button type="button" onClick={gotoBack}>뒤로가기</Button>
                    <Button type="submit" primary>확인</Button>
                </div>
            </Segment>
        </Form>
    )
}