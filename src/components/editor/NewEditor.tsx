import React, { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';


const codeSnippets = `
 import axios from "axios";

 const getUser = () => {
    return axios.get('https://randomuser.me.api');
 };

`

const styles: any = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira code", monospace ',
        ...theme.plain
    }
};

const HighlightElement = (code: string ) => (

    <Highlight {...defaultProps} code={code} theme={theme} language='tsx' >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
                {
                    tokens.map((line, i) => (
                        <div {...getLineProps({ line:line, key:i })}>
                            {line.map((token, key) =>
                                <span {...getTokenProps({ token, key })} />
                            )}
                        </div>
                    ))
                }
            </Fragment>
        )}
    </Highlight>
);


export const NewEditor = ({children}: any ) => {

    const [code, setCode] = useState(children !== " "  ? children : codeSnippets);

    const handleChange = (newCode: string) => {
      setCode(newCode);
    };

    return (
        <Editor
            value={code}
            onValueChange={handleChange}
            style={styles.root}
            highlight={HighlightElement}
            padding={10}
        />
    )
};