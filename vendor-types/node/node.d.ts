type UserComponentsMap = {[key: string]: string}

declare namespace NodeJS {
  interface Global {
    UserComponents: UserComponentsMap | null;
    RegisteredAdapters: Array<any> | null;
  }
}
