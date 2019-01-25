export class ProfileModel {
    public name: string;
    public email: string;
    public password: string;
    public city: string;
    public state: string;
    public education: string;
    public profileimage: string;

    constructor(name,email,password,city,state,education,profileimage) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.state = state;
        this.education = education;
        this.profileimage = profileimage;
    }
}