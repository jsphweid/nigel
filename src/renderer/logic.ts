import { Button } from "../shared/types";

export const updateButton = (
  buttons: Button.Button[],
  update: Button.EditableFieldsUpdate
): Button.Button[] => {
  const indexOfButton = buttons.findIndex(button => button.id === update.id);
  buttons[indexOfButton] = { ...buttons[indexOfButton], ...update };
  return buttons;
};

export const moveButton = (
  buttons: Button.Button[],
  update: Button.MoveUpdate
) => {
  const { button, destinationKey, destinationTabID } = update;

  const sourceIndex = buttons.findIndex(b => b.id === button.id);
  const destinationActionIndex = buttons.findIndex(
    b =>
      Button.isAction(b) &&
      b.keyboardKey === destinationKey &&
      b.tabID === destinationTabID
  );
  const destinationTabIndex = buttons.findIndex(b => {
    return Button.isTab(b) && b.keyboardKey === destinationKey;
  });
  const destinationIndex = Math.max(
    destinationActionIndex,
    destinationTabIndex
  );
  if (sourceIndex > -1) {
    if (destinationIndex > -1) {
      const destinationButton = buttons[destinationIndex];
      destinationButton.keyboardKey = button.keyboardKey;
      if (Button.isAction(destinationButton) && Button.isAction(button)) {
        destinationButton.tabID = button.tabID;
      }
    }
    const sourceButton = buttons[sourceIndex];
    sourceButton.keyboardKey = destinationKey;
    if (Button.isAction(sourceButton)) {
      sourceButton.tabID = destinationTabID;
    }
  }
  return buttons;
};
