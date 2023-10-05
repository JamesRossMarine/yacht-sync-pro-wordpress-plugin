<section id="search-result-section" class="search-result-section">
	<div class="scroll-to-here-on-yacht-search"></div>

    <h5 class="yacht-search-total">
        <span class="total-results-title"><span id="total-results"></span> YACHTS FOUND</span>
    </h5>
     

    <label><input type="checkbox" name="ys_company_only" value="1" form="ysp-yacht-search-form"> Company Only</label>

    <div class="yacht-search-options">
        <div class="list-view-and-sort-container">
            <div class="list-view-group">
                <label class="grid-view">
                    <input type="radio" form="ysp-yacht-search-form" name="view" value="grid" style="display: none;">

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 6H14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 10H14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 2V14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 2V14" stroke="#334155" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        Gallery
                    </span>
                </label>

                <label class="list-view">
                    <input type="radio" form="ysp-yacht-search-form" name="view" value="list" style="display: none;">

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M2.66699 8H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66699 4H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66699 12H13.3337" stroke="#94A3B8" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        List
                    </span>
                </label>
            </div>

            <div>
                <label>Filter by: </label>

                <select name="sortBy" form="ysp-yacht-search-form">
                    <option value="">pick a sort</option>
                    
                    <option value="length:desc">Length: high to low</option>
                    <option value="length:asc">Length: low to high</option>
                    
                    <option value="price:desc">Price: high to low</option>
                    <option value="price:asc">Price: low to high</option>

                    <option value="year:desc">Year: high to low</option>
                    <option value="year:asc">Year: low to high</option>

                    <option value="timeon:desc">Least time on market</option>
                    <option value="timeon:asc">Most time on market</option>
                </select>
            </div>
        </div>
    </div>

    <div class="loader-icon">
        <img src="<?php echo RAI_YS_PLUGIN_ASSETS; ?>/images/loading-icon.gif" alt="loading-gif" />
    </div>

    <div class="search-result-grid">
        <div id="search-result-row">
            
        </div>
    </div>

    <div id="yachts-pagination">

    </div>
</section>