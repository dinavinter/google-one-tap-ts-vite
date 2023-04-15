import { authService } from './state';

export function setupAuthenticated(element: HTMLDivElement) {
  authService.subscribe(({ value }: { value: string }) => {
    if (value == 'authenticated') {
      setDisplay();
    }
  });

  const setDisplay = () => {
    element.style.display = 'inline';
  };
  element.innerHTML = ` <h3>Looks like you have already authenticated yourself!</h3>
  <p><b>Here is the info I recovered about your profile in your Google account:</b></p>
  <table id="token-table">
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <p>Your raw token is: <blockquote><em id="raw-token"></em></blockquote></p>
  <p>You can try to decode it by yourself in a webpage like <b><a href="https://jwt.io/">jwt.io</a></b> or <b><a href="https://jwt.ms/">jwt.ms</a></b>.</p>`;
}
