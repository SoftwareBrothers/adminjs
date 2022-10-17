type UserComponentsMap = {[key: string]: string}

declare namespace NodeJS {
  interface Global {
    UserComponents: UserComponentsMap | null;
    THEME: {
      Components: UserComponentsMap | null;
    } | null;
    RegisteredAdapters: Array<any> | null;
  }
}
