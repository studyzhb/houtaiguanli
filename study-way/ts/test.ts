class Student{
    fullname:string;
    constructor(public firstname,public lastname,public middilename){
        this.fullname=firstname+' '+middilename+' '+lastname;
    }
}


interface Person{
    firstname:string;
    lastname:string;
}
