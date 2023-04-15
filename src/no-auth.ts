import { setupGoogleButton } from './google-onetap';

export function setupNoAuth(element: HTMLDivElement) {
  element.innerHTML = `<h3>This is a basic example on how to enable Google One Tap Authentication in a web page</h3>

  <p>To proceed with testing the authentication flow, <b>follow the prompt shown in the top right corner of the page.</b></p>

  <p>The Google One Tap flow is configured to automatically show the prompt in the right top corner, auto-select the current Google Account if you are already logged in with Google and proceed with the authentication flow automatically if you have done it before and your Google account allows it.</p>
  <div id="google">
 
  <div id="link-login">
    <p><b>If no prompt appears just click the button bellow to start the authentication flow:</b></p>
    <div id="buttonDiv"></div>
  </div>
  </div>`;

  setupGoogleButton(document.querySelector<HTMLDivElement>('#link-login')!);
}
