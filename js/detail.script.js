var initDetail = function() {
  if (document.querySelector('.page--detail-v1')) {
    var $pageDetail = $('.page--detail-v1');
    $pageDetail.on('click', 'a[data-lightbox]', lity);
    if (document.querySelector('.photo-gallery')) {
      initPhotoSwipeFromDOM('.photo-gallery');
    }
  }
  if (document.querySelector('.page--detail-v2')) {
    var $pageDetail = $('.page--detail-v2');
    $pageDetail.on('click', 'a[data-lightbox]', lity);
    if (document.querySelector('.photo-gallery')) {
      initPhotoSwipeFromDOM('.photo-gallery');
      if (Foundation.MediaQuery.atLeast('xlarge')) {
        initTraslatingGallery();
      }
    }
  }
};

var initTraslatingGallery = function(){
  var $photoGallery = $(".photo-gallery"),
    $galleryRow = $(".gallery-row"),
    photoGalleryWidth = $photoGallery.outerWidth(),
    galleryRowWidth = $galleryRow.outerWidth(),
    moveGapPercentage = (photoGalleryWidth - galleryRowWidth) * 100 / galleryRowWidth - 12,
    mousePosX = 0; // Real mouse position

  $galleryRow.mousemove(function(event) {
    translateDiff = mousePosX * 100 / photoGalleryWidth / 100 * moveGapPercentage + 6;
    mousePosX = event.pageX;
    translateRow(this, translateDiff);
  });

  var translateRow = function(row, translateDiff) {
    var newTranslateX = Math.floor(translateDiff) + 1;

    if (shouldTranslate(row, newTranslateX)) {
      var translateDuration = getTranslateDuration(row, newTranslateX);

      row.style.transform = "translateX(" + newTranslateX + "% )";
      row.style.transformDuration = translateDuration + "ms";
    }
  };

  var getTranslateDuration = function(row, newTranslateValue) {
    if (row.style.transform !== "") {
      var originalTranslateX = getActualTranslateX(row);
      var absTranslateXDiff = Math.abs(Math.abs(originalTranslateX) - Math.abs(newTranslateValue));
      return (absTranslateXDiff * 5 + 295);
    }
    return 300;
  }

  var getActualTranslateX = function(row) {
    var subString = row.style.transform.split("(")[1];;
    return subString.substring(0, subString.lastIndexOf("%")) * 1;
  }

  var shouldTranslate = function(row, newTranslateX) {
    return row.style.transform == "" || getActualTranslateX(row) !== newTranslateX;
  }
}

jQuery(function($) {
  'user strict';
  initDetail();
});
