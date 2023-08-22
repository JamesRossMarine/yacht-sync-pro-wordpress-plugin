<div id="h-search-container">
    <form id="h-search-form" class="ys-h-row">
        <div class="ys-h-row-item">
            <label>Keyword</label>
            <input type="text" name="keyword" placeholder="Search by Name" />
        </div>
        <div class="ys-h-row-item">
            <label>Builder</label>
            <select name="builder">
                <option value="" selected disabled>Any</option>
                <option value="Admiral">Admiral</option>
                <option value="Azimut">Azimut</option>
                <option value="Baglietto">Baglietto</option>
                <option value="Benetti">Benetti</option>
                <option value="Ferretti">Ferretti</option>
                <option value="Mangusta">Mangusta</option>
            </select>
        </div>
        <div class="ys-h-row-item">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="year-min" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="year-max" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Length</label>
            <div class="min-max-container">
                <input type="number" name="length-min" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="length-max" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Price</label>
            <div class="min-max-container">
                <input type="number" name="price-min" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="price-max" placeholder="Max"/>
            </div>
        </div>
        <div class="ys-h-row-item">
            <label>Staterooms</label>
            <select name="staterooms">
                <option value="" selected disabled>Any</option>
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
            <select name="hull">
                <option value="" selected disabled>Any</option>
                <option value="Aluminum">Aluminum</option>
                <option value="Composite">Composite</option>
                <option value="Fiberglass">Fiberglass</option>
                <option value="Resin">Resin</option>
                <option value="Wood">Wood</option>
            </select>
        </div>
        <div class="ys-h-row-item">
            <label>Condition</label>
            <select name="condition">
                <option value="" selected disabled>Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
            </select>
        </div>
    </form>
</div>