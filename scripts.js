jQuery(document).ready( function() {

	let itemSelector = '.grid-item'; 

	let $container = $('#container').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
	});

	//Ascending order
	let responsiveIsotope = [
		[480, 7],
		[720, 10]
	];

	let itemsPerPageDefault = 9;
	let itemsPerPage = defineItemsPerPage();
	let currentNumberPages = 1;
	let currentPage = 1;
	let currentFilter = '*';
	let filterAtribute = 'data-filter';
	let pageAtribute = 'data-page';
	let pagerClass = 'isotope-pager';

	function changeFilter(selector) {
		$container.isotope({
			filter: selector
		});
	}


	function goToPage(n) {
		currentPage = n;

		let selector = itemSelector;
			selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			selector += '['+pageAtribute+'="'+currentPage+'"]';

		changeFilter(selector);
	}

	function defineItemsPerPage() {
		let pages = itemsPerPageDefault;

		for( let i = 0; i < responsiveIsotope.length; i++ ) {
			if( $(window).width() <= responsiveIsotope[i][0] ) {
				pages = responsiveIsotope[i][1];
				break;
			}
		}

		return pages;
	}
	
	function setPagination() {

		let SettingsPagesOnItems = function(){

			let itemsLength = $container.children(itemSelector).length;
			
			let pages = Math.ceil(itemsLength / itemsPerPage);
			let item = 1;
			let page = 1;
			let selector = itemSelector;
				selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			
			$container.children(selector).each(function(){
				if( item > itemsPerPage ) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});

			currentNumberPages = page;

		}();

		let CreatePagers = function() {

			let $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

			$isotopePager.html('');
			
			for( let i = 0; i < currentNumberPages; i++ ) {
				let $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
					$pager.html(i+1);
					
					$pager.click(function(){
						let page = $(this).eq(0).attr(pageAtribute);
						goToPage(page);
					});

				$pager.appendTo($isotopePager);
			}

			$container.after($isotopePager);

		}();

	}

	setPagination();
	goToPage(1);

	//Adicionando Event de Click para as categorias
	$('.filters a').click(function(){
		let filter = $(this).attr(filterAtribute);
		currentFilter = filter;

		setPagination();
		goToPage(1);


	});

	//Evento Responsivo
	$(window).resize(function(){
		itemsPerPage = defineItemsPerPage();
		setPagination();
	});

});



jQuery(document).ready( function() {   

    // filter items on button click
    $('.filter-button-group').on( 'click', 'li', function() {
        let filterValue = $(this).attr('data-filter');
        $('.grid').isotope({ filter: filterValue });
        $('.filter-button-group li').removeClass('active');
        $(this).addClass('active');
    });
});
	

jQuery(document).ready( function() {   

    // filter items on button click
    $('.isotope-pager').on( 'click', 'a', function() {
        let filterValue = $(this).attr('data-page');

        $('.isotope-pager a').removeClass('active');
        $(this).addClass('active');
    });
});
	
	

jQuery(document).ready(function(){
    $('.popupimg').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom', 
        gallery: {
            enabled:true
        },
        zoom: {
            enabled: true, 

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            /*opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }*/
        },

        /*callbacks: {
            open: function() {
                console.log('Img opened');
            },
            close: function() {
                console.log('Img closed');
            }
        }*/

    });
});


/* test inline popup */
jQuery(document).ready(function(){
    $('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        mainClass: 'mfp-with-zoom', 
        gallery: {
            enabled:true
        }
    });
});