export const LINKS = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up/",
  servers: {
    find: (serverId: string) => `/servers/${serverId}`,
  },
};

export const ENDPOINTS = {
  servers: "/api/servers",
  uploadthing: "/api/uploadthing",
};
