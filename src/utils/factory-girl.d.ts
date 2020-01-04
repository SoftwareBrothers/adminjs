declare module 'factory-girl' {
  type DefineProperty<T> = () => T

  type FactoryOptions<T> = {
    afterBuild?: (model: T, attrs: FactoryAttrs<T>, buildOptions: any) => T | Promise<T>;
  }

  type FactoryAttrs<T> = {
    [P in keyof T]: (() => T[P]) | T[P] | Promise<T[P]> | (() => Promise<T[P]>)
  }

  function define<T>(
    name: string,
    model: any,
    attrs: FactoryAttrs<T>,
    options?: FactoryOptions<T>
  ): void;

  function extend<T>(
    parent: string,
    name: string,
    attrs: Partial<FactoryAttrs<T>>,
    options?: FactoryOptions<T>
  ): void;

  function build<T>(
    name: string,
    attrs?: Partial<FactoryAttrs<T>>
  ): Promise<T>;

  function buildMany<T>(
    name: string,
    count: number,
    attrs?: Partial<T>
  ): Promise<Array<T>>;

  function sequence<T>(
    name: string,
    generator?: (i: number) => T,
  )
}
