import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';
import { setupNoAuth } from './no-auth';
import { setupAuthenticated } from './authenticated';
import { setupProperties } from './properties';
import { setupGoogleLogin } from './google-onetap';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="google-setup"> </div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1> Google One Tap</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    
    <div class="centered padding-top">
  
        <div id="no-auth" class="container"></div>
        <div id="authenticated" style="display:none"> </div>
        <div id="properties"></div>

    </div>
  </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
setupNoAuth(document.querySelector<HTMLDivElement>('#no-auth')!);
setupAuthenticated(document.querySelector<HTMLDivElement>('#authenticated')!);
setupProperties(document.querySelector<HTMLDivElement>('#properties')!);
setupGoogleLogin(document.querySelector<HTMLDivElement>('#google-setup')!);
