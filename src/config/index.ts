export enum ClientStorageType {
  COOKIE_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE,
}

const Config = {
  defaultLocale: "en",
  storageType: ClientStorageType.COOKIE_STORAGE,
};

export default Config;

export const getDotEnvConfiguration = () => {
  const configuration = {
    apiUrl: process.env.REACT_APP_API,
    baseUrl: process.env.REACT_APP_BASE_URL,
  };
  return configuration;
};
