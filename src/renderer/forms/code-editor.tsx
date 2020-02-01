import * as React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}: any) => (
  <Editor
    value={value}
    onValueChange={onChange}
    highlight={code => highlight(code, languages.js)}
    padding={10}
    style={{
      fontFamily: 'iosevka,consolas,"Fira code", "Fira Mono", monospace',
      fontSize: 14,
      backgroundColor: "#fafafa"
    }}
  />
);
