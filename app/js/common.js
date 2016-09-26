'use strict';

// ------------ jQuery Slider Plugin ------------

$.fn.slider = function(options) {
	
	var _self = this;
	//DOM Nodes
	var sliderNode     = this,
		slidesWrap     = sliderNode.find('.slider__wrap'),
		slides         = slidesWrap.find('.slider__slides'),
		prevSlideLink  = sliderNode.find('.slider__prev'),
		nextSlideLink  = sliderNode.find('.slider__next'),
		pagination     = sliderNode.find('.slider__pagination');
	// Other variables
	var currentSlideIndex = options.currentSlide || 0,
		slideDuration     = options.duration || 0.3,
		slidesCount       = slides.children().length,
		slideSize         = slidesWrap[(options.slideStyle === 'vertical') ? 'outerHeight' : 'outerWidth'](),
		autoSlideDelay    = options.delay || 6000,
		timer;

	this.prevSlide = function() {
		if (currentSlideIndex === 0) {
			currentSlideIndex = slidesCount - 1;
			return;
		}
		currentSlideIndex--;	
	};

	this.nextSlide = function() {
		if (currentSlideIndex === slidesCount - 1) {
			currentSlideIndex = 0;
			return;
		}
		currentSlideIndex++;
	};

	this.createPagination = function() { // add list items and links to pagination list
		if (!pagination.length) { return; }  // only if pagination is needed

		var fragment = $(document.createDocumentFragment());

		for (var i = 0; i < slidesCount; i++) {
			var pagItem = $(document.createElement('li'));
			pagItem.addClass(options.pagItemClass);

			var pagLink = $(document.createElement('a'));
			pagLink.addClass(options.pagLinkClass);
			pagLink.attr('data-slide', i);

			pagItem.append(pagLink);
			fragment.append(pagItem);
		}
		pagination.append(fragment);
		pagination.children().eq(currentSlideIndex).find('a').addClass('active');
	};

	this.render = function() {
		var margin = (options.slideStyle === 'vertical') ? 'margin-top' : 'margin-left';
		slides.css(margin, (-currentSlideIndex * slideSize));

		if (pagination.length) {
			pagination.find('.active').removeClass('active');
			pagination.children().eq(currentSlideIndex).find('a').addClass('active');
		}
	};

	this.setupListeners = function() {
		if (prevSlideLink) {
			prevSlideLink.on('click', function (e) {
				e.preventDefault();
				_self.prevSlide();
				_self.render();
				clearInterval(timer);
			});
		}
		if (nextSlideLink) {
			nextSlideLink.on('click', function (e) {
				e.preventDefault();
				_self.nextSlide();
				_self.render();
				clearInterval(timer);
			});
		}
		if(pagination) {
			pagination.on('click', function(e) {
				e.preventDefault();
				var target = $(e.target);
				if (target.prop("tagName") !== 'A') { return; }

				clearInterval(timer);
				currentSlideIndex = +target.data('slide');
				_self.render();	
			});
		}
		$(window).on('resize', function() {
			slideSize = slidesWrap[(options.slideStyle === 'vertical') ? 'outerHeight' : 'outerWidth']();
			_self.render();
		});		
	};

	this.autoSlide = function() {
		timer = setInterval(function() {
			_self.nextSlide();
			_self.render();	
		}, autoSlideDelay);
	}

	this.init = function() {
		slides.css('transition', ('margin ' + slideDuration + 's' + ' linear'));
		this.createPagination();
		if (options.slideStyle === 'vertical') {
			slides.css('white-space', 'normal');
		}
		this.setupListeners();
		this.render();
		this.autoSlide();
	}

	this.init();
}

$('.main-slider').slider({
	selector: '.main-slider',
	slideStyle: 'horizontal',
	duration: 0.4
});

// ------------ Main Navigation Module ------------

var mainNav = (function() {
	var headerSection = $('.page-header'),
		humburger     = headerSection.find('.page-header__humburger'),
		humburgerLink = humburger.find('.page-header__humburger-link'),
		navMenu       = headerSection.find('.nav'),
		navLinks      = navMenu.find('.nav__link');

	function _setupListeners() {
		humburgerLink.on('click', function(e) {
			e.preventDefault();
			if (humburgerLink.hasClass('page-header__humburger-link--active')) {
				_hideMenu();
				return;
			}
			_showMenu();
		});
		navLinks.on('click', function(e) {
			e.preventDefault();
			var anchorLink = $(this).attr('href');

			navMenu.css('display', 'none');
			humburgerLink.removeClass('page-header__humburger-link--active');
			scroll.to(anchorLink);

		});
	}

	function _hideMenu() {
		navMenu.slideUp(300, 'swing', function() {
			humburgerLink.removeClass('page-header__humburger-link--active');
		});
	}

	function _showMenu() {
		navMenu.slideDown(300, 'swing', function() {
			humburgerLink.addClass('page-header__humburger-link--active');
		});
	}

	function init() {
		_setupListeners();
	}

	init();

}());

// ------------ Section Jumps Module ------------

