var flktyMain = new Flickity('.carousel-main', {
    wrapAround: true,
    cellAlign: 'center',
    contain: true,
    pageDots: false
});

var flktyNav = new Flickity('.carousel-nav', {
    asNavFor: '.carousel-main',
    contain: true,
    pageDots: false,
    prevNextButtons: false
});
