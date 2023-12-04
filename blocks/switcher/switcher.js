const lightStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyle = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const switcherButtons = document.querySelectorAll('.switcher__btn');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');

function getSavedScheme() {
    return localStorage.getItem('colorScheme');
}

function clearScheme() {
    localStorage.removeItem('colorScheme');
}

function saveScheme(scheme) {
    localStorage.setItem('colorScheme', scheme);
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

    [...lightStyle].forEach((link) => {
        link.media = lightScheme;
    });

    [...darkStyle].forEach((link) => {
        link.media = darkScheme;
    })
}


function setScheme(scheme) {
    switchMedia(scheme);

    if (scheme === 'auto') {
        clearScheme();
    } else {
        saveScheme(scheme);
    }

}

function getSystemScheme() {
    const darkScheme = darkSchemeMedia.matches;

    console.log(darkScheme)

    return darkScheme ? 'dark' : 'light';
}

function setupScheme() {
    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();

    if (savedScheme === null) {
        return;
    }

    if (savedScheme !== systemScheme) {
        setScheme(savedScheme);
    }
}


function setupSwitcher() {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) {
        const currentRadio = document.querySelector(`.switcher__btn[value=${savedScheme}]`);
        currentRadio.checked = true;
    }

    [...switcherButtons].forEach((btn) => {
        btn.addEventListener('change', (evt) => {
            setScheme(evt.target.value);
        })
    })
}

setupSwitcher();
setupScheme();