import { contentUpdate } from './content';
import { reset, animateAll } from './animate';

const path = '/public/i18n';
export const i18nIsEnabled = 'fetch' in window;
if (!i18nIsEnabled) {
  document.body.classList.add('no-i18n');
}

export let currentLocale = localStorage.getItem('i18n-selected') || 'fr';

export function getTranslationFile(locale) {
  return fetch(`${path}/${locale}.json`).then((response) => response.json());
}

export function getTranslation(translation, path) {
  const _split = path.split('.');
  if (_split[0] in translation) {
    if (_split.length > 1) {
      return getTranslation(translation[_split[0]], _split.slice(1).join('.'));
    } else {
      return translation[_split[0]];
    }
  }
  return undefined;
}

export function updatePageContent(translation) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    contentUpdate(
      getTranslation(translation, element.getAttribute('data-i18n')),
      element
    );
  });
}

export default () => {
  // Initialize lang switcher.
  const langSwitcher = document.querySelector('[data-lang-switcher]');
  const langSwitcherOpen = document.querySelector('[data-lang-switcher-open]');
  langSwitcherOpen.addEventListener('click', () => {
    langSwitcher.classList.remove('closed');
    langSwitcherButtons.forEach((elt) => {
      elt.setAttribute('tabindex', 0);
    });
  });

  const langSwitcherButtons = document.querySelectorAll('[data-lang]');
  langSwitcherButtons.forEach((button) => {
    const lang = button.getAttribute('data-lang');
    if (currentLocale === lang) {
      button.classList.add('active');
    }
    button.addEventListener('click', (event) => {
      const lang = button.getAttribute('data-lang');
      langSwitcher.classList.add('closed');
      if (currentLocale !== lang) {
        langSwitcherButtons.forEach((elt) => {
          elt.classList[elt.getAttribute('data-lang') === lang ? 'add' : 'remove']('active');
          elt.setAttribute('tabindex', -1);
        });
        currentLocale = lang;
        localStorage.setItem('i18n-selected', lang);
        getTranslationFile(lang).then((file) => {
          reset();
          updatePageContent(file);
          setTimeout(() => animateAll(), 100);
        });
      }
    });
  });
  // Get current locale translation file.
  return getTranslationFile(currentLocale);
};
