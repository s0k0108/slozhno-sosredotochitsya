const lightStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const switcherButtons = document.querySelectorAll('.theme-switcher__button');

function setupSwitcher() {

  [...switcherButtons].forEach((btn) =>{
    btn.addEventListener('click', () => {
      if(!btn.classList.contains('theme-switcher__button_active')){
        [...switcherButtons].forEach((button) => {
          if (button.classList.contains('theme-switcher__button_active')) {
            button.classList.remove('theme-switcher__button_active');
          }
        });
        btn.classList.add('theme-switcher__button_active');
        switchMedia(btn.name);
      }
    })
  });
}

function switchMedia(scheme) {
  let lightScheme;
  let darkScheme;

  if (scheme === 'auto') {
    lightScheme = '(prefers-color-scheme: light)';
    darkScheme = '(prefers-color-scheme: dark)'
  } else {
    lightScheme = (scheme === 'light') ? 'all' : 'not all';
    darkScheme = (scheme === 'dark') ? 'all' : 'not all';
  }
  console.log(lightStyle);

  [...lightStyle].forEach((link) => {

    link.media = lightScheme;
  });

  [...darkStyle].forEach((link) => {
    link.media = darkScheme;
  })

}


setupSwitcher();
