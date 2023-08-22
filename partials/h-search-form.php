<form role="search" class="ysp-yacht-search-form" action="https://superiygdev.wpengine.com/all-yacht-search" method="get" id="ysp-yacht-search-form">
            <div class="search-yacht">
                <div class="row">

                    <!--  Search yacht form  -->
                    <div class="col-xl-10 col-lg-12">
                        <div class="row g-3">
                            <div class="col-lg-3 col-sm-6">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Select a builder</label>
                                </div>
                                <select name="make" class="form-select" data-fill-label="Builders">
                                    <option value="" selected="">Any builder</option>
                                </select>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Year</label>
                                </div>
                                <div class="row g-2">
                                    <div class="col">
                                        <input name="yearlo" type="number" class="form-control" placeholder="From 1960" aria-label="From 1960" min="1960" max="2023">
                                    </div>
                                    <div class="col">
                                        <input name="yearhi" type="number" class="form-control" placeholder="To 2023" aria-label="To 2023" min="1960" max="2023">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                                <div class="sy-form-label d-flex align-items-center">
                                    <label for="" class="form-label w-100">Length</label>
                                    <div class="flex-shrink-1">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="lengthbtnradio1" id="lenghtft1" autocomplete="off" checked="">
                                            <label id="feet-label-desktop" class="btn btn-outline-dark" for="lenghtft1" onclick="checkFeet()">ft</label>

                                            <input type="radio" class="btn-check" name="lengthbtnradio1" id="lenghtm1" autocomplete="off">
                                            <label id="meter-label-desktop" class="btn btn-outline-dark" for="lenghtm1" onclick="checkMeter()">m</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-2">
                                    <div class="col">
                                        <input name="lengthlo" type="number" class="form-control" placeholder="Min" aria-label="Min">
                                    </div>
                                    <div class="col">
                                        <input name="lengthhi" type="number" class="form-control" placeholder="Max" aria-label="Max">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-6">
                                <div class="sy-form-label d-flex align-items-center">
                                    <label for="" class="form-label w-100">Price ($)</label>
                                    <div class="flex-shrink-1">
                                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" class="btn-check" name="pricebtnradio" id="pricedollar1" autocomplete="off" checked="">
                                            <label class="btn btn-outline-dark" for="pricedollar1">$</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-2">
                                    <div class="col">
                                        <input name="pricelo" type="number" class="form-control" placeholder="Min" aria-label="Min">
                                    </div>
                                    <div class="col">
                                        <input name="pricehi" type="text" class="form-control" placeholder="Max" aria-label="Max">
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-6 d-none d-md-block">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Stateroom</label>
                                </div>
                                <select name="staterooms" class="form-select" aria-label="Default select">
                                    <option value="" selected="">Any amount of cabins</option>
                                <option value="0">0 Cabins</option><option value="1">1 Cabins</option><option value="2">2 Cabins</option><option value="3">3 Cabins</option><option value="4">4 Cabins</option><option value="5">5 Cabins</option><option value="6">6 Cabins</option><option value="7">7 Cabins</option><option value="8">8 Cabins</option><option value="9">9 Cabins</option><option value="10">10 Cabins</option></select>
                            </div>

                            <div class="col-lg-3 col-sm-6 d-none d-md-block">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Hull material</label>
                                </div>
                                <select data-fill-label="HullMaterials" name="hullMaterial" class="form-select fill-hulls" aria-label="Default select">
                                    <option value="" selected="">Any Material</option>
                                </select>
                            </div>

                            <div class="col-lg-3 col-sm-6 d-none d-md-block">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Boat name</label>
                                </div>
                                <div class="input-with-icon position-relative">
                                    <input name="keyword" type="search" class="form-control" placeholder="Search by keyword" aria-label="search by keyword">
                                    <i class="fa fa-search"></i>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 d-none d-md-block">
                                <div class="sy-form-label">
                                    <label for="" class="form-label">Condition</label>
                                </div>
                                <select name="condition" class="form-select" aria-label="Default select">
                                    <option value="" selected="">Any</option>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!--  Search yacht form  -->

                    <!--  Search yacht action  -->
                    <div class="col-xl-2 col-lg-3">
                        <div class="search-action">
                            <button type="submit" class="btn btn-primary w-100">Search</button>

                            <button class="reset-search" type="reset" style="background-color: transparent; border: 0px; padding: 0;">
                                <a href="#">Reset all <i class="fa fa-redo"></i></a>
                            </button>
                        </div>
                    </div>
                    <!--  Search yacht action  -->

                </div>
            </div>
        </form>