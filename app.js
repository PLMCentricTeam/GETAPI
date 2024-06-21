document.getElementById('fetch-button').addEventListener('click', fetchData);

function fetchData() {
    const token = document.getElementById('token').value;
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://busana-test.centricsoftware.com/csi-requesthandler/api/v2/styles?active=false&bag_ready_to_validate=true&SecurityTokenURL=')}${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Atur header yang diperlukan
        },
    })
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    //.then(data => console.log(data.contents));
    // .then(data => {
    //     // Mengakses data di dalam data.contents
    //     const contents = data.contents;
    //     const dataArray = Object.keys(contents).map(key => contents[key]); // Ubah objek menjadi array

    //     // Acak urutan data
    //     // dataArray.sort(() => Math.random() - 0.5);

    //     // Buat elemen HTML untuk menampilkan data
    //     dataArray.forEach(item => {
    //         const dataElement = document.createElement('div');
    //         dataElement.innerHTML = `
    //             <p>${item.id} - ${item.node_name}</p> `;
    //         dataContainer.appendChild(dataElement);
    //     });
    //     // const contents = data.contents;
    //     console.log(contents);
    //     // console.log(data.contents);
    // })
    .then(data => {
        // Mengakses data di dalam data.contents
        const contents = data.contents;
        let dataArray;
        try {
            dataArray = JSON.parse(contents)
            // dataArray = Array.isArray(parsedData) ? parsedData.slice(0, 100) : [parsedData];
            console.log('Data JSON telah diubah menjadi array:', dataArray);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }

        // const dataList = document.getElementById('data-list');
        // dataList.innerHTML = '';
        // Melakukan sesuatu dengan data array
        // if (dataArray && Array.isArray(dataArray)) {
        //     dataArray.sort((a, b) => new Date(b._modified_at) - new Date(a._modified_at));
        //     dataArray.forEach(item => {
        //         const itemDiv = document.createElement('div');
        //         itemDiv.className = 'item';
        //         itemDiv.textContent = `Code: ${item.code}, Modified : ${item._modified_at}`; // Sesuaikan dengan struktur data JSON
        //         dataList.appendChild(itemDiv);
        //         console.log(`Code: ${item.code}, Modified: ${item._modified_at}`);
        //     });
        // }
        if (dataArray && Array.isArray(dataArray)) {
            dataArray.sort((a, b) => new Date(a._modified_at) - new Date(b._modified_at));
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Mengosongkan tabel sebelum menambahkan data baru
            dataArray.forEach(item => {
                const row = tableBody.insertRow();
                const cellName = row.insertCell(0);
                const cellAge = row.insertCell(1);
                const cellModifiedDate = row.insertCell(2);
                const cellLink = row.insertCell(3);
    
                cellName.textContent = item.code;
                cellAge.textContent = item.node_name;
                cellModifiedDate.textContent = item._modified_at;

                // Membuat URL link berdasarkan id
                const linkUrl = `https://busana-test.centricsoftware.com/WebAccess/home.html#URL=${item.id}&Tab=ProductSpecSummary&NR=1`;
                const link = document.createElement('a');
                link.href = linkUrl;
                link.textContent = 'View Details';
                link.target = '_blank'; // Membuka link di tab baru

                cellLink.appendChild(link);

                console.log(`Code: ${item.code}, Modified: ${item._modified_at}`);
            });
        }
    })  
}


// function displayData(contents) {
//     const dataArray = Object.keys(data).map(key => data[key]); // Ubah objek menjadi array

//         // Acak urutan data
//         dataArray.sort(() => Math.random() - 0.5);

//         // Buat elemen HTML untuk menampilkan data
//         dataArray.forEach(item => {
//             const dataElement = document.createElement('div');
//             dataElement.innerHTML = `
//                 <p>${item.nama} - ${item.alamat}</p> `;
//             dataContainer.appendChild(dataElement);
//         });
// }

// function displayData(data) {
//     const dataList = document.getElementById('data-list');
//     dataList.innerHTML = ''; // Kosongkan daftar sebelum menambahkan data baru

//     data.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.className = 'data-item';
//         listItem.textContent = `ID: ${item.id} - node_name: ${item.node_name}`;
//         dataList.appendChild(listItem);
//     });
// }
