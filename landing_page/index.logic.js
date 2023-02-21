
const appUrl = `https://sys.bluetopia.app`;
const headerIds = [
    'header-home',
    'header-objectives',
    'header-features',
    'header-functions',
    'header-contact-us',
]
let fetureActive = null;
let templateActive = null;
let componentActive = null;

function InitializeListeners() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.getElementById('header');
        const home = document.getElementById('home');
        const objectives = document.getElementById('objectives');
        const features = document.getElementById('features');
        const functions = document.getElementById('functions');
        const contactUs = document.getElementById('contact-us');
        if(currentScroll > 0) {
            header.classList.add('header-small');
        }
        else header.classList.remove('header-small');
        
        headerIds.forEach(id => {
            const element = document.getElementById(id);
            if(!!element) element.classList.remove('menu-option-active');
        });

        if(currentScroll >= (contactUs.offsetTop - 100)) document.getElementById('header-contact-us').classList.add('menu-option-active');
        else if(currentScroll >= (functions.offsetTop - 100)) document.getElementById('header-functions').classList.add('menu-option-active');
        else if(currentScroll >= (features.offsetTop - 100)) document.getElementById('header-features').classList.add('menu-option-active');
        else if(currentScroll >= (objectives.offsetTop - 100)) document.getElementById('header-objectives').classList.add('menu-option-active');
        else if(currentScroll >= 0) document.getElementById('header-home').classList.add('menu-option-active');
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
    ScrollToElement('contact-us');
}

function ScrollToElement(elementId) {
    const header = document.getElementById('header');
    const offset = 30;
    const element = document.getElementById(elementId);
    if(!element) return;
    let y = element.getBoundingClientRect().top + window.pageYOffset - (header.clientHeight + offset);
    
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

function GoToSocialMedia(socialMedia) {
    switch (socialMedia) {
        case 'fb':
            window.open('http://facebook.com/bluetopiapp', '_blank');
            break;
        case 'tt':
            break;
        case 'in':
            window.open('https://instagram.com/bluetopiapp', '_blank');
            break;
        case 'yt':
            break;
    }
}

function MobileModifications() {
    let isMobileRegex = /android|iphone|phone|mobile/gi;
    let isMobile = "ontouchstart" in document.documentElement;
    if(isMobile) {
        let elements = document.getElementsByClassName('info-section');
        for (const element of elements) {
            element.classList.add('w-100');
        }

        elements = document.getElementsByClassName('mobile-hide');
        for (const element of elements) {
            element.classList.add('d-none');
        }
    }
}

InitializeListeners();
setTimeout(() => {
    MobileModifications();
}, 10);
