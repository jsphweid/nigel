import * as React from "react";
import { Form, Field } from "react-final-form";
import { Paper, Grid, Button as MaterialUIButton } from "@material-ui/core";
import Modal from "react-modal";

import TextField from "./text-field";
import { Button } from "../../shared/types";

const validate = ({ name }: Button.EditableFields) => {
  const errors: any = {};
  if (!name) {
    errors.title = "Required";
  }
  return errors;
};

interface EditActionButtonFormProps<
  T extends Button.EditableFields = Button.EditableFields
> {
  onSave: (data: T) => void;
  onCancel: () => void;
  data: T | null;
}

const EditButtonNameForm: React.SFC<EditActionButtonFormProps> = ({
  onSave,
  onCancel,
  data
}: EditActionButtonFormProps) =>
  data ? (
    <Modal
      isOpen={!!data}
      onRequestClose={onCancel}
      contentLabel="Edit Basic Button Properties"
    >
      <div>
        <Form
          onSubmit={onSave}
          validate={validate}
          initialValues={{ name: data.name, icon: data.icon }}
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
                    <p>
                      Note: If you were thinking to change the content of the
                      scripts themselves, know that they are immutable. The way
                      to do that is to create a copy based on one.
                    </p>
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

export default EditButtonNameForm;
