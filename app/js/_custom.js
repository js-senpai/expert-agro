'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Mobile slider
    const mobileSlider = (elem) =>{
        if ($(window).width() <= 880) {
            $(elem).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            })
        }
        $(window).resize(function () {
            if ($(window).width() <= 880) {
                $(elem).slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                })
            } else if ($(window).width() > 880 && $(elem).hasClass('slick-initialized')) {
                $(elem).filter('.slick-initialized').slick('unslick');
            }
        });
    }
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
    //Nav settings
    if(!$('.nav-menu .nav-menu-item').length>0){
        $('.nav-menu li').attr('class','nav-menu-item');
    }
    if(!$('.footer-menu .footer-menu-item').length>0){
        $('.footer-menu li').attr('class','footer-menu-item');
    }
    //Scroll Tab
    if($('.current-product-nav-item').length>0){
        scrollTo('.current-product-nav-item','data-href');
    }
    if($('.isMain').length>0){
        $('#header').addClass('mainHeader');
    }
    //Tab func
    const tabElem = (item,container,name) =>{
        $(`${item}:first-child`).addClass('active');
        const projGallery = $(`${container}`),
            projectTabs = document.querySelectorAll(`${item}`),
            projectTab = $(`${item}`);
        projGallery.first().addClass('active');
        projectTab.first().addClass('active');
        let tabCount = 0;
        projGallery.each(function () {
            tabCount++;
            $(this).attr('id', `${name}-${tabCount}`);
        });
        for (let i = 0; i < projectTabs.length; i++) {
            projectTabs[i].setAttribute('data-href', `#${name}-${i + 1}`);
        }
        $(`${item}`).click(function () {
            if (!$(this).hasClass('active')) {
                let currentTab = $(this).attr('data-href');
                $(this).addClass('active').siblings().removeClass('active');
                if($(currentTab)){
                    $(currentTab).addClass('active').siblings().removeClass('active');
                }
            }
        });
    };
    //Маска для телефона
    $('a[href^="tel:"] ').each(function () {
       let currentNumber = $(this).attr('href').replace(/\D/g,'');
       $(this).attr('href',`tel:${currentNumber}`);
    });
    if($('.lead-form-input.phone'))
    {
        $('.lead-form-input.phone').mask('+7(000)000-00-00');
    }
    if($('.vacancy-form-input.tel'))
    {
        $('.vacancy-form-input.tel').mask('+7(000)000-00-00');
    }
    // Youtube
    if($('.youtube').length>0){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
        });

    }
    //Video preview
    if($('.youtube').length>0) {
        (function () {
            if (!document.getElementsByClassName) {
                // Поддержка IE8
                const getElementsByClassName = function (node, classname) {
                    const a = [];
                    let re = new RegExp('(^| )' + classname + '( |$)');
                    let els = node.getElementsByTagName("*");
                    for (let i = 0, j = els.length; i < j; i++)
                        if (re.test(els[i].className)) a.push(els[i]);
                    return a;
                };
                var videos = getElementsByClassName(document.body, "youtube");
            } else {
                var videos = document.querySelectorAll(".youtube");
            }
            let nb_videos = videos.length;
            for (let i = 0; i < nb_videos; i++) {
                // Находим постер для видео, зная ID нашего видео
                if (videos[i].getAttribute('data-youtube-img') !== '') {
                    videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                } else {
                    videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                }
                // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                const play = document.createElement("div"),
                    youtubeSettings = document.createElement('div');
                if (videos[i].getAttribute('data-youtube-text')) {
                    const youtubeText = document.createElement('div');
                    youtubeText.setAttribute('class', 'youtube-text');
                    youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                    youtubeSettings.appendChild(youtubeText);
                }
                play.setAttribute("class", "play");
                youtubeSettings.setAttribute('class', 'flex-container youtube-container');
                youtubeSettings.appendChild(play);
                videos[i].append(youtubeSettings);
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
        })();
    }
        window.almComplete = function (alm) {
            //Blog page
            if($('.blog-nav-item').length>0){
                tabElem('.blog-nav-item','.blog-post-list','blog-container');
            }
            if($('.youtube').length>0){
                $('.youtube').each(function () {
                    let youtube_url = $(this).attr('data-youtube');
                    youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
                    $(this).attr('data-youtube',youtube_url);
                });
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
                            const play = document.createElement("div"),
                                youtubeSettings = document.createElement('div');
                            if(videos[i].getAttribute('data-youtube-text')){
                                const youtubeText = document.createElement('div');
                                youtubeText.setAttribute('class','youtube-text');
                                youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                                youtubeSettings.appendChild(youtubeText);
                            }
                            play.setAttribute("class","play");
                            youtubeSettings.setAttribute('class','flex-container youtube-container');
                            youtubeSettings.appendChild(play);
                            videos[i].append(youtubeSettings);
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
            }
        };
    //Toggle menu
    $('.product-menu-container').click(function () {
       $(this).toggleClass('active');
       $('.product-menu-wrapper').fadeToggle(500);
    });
    $('.submenu').parent().addClass('sub-item');
    $('.product-menu-title').append('<span class="fas fa-chevron-down toggle-nav"></span>');
    $('.toggle-nav').click(function () {
       $(this).toggleClass('active');
       $(this).parent().next('.product-menu-list').fadeToggle(500);
    });
    //Слайдер специалистов
    if($('.catalog-slider').length>0) {
        $('.catalog-slider').slick({
            lazyLoad: 'progressive',
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            prevArrow: '<span class="slider-btn slider-btn-left"></span>',
            nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
            responsive: [
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 880,
                    arrows: false,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },

            ]
        });
    }
    //Project tabs
    if($('.project-gallery').length>0) {
        tabElem('.project-tab-list-item','.project-gallery','project');
    }
    //Spacialist slider
    if($('.specialists-slider').length>0) {
        $('.specialists-slider').slick({
            lazyLoad: 'progressive',
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 6,
            prevArrow: '<span class="slider-btn slider-btn-left"></span>',
            nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
            responsive: [
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 880,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }
    //Слайдер cертификатов
    if($('.sertificates-gallery').length>0) {
        mobileSlider('.sertificates-gallery');
    }
    //Cлайдер в баннере
    if($('.banner-advantages-container').length>0) {
        mobileSlider('.banner-advantages-container>.grid-container');
    }
    //Breadcrumbs
    if($('.breadcrumbs-item').length>0){
        $('.breadcrumbs-item:not(.active)').each(function () {
           $(this).append('<i class="fas fa-chevron-right"></i>');
        });
    }
    //Lead popup
    $('.header-contact-text').click(function () {
        $('.lead-popup-container').fadeIn(500);
    });
    if($('.lead-popup-container').length>0){
        $('.close-popup').click(function() {
            $('.lead-popup-container').fadeOut(500);
        });
        $('.toggle-lead,.header-contact-text').click(function () {
           $('.lead-popup-container').fadeIn(500);
        });
    }
    //Слайдер cертификатов
    if($('.video-reviews-list').length>0) {
        if ($(window).width() <= 1043) {
            $('.video-reviews-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<span class="slider-btn slider-btn-left"></span>',
                nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
            })
        } else {
            $('.video-reviews-list').filter('.slick-initialized').slick('unslick');
        }
        $(window).resize(function () {
            if ($(window).width() <= 1043) {
                $('.video-reviews-list').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<span class="slider-btn slider-btn-left"></span>',
                    nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
                })
            } else if ($(window).width() > 1043) {
                $('.video-reviews-list').filter('.slick-initialized').slick('unslick');
            }
        });
    }
    //Table counter
    const tableCounter = (item) =>{
        const counterTd =  document.querySelectorAll(item);
        for(let i = 0;i<counterTd.length;i++){
            counterTd[i].textContent = i+1;
        }
    }
    //Vacancy tab
    if($('.vacancy-list-container').length>0) {
        tabElem('.vacancy-tab-list-item','.vacancy-list-container','vac');
    }
    if($('.vacancy-item').length>0) {
        const vacancyItem = $('.vacancy-item'),
              vacancyCities = $('.vacancy-popup-cities-item'),
              vacancyPopup = $('.vacancy-popup');
        vacancyItem.click(function () {
            $('.vacancy-container>.grid-container').addClass('hidden');
            const city = $('.vacancy-tab-list-item.active').text(),
                vacancyName = $(this).find('.vacancy-name').text(),
                vacancyCond = $(this).find('.vacancy-conditions').text(),
                vacancyInfo = $(this).find('.vacancy-information').html();
            vacancyPopup.fadeIn(500);
            $('.vacancy-form-input.city').val(city);
            $('.vacancy-popup-title').text(vacancyName);
            $('.vacancy-form-input.vacancy').val(vacancyName);
            $('.vacancy-popup-subtitle').text(vacancyCond);
            $('.vacancy-popup-text').html(vacancyInfo);
            vacancyCities.each(function () {
                if ($(this).text() === city) {
                    $(this).addClass('active').siblings().removeClass('active');
                }
            });
        });
        vacancyCities.click(function () {
            const city = $(this).text(),
                  vacancyName = vacancyPopup.find('.vacancy-popup-title').text();
            $(this).addClass('active').siblings().removeClass('active');
            $('.vacancy-form-input.city').val(city);
            vacancyItem.each(function () {
                if(vacancyName === $(this).find('.vacancy-name').text()){
                    const vacancyCond = $(this).find('.vacancy-conditions').text(),
                        vacancyInfo = $(this).find('.vacancy-information').html();
                    $('.vacancy-popup-subtitle').text(vacancyCond);
                    $('.vacancy-popup-text').html(vacancyInfo);
                }
            })
        });
        $('.close-popup-vacancy').click(function(){
            $('.vacancy-popup').fadeOut(500).siblings('.grid-container').removeClass('hidden');
        })
    }
    //Vacancy tab
    if($('.contacts-wrapper').length>0){
        tabElem('.contacts-header-item','.contacts-wrapper','cont');
    }
    //Accordion
    if($('.accordion-toggle').length>0){
        $('.accordion-item').click(function () {
            $(this).find('.accordion-toggle').toggleClass('active').parent().next('.accordion-content').slideToggle(500);
        })
    }
    //Sertificates list
    if($('.sertificates-list').length>0){
        let countSert = $('.sertificates-list a').length;
        if(countSert === 9){
            $('.sertificates-list a:first-child').addClass('sertificates-list-item-first');
        }
    }
    //Blog page
    if($('.blog-nav-item').length>0){
        tabElem('.blog-nav-item','.blog-post-list','blog-container');
    }
    if($('.toggle-blog').length>0){
        $('.toggle-blog').click(function () {
            $(this).toggleClass('active');
            $('.blog-nav').slideToggle(500);
        })
    }
    //Contact form submit
    if($('.wpcf7').length>0){
        $('.wpcf7').on('wpcf7mailsent',function(){
            $(this).fadeOut(500).siblings('.thank-you').fadeIn(500);
        })
    }
    if($('.lead-popup-container .wpcf7')){
        $('.lead-popup-container .wpcf7').on('wpcf7mailsent',function(){
            setTimeout(()=>{
                $('.lead-popup-container').fadeOut(500).siblings('.thank-you').fadeIn(500);
            },1000);
        })
    }
    //Оптимизация таблиц под вордпресс
    if($('.table-char-tr-v1').length>0){
        $('.table-char-body-v1 .table-char-tr-v1').prepend('<td class="table-char-td-v1"></td>');
        $('.table-char-tr-v1 td:nth-child(2)').after('<td class="table-char-td-v1-empty"></td>');
    }
    if($('.table-char-v2-head').length>0){
        $('.table-char-v2-head td:first-child').attr('rowspan','2');
    }
    if($('.table-char-v3-header').length>0){
        $('.table-char-v3-header .table-char-v3-tr:first-child').find('td:nth-child(2),td:nth-child(3)').attr('rowspan','1');
        $('.table-char-v3-header .table-char-v3-tr:nth-child(2)').prepend('<td class="table-char-v3-td hidden-td"></td><td class="table-char-v3-td hidden-td"></td><td class="table-char-v3-td"></td>');
        $('.table-char-v3-body .table-char-v3-tr').prepend('<td class="table-char-v3-td"></td>');
    }
    if($('.table-char-body-v1 .table-char-td-v1:first-child').length>0){
        tableCounter('.table-char-body-v1 .table-char-td-v1:first-child');
    }
    if($('.table-char-v3-body .table-char-v3-td:first-child').length>0){
        tableCounter('.table-char-v3-body .table-char-v3-td:first-child');
    }
    if($('.mobile-table-v1-wrapper').length>0){
        tableCounter('.mobile-table-v1-wrapper .mobile-table-v1-item:first-child');
    }
    if($('.mobile-table-v3-wrapper').length>0){
        tableCounter('.mobile-table-v3-wrapper .mobile-table-v3-item:first-child');
    }
    //Projects load more
    if($('.project-page.project-gallery').length>0){
        //Proj count
        let countProj = 5;
        const projectContainer = document.querySelectorAll('.project-page.project-gallery');
        for(let i = 0;i<projectContainer.length;i++){
            if(projectContainer[i].querySelectorAll('.project-page-list').length>4){
                projectContainer[i].querySelector('.projects-more').classList.remove('hidden');
            }
        }
        $('.projects-more').click(function(){
              const parent = $(this).parent();
              let parentCount = parent.find('.project-page-list').length;
              if(countProj === parentCount){
                  return true;
              }else if(countProj < parentCount){
                  countProj = parentCount;
                  $(this).parent().find(`.project-page-list`).addClass('active');
                  if(countProj === parentCount){
                      $(this).addClass('done');
                  }
              }
        });
        $('.project-tab-list-item').click(function(){
            countProj = 5;
            console.log(countProj);
        })

    }
    //Read more
    if($('.seo-block-container').length>0) {
        $('.seo-block-container').readmore({
            speed: 75,
            lessLink: '<a href="#" class="btn btn-link-green seo-more">Закрыть</a>',
            moreLink: '<a href="#" class="btn btn-link-green seo-more">Читать далее</a>',
            heightMargin: 400
        });
    }
    //Contact form input
    if($('.url-input').length>0) {
        $('.url-input').val(window.location.href);
    }
    //Fancybox
    $('[data-fancybox]').fancybox({
        'hideOnOverlayClick':true,
        'enableEscapeButton':true
    });
    //Vacancy input file
    $('.file-input').change(function(){
        let currentValue = $(this).val(),
                filename = currentValue.replace(/.*\\/g,'');
        $(this).parent().parent().find('.vacancy-form-file-text').text(filename);
    })
});

