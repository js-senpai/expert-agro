$(document).ready(function () {

    $('.video-wrapper').click(function () {

        $(this).css('display', 'none').next().css('display', 'block');
    })



    $('.offerLead > .offerLead-content > button.offerLead-btn').click(function () {
        $('.offerLead-form, .bpn-popup').fadeIn(300).css('display', 'flex');
        $('body').addClass('activeModal');
        $('#offerLead-bg').css('display', 'flex');
        $('.offerLead-form').focus();



        $('.popup-close').click(function () {
            $('.offerLead-form, .bpn-popup').fadeOut(200).css('display', 'none');
            $('#offerLead-bg').css('display', 'none');
            $('body').removeClass('activeModal');
        })

        $(document).mouseup(function (e) {
            var popup = $(".offerLead-form");
            if (!popup.is(e.target) && popup.has(e.target).length == 0) {
                popup.hide(300).css('display', 'none');
                $('#offerLead-bg,.bpn-popup').css('display', 'none');
                $('body').removeClass('activeModal');
            }
        });
    })

    //Маска для поля воода номера телефона

    // $('.phone-field').keypress(function () {
    //     $(this).inputmask("+7(999)999-9999");
    // });

    // // добавляем правило для валидации телефона
    // jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
    //     return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value);
    // });

    // // получаем нашу форму по class
    // var form = $('.form-request');

    // // включаем валидацию в форме
    // form.validate();

    // // вешаем валидацию на поле с телефоном по классу
    // $.validator.addClassRules({
    //     'phone-field': {
    //         checkMaskPhone: true,
    //     }
    // });

    // // Проверка на валидность формы при отправке, если нужно
    // form.submit(function (e) {
    //     e.preventDefault();
    //     if (form.valid()) {
    //         alert('Форма отправлена');
    //     }
    //     return;
    // });






})