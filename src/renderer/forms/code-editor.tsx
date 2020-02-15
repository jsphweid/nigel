import * as React from "react";
import Editor from "react-simple-code-editor";
import {
  highlight,
  languages as prismLanguages
} from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-applescript";
import "prismjs/components/prism-bash";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import styled from "styled-components";
import { pipe } from "@grapheng/prelude";

import * as Languages from "./languages";
import { Code } from "./edit-action-button-form";

const Container = styled.div`
  display: flex;
  div:first-child {
    margin-right: 24px;
  }
  div:last-child {
    flex-grow: 1;
  }
`;

export default ({
  input: { onChange, value }
}: {
  input: { onChange: any; value: Code };
}) => {
  const language = React.useMemo(
    () => Languages.all.find(l => l.type === value.type),
    [value.type]
  );
  return (
    <Container>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={e =>
            pipe(e.target.value as Languages.Language, language =>
              onChange({ code: language.sample, type: language.type })
            )
          }
        >
          {Languages.all.map(lang => (
            <MenuItem key={lang.name} value={lang as any}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Type</FormHelperText>
      </FormControl>
      <Editor
        value={value.code}
        onValueChange={code => {
          onChange({ code, type: value.type });
        }}
        highlight={code =>
          highlight(code, prismLanguages[language?.prism || ""])
        }
        padding={10}
        style={{
          fontFamily: 'iosevka,consolas,"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: "#fafafa"
        }}
      />
    </Container>
  );
};
