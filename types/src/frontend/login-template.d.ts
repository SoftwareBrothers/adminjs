import AdminJS from '../adminjs';
declare type LoginTemplateAttributes = {
    /**
     * action which should be called when user clicks submit button
     */
    action: string;
    /**
     * Error message to present in the form
     */
    errorMessage?: string;
};
declare const html: (admin: AdminJS, { action, errorMessage }: LoginTemplateAttributes) => Promise<string>;
export default html;
