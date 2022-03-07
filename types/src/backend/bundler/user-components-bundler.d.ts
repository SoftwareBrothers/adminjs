declare const outPath: string;
declare function build(admin: any, { write, watch }?: {
    write?: boolean | undefined;
    watch?: boolean | undefined;
}): Promise<string>;
export { build as default, outPath, };
