'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Scroll
    const scrollTo = (elem,attr) => {
        $(elem).on("click", function () {
            let anchor = $(this).attr(attr);
            console.log(anchor);
            $('html, body').stop().animate({
                scrollTop: $('#'+anchor).offset().top - 60
            }, 1500);
        });
    };
    if($('#main').hasClass('isSingle')){
      $('#header').addClass('single-header');
    }
    //Маска для телефона
    $('.custom-form-input.telephone').mask('+7(000)000-00-00');
    //Маска для времени
    $('#form-date-time').mask('00:00');
    // Календарь
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay();
    if($('.custom-form-input.date').length>0) {
        let picker = datepicker('.custom-form-input.date', {
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString();
                input.value = value
            },
            minDate: new Date(year, month, day),
            overlayButton: "Подтвердить",
            customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июнь', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        });
    }
    if($('.youtube')){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
        });

    }
    //Video preview
    (function(){
        if (!document.getElementsByClassName) {
            // Поддержка IE8
            const getElementsByClassName = function(node, classname) {
                const a = [];
                let re = new RegExp('(^| )'+classname+'( |$)');
                let els = node.getElementsByTagName("*");
                for(let i=0,j=els.length; i < j; i++)
                    if(re.test(els[i].className))a.push(els[i]);
                return a;
            };
            var videos = getElementsByClassName(document.body,"youtube");
        } else {
            var videos = document.querySelectorAll(".youtube");
        }
        let nb_videos = videos.length;
        for (let i=0; i < nb_videos; i++) {
            // Находим постер для видео, зная ID нашего видео
            if(videos[i].getAttribute('data-youtube-img') !== ''){
                videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
            }else {
                videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
            }
            // Размещаем над постером кнопку Play, чтобы создать эффект плеера
            var play = document.createElement("div");
            play.setAttribute("class","play");
            videos[i].appendChild(play);
            videos[i].onclick = function() {
                // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                const iframe = document.createElement("iframe");
                let iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
                iframe.setAttribute("src",iframe_url);
                iframe.setAttribute("frameborder",'0');
                // Высота и ширина iFrame будет как у элемента-родителя
                iframe.style.width  = this.style.width;
                iframe.style.height = this.style.height;
                // Заменяем начальное изображение (постер) на iFrame
                this.parentNode.replaceChild(iframe, this);
            }
        }
    })();
        window.almComplete = function (alm) {
            $(".fancybox").fancybox({
                openEffect	: 'none',
                closeEffect	: 'none'
            });
            if($('.youtube')){
                $('.youtube').each(function () {
                    let youtube_url = $(this).attr('data-youtube');
                    youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
                    $(this).attr('data-youtube',youtube_url);
                });

            }
            (function(){
                if (!document.getElementsByClassName) {
                    // Поддержка IE8
                    const getElementsByClassName = function(node, classname) {
                        const a = [];
                        let re = new RegExp('(^| )'+classname+'( |$)');
                        let els = node.getElementsByTagName("*");
                        for(let i=0,j=els.length; i < j; i++)
                            if(re.test(els[i].className))a.push(els[i]);
                        return a;
                    };
                    var videos = getElementsByClassName(document.body,"youtube");
                } else {
                    var videos = document.querySelectorAll(".youtube");
                }
                let nb_videos = videos.length;
                for (let i=0; i < nb_videos; i++) {
                    if(videos[i].childNodes.length < 1) {
                        // Находим постер для видео, зная ID нашего видео
                        if (videos[i].getAttribute('data-youtube-img') !== '') {
                            videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                        } else {
                            videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                        }
                        // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                        var play = document.createElement("div");
                        play.setAttribute("class", "play");
                        videos[i].appendChild(play);
                        videos[i].onclick = function () {
                            // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                            const iframe = document.createElement("iframe");
                            let iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                            if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
                            iframe.setAttribute("src", iframe_url);
                            iframe.setAttribute("frameborder", '0');
                            // Высота и ширина iFrame будет как у элемента-родителя
                            iframe.style.width = this.style.width;
                            iframe.style.height = this.style.height;
                            // Заменяем начальное изображение (постер) на iFrame
                            this.parentNode.replaceChild(iframe, this);
                        }
                    }
                }
            })();
        };
    //Слайдер специалистов
    $('.doctors-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
        responsive: [
            {
                breakpoint: 1190,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 880,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 794,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    $('.certificates-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
        responsive: [
            {
                breakpoint: 1190,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 880,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 794,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    //Open menu
    $('.toggle-menu').on('click',function(){
        $('.toggle-menu').toggleClass('active');
        $('.header-nav').toggleClass('active');
    });
    $(document).mouseup(function (e) {
        const menu_container = $(".header-nav.active");
        if (menu_container.has(e.target).length === 0){
            menu_container.removeClass('active');
            $('.toggle-menu').removeClass('active');
        }
    });
    //Обвертка меню другим родителем
    const submenu = $('.nav-menu-item .submenu');
    if(submenu){
        submenu.wrap('<div class="submenu-container"></div>');
        $('.submenu').before('<span class="fas fa-angle-left back-to-menu"><span>Вернуться</span></span>');
        const fragmentOpenSubmenu = document.createDocumentFragment();
        const openSubmenu = document.createElement('span');
        openSubmenu.classList.add('fas');
        openSubmenu.classList.add('fa-chevron-right');
        openSubmenu.classList.add('open-submenu');
        fragmentOpenSubmenu.append(openSubmenu);
        submenu.parent().parent().append(fragmentOpenSubmenu);
    }
    // Отображение подменю
    const oldTitle = $('.header-nav-title').text();
    if($('.open-submenu')){
        $('.open-submenu').click(function (e) {
            $('.header-nav').addClass('active-submenu');
            let currentTitle = $(this).siblings('a').text();
            $('.header-nav-title').text(currentTitle);
            $(this).siblings('.submenu-container').fadeIn('slow').addClass('active');
        })
    }
    if($('.nav-menu-item.toggle')){
        $('.nav-menu-item.toggle').click(function (e){
            $('.header-nav').addClass('active-submenu');
            let currentTitle = $(this).children('a').text();
            $('.header-nav-title').text(currentTitle);
            $(this).children('.submenu-container').fadeIn('slow').addClass('active')
            console.log(2);
        })
    }
    // Закрыть подменю
    if($('.back-to-menu')){
        $('.back-to-menu').click(function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            $('.header-nav').removeClass('active-submenu');
            $(this).parent().fadeOut('slow');
            $('.header-nav-title').text(oldTitle);
        });
    }
    //Переключатель времени
    const formDateInput = $('#form-date-time');
    formDateInput.attr('data-hour','0').attr('data-minute','00');
    let dateHour = formDateInput.attr('data-hour');
    let dateMinute = formDateInput.attr('data-minute');
    let currentTime;
    const changeTime = (newTime) =>{
        currentTime = (newTime<10)?`0${dateHour}:${dateMinute}`:`${newTime}:${dateMinute}`;
        formDateInput.val(currentTime);
    };
    $('.time-right').click(function () {
        if(dateHour < 24){
            dateHour++;
            changeTime(dateHour);
        }
    });
    $('.time-left').click(function () {
       if(dateHour>0){
           dateHour--;
           changeTime(dateHour);
       }
    });
    //Изменение кнопки заказа звонка
    if($(window).width() <= 1280){
        $('#header .header-call span').addClass('hidden');
    }else{
        $('#header .header-call span').removeClass('hidden');
    }
    $(window).resize(function(){
        if($(window).width() <= 1280){
            $('#header .header-call span').addClass('hidden');
        }else{
            $('#header .header-call span').removeClass('hidden');
        }
    });
    //Popup
    const popup_container = $('.custom-popup-container');
    $('.popup-open').click(function () {
        popup_container.fadeIn('slow');
    });
    $(document).mouseup(function (e) {
        if ($('.custom-popup').has(e.target).length === 0){
            popup_container.fadeOut('slow');
        }
    });
    $('.close-popup').click(function () {
        popup_container.fadeOut('slow');
    });
    //Accordion
    $('.collapsible').collapsible();
    //Services ankors
    $('.service-links-item:first-of-type').addClass('active');
    scrollTo('.service-links-item','data-tab');
    $('.service-links-item').click(function () {
        if(!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    //Fancybox
    $(".fancybox").fancybox({
        openEffect	: 'none',
        closeEffect	: 'none'
    });
    //Review slider
    $('.reviews-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
    });
    $('.service-gallery-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
    });
    //Map gallery
    const mainGallery = (item,parent)=>{
        $(item).click(function(){
            let currentImage =$(this),
                mainImage  = currentImage.parent().siblings(parent).find('img'),
                currentSrc = currentImage.attr('src'),
                oldSrc = currentImage.attr('src');
            mainImage.attr('src',currentSrc);
            currentImage.attr('src',oldSrc);
        })
    };
    // mainGallery('.other-gallery-map img','.map-gallery-img');
    // mainGallery('.mini-clinic-gallery img','.main-clinic-gallery');
    //Mini clinic slider
    $('.mini-clinic-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: '<span class="fas fa-chevron-left mini-clinic-btn mini-clinic-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right mini-clinic-btn mini-clinic-btn-right"></span>'
    });
    //Слайдер клиники
    $('.clinic-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll:3,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
        responsive: [
            {
                breakpoint: 830,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 446,
                settings:{
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    //Слайдер врачей в About
    if($(window).width()<=483){
        $('.about-doctors-list').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll:1,
            prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
            nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
        })
    }else{
        $('.about-doctors-list').filter('.slick-initialized').slick('unslick');
    }
    $(window).resize(function () {
        if($(window).width()<=483){
            $('.about-doctors-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll:1,
                prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
                nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>',
            })
        }else{
            $('.about-doctors-list').filter('.slick-initialized').slick('unslick');
        }
    });
    //Read more
    if($('.seo-block-container')) {
        $('.seo-block-container').readmore({
            speed: 75,
            lessLink: '<a href="#" class="btn-purple btn-submit seo-more">Закрыть</a>',
            moreLink: '<a href="#" class="btn-purple btn-submit seo-more">Читать далее</a>',
            heightMargin: 400
        });
    }
    if($('.bottom-lead-form-text a').text() == ''){
        const numberText = $('.header-contacts .header-contacts-item.graphic a').text(),
              numberLink = $('.header-contacts .header-contacts-item.graphic a').attr('href');
        $('.bottom-lead-form-text a').text(numberText).attr('href',numberLink);
    }
    //Функция обработки формы
    $('.wpcf7').on('wpcf7mailsent',function(){
        $(this).fadeOut('slow');
        $(this).parent().parent().find('.form-date-thx').fadeIn('slow');
    });
    // Установка характеристик
    $('.char-list-review').each(function(){
        let colStar = +$(this).attr('data-reviews');
        let currentStar = colStar.toFixed(0);
        if(currentStar != 0 && currentStar <= 5){
            let currentItems = $(this).find('.char-list-review-item');
            for(let i = 0;i<currentStar;i++){
                currentItems[i].classList.remove('tooth-deactive');
                currentItems[i].classList.add('tooth-active');
            }
        }
    });
});

