import * as React from "react";
import Modal from "react-modal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { Button } from "../../shared/types";
import AddActionButtonForm from "./add-action-button-form";
import AddTabButtonForm from "./add-tab-button-form";

export interface AddButtonFormProps<T extends Button.Button> {
  onSave: (data: T) => void;
  onCancel: () => void;
  data: Button.NewButtonInitialData | null;
}

const AddButtonForm = (props: AddButtonFormProps<Button.Button>) => {
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
        return <AddActionButtonForm {...props} data={data} />;
      case Button.Type.Tab:
        return <AddTabButtonForm {...props} data={data} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={!!data}
      onRequestClose={props.onCancel}
      contentLabel="Add Button"
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Button Type</FormLabel>
        <RadioGroup
          value={type}
          onChange={thing => setType(thing.currentTarget.value)}
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
