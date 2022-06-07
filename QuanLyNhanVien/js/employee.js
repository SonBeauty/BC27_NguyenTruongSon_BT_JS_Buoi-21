function Employee(account, name, email, password, startingDate, basicSalary, position, workingTime) {
    this.account = account
    this.name = name
    this.email = email
    this.password = password
    this.startingDate = startingDate
    this.basicSalary = basicSalary
    this.position = position
    this.workingTime = workingTime
}

Employee.prototype.calcSalary = function () {
    var select = document.getElementById('chucvu');
    var value = select.options[select.selectedIndex].value
    var salary
    if (value == "Sếp") {
        salary = this.basicSalary * 3
    }
    if (value == "Trưởng phòng") {
        salary = this.basicSalary * 2
    }
    if (value == "Nhân viên") {
        salary = this.basicSalary
    }
    return salary
}
Employee.prototype.employeeRank = function (workingTime) {
    if (this.workingTime >= 192) {
        return "Xuất sắc"
    } else if (this.workingTime >= 176) {
        return "Giỏi"
    } else if (this.workingTime >= 160) {
        return "Khá"
    } else {
        return "Trung bình"
    }
}