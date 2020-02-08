const HelperV1 = ({ delayTime = 0.01 } = {}) => ({
  activate: appName => {
    const app = Application(appName);
    app.activate();
    const SystemEvents = Application("System Events");
    const appProcess = SystemEvents.processes.byName(appName);
    const appWindow = appProcess.windows[0];
    const actions = {
      clickMenuItems: menuItems => {
        if (menuItems.length < 2) {
          console.log("Cannot execute without at least 2 menu names.");
          return;
        }

        let handle = appProcess.menuBars[0].menuBarItems.byName(menuItems[0]);

        menuItems.slice(1).forEach(name => {
          delay(delayTime);
          handle = handle.menus[0].menuItems.byName(name);
        });

        delay(delayTime);
        handle.click();
        return actions;
      },
      checkCheckbox: name => {
        if (appWindow.checkboxes[name].value() === 0) {
          appWindow.checkboxes[name].click();
        }
        return actions;
      },
      uncheckCheckbox: name => {
        if (appWindow.checkboxes[name].value() === 1) {
          appWindow.checkboxes[name].click();
        }
        return actions;
      },
      toggleCheckbox: name => {
        appWindow.checkboxes[name].click();
        return actions;
      },
      clickButton: name => {
        appWindow.buttons[name].click();
        return actions;
      },
      spy: () => {
        console.log("-----ll");
        // console.log("----", Object.getOwnPropertyNames(appWindow));
        console.log(
          "getting buttons",
          JSON.stringify(appWindow.properties(), null, 2)
        );

        return actions;
      }
    };

    return actions;
  }
});
