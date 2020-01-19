const HelperV1 = ({ delayTime = 0.01 } = {}) => ({
  activate: appName => {
    const app = Application(appName);
    app.activate();
    return {
      clickMenuItems: menuItems => {
        const SystemEvents = Application("System Events");
        const process = SystemEvents.processes.byName(appName);

        if (menuItems.length < 2) {
          console.log("Cannot execute without at least 2 menu names.");
          return;
        }

        let handle = process.menuBars[0].menuBarItems.byName(menuItems[0]);

        menuItems.slice(1).forEach(name => {
          delay(delayTime);
          handle = handle.menus[0].menuItems.byName(name);
        });

        delay(delayTime);
        handle.click();
      }
    };
  }
});
