document.addEventListener('DOMContentLoaded', function() {
    fetchDocuments();
});
async function fetchDocuments() {
    try {
        const response = await fetch('/statistic/documents/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const documents = await response.json();
        displayDocuments(documents); // hien thi du lieu len table 
    } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error);
    }
}
function displayDocuments(documents) {
    const tableBody = document.querySelector('#written-regulations .doc-list table tbody');
    tableBody.innerHTML = '';
    documents.forEach((document,index) => {
        const row = document.createElement('tr');

        const sttCell = document.createElement('td');
        sttCell.textContent = index + 1; // STT bắt đầu từ 1
        const titleCell = document.createElement('td');
        titleCell.textContent = document.title;
        const fileCell = document.createElement('td');
        fileCell.textContent = document.file;
        const issueDateCell = document.createElement('td');
        issueDateCell.textContent = document.issue_date;

        row.appendChild(sttCell);
        row.appendChild(titleCell);
        row.appendChild(fileCell);
        row.appendChild(issueDateCell);

        tableBody.appendChild(row);
    });
}