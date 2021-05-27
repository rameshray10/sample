export class accountdetails{
    public Id:number=0;
    public AccountNumber:number=0;
    public CustomerId:number=0;
    public AccountTypeId:number=0; //1 single 2 Joint
    public AccessType:number=0; // 1 User 2 Admin
    public PrimaryAccountOwnerName:number=0;
    public InitialBalance:number=0;
    public CheckingAcc:number=0;
    public  CreatedBy:string="";
    public  CreatedOn:Date= new Date();
    public  UpdatedBy:string="";
    public  UpdatedOn:Date= new Date();
}