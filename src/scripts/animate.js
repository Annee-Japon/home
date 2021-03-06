export default () => {
  // Animation on enter (page load or scroll, the first time only).
  if ('IntersectionObserver' in window) {
    const animatable = document.querySelectorAll('[data-animate]');
    animatable.forEach((element) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { root: null, threshold: [0.1] });
      observer.observe(element);
    });
  } else {
    document.body.classList.add('no-animation');
  }
};

export function reset() {
  const animatable = document.querySelectorAll('[data-animate]');
  animatable.forEach((element) => {
    element.classList.remove('animate');
  });
}

export function animateAll() {
  const animatable = document.querySelectorAll('[data-animate]');
  animatable.forEach((element) => {
    element.classList.add('animate');
  });
}
