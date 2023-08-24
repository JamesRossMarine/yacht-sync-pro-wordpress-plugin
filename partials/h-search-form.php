<div id="h-search-container">
    <form id="ysp-yacht-search-form" class="ys-h-row ysp-yacht-search-form">
        <input type="hidden" name="page_index" />

        <div class="ys-h-row-item">
            <label>Keyword</label>
            <input type="text" name="ys_keyword" placeholder="Search by Name" list="ysp_keywords_list" />
        </div>
        <div class="ys-h-row-item">
            <label>Builder</label>
            <select name="make" data-fill-options="Builders">
                <option value="" selected disabled>Any</option>
                
            </select>
        </div>
        <div class="ys-h-row-item">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Length</label>
            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Price</label>
            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Staterooms</label>
            <select name="staterooms">
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="ys-h-row-item">
            <label>Hull</label>
            <select name="hull" data-fill-options="HullMaterials">
                <option value="">Any</option>
                
            </select>
        </div>
        <div class="ys-h-row-item">
            <label>Condition</label>
            <select name="condition">
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
            </select>
        </div>
        <div class="ys-h-row-item submit-container">
            <label>Submit</label>
            <input type="submit" name="submit" value="Submit"/>
        </div>
    </form>
</div>

<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>