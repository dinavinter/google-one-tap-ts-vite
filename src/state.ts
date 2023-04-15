import { createMachine, interpret } from '@xstate/fsm';
import type { StateFrom } from '@xstate/fsm';
class Jwt {
  JSON: object;
  constructor(public token: string) {
    this.JSON = Jwt.parseJwt(token);
  }

  static parseJwt = (token: string) => {
    const b64DecodeUnicode = (str: string) =>
      decodeURIComponent(
        Array.prototype.map
          .call(
            atob(str),
            (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          )
          .join('')
      );

    return JSON.parse(
      b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/'))
    );
  };
}

const authMachine = createMachine({
  id: 'auth',
  context: {
    google_identity: undefined as typeof Jwt | undefined,
  },
  initial: 'none',
  states: {
    none: { on: { GOOLE_CB: 'authenticated' } },
    authenticated: {},
  },
});

export const authService = interpret(authMachine).start();
export type AuthState = StateFrom<typeof authMachine>;
authService.subscribe((state: { value: any }) => {
  console.log(state.value);
});
