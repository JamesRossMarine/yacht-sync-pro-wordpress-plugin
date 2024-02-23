var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;

		let price = '';
		let length = '';

		if(rai_yacht_sync.europe_option_picked == "yes"){
			console.log(vessel);
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `€ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
		} 

		else {
			console.log(vessel);
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `$ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_USDVal) }` : 'Contact Us For Price'
		}

		return `
			<div class="yacht-result-grid-item" data-post-id="${ vessel._postID }">
				<div class="yacht-main-image-container">
					<a class="yacht-details" href="${ vessel._link }">
						<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
						${vessel.CompanyName === rai_yacht_sync.company_name ? `<div class="company-banner"><img src="${rai_yacht_sync.company_logo}"></div>` : ''}
					</a>	
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<a class="yacht-details" href="${ vessel._link }">
							<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
						</a>
					</div>
					<div class="yacht-info-container">
						<div class="yacht-info">
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Year</p>
								<p class="yacht-individual-value">${vessel.ModelYear ? vessel.ModelYear : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Cabins</p>
								<p class="yacht-individual-value">${vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Builder</p>
								<p class="yacht-individual-value">${vessel.MakeString ? vessel.MakeString : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Length</p>
								<p class="yacht-individual-value">${length}</p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${price}</p>
						</div>
						
						<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>
					</div>
				</div>
			</div>
		`;
	};

	ysp_templates.yacht.list=function(vessel) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;
		let price = '';

		if (typeof vessel.Price == 'string') {
			let price = vessel.Price.slice(0, -3);
		}
		
		let length = '';
		
		if(rai_yacht_sync.europe_option_picked == "yes"){
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `€ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format((parseInt(vessel.Price.slice(0, -3)) * rai_yacht_sync.euro_c_c))}` : 'Contact Us For Price';
		} else {
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
			price = vessel.Price ? `$ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(parseInt(vessel.Price.slice(0, -3)))}` : 'Contact Us For Price'
		}

		return `
			<div class="yacht-result-grid-item list-view" data-post-id="${ vessel._postID }">
				<div class="yacht-main-image-container">
					<a class="yacht-details" href="${ vessel._link }">
						<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />
					</a>
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<a class="yacht-details" href="${ vessel._link }">
							<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
						</a>
					</div>
					<div class="yacht-info-container">
						<div class="yacht-info">
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Year</p>
								<p class="yacht-individual-value">${vessel.ModelYear ? vessel.ModelYear : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Cabins</p>
								<p class="yacht-individual-value">${vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Builder</p>
								<p class="yacht-individual-value">${vessel.MakeString ? vessel.MakeString : 'N/A'}</p>
							</div>
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Length</p>
								<p class="yacht-individual-value">${length}</p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${price}</p>
						</div>
						<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>
					</div>
				</div>
			</div>
			
		`;
	};

	ysp_templates.noResults=function() {

        return `
            <div>
                <b>No Results</b>
            </div>
        `;

    };


    ysp_templates.yacht_tag = function(label, value) {

    	return `
    		${value}

			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
			<g clip-path="url(#clip0_205_399)">
			<circle cx="4.5" cy="4.5" r="4.5" fill="#94A3B8"/>
			<path d="M3.09375 5.90625L5.90625 3.09375M3.09375 3.09375L5.90625 5.90625" stroke="#F2F2F2" stroke-width="0.69" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
			<defs>
			<clipPath id="clip0_205_399">
			<rect width="9" height="9" fill="white"/>
			</clipPath>
			</defs>
			</svg>
    	`;
    };
