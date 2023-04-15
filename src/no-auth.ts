import { setupGoogleButton } from './google-onetap';
import { authService } from './state';

export function setupNoAuth(element: HTMLDivElement) {
  authService.subscribe((event: { value: string }) => {
    console.log(event);
    element.style.display = event.value == 'authenticated' ? 'none' : 'inline';
  });

  element.innerHTML = `

  <p>To proceed with testing the authentication flow, <b>follow the prompt shown in the top right corner of the page ☝️.</b> <br/> Or, use the google button 👇 </p>
 
  <div id="link-login" class="centered">
  </div>`;

  setupGoogleButton(document.querySelector<HTMLDivElement>('#link-login')!);
}