var scroll = (function() {

	var mainSlider     = $('.main-slider'),
		sliderShowLink = mainSlider.find('.main-slider__nav-link--show'),
		sliderJumpLink = mainSlider.find('.main-slider__nav-link--jump'),
		sectionJumpers = $('.jump-section');

	function _setupListeners() {
		sectionJumpers.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			to($this.attr('href'));
		});
		sliderShowLink.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			to($this.attr('href'));
		});
		sliderJumpLink.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			to($this.attr('href'));
		});
	}

	function to(anchorLink) {
		var targetString = anchorLink.substring(1),
			targetNode   = $('.' + targetString);
		$('html, body').animate({
        	scrollTop: targetNode.offset().top
    	}, 500);
	}

	function _init() {
		_setupListeners();
	}

	_init();

	return {
		to: to
	}

}());

// ------------ Skills Meter Module ------------

(function() {
	var skillsSection = $('.skills'),
		skillsList    = skillsSection.find('.skills__list'),
		skillsMeters  = skillsList.find('.skills__meter'),
		pageHeader    = $('.page-header');
	
	function _setupListeners() {
		$(window).on('scroll', function() {
			var $window = $(window);
			if ($window.scrollTop() + $window.height() >= skillsList.offset().top + skillsList.outerHeight()) {
				_setSkillsLevels();
			}
		});
	}

	function _setSkillsLevels() {
		for (var i = skillsMeters.length - 1; i >= 0; i--) {
			var skillsMeter = $(skillsMeters[i]),
				percent     = +skillsMeter.data('percent');
			skillsMeter.
			find('.skills__meter-inner').
				css('width', (percent + '%'));
		}
	}



	function init() {
		if (($(window).scrollTop()) >= (skillsSection.offset().top)) {
			_setSkillsLevels();
			return;
		}
		_setupListeners();
	}

	init();
}());

// ------------ Testimonials Slider Module ------------

(function() {
	// DOM Nodes
	var testimonialsSection  = $('.testimonials'),
		testimonialsList     = testimonialsSection.find('.testimonials__list'),
		testimonialsItems    = testimonialsSection.find('.testimonials__item'),
		paginationList       = testimonialsSection.find('.testimonials__nav-list');
	// Other variables
	var currentSlideIndex = 0,
		slidesCount       = testimonialsItems.length,
		timer;

	function _nextSlide() {
		if (currentSlideIndex === slidesCount - 1) {
			currentSlideIndex = 0;
			return;
		}
		currentSlideIndex++;
	}

	function _render() {
		testimonialsList.find('.testimonials__item--active').
			fadeOut(300).
			removeClass('.testimonials__item--active');
		$(testimonialsItems[currentSlideIndex]).
			fadeIn('slow').
			addClass('testimonials__item--active');
		paginationList.find('.testimonials__nav-item--active').removeClass('testimonials__nav-item--active');
		$(paginationList.children()[currentSlideIndex]).addClass('testimonials__nav-item--active');
	}

	function _createPagintation() {
		var fragment = $(document.createDocumentFragment());

		for (var i = 0; i < testimonialsItems.length; i++) {
			var paginationItem = $(document.createElement('li'));
			paginationItem.addClass('testimonials__nav-item');

			var paginationLink = $(document.createElement('a'));
			paginationLink.
				addClass('testimonials__nav-link').
				attr({
					'data-slide': i,
					'href': "#"
				});

			paginationItem.append(paginationLink);
			fragment.append(paginationItem);
		}
		paginationList.append(fragment);
		$(paginationList.children()[currentSlideIndex]).addClass('testimonials__nav-item--active')
	}

	function _autoSlide() {
		timer = setInterval(function() {
			_nextSlide();
			_render();	
		}, 5000);
	}

	function _setupListeners() {
		testimonialsItems.on('click', function() {
			_nextSlide();
			_render();

			// restart interval
			clearInterval(timer);
			_autoSlide();
		})
		paginationList.on('click', function(e) {
			e.preventDefault()
			var $target = $(e.target);
			if ($target.prop("tagName") !== 'A') { return; }

			currentSlideIndex = +$target.data('slide');
			_render();

			// restart interval
			clearInterval(timer);
			_autoSlide();	
		})
	}

	function init() {
		_createPagintation();
		_setupListeners();
		_render();
		_autoSlide();
	}

	init();

}());

// ------------ Team Slider Module ------------

