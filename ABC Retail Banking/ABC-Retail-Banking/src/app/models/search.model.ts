export class searchResult{
   public  Id:number=0;
   public PrimaryAccountOwnerName:string=''; //accDet.PrimaryAccountOwnerName
   public AccountNumber:string=''; //accDet.AccountNumber
   public AccountType:string=""; //accDet.AccountTypeId
   public Balance:string=""; //tranDet.tranDet using accDet.CustomerId
   public Address:string=""; //userDet.Address usng accDet.userDetId
   public BranchName:string=""; // accdet.BranchId using accDet.BranchId
}
