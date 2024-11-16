import { Admin } from "./Admin";

export class Owner extends Admin {
    private admins: Admin[]=[];//TODO: rework this

    addAdmin(admin:Admin): void 
    {
        if (!this.admins.includes(admin)) {
            this.admins.push(admin);
        }
    } //logic??

    deleteAdmin(admin:Admin): void 
    {
        this.admins = this.admins.filter((a) => a !== admin);
    }

    public listAdmins(): Admin[] 
    {
        return this.admins;
    }
}
