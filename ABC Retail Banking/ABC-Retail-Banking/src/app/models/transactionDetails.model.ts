export class transactionDetails{
        public Id:number=0;
        public CustomerId:number=0;
        public TransactionId:number=0;
        public TransferTo=false;
        public  TransactUsing:number=0;
        //(Credit/Debit/Cheque/Transfer(ET)/Cash)
        public  TransactionType:number=0;
        //(Debit/Credit)
        public TransactionDate:Date=new Date();
        public TransactionRemarks:string="";
        public TransactionAmount:number=0;
        public FromAccount:number=0;
        public ToAccount:number=0;
        public TransactionStatus:number=0;
        public ChecqueBookNumber:number=0;
        public CurrentBalance:number=0;
        public  CreatedBy:string="";
        public  CreatedOn:Date=new Date();
        public  UpdatedBy:string="";
        public  UpdatedOn:Date=new Date();
}