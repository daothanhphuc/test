// Mảng dữ liệu gốc (ban đầu trống)
let usersData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Lấy danh sách người dùng từ API khi tải trang
    fetchUsers();
});

// Hàm fetch để lấy dữ liệu người dùng từ API backend
async function fetchUsers() {
    try {
        const response = await fetch('/search/all/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        usersData = await response.json();

        // Hiển thị dữ liệu lên bảng
        renderTable(usersData);
    } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu:', error);
    }
}

// Hàm hiển thị bảng dữ liệu
function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Xóa nội dung bảng trước khi cập nhật

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">Không tìm thấy kết quả phù hợp.</td></tr>';
    } else {
        data.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.fullname}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role_id}</td>
            `;

            tableBody.appendChild(row);
        });
    }
}

// Hàm tìm kiếm người dùng
function searchUsers() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const filteredData = usersData.filter(user =>
        user.fullname.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    renderTable(filteredData);
}

// Xử lý sự kiện nhấn nút "Tìm kiếm"
document.getElementById("searchButton").addEventListener("click", searchUsers);



