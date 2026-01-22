//TODO: - Refactor repeated code into functions where possible.
//		- Leverage PokeAPI for Pokemon data and images where possible.

(function($) {


	/**
     * Update image URLs to random variations.
     * @return {jQuery} jQuery object.
     */
    $.fn.updateImageUrls = function(filter) {
        var $images = $(this).find('img.pokemon');

        $images.each(function() {
            var $img = $(this);
            var isValidImage = false;

            function tryLoadImage() {

				if (filter != undefined) {
					
					if (filter[0] != 'all')
						var selectedGeneration = generations[filter[0]].split('-');

					if (filter[1] != 'all')
						var specifiedGame = games[filter[1]];
					
				}

				//Handle random number generation with optional generation filtering
				var randomVal = Math.floor(Math.random() * 1025) + 1;

				if (selectedGeneration != undefined) 
				{
					var min = parseInt(selectedGeneration[0], 10);
					var max = parseInt(selectedGeneration[1], 10);
					
					if (isNaN(min) || isNaN(max)) {
						var randomNum = randomVal;
					} else {
						// Ensure min <= max
						if (min > max) {
							var tmp = min; min = max; max = tmp;
						}
						var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
					}
				}
				else
				{
					var randomNum = randomVal;
				}
				
				var formattedNum = randomNum.toString().padStart(3, '0');



				// Handle random folder selection with optional game filtering
				if (specifiedGame != undefined) 
				{
					// Adjust formattedNum if a specific game is selected
					if (specifiedGame == 'PLZA' && !pokemonPLZA.includes(randomNum)) 
					{
						var randIndex = Math.floor(Math.random() * pokemonPLZA.length);
						randomNum = pokemonPLZA[randIndex];
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if (specifiedGame == 'PLA' && !pokemonPLA.includes(randomNum))
					{
						var randIndex = Math.floor(Math.random() * pokemonPLA.length);
						randomNum = pokemonPLA[randIndex];
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if (specifiedGame == 'SS' && randomNum > 898)
					{
						randomNum = Math.floor(Math.random() * 898) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if ((specifiedGame == 'BDSP' || specifiedGame == 'DPPT' || specifiedGame == 'HGSS') && randomNum > 493)
					{
						randomNum = Math.floor(Math.random() * 493) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if (specifiedGame == 'LGPE' && randomNum > 150)
					{
						randomNum = Math.floor(Math.random() * 150) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}						
					else if ((specifiedGame == 'SM' || specifiedGame == 'USUM') && randomNum > 809)
					{
						randomNum = Math.floor(Math.random() * 809) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if ((specifiedGame == 'XY' || specifiedGame == 'ORAS') && randomNum > 721)
					{
						randomNum = Math.floor(Math.random() * 721) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if (specifiedGame == 'BW' && randomNum > 649)
					{
						randomNum = Math.floor(Math.random() * 649) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if ((specifiedGame == 'RSE' || specifiedGame == 'FRLG') && randomNum > 386)
					{
						randomNum = Math.floor(Math.random() * 386) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					else if ((specifiedGame == 'GSC' ) && randomNum > 251)
					{
						randomNum = Math.floor(Math.random() * 251) + 1;
						formattedNum = randomNum.toString().padStart(3, '0');
					}
					

					// Correctly set image and icon based on specified game
					var randomFolder = specifiedGame;

					var iconUrl = icons[randomFolder];

					var gen9Games = ['SV','PLA','PLZA'];
					var gen8Games = ['SS','BDSP','LGPE'];
					var gen7Games = ['SM','USUM'];
					var gen6Games = ['XY','ORAS'];
					var gen3Games = ['RSE','FRLG'];

					if (gen9Games.includes(randomFolder)) 
					{
						randomFolder = 'SV';
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
					else if (gen8Games.includes(randomFolder))
					{
						randomFolder = 'SS';
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
					else if (gen7Games.includes(randomFolder))
					{
						randomFolder = 'SM';
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
					else if (gen6Games.includes(randomFolder))
					{
						randomFolder = 'XY';
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
					else if (gen3Games.includes(randomFolder))
					{
						randomFolder = 'RSE';
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
					else
					{
						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
					}
				}
				else
				{
					var randomFolder = folders[Math.floor(Math.random() * folders.length)];

					var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';

					if (randomFolder == 'SS') {
								var randomSubFolder = Math.random();
						if (randomSubFolder < 0.20) {
							randomFolder = 'SS';
						}
						else if (randomSubFolder < 0.40 && randomNum <= 493) {
							randomFolder = 'BDSP';
						}
						else if (randomSubFolder < 0.60 && (pokemonPLA.includes(randomNum)) ) {
							randomFolder = 'PLA';
						}
						else if (randomSubFolder < 0.80 && (pokemonPLZA.includes(randomNum)) ) {
							randomFolder = 'PLZA';
						}					
						else if(randomSubFolder < 1 && randomNum <= 150){
							randomFolder = 'LGPE';
						}
					}
					if (randomFolder == 'SM') {
						var randomSubFolder = Math.random();
						if (randomSubFolder < 0.5) {
							randomFolder = 'SM';
						}else{randomFolder = 'USUM';}
					}
					if (randomFolder == 'XY') {
						var randomSubFolder = Math.random();
						if (randomSubFolder < 0.5) {
							randomFolder = 'XY';
						}else{randomFolder = 'ORAS';}
					}
					if (randomFolder == 'RSE' && randomNum <= 386) {
						var randomSubFolder = Math.random();
						if (randomSubFolder < 0.5) {
							randomFolder = 'RSE';
						}else{randomFolder = 'FRLG';}
					}
					var iconUrl = icons[randomFolder];
				}
				
					


                // Check if the image exists
                var img = new Image();
                img.src = newUrl;
				try
				{
					img.onload = function() {
						isValidImage = true;
						$img.attr('src', newUrl);
						$img.siblings('.icon').attr('src', iconUrl);
					};
					img.onerror = function() {
						isValidImage = false;
						try {
							tryLoadImage(); // Try loading another image
						} catch (e) {
							console.warn('Failed to load image:', newUrl);
						}
					};
				}
				catch (e)
				{

					console.warn('Failed to load image:', newUrl);

				}
            }

		/* // Get Images from PokeAPI
		
		function getPokemonImage(pokemon) {
				const P = new Pokedex.Pokedex({ cacheImages: true });
				try {
							//const Pokedex = require("pokeapi-js-wrapper");
							(async () => {
									try {
							const sprite = await P.getPokemonByName(pokemon);
							console.log(sprite.sprites.versions);
						} catch (err) {
							console.error('Error fetching Pokemon:', err);
						}
					})();
				} catch (err) {
					console.error('Error initializing Pokedex:', err);
				}
		};
		*/
		

		/* //Interpret folder codes to full names for PokeAPI usage.
		 function interpretFolder(folder) {
				switch (folder) {
						case 'RSE':
							return 'emerald';
						case 'FRLG':
							return 'firered-leafgreen';
						case 'DPPT':
							return 'platinum';
						case 'HGSS':
							return 'heartgold-soulsilver';
						case 'BW':
							return 'black-white';
				case 'XY':
					return 'x-y';
				case 'SM':
					return 'ultra-sun-ultra-moon';
				case 'SS','BDSP','LGPE':
					return 'brilliant-diamond-shining-pearl';
				case 'SV':
					return 'scarlet-violet';
			}
		}
		*/

			try {
				tryLoadImage();
			} catch (e) {
				console.warn('Failed to load image:', e);
			}
        });

        return this;
    };





	/**
	 * Logic for handling randomization of images in the bingo table.
	 */
	$(document).ready(function() {
		initBingo();
		$('#applyLimitButton').off('click').on('click', function(e) {
			e.preventDefault();
			var selectedGeneration = $('#generationSelect').val();
			var specifiedGame = $('#gameInput').val().trim();
			var filter = [selectedGeneration, specifiedGame];
			initBingo(filter);
		});

		$('#reroll').off('click').on('click', function(e) {
			e.preventDefault();
			// $('.logo .fas').addClass('spin');
			var selectedGeneration = $('#generationSelect').val();
			var specifiedGame = $('#gameInput').val().trim();
			var filter = [selectedGeneration, specifiedGame];
			initBingo(filter);
		});

		$('#clearLimitButton').off('click').on('click', function(e) {
			e.preventDefault();
			// Reset selects/inputs to defaults
			$('#generationSelect').val('all');
			$('#gameInput').val('all');
			// Reinitialize bingo with defaults
			initBingo(['all','all']);
		});
		
		function initBingo(filter) {

			$('#bingoTable').updateImageUrls(filter);
			setTimeout(function() {
				//$('.logo .fas').removeClass('spin');
			}, 500); // Remove the spin class after 0.5 seconds


			// Bind handlers but ensure we don't double-bind by removing previous handlers first.
			$('#bingoTable img').off('click').on('click', function() {
				var $img = $(this);
				var isValidImage = false;

				function tryLoadImage() {

					if (filter != undefined) {
						
						if (filter[0] != 'all')
							var selectedGeneration = generations[filter[0]].split('-');

						if (filter[1] != 'all')
							var specifiedGame = games[filter[1]];
						
					}

					//Handle random number generation with optional generation filtering
					var randomVal = Math.floor(Math.random() * 1025) + 1;

					if (selectedGeneration != undefined) 
					{
						var min = parseInt(selectedGeneration[0], 10);
						var max = parseInt(selectedGeneration[1], 10);
						
						if (isNaN(min) || isNaN(max)) {
							var randomNum = randomVal;
						} else {
							// Ensure min <= max
							if (min > max) {
								var tmp = min; min = max; max = tmp;
							}
							var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
						}
					}
					else
					{
						var randomNum = randomVal;
					}
					
					var formattedNum = randomNum.toString().padStart(3, '0');



					// Handle random folder selection with optional game filtering
					if (specifiedGame != undefined) 
					{
						// Adjust formattedNum if a specific game is selected
						if (specifiedGame == 'PLZA' && !pokemonPLZA.includes(randomNum)) 
						{
							var randIndex = Math.floor(Math.random() * pokemonPLZA.length);
							randomNum = pokemonPLZA[randIndex];
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if (specifiedGame == 'PLA' && !pokemonPLA.includes(randomNum))
						{
							var randIndex = Math.floor(Math.random() * pokemonPLA.length);
							randomNum = pokemonPLA[randIndex];
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if (specifiedGame == 'SS' && randomNum > 898)
						{
							randomNum = Math.floor(Math.random() * 898) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if ((specifiedGame == 'BDSP' || specifiedGame == 'DPPT' || specifiedGame == 'HGSS') && randomNum > 493)
						{
							randomNum = Math.floor(Math.random() * 493) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if (specifiedGame == 'LGPE' && randomNum > 150)
						{
							randomNum = Math.floor(Math.random() * 150) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}						
						else if ((specifiedGame == 'SM' || specifiedGame == 'USUM') && randomNum > 809)
						{
							randomNum = Math.floor(Math.random() * 809) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if ((specifiedGame == 'XY' || specifiedGame == 'ORAS') && randomNum > 721)
						{
							randomNum = Math.floor(Math.random() * 721) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if (specifiedGame == 'BW' && randomNum > 649)
						{
							randomNum = Math.floor(Math.random() * 649) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if ((specifiedGame == 'RSE' || specifiedGame == 'FRLG') && randomNum > 386)
						{
							randomNum = Math.floor(Math.random() * 386) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}
						else if ((specifiedGame == 'GSC' ) && randomNum > 251)
						{
							randomNum = Math.floor(Math.random() * 251) + 1;
							formattedNum = randomNum.toString().padStart(3, '0');
						}

						// Correctly set image and icon based on specified game
						var randomFolder = specifiedGame;

						var iconUrl = icons[randomFolder];

						var gen9Games = ['SV','PLA','PLZA'];
						var gen8Games = ['SS','BDSP', 'LGPE'];
						var gen7Games = ['SM','USUM'];
						var gen6Games = ['XY','ORAS'];
						var gen3Games = ['RSE','FRLG'];

						if (gen9Games.includes(randomFolder)) 
						{
							randomFolder = 'SV';
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
						else if (gen8Games.includes(randomFolder))
						{
							randomFolder = 'SS';
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
						else if (gen7Games.includes(randomFolder))
						{
							randomFolder = 'SM';
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
						else if (gen6Games.includes(randomFolder))
						{
							randomFolder = 'XY';
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
						else if (gen3Games.includes(randomFolder))
						{
							randomFolder = 'RSE';
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
						else
						{
							var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';
						}
					}
					else
					{
						var randomFolder = folders[Math.floor(Math.random() * folders.length)];

						var newUrl = 'images/Pokemon/' + randomFolder + '/' + formattedNum + '.png';

						if (randomFolder == 'SS') {
									var randomSubFolder = Math.random();
							if (randomSubFolder < 0.20) {
								randomFolder = 'SS';
							}
							else if (randomSubFolder < 0.40 && randomNum <= 493) {
								randomFolder = 'BDSP';
							}
							else if (randomSubFolder < 0.60 && (pokemonPLA.includes(randomNum)) ) {
								randomFolder = 'PLA';
							}
							else if (randomSubFolder < 0.80 && (pokemonPLZA.includes(randomNum)) ) {
								randomFolder = 'PLZA';
							}					
							else if(randomSubFolder < 1 && randomNum <= 150){
								randomFolder = 'LGPE';
							}
						}
						if (randomFolder == 'SM') {
							var randomSubFolder = Math.random();
							if (randomSubFolder < 0.5) {
								randomFolder = 'SM';
							}else{randomFolder = 'USUM';}
						}
						if (randomFolder == 'XY') {
							var randomSubFolder = Math.random();
							if (randomSubFolder < 0.5) {
								randomFolder = 'XY';
							}else{randomFolder = 'ORAS';}
						}
						if (randomFolder == 'RSE' && randomNum <= 386) {
							var randomSubFolder = Math.random();
							if (randomSubFolder < 0.5) {
								randomFolder = 'RSE';
							}else{randomFolder = 'FRLG';}
						}
						var iconUrl = icons[randomFolder];
					}
					
						


					// Check if the image exists
					var img = new Image();
					img.src = newUrl;
					try
					{
						img.onload = function() {
							isValidImage = true;
							$img.attr('src', newUrl);
							$img.siblings('.icon').attr('src', iconUrl);
						};
						img.onerror = function() {
							isValidImage = false;
							try {
								tryLoadImage(); // Try loading another image
							} catch (e) {
								console.warn('Failed to load image:', newUrl);
							}
						};
					}
					catch (e)
					{

						console.warn('Failed to load image:', newUrl);

					}
				}

				try {
					tryLoadImage();
				} catch (e) {
					console.warn('Failed to load image:', e);
				}
			});

			// Add click event listener to set free space
			$('#freeSpaceButton').off('click').on('click', function() {
				var freeSpaceNumber = $('#freeSpaceNumber').val();
				var freeSpaceGeneration = $('#freeSpaceGeneration').val();
				var freeSpaceGenerationIcon = freeSpaceGeneration;
				if (['PLA','BDSP','LGPE','PLZA'].includes(freeSpaceGeneration)) {
					freeSpaceGeneration = 'SS';
				}
				if (['USUM','SM'].includes(freeSpaceGeneration)) {
					freeSpaceGeneration = 'SM';
				}
				if (['ORAS','XY'].includes(freeSpaceGeneration)) {
					freeSpaceGeneration = 'XY';
				}
				else if (['FRLG'].includes(freeSpaceGeneration)) {
					freeSpaceGeneration = 'RSE';
				}
				if(['DPPT','HGSS'].includes(freeSpaceGenerationIcon)) {
					freeSpaceGenerationIcon = 'DPPT_HGSS';
				}
				if (freeSpaceNumber >= 1 && freeSpaceNumber <= 1025) {
					var formattedNum = freeSpaceNumber.toString().padStart(3, '0');
				
					//getPokemonImage(formattedNum);
				
					var newUrl = 'images/Pokemon/' + freeSpaceGeneration + '/' + formattedNum + '.png';
					var iconUrl = 'images/Icons/' + freeSpaceGenerationIcon + '.png';
				
					// Check if the image exists
					var img = new Image();
					img.src = newUrl;
					img.onload = function() {
						$('#freeSpace').attr('src', newUrl);
						$('#freeSpaceGen').attr('src', iconUrl);
					};
					img.onerror = function() {
						alert('Pokemon is not Obtainable in Selected Generation. Please enter a valid Pokedex Number.');
					};
				} else {
					alert('Please enter a number between 1 and 1025.');
				}
			});

			// Add click event listener to set custom spaces
			$('#customSpaceButton').off('click').on('click', function() {
				var customSpaceLocation = $('#customSpaceLocation').val();
				var customSpaceNumber = $('#customSpaceNumber').val();
				var customSpaceGeneration = $('#customSpaceGeneration').val();
				var customSpaceGenerationIcon = customSpaceGeneration;
			
				if (customSpaceLocation < 1 || customSpaceLocation > 25) {
					alert('Please enter a location number between 1 and 25.');
					return;
				}

				if (['PLA','BDSP','LGPE','PLZA'].includes(customSpaceGeneration)) {
					customSpaceGeneration = 'SS';
				}
				if (['USUM','SM'].includes(customSpaceGeneration)) {
					customSpaceGeneration = 'SM';
				}
				if (['ORAS','XY'].includes(customSpaceGeneration)) {
					customSpaceGeneration = 'XY';
				}
				if (['FRLG'].includes(customSpaceGeneration)) {
					customSpaceGeneration = 'RSE';
				}
				if(['DPPT','HGSS'].includes(customSpaceGenerationIcon)) {
					customSpaceGenerationIcon = 'DPPT_HGSS';
				}
				if (customSpaceNumber >= 1 && customSpaceNumber <= 1025) {
					var formattedNum = customSpaceNumber.toString().padStart(3, '0');
					var newUrl = 'images/Pokemon/' + customSpaceGeneration + '/' + formattedNum + '.png';
					var iconUrl = 'images/Icons/' + customSpaceGenerationIcon + '.png';
				
					//Format the location to add leading zero
					var formattedLocation = customSpaceLocation.toString().padStart(2, '0');
					var pokemonId = '#p' + formattedLocation;
					var iconId = '#i' + formattedLocation;


					// Check if the image exists
					var img = new Image();
					img.src = newUrl;
					img.onload = function() {
						$(pokemonId).attr('src', newUrl);
						$(iconId).attr('src', iconUrl);
					};
					img.onerror = function() {
						alert('Pokemon is not Obtainable in Selected Generation. Please enter a valid Pokedex Number.');
					};
				} else {
					alert('Please enter a number between 1 and 1025.');
				}
			});

			// Add click event listener to export table as PNG
			$('#exportButton').off('click').on('click', function() {

				$('#exportArea').css({
					'position': 'relative',
					'background-image': 'linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)),url("/ShinyPokemonBingoGenerator/images/bg.jpg")',
					'background-size': 'cover',
					'background-position': 'center',
					'background-repeat': 'no-repeat'
				});

				html2canvas(document.querySelector("#exportArea"), {
					logging: true,
					scale: 2,
					backgroundColor: null
				}).then(canvas => {
					var link = document.createElement('a');
					link.href = canvas.toDataURL();
					link.download = 'bingoTable.png';
					link.click();

					$('#exportArea').css({
						'background-image': '',
						'background-size': '',
						'background-position': '',
						'background-repeat': ''
					});
				}).catch(function (error) {
					console.error('Error capturing the table:', error);
					$('#exportArea').css({
						'background-image': '',
						'background-size': '',
						'background-position': '',
						'background-repeat': ''
					});
				});
			});
		}

		/* //not used currently
		function getPokemonImage(pokemon) {
			const P = new Pokedex.Pokedex({ cacheImages: true });
			try {
					//const Pokedex = require("pokeapi-js-wrapper");

					(async () => {
						try {
							const sprite = await P.getPokemonByName(pokemon);
							console.log(sprite.sprites.versions);
						} catch (err) {
							console.error('Error fetching Pokemon:', err);
						}
					})();
				} catch (err) {
					console.error('Error initializing Pokedex:', err);
				}
		};
		*/
	});


	// Global error handler for images
	$(document).on('error', 'img', function() {
		console.warn('Image failed to load:', $(this).attr('src'));
	});






	/**
	 * Generate an indented list of links from a nav. Meant for use with panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Vars.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Config.
			config = $.extend({

				// Delay.
					delay: 0,

				// Hide panel on link click.
					hideOnClick: false,

				// Hide panel on escape keypress.
					hideOnEscape: false,

				// Hide panel on swipe.
					hideOnSwipe: false,

				// Reset scroll position on hide.
					resetScroll: false,

				// Reset forms on hide.
					resetForms: false,

				// Side of viewport the panel will appear.
					side: null,

				// Target element for "class".
					target: $this,

				// Class to toggle.
					visibleClass: 'visible'

			}, userConfig);

			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Panel.

			// Methods.
				$this._hide = function(event) {

					// Already hidden? Bail.
						if (!config.target.hasClass(config.visibleClass))
							return;

					// If an event was provided, cancel it.
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Hide.
						config.target.removeClass(config.visibleClass);

					// Post-hide stuff.
						window.setTimeout(function() {

							// Reset scroll position.
								if (config.resetScroll)
									$this.scrollTop(0);

							// Reset forms.
								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Vendor fixes.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			// Hide on click.
				if (config.hideOnClick) {

					$this.find('a')
						.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

					$this
						.on('click', 'a', function(event) {

							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

							if (!href || href == '#' || href == '' || href == '#' + id)
								return;

							// Cancel original event.
								event.preventDefault();
								event.stopPropagation();

							// Hide panel.
								$this._hide();

							// Redirect to href.
								window.setTimeout(function() {

									if (target == '_blank')
										window.open(href);
									else
										window.location.href = href;

								}, config.delay + 10);

						});

				}

			// Event: Touch stuff.
				$this.on('touchstart', function(event) {

					$this.touchPosX = event.originalEvent.touches[0].pageX;
					$this.touchPosY = event.originalEvent.touches[0].pageY;

				})

				$this.on('touchmove', function(event) {

					if ($this.touchPosX === null
					||	$this.touchPosY === null)
						return;

					var	diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
						diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
						th = $this.outerHeight(),
						ts = ($this.get(0).scrollHeight - $this.scrollTop());

					// Hide on swipe?
						if (config.hideOnSwipe) {

							var result = false,
								boundary = 20,
								delta = 50;

							switch (config.side) {

								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;

								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;

								case 'top':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
									break;

								case 'bottom':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
									break;

								default:
									break;

							}

							if (result) {

								$this.touchPosX = null;
								$this.touchPosY = null;
								$this._hide();

								return false;

							}

						}

					// Prevent vertical scrolling past the top or bottom.
						if (($this.scrollTop() < 0 && diffY < 0)
						|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

							event.preventDefault();
							event.stopPropagation();

						}

				});

			// Event: Prevent certain events inside the panel from bubbling.
				$this.on('click touchend touchstart touchmove', function(event) {
					event.stopPropagation();
				});

			// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
				$this.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.removeClass(config.visibleClass);

				});

		// Body.

			// Event: Hide panel on body click/tap.
				$body.on('click touchend', function(event) {
					$this._hide(event);
				});

			// Event: Toggle.
				$body.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.toggleClass(config.visibleClass);

				});

		// Window.

			// Event: Hide on ESC.
				if (config.hideOnEscape)
					$window.on('keydown', function(event) {

						if (event.keyCode == 27)
							$this._hide(event);

					});

		return $this;

	};

	/**
	 * Apply "placeholder" attribute polyfill to one or more forms.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.placeholder = function() {

		// Browser natively supports placeholders? Bail.
			if (typeof (document.createElement('input')).placeholder != 'undefined')
				return $(this);

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).placeholder();

				return $this;

			}

		// Vars.
			var $this = $(this);

		// Text, TextArea.
			$this.find('input[type=text],textarea')
				.each(function() {

					var i = $(this);

					if (i.val() == ''
					||  i.val() == i.attr('placeholder'))
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('blur', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == '')
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('focus', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == i.attr('placeholder'))
						i
							.removeClass('polyfill-placeholder')
							.val('');

				});

		// Password.
			$this.find('input[type=password]')
				.each(function() {

					var i = $(this);
					var x = $(
								$('<div>')
									.append(i.clone())
									.remove()
									.html()
									.replace(/type="password"/i, 'type="text"')
									.replace(/type=password/i, 'type=text')
					);

					if (i.attr('id') != '')
						x.attr('id', i.attr('id') + '-polyfill-field');

					if (i.attr('name') != '')
						x.attr('name', i.attr('name') + '-polyfill-field');

					x.addClass('polyfill-placeholder')
						.val(x.attr('placeholder')).insertAfter(i);

					if (i.val() == '')
						i.hide();
					else
						x.hide();

					i
						.on('blur', function(event) {

							event.preventDefault();

							var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

							if (i.val() == '') {

								i.hide();
								x.show();

							}

						});

					x
						.on('focus', function(event) {

							event.preventDefault();

							var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

							x.hide();

							i
								.show()
								.focus();

						})
						.on('keypress', function(event) {

							event.preventDefault();
							x.val('');

						});

				});

		// Events.
			$this
				.on('submit', function() {

					$this.find('input[type=text],input[type=password],textarea')
						.each(function(event) {

							var i = $(this);

							if (i.attr('name').match(/-polyfill-field$/))
								i.attr('name', '');

							if (i.val() == i.attr('placeholder')) {

								i.removeClass('polyfill-placeholder');
								i.val('');

							}

						});

				})
				.on('reset', function(event) {

					event.preventDefault();

					$this.find('select')
						.val($('option:first').val());

					$this.find('input,textarea')
						.each(function() {

							var i = $(this),
								x;

							i.removeClass('polyfill-placeholder');

							switch (this.type) {

								case 'submit':
								case 'reset':
									break;

								case 'password':
									i.val(i.attr('defaultValue'));

									x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

									if (i.val() == '') {
										i.hide();
										x.show();
									}
									else {
										i.show();
										x.hide();
									}

									break;

								case 'checkbox':
								case 'radio':
									i.attr('checked', i.attr('defaultValue'));
									break;

								case 'text':
								case 'textarea':
									i.val(i.attr('defaultValue'));

									if (i.val() == '') {
										i.addClass('polyfill-placeholder');
										i.val(i.attr('placeholder'));
									}

									break;

								default:
									i.val(i.attr('defaultValue'));
									break;

							}
						});

				});

		return $this;

	};

	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * @param {jQuery} $elements Elements (or selector) to move.
	 * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
	 */
	$.prioritize = function($elements, condition) {

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
			if (typeof $elements != 'jQuery')
				$elements = $($elements);

		// Step through elements.
			$elements.each(function() {

				var	$e = $(this), $p,
					$parent = $e.parent();

				// No parent? Bail.
					if ($parent.length == 0)
						return;

				// Not moved? Move it.
					if (!$e.data(key)) {

						// Condition is false? Bail.
							if (!condition)
								return;

						// Get placeholder (which will serve as our point of reference for when this element needs to move back).
							$p = $e.prev();

							// Couldn't find anything? Means this element's already at the top, so bail.
								if ($p.length == 0)
									return;

						// Move element to top of parent.
							$e.prependTo($parent);

						// Mark element as moved.
							$e.data(key, $p);

					}

				// Moved already?
					else {

						// Condition is true? Bail.
							if (condition)
								return;

						$p = $e.data(key);

						// Move element back to its original location (using our placeholder).
							$e.insertAfter($p);

						// Unmark element as moved.
							$e.removeData(key);

					}

			});

	};

})(jQuery);