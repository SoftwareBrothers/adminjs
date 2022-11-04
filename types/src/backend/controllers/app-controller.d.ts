import { ActionRequest } from '../actions/action.interface';
export default class AppController {
    private _admin;
    private h;
    private currentAdmin;
    constructor({ admin }: {
        admin: any;
    }, currentAdmin: any);
    index(): Promise<string>;
    resourceAction({ params }: ActionRequest): Promise<string>;
    bulkAction({ params, query }: ActionRequest): Promise<string>;
    resource({ params }: ActionRequest): Promise<string>;
    recordAction({ params }: ActionRequest): Promise<string>;
    page({ params }: ActionRequest): Promise<string>;
    bundleComponents(): Promise<string>;
}
