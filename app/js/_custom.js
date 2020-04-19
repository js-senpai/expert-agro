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
    //Маска для телефона
    $('.lead-form-input.phone').mask('+7(000)000-00-00');
    // Календарь
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
            const play = document.createElement("div"),
                  youtubeText = document.createElement('div'),
                  youtubeSettings = document.createElement('div');
            play.setAttribute("class","play");
            youtubeText.setAttribute('class','youtube-text');
            youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
            youtubeSettings.setAttribute('class','flex-container youtube-container');
            youtubeSettings.appendChild(play);
            youtubeSettings.appendChild(youtubeText);
            videos[i].append(youtubeSettings);
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
                        const play = document.createElement("div"),
                            youtubeText = document.createElement('div'),
                            youtubeSettings = document.createElement('div');
                        play.setAttribute("class","play");
                        youtubeText.setAttribute('class','youtube-text');
                        youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                        youtubeSettings.setAttribute('class','flex-container youtube-container');
                        youtubeSettings.appendChild(play);
                        youtubeSettings.appendChild(youtubeText);
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
        };
    //Toggle menu
    $('.product-menu-container').click(function () {
       $(this).toggleClass('active');
       $('.product-menu-wrapper').fadeToggle(500);
    });
    //Category slider
    //Слайдер специалистов
    $('.catalog-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
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
    //Project tabs
    $('.project-tab-list-item:first-of-type').addClass('active');
    $('.project-gallery:first-of-type').addClass('active');
    const projGallery =  $('.project-gallery'),
          projectTab = document.querySelectorAll('.project-tab-list-item');
    let currentTab = 0;
    projGallery.each(function () {
        currentTab++;
        $(this).attr('id','project-'+currentTab);
    })
    for(let i = 0;i<projectTab.length;i++){
        projectTab[i].setAttribute('data-href','#project-'+[i+1]);
    }
    $('.project-tab-list-item').click(function () {
       if(!$(this).hasClass('active')){
           let currentTab = $(this).attr('data-href');
           $(this).addClass('active').siblings().removeClass('active');
           $(currentTab).addClass('active').siblings().removeClass('active');
       }
    });
    //Spacialist slider
    $('.specialists-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<span class="slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
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
});

