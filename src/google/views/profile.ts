import { authService } from '@google/service';
import type { AuthState } from '@google/service';
import { dumpJwt } from '@auth/jwt_debugger';

export function setupProfileContainer(element: HTMLDivElement) {
  authService.subscribe(({ value, context: { id_token } }: AuthState) => {
    console.log(id_token?.claims);
    element.style.display = value == 'authenticated' ? 'inline' : 'none';
    element.innerHTML = dumpJwt({ id_token });
  });
}
