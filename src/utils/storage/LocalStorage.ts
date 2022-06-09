import { WindowStorage } from "./WindowStorage";

export class LocalStorage extends WindowStorage {
  protected readonly storage = window.localStorage;
}
