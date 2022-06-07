var employees = []

function addEmployee() {
    //B1: DOM lấy value
    var account = document.getElementById("tknv").value
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var startingDate = document.getElementById("datepicker").value
    var basicSalary = document.getElementById("luongCB").value
    var position = document.getElementById("chucvu").value
    var workingTime = document.getElementById("gioLam").value

    console.log(name)
    var isValid = validation()
    if(!isValid){
        alert("vui lòng nhập các giá trị")
        
        return;
    }


    // B2: Khởi tạo đối tượng employee

    var employee = new Employee(account, name, email, password, startingDate, basicSalary, position, workingTime)
    employees.push(employee)
    console.log(name);
    display(employees)

}

function display(employees) {
    var tbodyEl = document.getElementById("tableDanhSach")
    var html = ""
    for (var i = 0; i < employees.length; i++) {
        var employee = employees[i]

        html += `<tr>
        <td>${employee.account}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.startingDate}</td>
        <td>${employee.position}</td>
        <td>${employee.calcSalary()}</td>
        <td>${employee.employeeRank()}</td>

        <td>
            <button class = "btn btn-success" onclick="selectStudent('${employee.account}')">Cập nhật</button>
            <button class = "btn btn-danger" onclick="deleteEmployee('${employee.account}')">xóa</button>
        </td>
        </tr>`
    }

    tbodyEl.innerHTML = html
}
document.getElementById("btnThemNV").addEventListener("click", addEmployee)

function deleteEmployee(account) {
    var index = findEmployee(account)
    if (index !== -1) {
        console.log(employees)
        employees.splice(index, 1)

        display(employees)
    }
}

function findEmployee(account) {
    var index = -1
    for (var i = 0; i < employees.length; i++) {
        // kiểm tra từng phần tử trong mảng
        if (account === employees[i].account) {
            index = i
            break;
        }
    }
    return index;
}

// Kiểm tra tính hợp lệ validation
function validation() {
    var account = document.getElementById("tknv").value
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var startingDate = document.getElementById("datepicker").value
    var basicSalary = +document.getElementById("luongCB").value
    var position = +document.getElementById("chucvu").value
    var workingTime = +document.getElementById("gioLam").value

    var isValid = true

    // Hàm kiểm tra input có rỗng hay không
    if (!isRequired(account)) {
        isValid = false
        document.getElementById('tbTKNV').innerHTML = "Tài khoản không được để trống"
        console.log(isValid);
    }
    if (!isRequired(name)) {
        isValid = false
        document.getElementById('tbTen').innerHTML = "Tên nhân viên không được để trống"
        console.log(isValid);
    }
    if (!isRequired(email)) {
        isValid = false
        document.getElementById('tbEmail').innerHTML = "email nhân viên không được để trống"
        console.log(isValid);
    }
    if (!isRequired(password)) {
        isValid = false
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu nhân viên không được để trống"
        console.log(isValid);
    }
    if (!isRequired(startingDate)) {
        isValid = false
        document.getElementById('tbNgay').innerHTML = "Ngày làm không được để trống"
        console.log(isValid);
    }
    if (!isRequired(basicSalary)) {
        isValid = false
        document.getElementById('tbLuongCB').innerHTML = "Lương cơ bản không được để trống"
        console.log(isValid);
    }
    if (!isRequired(position)) {
        isValid = false
        document.getElementById('tbChucVu').innerHTML = "Chức vụ không được để trống"
        console.log(isValid);
    }
    if (!isRequired(workingTime)) {
        isValid = false
        document.getElementById('tbGiolam').innerHTML = "Số giờ làm không được để trống"
        console.log(isValid);
    }

    return isValid
}

function isRequired(value){
    if (!value){
        return false;
    }

    return true;
}