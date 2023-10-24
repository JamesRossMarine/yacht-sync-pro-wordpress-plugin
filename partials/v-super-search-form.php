<div id="v-search-container">
    <form id="ysp-yacht-search-form" class="ys-v-row ysp-yacht-search-form ysp-form" >
    <input type="hidden" name="page_index" />    
    <div class="ys-v-row-item">
            <label>Keyword</label>
            <input type="text" name="ys_keyword" placeholder="Search by Name, Models, Builders, Size, And Location!" list="ysp_keywords_list" />

            <!-- <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon/search">
                    <path id="Vector" d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M14.0001 14.0001L11.1001 11.1001" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg> -->
        </div>
        <div class="ys-v-row-item">
            <label>Condition</label>

            <div style="height: 100px; overflow-y: scroll;">
                <label><input type="checkbox" name="condition" value="" style='width: auto;'> Both</label>
                <label><input type="checkbox" name="condition" value="Used" style='width: auto;'> Used</label>
                <label><input type="checkbox" name="condition" value="New" style='width: auto;'> New</label>
            </div>
        </div>

        <div class="ys-v-row-item">
            <label>Type</label>
            
            <div style="height: 200px; overflow-y: scroll;">
                <?php 
                    echo "<label class='pick-all'><input type='checkbox' name='boatclass' value='' style='width: auto;'> All</label>";

                    $categories = get_terms([
                        'taxonomy'   => 'boatclass',
                    ]);

                    foreach ($categories as $cat) {
                        
                        echo "<label><input type='checkbox' name='boatclass' value='$cat->name' style='width: auto;'> $cat->name</label>";

                    }
                ?>
            </div>
        </div>

        <div class="ys-v-row-item">
            <label>Builder</label>
            
            <div style="height: 200px; overflow-y: scroll;">
                <?php 
                    echo "<label><input type='checkbox' name='make' value='' style='width: auto;'> All</label>";
                   
                    $YSP_DBHelper = new raiYachtSync_DBHelper();

                    $builders = $YSP_DBHelper->get_unique_yacht_meta_values('MakeString');

                    foreach ($builders as $build) {

                        echo "<label><input type='checkbox' name='make' value='$build' style='width: auto;'> $build</label>";

                    }
                ?>
            </div>
        </div>

       <!--  <div class="ys-v-row-item">
            <label>Hull</label>
            
            <div style="height: 100px; overflow-y: scroll;">
                <?php 
                    echo "<label  class='pick-all'><input type='checkbox' name='staterooms' value='' style='width: auto;'> All</label>";

                    $hulls = $YSP_DBHelper->get_unique_yacht_meta_values('BoatHullMaterialCode');

                    foreach ($hulls as $hull) {

                        echo "<label><input type='checkbox' name='hull' value='$hull' style='width: auto;'> $hull</label>";

                    }
                ?>
            </div>
        </div>
 -->
        <!-- <div class="ys-v-row-item">
            <label>Staterooms</label>
            
            <div style="height: 100px; overflow-y: scroll;">
                <?php 
                    echo "<label  class='pick-all'><input type='checkbox' name='staterooms' value='' style='width: auto;'> All</label>";
                    
                    for ($s=1; $s <= 9; $s++) {

                        echo "<label><input type='checkbox' name='staterooms' value='$s' style='width: auto;'> Stateroom $s</label>";

                    }
                ?>
            </div>
        </div> -->
        
        
        
        <div class="ys-v-row-item">
            <label>Year</label>
            <div class="min-max-container">
                <input type="number" name="yearlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="yearhi" placeholder="Max"/>
            </div>
        </div>
        
        <div class="ys-v-row-item">
            <label>Length</label>
            <div class="min-max-container">
                <input type="number" name="lengthlo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="lengthhi" placeholder="Max"/>
            </div>
        </div>
        
        <div class="ys-v-row-item">
            <label>Price</label>
            <div class="min-max-container">
                <input type="number" name="pricelo" placeholder="Min"/>
                <span>-</span>
                <input type="number" name="pricehi" placeholder="Max"/>
            </div>
        </div>
        
        <div class="ys-v-row-item submit-container">
            <input class="ysp-general-button" type="submit" value="Submit"/>
        </div>
    </form>
</div>


<datalist id="ysp_keywords_list" data-fill-list='Keywords'></datalist>