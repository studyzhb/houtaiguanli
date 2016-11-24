var Student = (function () {
    function Student(firstname, lastname, middilename) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.middilename = middilename;
        this.fullname = firstname + ' ' + middilename + ' ' + lastname;
    }
    return Student;
}());