(function() {
	var slidesList    = $('.team__list'),
		slides        = slidesList.find('.team__item'),
		prevSlideLink = slidesList.parent().find('.team__slider-nav--prev'),
		nextSlideLink = slidesList.parent().find('.team__slider-nav--next');

	var leftSlide = 0;
		

	function _prevSlide() {
		leftSlide--;

		if(leftSlide < 0) {
			slidesList.prepend(slidesList.children().last().clone());
			slidesList.children().last().remove();
			leftSlide++;
		}
	}
	function _nextSlide() {
		leftSlide++;

		if(leftSlide === slidesList.children().length - 1) {
			slidesList.append(slidesList.children().first().clone());
			slidesList.children().first().remove();
			leftSlide--;
		}
	}

	function _render() {
		if (document.documentElement.clientWidth >= 1200) { leftSlide = 0 } // on wide screen disable slider
		var slideSize = slidesList.outerWidth();
		slidesList.css('margin-left', (-leftSlide * slideSize));
	}

	function _setupListeners() {
		prevSlideLink.on('click', function(e) {
			e.preventDefault();
			_prevSlide();
			_render();
		});
		$(window).on('resize', function() {
			_render();
		});
		nextSlideLink.on('click', function(e) {
			e.preventDefault();
			_nextSlide();
			_render();
		});
	}

	function init() {
		_setupListeners();
	}

	init();
}());

// ------------ Portfolio Module ------------

(function() {
	var portfolioSection   = $('.portfolio'),
		portfolioList      = portfolioSection.find('.portfolio__list'),
		portfolioItemLinks = portfolioList.find('.portfolio__item-link'),
		thematicLinks      = portfolioSection.find('.portfolio__nav-link--thematic'),
		gridControls       = portfolioSection.find('.portfolio__grid'),
		displayRectLink    = gridControls.find('.portfolio__rect'),
		displayRhombLink   = gridControls.find('.portfolio__rhomb');

	function _setupListeners() {
		displayRectLink.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			displayRhombLink.removeClass('portfolio__rhomb--active');
			portfolioList.removeClass('portfolio__list--rhomb');
			$this.addClass('portfolio__rect--active');
		});
		displayRhombLink.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			displayRectLink.removeClass('portfolio__rect--active');
			$this.addClass('portfolio__rhomb--active');
			if (!portfolioList.hasClass('portfolio__list--rhomb')) {
				portfolioList.addClass('portfolio__list--rhomb');
			}
		});
		thematicLinks.on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			thematicLinks.removeClass('portfolio__nav-link--active');
			$this.addClass('portfolio__nav-link--active');
		});
		portfolioItemLinks.on('click', function(e) {
			e.preventDefault();
			var currentPortfolioItem = $(this).parent();
			galleryPopup.show(currentPortfolioItem);
		});

	}

	function init() {
		_setupListeners();
	}

	init();

}());

// ------------ Popup Gallery Module ------------

var galleryPopup = (function() {
	
	var gallery        = $('.gallery-popup'),
		galleryContent = gallery.find('.gallery-popup__content'),
		galleryImage   = galleryContent.find('.gallery-popup__image'),
		prevImageLink  = galleryContent.find('.gallery-popup__prev'),
		nextImageLink  = galleryContent.find('.gallery-popup__next'),
		closePopupLink = galleryContent.find('.gallery-popup__close'),
		socialsTrigger = galleryContent.find('.gallery-popup__socials-trigger'),
		socialsLinks   = galleryContent.find('.gallery-popup__socials');

		var 
			currentPortfolioList,
			currentPortfolioItem,
			currentPortfolioIndex,
			imagesCount;



	function show(portfolioItem) {
		gallery.addClass('gallery-popup--active');
		var currentImageUrl = portfolioItem.
			find('.portfolio__item-image').
			attr('src');
		galleryImage.attr('src', currentImageUrl);

		currentPortfolioList = portfolioItem.parent();
		currentPortfolioItem = portfolioItem;
		currentPortfolioIndex = portfolioItem.index();
		imagesCount = currentPortfolioList.children().length;
	}

	function hide() {
		gallery.removeClass('gallery-popup--active');
		socialsLinks.removeClass('gallery-popup-socials--shown')
		socialsLinks.fadeOut();
	}

	function _nextImage() {
		if (currentPortfolioIndex === imagesCount-1) {
			currentPortfolioIndex = 0;
		} else { currentPortfolioIndex++ }
	}
	function _prevImage() {
		if (currentPortfolioIndex === 0) {
			currentPortfolioIndex = imagesCount-1;
		} else { currentPortfolioIndex-- }
	}

	function _render() {
		currentPortfolioItem = currentPortfolioList.children().eq(currentPortfolioIndex);
		var nextImageUrl = currentPortfolioItem.
			find('.portfolio__item-image').
			attr('src');
		galleryImage.attr('src', nextImageUrl);
	}

	function _setupListeners() {
		socialsTrigger.on('click', function(e) {
			e.preventDefault();
			if(!socialsLinks.hasClass('gallery-popup-socials--shown')) {
				socialsLinks.addClass('gallery-popup-socials--shown')
				socialsLinks.slideDown();
			} else {
				socialsLinks.removeClass('gallery-popup-socials--shown')
				socialsLinks.fadeOut();
			}

		});
		closePopupLink.on('click', function(e) {
			e.preventDefault();
			hide();
		});
		nextImageLink.on('click', function(e) {
			e.preventDefault()
			_nextImage();
			_render();
		});
		prevImageLink.on('click', function(e) {
			e.preventDefault()
			_prevImage();
			_render();
		});
	}

	function _init() {
		_setupListeners();
	}

	_init();

	return {
		show: show
	};
}());