import { createMachine, interpret, assign } from '@xstate/fsm';
import type { StateFrom } from '@xstate/fsm';

export type GoogleCredntialResponse = {
  credential: string;
};

export type GoogleClaims = Record<string, object> & {
  name: string;
  picture: string;
};
export type GoogleJwt = Jwt & { claims: GoogleClaims };
export class Jwt {
  claims: Record<string, object>;
  constructor(public raw: string) {
    this.claims = Jwt.parseJwt(raw);
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
    ) as Record<string, object>;
  };
}

const authMachine = createMachine(
  {
    id: 'auth',
    context: {
      id_token: undefined as unknown as GoogleJwt,
    },
    initial: 'none',
    states: {
      none: {
        on: { GOOLE_CB: { target: 'authenticated', actions: ['setIdToken'] } },
      },
      authenticated: {},
    },
  },
  {
    actions: {
      setIdToken: assign({
        id_token: (_ctx: unknown, event: GoogleCredntialResponse) =>
          new Jwt(event.credential),
      }),
    },
  }
);

export const authService = interpret(authMachine).start();
export type AuthState = StateFrom<typeof authMachine>;
authService.subscribe((state: { value: any }) => {
  console.log(state.value);
});
