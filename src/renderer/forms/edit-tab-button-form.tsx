import * as React from "react";
import { Form, Field } from "react-final-form";
import { Paper, Grid, Button as MaterialUIButton } from "@material-ui/core";

import * as Utilities from "../../shared/utilities";
import TextField from "./text-field";
import { Button } from "../../shared/types";
import { AddEditModalProps } from "./add-edit-modal";

interface NewTabButtonEditableFields {
  name: string;
  icon?: string;
}

const validate = ({ name }: Partial<NewTabButtonEditableFields>) => {
  const errors: any = {};
  if (!name) {
    errors.title = "Required";
  }
  return errors;
};

type Props = AddEditModalProps<Button.Tab | Button.NewButtonInitialData>;

const AddTabButtonForm: React.SFC<Props> = ({ onSave, onCancel, data }) => (
  <div>
    <Form
      initialValues={{
        name: Button.isTab(data) ? data.name : "",
        icon: Button.isTab(data) ? data.icon || "" : ""
      }}
      onSubmit={(formData: NewTabButtonEditableFields) =>
        onSave({
          ...data,
          id: Button.isTab(data) ? data.id : Utilities.generateRandomID(),
          name: formData.name,
          type: Button.Type.Tab,
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

export default AddTabButtonForm;
