var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;

		let price = '';
		let length = '';

		if(rai_yacht_sync.europe_option_picked == "yes"){
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = (typeof vessel.YSP_EuroVal != 'undefined' && vessel.YSP_EuroVal > 0) ? `€ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
		} 

		else {
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
			price = (typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0) ? `$ ${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_USDVal) }` : 'Contact Us For Price'
		}

		return `
			<div class="yacht-result-grid-item" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">
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
							<div class="yacht-individual-container">
								<p class="yacht-individual-title">Compare</p>
								<p class="yacht-individual-value"><input type="checkbox" class="compare_toggle" name="compare" value="${ vessel._postID }" /></p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${price}</p>
						</div>
						
						<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>
						<button class="love" type="button" data-yacht-id="${ vessel.DocumentID }">Liked</button>
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
    		<span>
	    		${value}

	    		<img src="${rai_yacht_sync.assets_url}/images/remove-tag.png">
			</span>
    	`;
    };

    ysp_templates.pagination = {};
    
    	ysp_templates.pagination.next_text = `>`;

    	ysp_templates.pagination.prev_text = `<`;

