import * as React from "react";
import { Form, Field } from "react-final-form";
import { Paper, Grid, Button as MaterialUIButton } from "@material-ui/core";

import CodeEditor from "./code-editor";
import * as Utilities from "../../shared/utilities";
import TextField from "./text-field";
import { Button, Execution } from "../../shared/types";
import { AddEditModalProps } from "./add-edit-modal";
import * as Languages from "./languages";

interface ActionButtonEditableFields {
  name: string;
  code: { code: string; type: Execution.Type };
  icon?: string;
}

export interface Code {
  code: string;
  type: Execution.Type;
}

const validate = ({ name, code }: Partial<ActionButtonEditableFields>) => {
  const errors: any = {};
  if (!name) {
    errors.title = "Required";
  }
  if (!code) {
    errors.code = "Required";
  }
  return errors;
};

type Props = AddEditModalProps<Button.NewButtonInitialData | Button.Action>;

const initialSample = Languages.all.find(
  l => l.type === Execution.Type.AppleScript
) as Languages.Language;

const EditActionButtonForm: React.SFC<Props> = ({ onSave, onCancel, data }) => (
  <div>
    <Form
      initialValues={{
        name: Button.isAction(data) ? data.name : "",
        icon: Button.isAction(data) ? data.icon || "" : "",
        code: Button.isAction(data)
          ? { code: data.executionData.content, type: data.executionData.type }
          : { code: initialSample.sample, type: initialSample.type }
      }}
      onSubmit={(formData: ActionButtonEditableFields) =>
        onSave({
          ...data,
          id: Button.isAction(data) ? data.id : Utilities.generateRandomID(),
          executionData: {
            type: formData.code.type,
            content: formData.code.code
          },
          name: formData.name,
          type: Button.Type.Action,
          icon: formData.icon || null
        })
      }
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Paper style={{ padding: 16 }}>
            <Grid container={true} alignItems="flex-start" spacing={8}>
              <Grid item={true} xs={4}>
                <Field
                  fullWidth={true}
                  required={true}
                  name="name"
                  component={TextField}
                  type="text"
                  label="Button Name"
                />
              </Grid>
              <Grid item={true} xs={8}>
                <Field
                  fullWidth={true}
                  required={false}
                  name="icon"
                  component={TextField}
                  type="text"
                  label="Icon URL"
                />
              </Grid>
              <Grid item={true} xs={12}>
                <Field
                  fullWidth={true}
                  required={true}
                  name="code"
                  component={CodeEditor}
                />
              </Grid>
              <Grid item={true}>
                <MaterialUIButton
                  type="button"
                  variant="contained"
                  onClick={onCancel}
                >
                  Cancel
                </MaterialUIButton>
              </Grid>
              <Grid item={true}>
                <MaterialUIButton
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </MaterialUIButton>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  </div>
);

export default EditActionButtonForm;
