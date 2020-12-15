import { PageTypes } from './models/nav.js';
import { PageManager } from './page_manager.js';


document.addEventListener('DOMContentLoaded', async () => {
  // Create page manager.
  const manager = new PageManager(Object.values(PageTypes), PageTypes.HOME);
  console.log(manager)
  manager.swapPage(PageTypes.HOME)

});

$(window).on('load', () => {
  less.watch();
});
