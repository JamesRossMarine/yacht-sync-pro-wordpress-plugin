var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel, params) {
		let meters = parseInt(vessel.NominalLength) * 0.3048;

		let price = '';
		let length = '';

		if (rai_yacht_sync.europe_option_picked == "yes") {
			length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
			price = (typeof vessel.YSP_EuroVal != 'undefined' && vessel.YSP_EuroVal > 0) ? `€${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
		} 
		else {
			length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';

			if (params.currency == 'Eur') {
				price = (typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0) ? `€${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_EuroVal) }` : 'Contact Us For Price';
			}
			else {
				price = (typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0) ? `$${new Intl.NumberFormat('en-us', { minimumFractionDigits: 2}).format(vessel.YSP_USDVal) }` : 'Contact Us For Price';
			}

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

	ysp_templates.yacht.compare_preview = function(vessel, params) {

		return `

			<div class="ysp-yacht-compare-preview" data-post-id="${ vessel._postID }" data-yacht-id="${ vessel.DocumentID }">			
				<span class="remove-from-compare">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#6B7073"/>
					<path d="M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z" fill="#6B7073"/>
					</svg>
				</span>


				<img class="yacht-main-image" src="${vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg'}" alt="yacht-image" loading="lazy" />

				<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>

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

