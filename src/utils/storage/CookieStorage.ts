import { ClientStorage } from "./ClientStorage";

export class CookieStorage implements ClientStorage {
  public set(key: string, value: any, ttl: number = 0): void {
    const chunks: string[] = [];
    try {
      chunks.push(`${key}=${JSON.stringify(value)}`);
    } catch (error) {
      throw new TypeError(`Failed to stringify storage value.`);
    }
    if (ttl > 0) {
      const date = new Date();
      date.setTime(date.getTime() + ttl);
      chunks.push("expires=" + date.toUTCString());
    } else {
      chunks.push("expires=Fri, 31 Dec 9999 23:59:59 GMT");
    }
    chunks.push("path=/");
    document.cookie = chunks.join("; ");
  }

  public get(key: string | RegExp): any {
    const cookies = document.cookie.split("; ");
    if (typeof key === "string") {
      const cookie = cookies.find((cookie: string) => {
        return cookie.startsWith(`${key}=`);
      });
      if (!cookie) {
        return null;
      }
      return JSON.parse(cookie.split("=")[1]);
    }
    return cookies
      .filter((cookie: string) => {
        return key.test(cookie.split("=")[0]);
      })
      .map((cookie: string) => {
        const [key, value] = cookie.split("=");
        return { key, value: JSON.parse(value) };
      });
  }

  public delete(key: string): void {
    document.cookie = [
      `${key}=`,
      `expires=Thu, 01 Jan 1970 00:00:01 GMT`,
      `path=/`,
    ].join("; ");
  }

  public refresh(key: string, ttl: number = 0): void {
    const value = this.get(key);
    if (!value) {
      return;
    }
    this.set(key, value, ttl);
  }
}
