const tpl = {
  p: `<p>{{ content }}</p>`,
  li: `<li>{{ content }}</li>`
};

export function contentUpdate(data, target) {
  while (target.firstChild) {
    target.firstChild.remove();
  }
  if (typeof data !== 'string') {
    let _tpl = tpl[target.hasAttribute('data-template') && target.getAttribute('data-template') || 'p'];
    data.forEach((content) => {
      target.insertAdjacentHTML('beforeend', _tpl.replace('{{ content }}', content));
    });
  } else {
    target.insertAdjacentHTML('afterbegin', data);
  }
}
