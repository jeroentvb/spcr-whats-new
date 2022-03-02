import ReactDOM from 'react-dom';

export function wrapReactElement(reactElement: JSX.Element): Element {
   const wrapper = document.createElement('div');
   wrapper.setAttribute('id', 'whats-new-content-wrapper');

   const style = document.createElement('style');
   style.textContent = `
      #whats-new-content-wrapper ul, #whats-new-content-wrapper ol {
         list-style: inherit;
         margin-left: 1em;
      }
   `;

   ReactDOM.render(reactElement, wrapper);
   wrapper.appendChild(style);

   return wrapper;
}
