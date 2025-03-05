function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  const promises = Array.from(elements).map(el => {
    const file = el.getAttribute('data-include');
    return fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Error cargando ${file}: ${response.status}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        
        const title = el.getAttribute('data-title');
        if (title) {
          const titleElement = el.querySelector('#pageTitle');
          if (titleElement) titleElement.textContent = title;
        }
      });
  });
  return Promise.all(promises);
}

document.addEventListener('DOMContentLoaded', () => {
  includeHTML()
    .then(() => {
      document.dispatchEvent(new CustomEvent('includesLoaded'));
    })
    .catch(error => console.error('Error:', error));
});