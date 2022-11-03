type UserComponentsMap = {[key: string]: string}

declare namespace NodeJS {
  interface Global {
    THEME: {
      Components: UserComponentsMap | null;
    } | null;
    RegisteredAdapters: Array<any> | null;
  }
}
