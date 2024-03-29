import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer';

interface EditorProps {
    lenguage: any;
    children: any;
}

const Editor = ({ lenguage, children }: EditorProps) => {


  return (
   <Highlight { ...defaultProps } code={ children } language={ "javascript" } >
       {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
   </Highlight>
  )
}

export default Editor