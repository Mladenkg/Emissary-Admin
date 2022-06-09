import { ClientStorage } from "./ClientStorage";

export abstract class WindowStorage implements ClientStorage {
  protected abstract readonly storage: Storage;

  public set(key: string, value: any, ttl: number = 0): void {
    try {
      this.storage.setItem(
        key,
        JSON.stringify({
          value,
          expires: ttl > 0 ? Date.now() + ttl : 0,
        })
      );
    } catch (error) {
      throw new TypeError(`Failed to stringify storage value.`);
    }
  }

  public get(key: string | RegExp): any {
    if (typeof key === "string") {
      const item = this.storage.getItem(key);
      if (item === null) {
        return null;
      }
      const { value, expires } = JSON.parse(item);
      if (expires && expires < Date.now()) {
        this.delete(key);
        return null;
      }
      return value;
    }
    const items = [];
    for (var i = 0; i < this.storage.length; ++i) {
      const storageKey = this.storage.key(i) as string;
      if (key.test(storageKey)) {
        const item = this.storage.getItem(storageKey);
        if (item === null) {
          continue;
        }
        const { value, expires } = JSON.parse(item);
        if (expires && expires < Date.now()) {
          this.delete(storageKey);
          continue;
        }
        items.push({ key: storageKey, value });
      }
    }
    return items;
  }

  public delete(key: string): void {
    this.storage.removeItem(key);
  }

  public refresh(key: string, ttl: number = 0): void {
    const value = this.get(key);
    if (!value) {
      return;
    }
    this.set(key, value, ttl);
  }
}
