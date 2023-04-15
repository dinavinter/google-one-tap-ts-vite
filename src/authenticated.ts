import { authService, Jwt } from './state';

export function setupAuthenticated(element: HTMLDivElement) {
  authService.subscribe(
    ({ value, context }: { value: string; context: { id_token: Jwt } }) => {
      const { token, Json } = context.id_token || { Json: {} };
      element.style.display = value == 'authenticated' ? 'inline' : 'none';
      element.innerHTML = ` <h3>Looks like you have authenticated yourself!</h3>
  <p><b>Here is the info I recovered about your profile in your Google account:</b></p>
    ${populateTable(Json)}
  <p>Your raw token is:
   <blockquote><em id="raw-token">${token}</em></blockquote></p>
  <p>You can try to decode it by yourself in a webpage like <b><a href="https://jwt.io/">jwt.io</a></b> or <b><a href="https://jwt.ms/">jwt.ms</a></b>.</p>`;
    }
  );
}

function populateTable(identity: Record<string, object>) {
  const claims = () => {
    return Object.keys(identity).map(
      (key) => ` <tr>
    <td>${key}</td>
    <td>${identity[key]}</td>
  </tr>`
    );
  };

  return `<table id="token-table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr> 
  </thead>
  <tbody>
    ${claims()}
  </tbody>
  </table>
  `;
}
