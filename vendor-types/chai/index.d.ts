declare namespace Chai {
  type AlterOptions = {
    from: any;
    to: any;
    by?: any;
  }

  interface Assertion {
    alter: (value: () => any, options?: AlterOptions) => Chai.Assertion;
    calledOnce: (value: () => any, options?: AlterOptions) => Chai.Assertion;
    calledWith: (...args: any[]) => Chai.Assertion;
    called: Assertion;
  }
}
