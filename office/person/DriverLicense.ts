export enum DriverLicenseCategoryType {
    A,
    B,
    C,
    D,
    BE,
    CE,
    DE
}

export class DriverLicenseCategory {
    public category: DriverLicenseCategoryType;
    public expiration_date: Date;

    constructor(category: DriverLicenseCategoryType, expiration_date: Date) {
      this.category = category;
      this.expiration_date = expiration_date;
  }
  }

  export class DriverLicense {
    public categories: DriverLicenseCategory[]=[];
    public id: Number;

    public addCategory(category: DriverLicenseCategory):void 
    {
      this.categories.push(category);
    }

    public updateExpirationDate(category: DriverLicenseCategoryType, newDate: Date): void 
    {
      const categoryToUpdate = this.categories.find(cat => cat.category === category);
      if (categoryToUpdate) {
          categoryToUpdate.expiration_date = newDate;
      } else {
          throw new Error("Category not found.");
      }
    }
}
