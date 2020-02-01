import * as React from "react";
import { Form, Field } from "react-final-form";
import { Paper, Grid, Button as MaterialUIButton } from "@material-ui/core";
import Modal from "react-modal";
import CodeEditor from "./code-editor";

import TextField from "./text-field";
import { Button } from "../../shared/types";

const validate = ({ name, code }: Button.NewButtonFields) => {
  const errors: any = {};
  if (!name) {
    errors.title = "Required";
  }
  if (!code) {
    errors.code = "Required";
  }
  // TODO: add type
  return errors;
};

interface AddActionButtonFormProps {
  onSave: (data: Button.Button) => void;
  onCancel: () => void;
  data: Button.NewButtonFields | null;
}

const AddButtonForm: React.SFC<AddActionButtonFormProps> = ({
  onSave,
  onCancel,
  data
}: AddActionButtonFormProps) =>
  data ? (
    <Modal
      ariaHideApp={false}
      isOpen={!!data}
      onRequestClose={onCancel}
      contentLabel="Add Button"
    >
      <div>
        <Form
          onSubmit={onSave}
          validate={validate}
          initialValues={{ name: data.name, icon: data.icon, code: data.code }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Paper style={{ padding: 16 }}>
                <Grid container={true} alignItems="flex-start" spacing={8}>
                  <Grid item={true} xs={12}>
                    <Field
                      fullWidth={true}
                      required={true}
                      name="name"
                      component={TextField}
                      type="text"
                      label="Button Name"
                    />
                  </Grid>
                  <Grid item={true} xs={12}>
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
    </Modal>
  ) : null;

export default AddButtonForm;
