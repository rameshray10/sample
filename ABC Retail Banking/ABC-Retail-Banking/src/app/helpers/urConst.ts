export const  urlConst={
    Base_Url:"http://localhost:3000/",
//    Get_Authenticated :"CustomerInformation/GetAuthenticated?uname=",
    Get_Authenticated :"authUser?UserName=",
    Get_CustomerInfo:"CustomerInformation/Get",
   // Get_TopTransaction:"Transaction/GetTopTransactions?customerId=",
    Get_TopTransaction:"tranDet?CustomerId=",
    Get_Transaction:"Transaction/Get",
    Get_PeriodTransaction:"tranDet?CustomerId=",
    Get_Search:"Transaction/Search?accountName={0}&accountNumber={1}&clientName={2}",
    Post_CustomerInfo:"CustomerInformation/Post",
    Post_Transaction:"tranDet",
    Get_AccountDetails:"accdet",
    //Get_AccountDetailsbyCustId:"AccountDetails/GetbyCustId?id=",
    Get_AccountDetailsbyCustId:"accdet?CustomerId=",
    Get_AccountDetailsbyName:"accdet?PrimaryAccountOwnerName=",
    Post_AccountDetails:"accdet",
    Put_UserInfo:"",
    Get_UserDetails:"UserDetails/Get",
    Get_UserById:"UserDetails/GetById?fname=",
    Get_userDetByUserId:"userDet?id=",
    Post_UserDetails:"userDet",
    Put_UserDetails:"userDet/",
//Get_SearchResults: "Transaction/getSearchResults?queryStrings="
Get_SearchResults: "accdet?",
Get_BranchNameUsingId: "brInfo?Id="

}
