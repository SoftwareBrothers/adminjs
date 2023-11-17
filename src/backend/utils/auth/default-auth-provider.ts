import { AuthProviderConfig, AuthenticatePayload, BaseAuthProvider, LoginHandlerOptions } from './base-auth-provider.js'

export interface DefaultAuthenticatePayload extends AuthenticatePayload {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultAuthProviderConfig extends AuthProviderConfig<DefaultAuthenticatePayload> {}

export class DefaultAuthProvider extends BaseAuthProvider {
  protected readonly authenticate

  constructor({ authenticate }: DefaultAuthProviderConfig) {
    super()
    this.authenticate = authenticate
  }

  override async handleLogin(opts: LoginHandlerOptions, context) {
    const { data = {} } = opts
    const { email, password } = data

    return this.authenticate({ email, password }, context)
  }
}
