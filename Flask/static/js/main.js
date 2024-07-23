/**
* Template Name: Impact
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

var dropArea = document.getElementById("drop-area");
var inputFile = document.getElementById("inputfile");
var imageView = document.getElementById("img-view");
var preView = document.getElementById("preview");
var scanDiv = document.getElementById("scan");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

inputFile.addEventListener("change", function (e) {
  e.preventDefault();
  uploadImage();
});

function uploadImage() {
  var imgLink = URL.createObjectURL(inputFile.files[0]);
  console.log(inputFile.files);


  preView.style.width = '500px';
  preView.style.height = '300px';
  var para1 = document.createElement("img");
  para1.id = "cancel";
  para1.src = "../static/cancel.png";
  preView.appendChild(para1);
  preView.style.backgroundImage = `url(${imgLink})`;
  inputFile.remove();
  imageView.remove();
  dropArea.remove();

  scanDiv.innerHTML += "<br>";
  var para = document.createElement("BUTTON");
  para.id = "scan-button";
  var node = document.createTextNode("Scan");
  para.appendChild(node);
  scanDiv.appendChild(para);
  var Cancel = document.getElementById("cancel");

  Cancel.addEventListener("click", function (e) {
    e.preventDefault();
    var scanButton = document.getElementById("scan-button");
    var pred = document.getElementById("prediction");
    var diag = document.getElementById("diagnosis");
    pred.innerHTML = ""
    pred.style.display = "none";
    diag.innerHTML = ""
    document.getElementById("status").innerHTML = ""
    scanButton.remove();
    uploadPage();
  });

  var scanButton = document.getElementById("scan-button");
  scanButton.addEventListener("click", function (e) {
    // var fileInput = document.getElementById("inputfile");
    if (inputFile.files.length === 0) {
      alert("Please select a file first.");
      return;
    }

    var file = inputFile.files[0];
    scanButton.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i>&nbsp&nbspScanning..";
    async function run() {
      console.log("This is the first message.");

      await delay(5000);
      window.scroll({ top: 1100, behavior: 'smooth' });


      var formData = new FormData();
      formData.append("file", file);

      var r = new XMLHttpRequest();
      r.open("POST", "http://127.0.0.1:5000/predict", true);

      r.onreadystatechange = function () {
        if (r.readyState != 4) return;
        if (r.status == 200) {
          var response = JSON.parse(r.responseText);
          var pred = document.getElementById("prediction");
          var diag = document.getElementById("diagnosis");
          diag.innerHTML = response.diagnosis
          pred.innerHTML = response.predictions;
          pred.style.padding = '40px 50px 40px 50px';
          pred.style.border = '2px solid #667ab1';
          pred.style.display = "";
          document.getElementById("status").innerHTML = response.status;
          scanButton.innerHTML = "Scan";
        } else {
          console.error("Error : " + r.status)
        }
      };
      r.send(formData);
      console.log("2nd");
    }
    run();

  });
}

function uploadPage() {
  scanDiv.innerHTML = "<div id='preview'/>";
  scanDiv.innerHTML += "<label for='inputfile' id='drop-area' class='upload'><input type='file' accept='image/*' id='inputfile' hidden><div id='img-view'><img src='../static/upload.png'><p>Drag and drop or click here<br>to upload image</p><span>Upload any image from desktop</span></div></label>"
  dropArea = document.getElementById("drop-area");
  inputFile = document.getElementById("inputfile");
  imageView = document.getElementById("img-view");
  preView = document.getElementById("preview");
  console.log(inputFile.files);
  inputFile.addEventListener("change", function (e) {
    e.preventDefault();
    uploadImage();
  });
  dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
  });
}

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});