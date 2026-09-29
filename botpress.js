'use strict';

// From Botpress: open the bot → Webchat → Deploy Settings → Embed code.
// botId and clientId are the two values inside window.botpress.init({ ... }).
const BOTPRESS = { botId: 'a44d98b9-9671-41a4-a173-fa6872282d17', clientId: '764e9124-2a78-4cf3-b1b8-425a724a8b2d' };

// The widget lives in a shadow root, so page CSS cannot reach it.
// Below 768px Botpress opens the chat at full viewport size.
const CHAT_STYLE = `
.bpWebchat {
  width: 360px !important;
  max-width: calc(100vw - 32px) !important;
  height: min(520px, calc(100dvh - 120px)) !important;
  max-height: min(520px, calc(100dvh - 120px)) !important;
  top: auto !important;
  left: auto !important;
  right: 16px !important;
  bottom: 96px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
}
.bpWebchat #webchat-root,
.bpWebchat .bpHeightFull,
.bpWebchat .bpContainer {
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
}
`;

function pinChatWindow() {
  const host = document.getElementById('fab-root');
  const shadow = host && host.shadowRoot;
  if (!shadow || shadow.getElementById('ducat-chat-size')) return false;
  const style = document.createElement('style');
  style.id = 'ducat-chat-size';
  style.textContent = CHAT_STYLE;
  shadow.appendChild(style);
  return true;
}

window.addEventListener('load', () => {
  if (!BOTPRESS.botId || !BOTPRESS.clientId || !window.botpress?.init) return;
  window.botpress.init({
    botId: BOTPRESS.botId,
    clientId: BOTPRESS.clientId,
    configuration: {
      botName: 'Ducat',
      color: '#3B6FD8',
      variant: 'solid',
      themeMode: 'light',
      fontFamily: 'inter'
    }
  });
  const started = Date.now();
  const timer = setInterval(() => {
    if (pinChatWindow() || Date.now() - started > 15000) clearInterval(timer);
  }, 200);
  window.botpress.on?.('webchat:opened', pinChatWindow);
});
