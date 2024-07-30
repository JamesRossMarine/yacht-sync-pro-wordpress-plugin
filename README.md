# Yacht Sync Pro

## Description

Yacht Sync Pro, our WordPress plugin, is a new way to integrate three major MLS feeds (YachtWorld, YachtBroker, and/or Yatco) natively into your WordPress site. Benefit from SEO tactics, easy-to-use shortcodes, and the ability to customize templates.

## Top 5 Features

- Imports Three Major MLS API Feeds Into Custom WordPress Post-Type
- Clean URLs for detail and search pages
- AI SEO For Yacht Detail Pages Meta Descriptions
- Easy to use Gutenberg blocks and shortcodes for search elements
- PDF Brochure Yacht Listings
- Fast yacht search around and has great SEO compatibility 

## More Features

- ChatGPT is used for content generation
- Currency exchange used for pricing conventions 
- URLBox is used for PDF Rendering
- Full Template Customization 
- Basic Lead Forms
- Broker Features
- Detail pages

## Featured Sites With The Plugin

- [theitalianyachtgroup.com](https://theitalianyachtgroup.com)
- [preowned.palmbeachmotoryachts.com](https://preowned.palmbeachmotoryachts.com)
- [southjerseyyachtsales.com](https://southjerseyyachtsales.com)
- [hbgyachts.com](https://hbgyachts.com)

## Credits

- **Developers**: [Joshua Hoffman](https://joshuahoffman.me), [Brandon Creed](https://github.com/brcre001), and Hauk Atkinson.
- **Special thanks** to Olivier Solon for project wrangling.
- **Special thanks** to Neil Ross for Supporting and Funding.

## Hosting Recommendation

We recommend our excellent hosting partner, [Convesio.com](https://convesio.com); from their incredible prices on cloud hosting to their 24/7 support via Slack, we can genuinely recommend them, knowing they will provide great service.

## Development Recommendations

We thank and recommend [Build The Internets](https://buildtheinternets.com) for your research and development needs. 

## Developer Note Below

## Post Types
<li>rai_yacht</li>
<li>rai_broker</li>

## Shortcodes
<li>ys-quick-search</li>
<li>ys-h-quick-search</li>
<li>ys-v-yacht-search-form</li>
<li>ys-h-yacht-search-form</li>
<li>ys-v-super-yacht-search-form</li>
<li>ys-yacht-results</li>
<li>ys-featured-listings</li>

## Filters
<li>rai_ys_v_yacht_search_template</li>
<li>rai_ys_v_super_yacht_search_template</li>
<li>rai_ys_h_yacht_search_template</li>
<li>rai_ys_quick_search_results_template</li>
<li>rai_ys_h_quick_search_results_template</li>
<li>rai_ys_featured_yacht_results_template</li>
<li>rai_ys_yacht_results_template</li>


## WP REST API
<li>/raiys/sync</li>
<li>/raiys/yachts</li>
<li>/raiys/list-options</li>
<li>/raiys/yacht-pdf</li>
<li>/raiys/yacht-pdf-loader</li>
<li>/raiys/yacht-pdf-download</li>
<li>/raiys/yacht-lead</li>
<li>/raiys/broker-lead</li>

## Commands
<li>wp sync-yachts</li>
<li>wp sync-brokerage-only</li>
<li>wp sitemap-generator</li>
<li>wp redo-yacht-meta-descriptions</li>

## WP Query Vars
<li>ys_offset - (int) - number at which to start retrieving boats for pagination</li>
<li>ys_keyword - (string) - for keyword search ex. 2017 Viking 50 $NACK MONEY</li>
<li>boatname - (string) - the name of the vessel given by the owner</li>
<li>condition - (string) - regards to whether the boat is new or used</li>
<li>hull - (string) - the hull material of the vessel ex. Fiberglass, Alumnium, etc.</li>
<li>staterooms - (int) - number of staterooms that the vessel has</li>
<li>make - (string) - the given make of the vessel ex. Viking, Princess, etc.</li>
<li>yearlo - (int) - the minimum year of the vessel you are looking for</li>
<li>yearhi - (int) - the maximum year of the vessel you are looking for</li>
<li>lengthunit - (string) - the option to have either feet or meters</li>
<li>lengthlo - (int) - the minimum length of the vessel you are looking for</li>
<li>lengthhi - (int) - the maximum length of the vessel you are looking for</li>
<li>pricelo - (int) - the minimum price of the vessel you are looking for</li>
<li>pricehi - (int) - the maximum price of the vessel you are looking for</li>
<li>stateroomlo - (int) - the minimum number of staterooms for the vessel you are looking for</li>
<li>stateroomhi - (int) - the maximum number of staterooms for the vessel you are looking for</li>
<li>ys_engineslo - (int) - the minimum number of engine for the vessel you are looking for</li>
<li>ys_engineshi - (int) - the maximum number of engine for the vessel you are looking for</li>
<li>ys_engine_model - (string) - the model of the engine for the boat</li>
<li>ys_engine_fuel - (string) - type of fuel the boat you are searching for uses</li>
<li>ys_engine_power - (string) - the horsepower that a boat has</li>
<li>ys_engine_hourslo - (string) - the minimum number of engine hours that you are looking for in a vessel</li>
<li>ys_engine_hourshi - (string) - the maximum number of engine hours that you are looking for in a vessel</li>
<li>ys_engine_type - (string) - the type of engine the boat has ex. Inboard, Outboard, etc.</li>
<li>ys_listing_date - (string) - the date when the listing was originally posted on the Yacht MLS</li>
<li>ys_euroval_lo - (int) - the minimum price in euros of the vessel you are looking for</li>
<li>ys_euroval_hi - (int) - the maximum price in euros of the vessel you are looking for</li>
<li>ys_country - (string) - the country the vessel is located in</li>
<li>ys_state - (string) - the state the vessel is located in</li>
<li>ys_city - (string) - the city the vessel is located in</li>
<li>page_index - (int) - the current page you are on in the search pages</li>
<li>sortby - (string) - options for sortby ex. Length High to Low, Price Low to High, etc.</li>
<li>ys_only_these - (array) - array of documentids of given vessels</li>
<li>ys_company_only - (int) - to identify vessels of the company ex. 0 (False) or 1 (True)</li>
<li>ys_show_only - (string) - to identify all the vessels not a part of the company</li>

## Dropdown Fill Options
<li>Builders - (array) - list of makes from all the available vessels</li>
<li>HullMaterials - (array) - list of hull materials from all the available vessels</li>

## List Fill Options
<li>Keywords - (array) - list all the key words that are typed in the input from available vessels</li>
<li>Cities - (array) - list of all the cities from all available vessels</li>
<li>Displayed Location - (array) - list of locations from all available vessels</li>



