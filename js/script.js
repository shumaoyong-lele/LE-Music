document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    // 打字动画效果
    function typeWriter(element, texts, speed = 150, delay = 2000) {
        let currentText = 0;
        let isDeleting = false;
        let text = '';
        let cursor = '<span class="cursor"></span>';
        
        function type() {
            const fullText = texts[currentText % texts.length];
            const delta = isDeleting ? -1 : 1;
            
            text = fullText.substring(0, text.length + delta);
            element.innerHTML = text + cursor;
            
            if(!isDeleting && text === fullText) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, delay);
            } else if(isDeleting && text === '') {
                isDeleting = false;
                currentText++;
                type();
            } else {
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const title = document.querySelector('.typing-text');
    const subtitle = document.querySelector('.typing-subtext');
    
    if(title && subtitle) {
        const titleTexts = JSON.parse(title.getAttribute('data-texts'));
        const subtitleTexts = JSON.parse(subtitle.getAttribute('data-texts'));
        
        typeWriter(title, titleTexts);
        typeWriter(subtitle, subtitleTexts, 50, 1000);
    }
});

// 深色模式切换
const themeSwitcher = document.getElementById('theme-switcher');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 初始化主题
if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitcher.checked = true;
}

// 切换主题
themeSwitcher.addEventListener('change', () => {
    if (themeSwitcher.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
});