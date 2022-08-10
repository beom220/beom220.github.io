import '@toast-ui/editor/dist/toastui-editor.css'; // editor css
import '@toast-ui/editor/dist/i18n/ko-kr' // region
import 'tui-color-picker/dist/tui-color-picker.css'; // color-picker-ui
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'; // color-syntax-css-plugin
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import {Editor} from '@toast-ui/react-editor';
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {Button, ButtonGroup, Divider, Form, Grid, Segment} from "semantic-ui-react";
import {EditorType} from "@toast-ui/editor";

interface PostDataTypes {
    title: string | undefined;
    content: string | undefined;
}

export default function ToastEditor() {
    const [postData, setPostData] = useState<PostDataTypes>({
        title: '',
        content: ''
    })

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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const data = editorRef.current?.getInstance().getHTML();

        console.log(postData);
    }
    return (
        <Form onSubmit={onSubmit}>
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
                    hideModeSwitch // 에디터 모드 off
                    initialValue={postData.content}
                    onChange={onChangeContent}
                    plugins={[
                        colorSyntax,
                    ]}
                />
                <Divider hidden/>
                <div style={{textAlign: "right"}}>
                    <Button type="button">뒤로가기</Button>
                    <Button type="submit" primary>확인</Button>
                </div>
            </Segment>
        </Form>
    )
}