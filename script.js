"use strict"

$('#w_c-s--link').on("click", function () {
    let scroll_height = $('#welcome_section-id').height();
    $('html, body').animate({
        scrollTop: scroll_height
    }, 1200);
});

$('#hamburger_menu-id').on("click", function () {
    let menu_lines = $('.hamburger_menu-line');
    let menu_body = $('#menu_body-id');
    menu_lines.toggleClass('hm---open');
    menu_body.fadeToggle(500).css('display', 'flex');
})
