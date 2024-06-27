document.getElementById('fetch-button').addEventListener('click', fetchData);

function fetchData() {
    const token = document.getElementById('token').value;
    const URLStyle = `https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-prod.centricsoftware.com/csi-requesthandler/api/v2/styles?active=false&bag_ready_to_validate=true&node_name=!&SecurityTokenURL=')}${token}`;
    fetch(URLStyle , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Atur header yang diperlukan
        },
    })
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => {
        // Mengakses data di dalam API
        const contents = data.contents;
        let dataArray;
        try {
            dataArray = JSON.parse(contents) // Merubah data dari API menjadi Array
            console.log('Data JSON telah diubah menjadi array:', dataArray);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }

        //Function untuk check apakah Szie Range sudah ada di master data
        function isSizeRangeInMasterData(dataArray) {
            for (let i = 0; i < MasterSizeRange.length; i++) {
                if (MasterSizeRange[i] === dataArray.bag_actual_size_range) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Style Name sesuai ketentuan
        function isStyleName(dataArray) {
            if (dataArray.length > 20) {
                return true;
            }
            if (dataArray.node_name.indexOf(" ") < 0) {
                return true;
            }
            if (dataArray.node_name == dataArray.node_name.toUpperCase()) {
                return true;
            }
            return false;
        }
        //Function untuk check apakah ERP Code sudah ada di master data
        function isERPCodeInMasterData(dataArray) {
            for (let i = 0; i < MasterERPCode.length; i++) {
                if (MasterERPCode[i] === dataArray.bag_erp_code) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Category sudah ada di master data
        function isCategoryInMasterData(dataArray) {
            for (let i = 0; i < MasterCategory.length; i++) {
                if (MasterCategory[i] === dataArray.bag_category_2_code) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Product Category sudah ada di master data
        function isProductCategoryInMasterData(dataArray) {
            for (let i = 0; i < MasterProductCategory.length; i++) {
                if (MasterProductCategory[i] === dataArray.bag_product_category) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Product Type sudah ada di master data
        function isProductTypeInMasterData(dataArray) {
            for (let i = 0; i < MasterProductType.length; i++) {
                if (MasterProductType[i] === dataArray.bag_collection_code) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Division sudah ada di master data
        function isDivisionInMasterData(dataArray) {
            for (let i = 0; i < MasterDivision.length; i++) {
                if (MasterDivision[i] === dataArray.bag_division_code) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Program sudah ada di master data
         function isProgramInMasterData(dataArray) {
            for (let i = 0; i < MasterProgram.length; i++) {
                if (MasterProgram[i] === dataArray.bag_master_program) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Styling Info sudah ada di master data
         function isStylingInfoInMasterData(dataArray) {
            for (let i = 0; i < MasterStylingInfo.length; i++) {
                if (MasterStylingInfo[i] === dataArray.bag_programs) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Wash Category sudah ada di master data
        function isWashCategoryInMasterData(dataArray) {
            for (let i = 0; i < MasterWashCategory.length; i++) {
                if (MasterWashCategory[i] === dataArray.bag_wash_category) {
                    return true;
                }
            }
            return false;
        }
        //Function untuk check apakah Wash Sub Catogory sudah ada di master data
        function isWashSubCategoryInMasterData(dataArray) {
            for (let i = 0; i < MasterWashSubCategory.length; i++) {
                if (MasterWashSubCategory[i] === dataArray.bag_wash_sub_category) {
                    return true;
                }
            }
            return false;
        }
        // Melakukan pengecekan apakah data dari API sudah berubah menjadi Array
        if (dataArray && Array.isArray(dataArray)) {
            dataArray.sort((a, b) => new Date(a._modified_at) - new Date(b._modified_at)); // Melakukan Sort data dari Modified Date
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Mengosongkan tabel sebelum menambahkan data baru
            dataArray.forEach(item => {
                const tr = document.createElement('tr');
                
                // Melakukan function untuk memasukan data ke masing masing row sesuai urutan
                const row = tableBody.insertRow();
                const cellStyleName = row.insertCell(0);
                const cellERPCode = row.insertCell(1);
                const cellCategory = row.insertCell(2);
                const cellProductCategory = row.insertCell(3);
                const cellProductType = row.insertCell(4);
                const cellDivision = row.insertCell(5);
                const cellProgram = row.insertCell(6);
                const cellStylinginfo = row.insertCell(7);
                const cellWashCategory = row.insertCell(8);
                const cellWashSubCategory = row.insertCell(9);
                const cellSizes = row.insertCell(10);
                const cellColorway = row.insertCell(11);
                const cellLink = row.insertCell(12);

                cellStyleName.textContent = item.node_name;
                cellERPCode.textContent = item.bag_erp_code;
                cellCategory.textContent = item.bag_category_2_code;
                cellProductCategory.textContent = item.bag_product_category;
                cellProductType.textContent = item.bag_collection_code;
                cellDivision.textContent = item.bag_division_code;
                cellProgram.textContent = item.bag_master_program;
                cellStylinginfo.textContent = item.bag_programs;
                cellWashCategory.textContent = item.bag_wash_category;
                cellWashSubCategory.textContent = item.bag_wash_sub_category;
                cellSizes.textContent = item.bag_actual_size_range;
                // cellColorway.textContent = item.active_colorways;

                // Membuat URL link berdasarkan id
                const linkUrl = `https://busana-prod.centricsoftware.com/WebAccess/home.html#URL=${item.id}&RURL=&RightPane=&RPURL=&Tab=Properties&NR=1`;
                const link = document.createElement('a');
                link.href = linkUrl;
                link.textContent = 'View Details';
                link.classList.add("Cell-Link");
                link.target = '_blank'; // Membuka link di tab baru

                cellLink.appendChild(link);
                
                //Melakukan filter hanya Colorway yang Active dan mempunyai Color Specification
                const StyleId = item.id;
                console.log ('Style' + StyleId);
                // Membuat list Colorway
                const Colorway = item.active_colorways;
                const ColorwayList = Colorway.map(element => element.split(","));
                console.log(ColorwayList);
                ColorwayList.forEach(item => {  
                    const URLColorway = `https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-prod.centricsoftware.com/csi-requesthandler/api/v2/colorways/')}${item}?SecurityTokenURL=${token}`;
                    console.log(URLColorway);
                    fetch(URLColorway , {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json', // Atur header yang diperlukan
                        },
                    })
                    .then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then(dataColorway => {
                        // Mengakses data di dalam API
                        const contentsColorway = dataColorway.contents;
                        let dataArrayColorway;
                        try {
                            dataArrayColorway = JSON.parse(contentsColorway) // Merubah data API menjadi Array
                            console.log('Data JSON telah diubah menjadi array:', dataArrayColorway);
                            
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                        }
                        //Function untuk check apakah Colorway sudah ada di master data
                        function isColorwayInMasterData(dataArrayColorway) {
                            for (let i = 0; i < MasterColor.length; i++) {
                                if (MasterColor[i] === dataArrayColorway.bag_color_spec_code) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        const ListColorway = document.createElement("span"); // Membuat data baru berdasarkan banyaknya ata colorway yang active
                        ListColorway.textContent = dataArrayColorway.bag_color_spec_code + ', ';
                        //Validasi data Colorway    
                        if (!isColorwayInMasterData(dataArrayColorway)) {
                            ListColorway.classList.add('invalidColor');
                        }
                        // Menampilkan List Colorway data ke dalam Cell Colorway
                        cellColorway.appendChild(ListColorway); 
                    })      
                });

                //Membuat List Size Range
                // if (isSizeRangeInMasterData(item)) {
                    // const Sizes = item.product_sizes;
                    // const SizesList = Sizes.map(element => element.split(","));
                    // console.log('Sizenya', SizesList);
                    // SizesList.forEach(item => {
                    //     const URLSizes = `https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-test.centricsoftware.com/csi-requesthandler/api/v2/product_sizes/')}${item}?SecurityTokenURL=${token}`;
                    //     fetch(URLSizes , {
                    //         method: 'GET',
                    //         headers: {
                    //             'Content-Type': 'application/json', // Atur header yang diperlukan
                    //         },
                    //     })
                    //     .then(response => {
                    //         if (response.ok) return response.json()
                    //         throw new Error('Network response was not ok.')
                    //     })
                    //     .then(dataSizes => {
                    //         // Mengakses data di dalam API
                    //         const contentsSizes = dataSizes.contents;
                    //         let dataArraySizes;
                    //         try {
                    //             dataArraySizes = JSON.parse(contentsSizes) // Merubah data API menjadi Array
                    //             console.log('Data JSON telah diubah menjadi array:', dataArraySizes);
                                
                    //         } catch (error) {
                    //             console.error('Error parsing JSON:', error);
                    //         }
                    //         //Function untuk check apakah Sizes sudah ada di master data
                    //         // function isSizesInMasterData(dataArraySizes) {
                    //         //     for (let i = 0; i < MasterColor.length; i++) {
                    //         //         if (MasterColor[i] === dataArraySizes.bag_color_spec_code) {
                    //         //             return true;
                    //         //         }
                    //         //     }
                    //         //     return false;
                    //         // }
                    //         const ListSizes = document.createElement("span"); // Membuat data baru berdasarkan banyaknya ata colorway yang active
                    //         ListSizes.textContent = dataArraySizes.bag_size_name + ', ';
                    //         //Validasi data Sizes    
                    //         // if (!isColorwayInMasterData(dataArrayColorway)) {
                    //         //     ListSizes.classList.add('invalidColor');
                    //         // }
                    //         // Menampilkan List Colorway data ke dalam Cell Colorway
                    //         cellSizes.appendChild(ListSizes); 
                    //     })      
                    // });
                // }
                //Validasi data Size Range    
                // if (!isSizeRangeInMasterData(item)) {
                //     cellSizes.classList.add('invalid');
                // }

                //Validasi Style Name    
                if (!isStyleName(item)) {
                    cellStyleName.classList.add('invalid');
                }
                //Validasi data ERP Code    
                if (!isERPCodeInMasterData(item)) {
                    cellERPCode.classList.add('invalid');
                }
                //Validasi data Category    
                if (!isCategoryInMasterData(item)) {
                    cellCategory.classList.add('invalid');
                }
                //Validasi data Product Category    
                if (!isProductCategoryInMasterData(item)) {
                    cellProductCategory.classList.add('invalid');
                }
                //Validasi data Product Type    
                if (!isProductTypeInMasterData(item)) {
                    cellProductType.classList.add('invalid');
                }
                //Validasi data Division    
                if (!isDivisionInMasterData(item)) {
                    cellDivision.classList.add('invalid');
                }
                //Validasi data Program    
                if (item.bag_master_program && !isProgramInMasterData(item)) {
                    cellProgram.classList.add('invalid');
                }
                //Validasi data Styling Info    
                if (item.bag_programs && !isStylingInfoInMasterData(item)) {
                    cellStylinginfo.classList.add('invalid');
                }
                //Validasi data Wash Cateogry    
                if (item.bag_wash_category && !isWashCategoryInMasterData(item)) {
                    cellWashCategory.classList.add('invalid');
                }
                //Validasi data Wash Sub Cateogry    
                if (item.bag_wash_sub_category && !isWashSubCategoryInMasterData(item)) {
                    cellWashSubCategory.classList.add('invalid');
                }

                console.log(`Code: ${item.bag_erp_code}, Modified: ${item.bag_master_program}`);
            });            
        }
    })  
}
