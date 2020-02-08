import * as React from "react";
import Modal from "react-modal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { Button } from "../../shared/types";
import EditActionButtonForm from "./edit-action-button-form";
import EditTabButtonForm from "./edit-tab-button-form";
import { AddEditModalProps } from "./add-edit-modal";

const AddButtonForm = (
  props: AddEditModalProps<Button.NewButtonInitialData>
) => {
  const [type, setType] = React.useState<Button.Type | string>(
    Button.Type.Action
  );

  if (!props.data) {
    return null;
  }

  const data = props.data;

  const renderForm = () => {
    switch (type) {
      case Button.Type.Action:
        return <EditActionButtonForm {...props} data={data} />;
      case Button.Type.Tab:
        return <EditTabButtonForm {...props} data={data} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={!!data}
      onRequestClose={props.onCancel}
      contentLabel="Edit Button"
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Button Type</FormLabel>
        <RadioGroup
          value={type}
          onChange={thing => setType(thing.currentTarget.value)}
          row={true}
        >
          <FormControlLabel
            value={Button.Type.Action}
            control={<Radio />}
            label="Action Button"
          />
          <FormControlLabel
            value={Button.Type.Tab}
            control={<Radio />}
            label="Tab Button"
          />
        </RadioGroup>
      </FormControl>
      {renderForm()}
    </Modal>
  );
};

export default AddButtonForm;
