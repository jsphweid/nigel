export enum OS {
  WINDOWS,
  MAC,
  LINUX,
  UNKNOWN
}

const getOS = () => {
  switch (process.platform) {
    case "darwin":
      return OS.MAC;
    case "win32":
      return OS.WINDOWS;
    case "linux":
      return OS.LINUX;
    default:
      return OS.UNKNOWN;
  }
};

export const thisOS = getOS();
