document.getElementById('fetch-button').addEventListener('click', fetchData);

function fetchData() {
    const token = document.getElementById('token').value;
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-test.centricsoftware.com/csi-requesthandler/api/v2/styles?active=false&bag_ready_to_validate=true&node_name=!&SecurityTokenURL=')}${token}`, {
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
        // Mengakses data di dalam data.contents
        const contents = data.contents;
        let dataArray;
        try {
            dataArray = JSON.parse(contents)
            console.log('Data JSON telah diubah menjadi array:', dataArray);
        } catch (error) {
            console.error('Error parsing JSON:', error);
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

        if (dataArray && Array.isArray(dataArray)) {
            dataArray.sort((a, b) => new Date(a._modified_at) - new Date(b._modified_at));
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Mengosongkan tabel sebelum menambahkan data baru
            dataArray.forEach(item => {
                const tr = document.createElement('tr');
                
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
                const cellLink = row.insertCell(10);
                // const cellModifiedDate = row.insertCell(10);
                // const cellLink = row.insertCell(11);

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
                // cellModifiedDate.textContent = item._modified_at;

                // Membuat URL link berdasarkan id
                const linkUrl = `https://busana-test.centricsoftware.com/WebAccess/home.html#URL=${item.id}&RURL=&RightPane=&RPURL=&Tab=Properties&NR=1`;
                const link = document.createElement('a');
                link.href = linkUrl;
                link.textContent = 'View Details';
                link.target = '_blank'; // Membuka link di tab baru

                cellLink.appendChild(link);
                
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
