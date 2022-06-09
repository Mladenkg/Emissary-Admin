import { CookieStorage } from "./CookieStorage";
import { LocalStorage } from "./LocalStorage";
import { SessionStorage } from "./SessionStorage";
import Config from "../../config";

export enum ClientStorageType {
  COOKIE_STORAGE,
  LOCAL_STORAGE,
  SESSION_STORAGE,
}

export interface ClientStorage {
  set(key: string, value: any, ttl?: number): void;
  get(key: string): any;
  delete(key: string): void;
  refresh(key: string, ttl?: number): void;
}

export function ClientStorageFactory(type: ClientStorageType): ClientStorage {
  switch (type) {
    case ClientStorageType.COOKIE_STORAGE:
      return new CookieStorage();
    case ClientStorageType.LOCAL_STORAGE:
      return new LocalStorage();
    case ClientStorageType.SESSION_STORAGE:
      return new SessionStorage();
  }
}

class ClientStorageSingleton {
  public set(key: string, value: any, ttl?: number): void {
    return this.instance().set(key, value, ttl);
  }

  public get(key: string): any {
    return this.instance().get(key);
  }

  public delete(key: string): void {
    return this.instance().delete(key);
  }

  public refresh(key: string, ttl?: number): void {
    return this.instance().refresh(key, ttl);
  }

  private storage: ClientStorage | null = null;

  private instance(): ClientStorage {
    return this.storage !== null
      ? this.storage
      : (this.storage = ClientStorageFactory(Config.storageType));
  }
}

export default new ClientStorageSingleton();
