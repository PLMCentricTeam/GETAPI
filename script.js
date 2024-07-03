document.getElementById('fetch-button').addEventListener('click', fetchData);
function fetchData() {
    const token = document.getElementById('token').value;
    const limit = document.getElementById('limit').value;
    const Style = document.getElementById('searchInput').value;
    const URLStyle = `https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-prod.centricsoftware.com/csi-requesthandler/api/v2/styles?active=false&bag_ready_to_validate=true&limit=')}${limit}%26SecurityTokenURL=${token}`;
    console.log(URLStyle);
    let FilteredURLStyle = URLStyle;
    if (Style) {
        // If style name isn't blank
        FilteredURLStyle += '%26node_name=' + encodeURIComponent(Style); // add "Style Name" into link
    }
    console.log(FilteredURLStyle);
    var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            const jsonresponse = JSON.parse(this.responseText);
            const jsonData = JSON.parse(jsonresponse.contents);
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            displayData(jsonData);
        }
        //Display Data
        function displayData(jsonData) {
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            jsonData.forEach(item => {
                const tr = document.createElement('tr');
                const row = tableBody.insertRow();
                displayDataStylename();
                displayDataERPCode();
                displayDataCategory();
                displayDataProductCategory();
                displayDataProductType();
                displayDataDivision();
                displayDataProgram();
                displayDataStylingInfo();
                displayDataWashCategory();
                displayDataWashSubCategory();
                displayDataSizes();
                displayDataColorway();
                displayDataLink();

                //Function to define Cell Style Name
                function displayDataStylename() {
                    const cellStyleName = row.insertCell(0);
                    cellStyleName.textContent = item.node_name;
                    //Function Validation Rule for Style Name
                    function isStyleName(item) {
                        if (item.length > 20) {
                            return true;
                        }
                        if (item.node_name.indexOf(" ") < 0) {
                            return true;
                        }
                        if (item.node_name == item.node_name.toUpperCase()) {
                            return true;
                        }
                        return false;
                    }
                    //Validation Style Name    
                    if (!isStyleName(item)) {
                        cellStyleName.classList.add('invalid');
                    }
                }

                //Function to define Cell ERP Code
                function displayDataERPCode() {
                    const cellERPCode = row.insertCell(1);
                    cellERPCode.textContent = item.bag_erp_code;
                    //Function Validation Rule for ERP Code
                    function isERPCodeInMasterData(item) {
                        for (let i = 0; i < MasterERPCode.length; i++) {
                            if (MasterERPCode[i] === item.bag_erp_code) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation ERP Code 
                    if (!isERPCodeInMasterData(item)) {
                        cellERPCode.classList.add('invalid');
                    }
                }
            
                //Function to define Cell Category
                function displayDataCategory() {
                    const cellCategory = row.insertCell(2);
                    cellCategory.textContent = item.bag_category_2_code;
                    //Function Validation Rule for Category
                    function isCategoryInMasterData(item) {
                        for (let i = 0; i < MasterCategory.length; i++) {
                            if (MasterCategory[i] === item.bag_category_2_code) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Category    
                    if (!isCategoryInMasterData(item)) {
                        cellCategory.classList.add('invalid');
                    }
                }

                //Function to define Cell Product Category
                function displayDataProductCategory() {
                    const cellProductCategory = row.insertCell(3);
                    cellProductCategory.textContent = item.bag_product_category;
                    //Function Validation Rule for Product Category
                    function isProductCategoryInMasterData(item) {
                        for (let i = 0; i < MasterProductCategory.length; i++) {
                            if (MasterProductCategory[i] === item.bag_product_category) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Product Category    
                    if (!isProductCategoryInMasterData(item)) {
                        cellProductCategory.classList.add('invalid');
                    }
                }

                //Function to define Cell Product Type
                function displayDataProductType() {
                    const cellProductType = row.insertCell(4);
                    cellProductType.textContent = item.bag_collection_code;
                    //Function Validation Rule for Product Type
                    function isProductTypeInMasterData(item) {
                        for (let i = 0; i < MasterProductType.length; i++) {
                            if (MasterProductType[i] === item.bag_collection_code) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Product Type    
                    if (!isProductTypeInMasterData(item)) {
                        cellProductType.classList.add('invalid');
                    }
                }

                //Function to define Cell Division
                function displayDataDivision() {
                    const cellDivision = row.insertCell(5);
                    cellDivision.textContent = item.bag_division_code;
                    //Function Validation Rule for Division
                    function isDivisionInMasterData(item) {
                        for (let i = 0; i < MasterDivision.length; i++) {
                            if (MasterDivision[i] === item.bag_division_code) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Division    
                    if (!isDivisionInMasterData(item)) {
                        cellDivision.classList.add('invalid');
                    }
                }

                //Function to define Cell Program
                function displayDataProgram() {
                    const cellProgram = row.insertCell(6);
                    cellProgram.textContent = item.bag_master_program;
                    //Function Validation Rule for Program
                    function isProgramInMasterData(item) {
                        for (let i = 0; i < MasterProgram.length; i++) {
                            if (MasterProgram[i] === item.bag_master_program) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Program    
                    if (item.bag_master_program && !isProgramInMasterData(item)) {
                        cellProgram.classList.add('invalid');
                    }
                }

                //Function to define Cell Styling Info
                function displayDataStylingInfo() {
                    const cellStylinginfo = row.insertCell(7);
                    cellStylinginfo.textContent = item.bag_programs;
                    //Function Validation Rule for Styling Info
                    function isStylingInfoInMasterData(item) {
                        for (let i = 0; i < MasterStylingInfo.length; i++) {
                            if (MasterStylingInfo[i] === item.bag_programs) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Styling Info    
                    if (item.bag_programs && !isStylingInfoInMasterData(item)) {
                        cellStylinginfo.classList.add('invalid');
                    }
                }

                //Function to define Cell Wash Category
                function displayDataWashCategory() {
                    const cellWashCategory = row.insertCell(8);
                    cellWashCategory.textContent = item.bag_wash_category;
                    //Function Validation Rule for Wash Category
                    function isWashCategoryInMasterData(item) {
                        for (let i = 0; i < MasterWashCategory.length; i++) {
                            if (MasterWashCategory[i] === item.bag_wash_category) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Wash Category    
                    if (item.bag_wash_category && !isWashCategoryInMasterData(item)) {
                        cellWashCategory.classList.add('invalid');
                    }
                }

                //Function to define Cell Wash Sub Category
                function displayDataWashSubCategory() {
                    const cellWashSubCategory = row.insertCell(9);
                    cellWashSubCategory.textContent = item.bag_wash_sub_category;
                    //Function Validation Rule for Wash Sub Category
                    function isWashSubCategoryInMasterData(item) {
                        for (let i = 0; i < MasterWashSubCategory.length; i++) {
                            if (MasterWashSubCategory[i] === item.bag_wash_sub_category) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Wash Sub Category    
                    if (item.bag_wash_sub_category && !isWashSubCategoryInMasterData(item)) {
                        cellWashSubCategory.classList.add('invalid');
                    }
                }

                //Function to define Cell Sizes
                function displayDataSizes() {
                    const cellSizes = row.insertCell(10);
                    cellSizes.textContent = item.bag_actual_size_range;
                    //Function Validation Rule for Sizes
                    function isSizeRangeInMasterData(item) {
                        for (let i = 0; i < MasterSizeRange.length; i++) {
                            if (MasterSizeRange[i] === item.bag_actual_size_range) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //Validation Sizes    
                    if (item.actual_size_range && !isSizeRangeInMasterData(item)) {
                        cellSizes.classList.add('invalid');
                    }
                }

                //Function to define Colorway
                function displayDataColorway () {
                    const cellColorway = row.insertCell(11);
                    const Colorway = item.active_colorways;
                    const ColorwayList = Colorway.map(element => element.split(","));
                    console.log('Data Colorway :', ColorwayList)
                    ColorwayList.forEach(item => { 
                        const URLColorway = `https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-prod.centricsoftware.com/csi-requesthandler/api/v2/colorways/')}${item}?SecurityTokenURL=${token}`;
                        console.log(URLColorway)
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function() {
                        if(this.readyState === 4) {
                            // console.log(this.responseText);
                            const jsonresponseColorway = JSON.parse(this.responseText);
                            const jsonDataColorway = JSON.parse(jsonresponseColorway.contents);
                            //Function Validation Rule for Colorway
                            function isColorwayInMasterData(jsonDataColorway) {
                                for (let i = 0; i < MasterColor.length; i++) {
                                    if (MasterColor[i] === jsonDataColorway.bag_color_spec_code) {
                                        return true;
                                    }
                                }
                                return false;
                            }
                            const ListColorway = document.createElement("span"); // Create new data based on Active Colorway
                            ListColorway.textContent = jsonDataColorway.node_name + ', ';
                            //Validasi data Colorway    
                            if (jsonDataColorway.color_specification !== 'centric%3A' && !isColorwayInMasterData(jsonDataColorway)) {
                                ListColorway.classList.add('invalidColor');
                            }
                            // Display List Colorway data into Cell Colorway
                            cellColorway.appendChild(ListColorway);
                        }
                        });

                        xhr.open("GET", URLColorway);
                        xhr.send();

                    });
                }

                //Function to define Cell Link
                function displayDataLink() {
                    const cellLink = row.insertCell(12);
                    // Create URL link Basde On id
                    const linkUrl = `https://busana-prod.centricsoftware.com/WebAccess/home.html#URL=${item.id}&RURL=&RightPane=&RPURL=&Tab=Properties&NR=1`;
                    const link = document.createElement('a');
                    link.href = linkUrl;
                    link.textContent = 'View Details';
                    link.classList.add("Cell-Link");
                    link.target = '_blank'; // Open link in new tab

                    cellLink.appendChild(link);
                }

            });
        }

        });

        xhr.open("GET", FilteredURLStyle);
        xhr.send();
}
