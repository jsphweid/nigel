import Store from "electron-store";

import { Button } from "../shared/types";
import { ButtonUpdater, ButtonMover, ButtonsGetter } from "../shared/services";

const store = new Store();
const buttonsStorageKey = "buttons";

export const saveNewButtons = (buttons: Button.Button[]) =>
  store.set(buttonsStorageKey, buttons);

export const getPersistedButtons = (): Button.Button[] =>
  store.get(buttonsStorageKey);

export const setup = () => {
  ButtonsGetter.handle(() => Promise.resolve(getPersistedButtons()));
  ButtonUpdater.handle(update => {
    const buttons = getPersistedButtons().slice();
    const indexOfButton = buttons.findIndex(button => button.id === update.id);
    if (indexOfButton < 0) {
      return Promise.reject(
        "Could not find the button you are trying to update."
      );
    }
    buttons[indexOfButton] = { ...buttons[indexOfButton], ...update };
    saveNewButtons(buttons);
    return Promise.resolve(buttons);
  });
  ButtonMover.handle(({ button, destinationKey, destinationTabID }) => {
    const buttonsClone = getPersistedButtons().slice();
    const sourceIndex = buttonsClone.findIndex(b => b.id === button.id);
    const destinationActionIndex = buttonsClone.findIndex(
      b =>
        Button.isAction(b) &&
        b.keyboardKey === destinationKey &&
        b.tabID === destinationTabID
    );
    const destinationTabIndex = buttonsClone.findIndex(b => {
      return Button.isTab(b) && b.keyboardKey === destinationKey;
    });
    const destinationIndex = Math.max(
      destinationActionIndex,
      destinationTabIndex
    );
    if (sourceIndex > -1) {
      if (destinationIndex > -1) {
        const destinationButton = buttonsClone[destinationIndex];
        destinationButton.keyboardKey = button.keyboardKey;
        if (Button.isAction(destinationButton) && Button.isAction(button)) {
          destinationButton.tabID = button.tabID;
        }
      }
      const sourceButton = buttonsClone[sourceIndex];
      sourceButton.keyboardKey = destinationKey;
      if (Button.isAction(sourceButton)) {
        sourceButton.tabID = destinationTabID;
      }
    }
    return Promise.resolve(buttonsClone);
  });
};
