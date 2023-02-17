
const appUrl = `https://sys.bluetopia.app`;
let fetureActive = null;
let templateActive = null;
let componentActive = null;

function InitializeListeners() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.getElementById('header');
        if(currentScroll > 0) {
            header.classList.add('header-small');
        }
        else header.classList.remove('header-small');
    });
    setTimeout(() => {
        OnFeatureHover('feature-1');
        OnTemplateHover('template-1');
        OnComponentHover('component-1');
    }, 10);
}

function GoToRegister() {
    window.open(appUrl, '_blank');
}

function ScrollToContactUs() {
    const header = document.getElementById('header');
    const offset = 30;
    const contactUs = document.getElementById('contact-us');
    let y = contactUs.getBoundingClientRect().top + window.pageYOffset - (header.clientHeight + offset);

    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
}

function OnFeatureHover(id) {
    if(!fetureActive || fetureActive.id != id) {
        if(!!fetureActive && !!fetureActive.element) fetureActive.element.classList.remove('feature-active');
        fetureActive = {
            id,
            element: document.getElementById(id)
        };
        fetureActive.element.classList.add('feature-active');
    }
}

function OnTemplateHover(id) {
    if(!templateActive || templateActive.id != id) {
        if(!!templateActive && !!templateActive.element) templateActive.element.classList.remove('template-active');
        templateActive = {
            id,
            element: document.getElementById(id)
        };
        templateActive.element.classList.add('template-active');
    }
}

function OnComponentHover(id) {
    if(!componentActive || componentActive.id != id) {
        if(!!componentActive && !!componentActive.element) componentActive.element.classList.remove('template-active');
        componentActive = {
            id,
            element: document.getElementById(id)
        };
        componentActive.element.classList.add('template-active');
    }
}

InitializeListeners();
