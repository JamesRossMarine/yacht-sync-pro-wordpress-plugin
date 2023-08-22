var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel) {
		return `
			<p>HEELOO ${ vessel.DocumentID }</p>
		`;
	};

	ysp_templates.yacht.list=function(vessel) {

	};

	ysp_templates.noResults=function() {

        return `
            <div>
                <b>No Results</b>
            </div>
        `;

    };

