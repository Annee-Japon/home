const contentTpl = `<p>{{ content }}</p>`;

export function contentUpdate(data, target) {
  while (target.firstChild) {
    target.firstChild.remove();
  }
  if (typeof data !== 'string') {
    data.forEach((content) => {
      target.insertAdjacentHTML('beforeend', contentTpl.replace('{{ content }}', content));
    });
  } else {
    target.insertAdjacentHTML('afterbegin', data);
  }
}
