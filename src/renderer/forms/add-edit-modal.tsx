import * as React from "react";
import Modal from "react-modal";

import { Button } from "../../shared/types";
import EditActionButtonForm from "./edit-action-button-form";
import EditTabButtonForm from "./edit-tab-button-form";
import AddButtonForm from "./add-button-form";

export interface AddEditModalProps<T> {
  onSave: (data: Button.Button) => void;
  onCancel: () => void;
  data: T;
}

const isNewButton = (
  data: Button.NewButtonInitialData | Button.Button
): data is Button.NewButtonInitialData => !(data as any).id;

const AddEditModal = (
  props: AddEditModalProps<Button.Button | Button.NewButtonInitialData | null>
) => {
  let content: any;

  const data = props.data;

  if (data) {
    if (isNewButton(data)) {
      content = <AddButtonForm {...props} data={data} />;
    } else if (Button.isAction(data)) {
      content = <EditActionButtonForm {...props} data={data} />;
    } else if (Button.isTab(data)) {
      content = <EditTabButtonForm {...props} data={data} />;
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={!!data}
      onRequestClose={props.onCancel}
      contentLabel="Edit Button"
    >
      {content}
    </Modal>
  );
};

export default AddEditModal;
