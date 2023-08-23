var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel) {
		return `
			<div class="yacht-result-grid-item">
				<div class="yacht-main-image-container">
					<img class="yacht-main-image" src="${vessel.Images[0] ? vessel.Images[0].Uri : ''}" alt="yacht-image"/>
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
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
								<p class="yacht-individual-value">${vessel.LengthOverall ? vessel.LengthOverall + " / " + (parseInt(vessel.LengthOverall) * 0.3048).toFixed(2) + ' m' : 'N/A'}</p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${vessel.Price ? '$' + vessel.Price.slice(0, -3) : 'Contact Us For Price'}</p>
						</div>
						<a class="yacht-details" href="#">
							Details
						</a>
					</div>
				</div>
			</div>
		`;
	};

	ysp_templates.yacht.list=function(vessel) {
		return `
			<div class="yacht-result-grid-item list-view">
				<div class="yacht-main-image-container">
					<img class="yacht-main-image" src="${vessel.Images[0] ? vessel.Images[0].Uri : ''}" alt="yacht-image"/>
				</div>
				<div class="yacht-general-info-container">
					<div class="yacht-title-container">
						<h6 class="yacht-title">${vessel.ModelYear ? vessel.ModelYear : ''} ${vessel.MakeString ? vessel.MakeString : ''} ${vessel.Model ? vessel.Model : ''} ${vessel.BoatName ? vessel.BoatName : ''}</h6>
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
								<p class="yacht-individual-value">${vessel.LengthOverall ? vessel.LengthOverall + " / " + (parseInt(vessel.LengthOverall) * 0.3048).toFixed(2) + ' m' : 'N/A'}</p>
							</div>
						</div>
					</div>
					<div class="yacht-price-details-container">
						<div class="yacht-price-container">
							<p class="yacht-price">${vessel.Price ? '$' + vessel.Price.slice(0, -3) : 'Contact Us For Price'}</p>
						</div>
						<a class="yacht-details" href="#">
							Details
						</a>
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

