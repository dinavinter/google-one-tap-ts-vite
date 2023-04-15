import { authService } from './state';

export function setupGoogleLogin(element: HTMLDivElement) {
  // let element = document.createElement('div');
  // element.setAttribute('id', 'google-setup');
  (window as any).onGoogleSignIn = ({ credential }: { credential: string }) => {
    authService.send({ type: 'GOOLE_CB', credential: credential });
  };

  var script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  const client_id =
    '837888262468-mmhoc2t6afsnsu1vadflf4qu7vqm307s.apps.googleusercontent.com';
  const context = 'use';
  const ux_mode = 'popup';
  const itp_support = 'true';
  const callback = 'onGoogleSignIn';
  const login_url = '';

  element.innerHTML = `   
  <div id="g_id_onload" data-client_id="${client_id}" data-context="${context}" data-ux_mode="${ux_mode}" data-callback="${callback}" data-itp_support="${itp_support}" login_url=${login_url}>
  </div>
  
  `;
  // document.querySelector<HTMLDivElement>('#app')!.appendChild(element);
}

export function setupGoogleButton(element: HTMLDivElement) {
  element.innerHTML = ` 
  <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline" data-text="continue_with" data-size="large" data-logo_alignment="left">
  </div>
  `;
}
