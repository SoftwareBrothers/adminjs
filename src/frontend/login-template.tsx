import { getComponentHtml } from '../backend/utils/index.js'
import AdminJS from '../adminjs.js'
import LoginComponent from './components/login/index.js'

type LoginTemplateAttributes = {
  /**
   * action which should be called when user clicks submit button
   */
  action: string;
  /**
   * Error message to present in the form
   */
  errorMessage?: string;
}

const html = async (
  admin: AdminJS,
  { action, errorMessage }: LoginTemplateAttributes,
): Promise<string> => getComponentHtml(LoginComponent, { action, message: errorMessage }, admin)

export default html
