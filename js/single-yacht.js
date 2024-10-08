document.addEventListener("DOMContentLoaded", () => {
    var flktyMain = new Flickity('.carousel-main', {
        wrapAround: true,
        cellAlign: 'center',
        contain: true,
        pageDots: false,
        lazyLoad: true,
        // imagesLoaded: true
    });

    var flktyNav = new Flickity('.carousel-nav', {
        asNavFor: '.carousel-main',
        contain: true,
        pageDots: false,
        prevNextButtons: false,
        lazyLoad: true,
        // imagesLoaded: true
    });


    if (document.getElementById('lightgallery')) {
        console.log("Fired")
        lightGallery(document.getElementById('lightgallery'), {
          plugins: [
            lgZoom,
            //lgThumbnail,
            lgVideo,
            lgRotate,
            //lgShare
          ],
          speed: 500,
          //licenseKey: 'your_license_key',
          thumbnail:true,
          animateThumb: false,
          showThumbByDefault: false,
          download: false,
          selector: '.carousel-cell'
      });
    }
    if (document.getElementById('video-gallery')){
      lightGallery(document.getElementById('video-gallery'), {
        plugins: [lgVideo],
      })
    }
  });