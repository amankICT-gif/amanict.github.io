const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const chatLauncher = document.querySelector('.chat-launcher');
const chatPanel = document.querySelector('.chat-panel');
const chatClose = document.querySelector('.chat-close');
const chatMessages = document.querySelector('#chat-messages');

const chatAnswers = {
  'What does Aman focus on?': 'Aman focuses on defensive thinking, technical clarity, and continuous cybersecurity learning.',
  'What has Aman learned?': 'Aman has completed 28 TryHackMe rooms, covering pentesting, blue team operations, networking, AI security, and more.',
  'How can I get in touch?': 'Use the Contact tab or email hello@amanict.dev to start a conversation.'
};

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.tab, .site-nav a[data-tab]').forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    const target = tab.getAttribute('data-tab');
    const targetPanel = document.getElementById(target);

    if (!targetPanel) return;

    document.querySelectorAll('.tab').forEach((item) => {
      const isActive = item.getAttribute('data-tab') === target;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === target);
    });
    history.replaceState(null, '', `#${target}`);
    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const initialTab = window.location.hash.slice(1);
if (initialTab) {
  document.querySelector(`.tab[data-tab="${initialTab}"]`)?.click();
}

const toggleChat = (isOpen) => {
  chatPanel?.classList.toggle('is-open', isOpen);
  chatPanel?.setAttribute('aria-hidden', String(!isOpen));
  chatLauncher?.setAttribute('aria-expanded', String(isOpen));
};

chatLauncher?.addEventListener('click', () => toggleChat(!chatPanel.classList.contains('is-open')));
chatClose?.addEventListener('click', () => toggleChat(false));

document.querySelectorAll('.chat-prompts button').forEach((prompt) => {
  prompt.addEventListener('click', () => {
    const question = prompt.dataset.question;
    const answer = chatAnswers[question];
    if (!answer || !chatMessages) return;
    chatMessages.insertAdjacentHTML('beforeend', `<p class="chat-message user-message">${question}</p><p class="chat-message bot-message">${answer}</p>`);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});

document.querySelector('#year').textContent = '2016';