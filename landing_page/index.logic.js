const appUrl = `https://sys.bluetopia.app`;

function InitializeListeners() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.getElementById('header');
        if(currentScroll > 0) {
            header.classList.add('header-small');
        }
        else header.classList.remove('header-small');
    });
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

InitializeListeners();
