const lightStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherButtons = document.querySelectorAll('.theme-switcher__button');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

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

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

setupSwitcher();

// const themeButtons = document.querySelectorAll('.header__theme-menu-button');
//
// themeButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     themeButtons.forEach((btn) => {
//       btn.classList.remove('header__theme-menu-button_active');
//       btn.removeAttribute('disabled');
//     });
//     if (
//       [...button.classList].includes('header__theme-menu-button_type_light')
//     ) {
//       changeTheme('light');
//     } else if (
//       [...button.classList].includes('header__theme-menu-button_type_dark')
//     ) {
//       changeTheme('dark');
//     } else {
//       changeTheme('auto');
//     }
//     button.classList.add('header__theme-menu-button_active');
//     button.setAttribute('disabled', true);
//   });
// });
//
// function changeTheme(theme) {
//   document.body.className = 'page';
//   document.body.classList.add(`theme_${theme}`);
//   localStorage.setItem('theme', theme);
// }
//
// function initTheme() {
//   const theme = localStorage.getItem('theme');
//   if (theme) {
//     changeTheme(theme);
//     themeButtons.forEach((btn) => {
//       btn.classList.remove('header__theme-menu-button_active');
//       btn.removeAttribute('disabled');
//     });
//     document
//       .querySelector(`.header__theme-menu-button_type_${theme}`)
//       .classList.add('header__theme-menu-button_active');
//     document
//       .querySelector(`.header__theme-menu-button_type_${theme}`)
//       .setAttribute('disabled', true);
//   }
// }
//
// initTheme();
