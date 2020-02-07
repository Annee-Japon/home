import '../styles/index.scss';
import animate from './animate';
import i18n, { updatePageContent, i18nIsEnabled } from './i18n';

window.addEventListener('DOMContentLoaded', () => {
  if (i18nIsEnabled) {
    i18n().then((currentTranslation) => {
      updatePageContent(currentTranslation);
      animate();
    });
  } else {
    animate();
  }
});
