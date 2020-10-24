declare namespace Chai {
  type AlterOptions = {
    from: any;
    to: any;
    by?: any;
  }

  interface Assertion {
    alter: (value: () => any, options?: AlterOptions) => Chai.Assertion;
  }
}
