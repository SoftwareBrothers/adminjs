declare module 'factory-girl' {
  function define<T>(
    name: string,
    model: any,
    attrs: T,
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
