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
}
