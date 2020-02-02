import * as React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-applescript";
import "prismjs/components/prism-bash";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import * as Languages from "./languages";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  div:first-child {
    margin-right: 24px;
  }
  div:last-child {
    flex-grow: 1;
  }
`;

export default ({ input: { onChange, value } }: any) => {
  const [language, setLanguage] = React.useState(Languages.all[2]);
  const [displaySample, setDisplaySample] = React.useState(!value);

  return (
    <Container>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={e => {
            setDisplaySample(true);
            setLanguage(e.target.value as any);
          }}
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
        value={displaySample ? value?.code || language.sample : value?.code}
        onValueChange={code => {
          setDisplaySample(false);
          onChange({ code, type: language.type });
        }}
        highlight={code => highlight(code, languages[language.prism])}
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
