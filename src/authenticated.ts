import { authService, Jwt } from './state';
import type { GoogleJwt, AuthState } from './state';
import { dumpJwt } from './google_token_debugger';
export function setupAuthenticated(element: HTMLDivElement) {
  authService.subscribe(({ value, context: { id_token } }: AuthState) => {
    console.log(id_token?.claims);

    element.style.display = value == 'authenticated' ? 'inline' : 'none';
    element.innerHTML = dumpJwt({ id_token });
  });
}
