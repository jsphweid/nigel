import * as React from "react";
import { Form, Field } from "react-final-form";
import { Paper, Grid, Button as MaterialUIButton } from "@material-ui/core";

import CodeEditor from "./code-editor";
import * as Utilities from "../../shared/utilities";
import TextField from "./text-field";
import { Button, Execution } from "../../shared/types";
import { AddButtonFormProps } from "./add-button-form";

interface NewActionButtonEditableFields {
  name: string;
  code: { code: string; type: Execution.Type };
  icon?: string;
}

const validate = ({ name, code }: Partial<NewActionButtonEditableFields>) => {
  const errors: any = {};
  if (!name) {
    errors.title = "Required";
  }
  if (!code) {
    errors.code = "Required";
  }
  return errors;
};

interface Props extends AddButtonFormProps<Button.Action> {
  data: Button.NewButtonInitialData;
}

const AddActionButtonForm: React.SFC<Props> = ({ onSave, onCancel, data }) => (
  <div>
    <Form
      initialValues={{ name: "", icon: "" }}
      onSubmit={(formData: NewActionButtonEditableFields) =>
        onSave({
          ...data,
          id: Utilities.generateRandomID(),
          executionData: {
            type: formData.code.type,
            script: formData.code.code
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

export default AddActionButtonForm;
