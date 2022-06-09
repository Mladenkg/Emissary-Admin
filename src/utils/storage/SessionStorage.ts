import { WindowStorage } from "./WindowStorage";

export class SessionStorage extends WindowStorage {
  protected readonly storage = window.sessionStorage;
}
