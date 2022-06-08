var employees = []
init()
function init() {
    // B1: lấy data từ localStorage
    employees = JSON.parse(localStorage.getItem("employees")) || [];

    for (var i = 0; i < employees.length; i++) {
        var employee = employees[i]
        employees[i] = new Employee(
            employee.account,
            employee.name,
            employee.email,
            employee.startingDate,
            employee.position,
            employee.basicSalary,
            employee.workingTime
        )
    }
    display(employees)
}

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
    if (!isValid) {
        alert("vui lòng nhập các giá trị")

        return;
    }


    // B2: Khởi tạo đối tượng employee

    var employee = new Employee(account, name, email, password, startingDate, basicSalary, position, workingTime)
    employees.push(employee)
    console.log(name);

    //lưu thông tin mảng employees xuống localstorage
    localStorage.setItem('employees', JSON.stringify((employees)))

    display(employees)
    reset()

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

        // lưu thông tin vào local
        localStorage.setItem('employees', JSON.stringify((employees)))

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

function reset(){
    document.getElementById("tknv").value = ""
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("datepicker").value = ""
    document.getElementById("luongCB").value = ""
    document.getElementById("chucvu").value = ""
    document.getElementById("gioLam").value = ""
    document.getElementById("tbTen").value = ""
    document.getElementById("tbEmail").value = ""
    document.getElementById("tbMatKhau").value = ""
    document.getElementById("tbNgay").value = ""
    document.getElementById("tbLuongCB").value = ""
    document.getElementById("tbChucVu").value = ""

}
// Kiểm tra tính hợp lệ validation
function validation() {
    var account = document.getElementById("tknv").value
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var startingDate = document.getElementById("datepicker").value
    var basicSalary = +document.getElementById("luongCB").value
    var position = document.getElementById("chucvu").value
    var workingTime = +document.getElementById("gioLam").value

    var isValid = true

    // Hàm kiểm tra input có rỗng hay không

    // kiểm tra kí tự 
    var reg = new RegExp('^[0-9]+$');
    if (!isRequired(account)) {
        isValid = false
        document.getElementById('tbTKNV').innerHTML = "Tài khoản không được để trống"
    }//else if(!(minLength(account, 4)||maxLength(account,6))){
    //     console.log(account.length)
    //     isValid = false
    //     document.getElementById('tbTKNV').innerHTML = "Tài khoản từ 4-6 kí tự"
    // } else if (reg.test(account)) {
    //     isValid = false
    //     document.getElementById('tbTen').innerHTML = "Tài khoản chứa kí tự không hợp lệ"
    // }



    var letters = new RegExp("[A-Za-z]+$")
    if (!isRequired(name)) {
        isValid = false
        document.getElementById('tbTen').innerHTML = "Tên nhân viên không được để trống"

    } else if (!minLength(name, 8)) {
        isValid = false;
        document.getElementById("tbTen").innerHTML = "Tên SV có ít nhất 8 kí tự"
    } else if (!letters.test(name)) {
        isValid = false;
        document.getElementById("tbTen").innerHTML = "Tên sinh viên có kí tự không hợp lệ"
    }

    if (!isRequired(email)) {
        isValid = false
        document.getElementById('tbEmail').innerHTML = "email nhân viên không được để trống"

    }
    if (!isRequired(password)) {
        isValid = false
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu nhân viên không được để trống"

    }
    if (!isRequired(startingDate)) {
        isValid = false
        document.getElementById('tbNgay').innerHTML = "Ngày làm không được để trống"

    }
    if (!isRequired(basicSalary)) {
        isValid = false
        document.getElementById('tbLuongCB').innerHTML = "Lương cơ bản không được để trống"

    }
    if (!isRequired(position)) {
        isValid = false
        document.getElementById('tbChucVu').innerHTML = "Chức vụ không được để trống"

    }
    if (!isRequired(workingTime)) {
        isValid = false
        document.getElementById('tbGiolam').innerHTML = "Số giờ làm không được để trống"

    }

    return isValid
}

function isRequired(value) {
    if (!value) {
        return false;
    }

    return true;
}

function minLength(value, limit) {
    if (value.length < limit) {
        return false;
    }

    return true;
}
function maxLength(value, max) {
    if (value.length > max) {
        return false;
    }

    return true;
}