var ysp_templates={};
	ysp_templates.yacht={};
	
	ysp_templates.yacht.grid=function(vessel) {
		return `
			<p>Grid Hello: ${ vessel.DocumentID }</p>
		`;
	};

	ysp_templates.yacht.list=function(vessel) {
		return `
			<p>List Hello; ${ vessel.DocumentID }</p>
		`;
	};

	ysp_templates.noResults=function() {

        return `
            <div>
                <b>No Results</b>
            </div>
        `;

    };

