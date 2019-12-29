declare module 'factory-girl' {
  type DefineProperty<T> = () => T

  function define<T>(
    name: string,
    model: any,
    attrs: {
      [P in keyof T]: (() => T[P]) | T[P] | Promise<T[P]> | (() => Promise<T[P]>)
    }
  ): void;

  function build<T>(
    name: string,
    attrs?: Partial<T>
  ): Promise<T>;

  function buildMany<T>(
    name: string,
    count: number,
    attrs?: Partial<T>
  ): Promise<Array<T>>;

  function sequence<T>(
    name: string,
    generator: (i: number) => T,
  )
}
