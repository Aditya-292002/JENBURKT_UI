import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class URLService {


  constructor(private sharedService: SharedService) { }
  public userLogin = this.sharedService.ApiUrl + '/api/Authetication/Login';
  public UserRoleRights = this.sharedService.ApiUrl + '/api/Authetication/UserRoleRights';
  public getDownloadReportList = this.sharedService.ApiUrl + '/api/Reports/GETREPORTLIST';
  public getDownloadReport = this.sharedService.ApiUrl + '/api/Reports/GETREPORTDATA';
  public getSalesReportList = this.sharedService.ApiUrl + '/api/Dashboard/GetDashboardFilter';
  public downloadSalesReportList = this.sharedService.ApiUrl + '/api/Reports/SalesReport';
  public getInvoiceList = this.sharedService.ApiUrl + '/api/ITD/GetInvoiceList';
  public getPoolList = this.sharedService.ApiUrl + '/api/ITD/GetPoolMaster';
  public getProductFromPoolList = this.sharedService.ApiUrl + '/api/ITD/GetProductsFromPool';
  public SaveITDTransaction = this.sharedService.ApiUrl + '/api/ITD/SaveITDTransaction';

  public getPoolMasterList = this.sharedService.ApiUrl + '/api/Pool/GETPOOLMASTERLIST';
  public getDashBoardList = this.sharedService.ApiUrl + '/api/Dashboard/GetDashboardData';

  //added by hemant 28 may 2025
  public getDashBoardListnew = this.sharedService.ApiUrl + '/api/Dashboard/GetDashboardDataNew';
  // public savePoolMasterList = this.sharedService.ApiUrl + '/api/Dashboard/GetDashboardData';
  public getHQList = this.sharedService.ApiUrl + '/api/HQ/GETHQLIST';
  public getHQMasterList = this.sharedService.ApiUrl + '/api/HQ/GETHQMASTERS';
  public saveHQMaster = this.sharedService.ApiUrl + '/api/HQ/SAVEHQMASTERDATA';
  public getProductList = this.sharedService.ApiUrl + '/api/Product/GETPRODUCTLIST';
  public getProductMasterList = this.sharedService.ApiUrl + '/api/Product/GETPRODUCTMASTERLIST';
  public saveProductData = this.sharedService.ApiUrl + '/api/Product/SAVEPRODUCTDATA';
  public getUserList = this.sharedService.ApiUrl + '/api/UserMaster/GETUSERLIST';
  public getUserMasterList = this.sharedService.ApiUrl + '/api/UserMaster/GETUSERMASTERLIST';
  public saveUserMaster = this.sharedService.ApiUrl + '/api/UserMaster/SAVEUSERMASTERDATA';
  public saveInvoiceMaster = this.sharedService.ApiUrl + '/api/ITD/SAVEUSERMASTERLIST';
  public SaveInvoiceTransaction = this.sharedService.ApiUrl + '/api/ITD/SaveInvoiceTransaction';
  public getIncentiveReportList = this.sharedService.ApiUrl + '/api/Reports/IncentiveReport';
  public getExpenseReportList = this.sharedService.ApiUrl + '/api/Reports/ExpenseReport';
  public getUploadDocumentMasterList = this.sharedService.ApiUrl + '/api/UploadDocument/GETUPLOADDOCUMENTMASTERLIST';
  public saveUploadDocument = this.sharedService.ApiUrl + '/api/UploadDocument/SAVEUPLOADDOCUMENTDATA';
  public getAreaMasterList = this.sharedService.ApiUrl + '/api/AreaMaster/GETAREAMASTERLIST';
  public showaredata = this.sharedService.ApiUrl + '/api/AreaMaster/SHOWAREADATA';
  public SAVEAREAMASTER = this.sharedService.ApiUrl + '/api/AreaMaster/SAVEAREAMASTER';
  public getAreaList = this.sharedService.ApiUrl + '/api/AreaMaster/GETAREALIST';
  public getSampleProductMasterList = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTMASTERLIST';
  public getSamplePreDefineRangeList = this.sharedService.ApiUrl + '/api/SampleProduct/GETPREDEFINEDRANGE';
  public saveSampleProductData = this.sharedService.ApiUrl + '/api/SampleProduct/SAVESAMPLEPRODUCTDATA';
  public GETSAMPLEPRODUCTDATABYID = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTDATABYID';
  public GETSAMPLEPRODUCTLIST = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTLIST';
  public GETSAMPLEPRODUCTDETAILSBYID = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTDETAILSBYID'
  public SAVESAMPLEPRODUCTDATADETAILS = this.sharedService.ApiUrl + '/api/SampleProduct/SAVESAMPLEPRODUCTDATADETAILS';
  public getSAMPLEPRODUCTDETAILSMASTERLIST = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTDETAILSMASTERLIST';
  public GETSTOCKBYPRODUCTCODE = this.sharedService.ApiUrl + '/api/SampleProduct/GETSTOCKBYPRODUCTCODE';
  public GETSAMPLEPRODUCTDETAILSBYPRODUCTCODE = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTDETAILSBYPRODUCTCODE';
  public GETMASTERDATAFORSAMPLESTOCK = this.sharedService.ApiUrl + '/api/SampleProduct/GETMASTERDATAFORSAMPLESTOCK';

  public SAVESAMPLESTOCKDATA = this.sharedService.ApiUrl + '/api/SampleProduct/SAVESAMPLESTOCKDATA';
  public GETSAMPLEALLOCDETAILFORAPPROVAL = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEALLOCDETAILFORAPPROVAL';
  public GETSAMPLEAPPROVALDETAILSBYSAMPLECODE = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEAPPROVALDETAILSBYSAMPLECODE';
  public SAVESAMPLEAPPROVALDETAILS = this.sharedService.ApiUrl + '/api/SampleProduct/SAVESAMPLEAPPROVALDETAILS';
  public GETSAMPLEAPPROVALMASTERDATA = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEAPPROVALMASTERDATA';
  public GETSAMPLEINVOICEMASTERLIST = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEINVOICEMASTERLIST';
  public GETSAMPLEALLOCDETAILSFORINVOICE = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEALLOCDETAILSFORINVOICE';
  public GETSAMPLEINVOICEDATABYID = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEINVOICEDATABYID';
  public SAVESAMPLEPRODUCTINVOICEDATA = this.sharedService.ApiUrl + '/api/SampleProduct/SAVESAMPLEPRODUCTINVOICEDATA';
  public GETINVOICEMASTERLIST = this.sharedService.ApiUrl + '/api/SampleProduct/GETINVOICEMASTERLIST';
  public UPDATESAMPLEINVOICEDATA = this.sharedService.ApiUrl + '/api/SampleProduct/UPDATESAMPLEINVOICEDATA';
  public GETINVOICEDATAFORPRINT = this.sharedService.ApiUrl + '/api/SampleProduct/GETINVOICEDATAFORPRINT';
  public SHOWINVOICEDATABYCYCLECODEANDUNITCODE = this.sharedService.ApiUrl + '/api/SampleProduct/SHOWINVOICEDATABYCYCLECODEANDUNITCODE';
  public GETINVOICEDETAILSBYINVOICEID = this.sharedService.ApiUrl + '/api/SampleProduct/GETINVOICEDETAILSBYINVOICEID';
  public GETHQWEFLIST = this.sharedService.ApiUrl + '/api/HQ/GETHQWEFLIST';
  public GETAREAWEFLIST = this.sharedService.ApiUrl + '/api/AreaMaster/GETAREAWEFLIST';
  public GETAREAUNDERLIST = this.sharedService.ApiUrl + '/api/AreaMaster/GETAREAUNDERLIST';
  public GETHQLISTBYLOGINID = this.sharedService.ApiUrl + '/api/MasterMobile/GETHQLISTBYLOGINID';

  public GET_HQ_LIST_BY_LOGIN_ID_REJECTREVESAL = this.sharedService.ApiUrl + '/api/MasterMobile/GET_HQ_LIST_BY_LOGIN_ID_REJECTREVESAL';
  public GET_USER_LIST_BY_HQROLE = this.sharedService.ApiUrl + '/api/MasterMobile/GET_USER_LIST_BY_HQROLE'
  public GETDISCOUNTMASTERLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTMASTERLIST';
  public SAVEDISCOUNTDATA = this.sharedService.ApiUrl + '/api/MasterMobile/SAVEDISCOUNTDATA';
  public GETDISCOUNTSPECIALLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTSPECIALLIST';
  public GETDISCOUNTCHEMISTLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTCHEMISTLIST';
  public GETSTOCKISTLISTBYHQCODE = this.sharedService.ApiUrl + '/api/MasterMobile/GETSTOCKISTLISTBYHQCODE';
  public SAVECHEMISTMASTERDATA = this.sharedService.ApiUrl + '/api/MasterMobile/SAVECHEMISTMASTERDATA';
  public SAVEDOCTORMASTERDATA = this.sharedService.ApiUrl + '/api/MasterMobile/SAVEDOCTORMASTERDATA';
  public GETCLAIMTREPORT = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMTREPORT';

  public GETDISCOUNTCLAIMREQUESTDATA = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTCLAIMREQUESTDATA';

  public ClAIMDISCOUNTUPDATE = this.sharedService.ApiUrl + '/api/MasterMobile/ClAIMDISCOUNTUPDATE';
  public GETMASTERLISTFORCLAIMSETTLEMENT = this.sharedService.ApiUrl + '/api/MasterMobile/GETMASTERLISTFORCLAIMSETTLEMENT';
  public GETCLAIMSETTLEMENTLISTDATA = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMSETTLEMENTLISTDATA';
  public SAVECLAIMSETTLEMENTDATA = this.sharedService.ApiUrl + '/api/MasterMobile/SAVECLAIMSETTLEMENTDATA';
  public GETDISCOUNTCLAIMLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTCLAIMLIST';
  public GETAPPROVEDCLAIMLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETAPPROVEDCLAIMLIST';
  public GETDOCTORHISTORYBYDOCTORID = this.sharedService.ApiUrl + '/api/MasterMobile/GETDOCTORHISTORYBYDOCTORID';
  public GETCLAIMAPPROVALLISTBYUSERID = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMAPPROVALLISTBYUSERID';
  public GETCLAIMMASTERDATA = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMMASTERDATA';
  public SAVECLAIMREQUEST = this.sharedService.ApiUrl + '/api/MasterMobile/SAVECLAIMREQUEST';
  public APPROVECLAIMREQUEST = this.sharedService.ApiUrl + '/api/MasterMobile/APPROVECLAIMREQUEST';
  public GETCLAIMTRACKLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMTRACKLIST';
  public GETINVOICEIMAGEBYCLAIMNO = this.sharedService.ApiUrl + '/api/MasterMobile/GETINVOICEIMAGEBYCLAIMNO';
  public UPDATEUSERPASSWORDBYUSERID = this.sharedService.ApiUrl + '/api/UserMaster/UPDATEUSERPASSWORDBYUSERID';
  public GETCLAIMREQUESTFORAPPROVAL = this.sharedService.ApiUrl + '/api/MasterMobile/GETCLAIMREQUESTFORAPPROVAL';
  public APPROVECLAIMREQUESTBYROLEID = this.sharedService.ApiUrl + '/api/MasterMobile/APPROVECLAIMREQUESTBYROLEID';
  public GETMASTERLISTFORDOCTOR = this.sharedService.ApiUrl + '/api/MasterMobile/GETMASTERLISTFORDOCTOR';
  public SAVECHEMISTMASTERDATAWEB = this.sharedService.ApiUrl + '/api/MasterMobile/SAVECHEMISTMASTERDATAWEB';
  public GET_MASTER_LIST_FOR_PRODUCT_GROUPLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GET_MASTER_LIST_FOR_PRODUCT_GROUPLIST';
  public UPDATE_PRODUCT_GROUP_CODE = this.sharedService.ApiUrl + '/api/MasterMobile/UPDATE_PRODUCT_GROUP_CODE';
  public VALIDATE_CLAIM_REQUEST = this.sharedService.ApiUrl + '/api/MasterMobile/VALIDATE_CLAIM_REQUEST';
  public GETDISCOUNTDETAILSLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETDISCOUNTDETAILSLIST';
  public GETREQUESTDETAILSBYREQUESTID = this.sharedService.ApiUrl + '/api/MasterMobile/GETREQUESTDETAILSBYREQUESTID';

  public GETMASTERCHEMISTLIST = this.sharedService.ApiUrl + '/api/MasterMobile/GETMASTERCHEMISTLIST';
  public UPDATEUSERDETAILSFORDISPATCHED = this.sharedService.ApiUrl + '/api/SampleProduct/UPDATEUSERDETAILSFORDISPATCHED';
  public GETSAMPLEINVOICEDETAILSBYUSERID = this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEINVOICEDETAILSBYUSERID';
  public UPDATESAMPLEINVOICEDISPATCHEDSTATUS = this.sharedService.ApiUrl + '/api/SampleProduct/UPDATESAMPLEINVOICEDISPATCHEDSTATUS';
  public UPDATEINVOICETOYS2EXPIRY = this.sharedService.ApiUrl + '/api/ITD/UPDATEINVOICETOYS2EXPIRY';

  public GETCLAIMMASTERDATAFORREPORT = this.sharedService.ApiUrl + '/api/Reports/GETCLAIMMASTERDATAFORREPORT';
  public GETFINALCLAIMREPORT = this.sharedService.ApiUrl + '/api/Reports/GETFINALCLAIMREPORT';
  public GETMOEREPORT = this.sharedService.ApiUrl + '/api/Reports/GETMOEREPORT';
  public GENERATEPDF = this.sharedService.ApiUrl + '/api/Reports/GENERATEPDF';
  public GETUPDATECLAIMREPORT = this.sharedService.ApiUrl + '/api/Reports/GETUPDATECLAIMREPORT';
  public GETPRODUCTCODEMRPLIST = this.sharedService.ApiUrl + '/api/Reports/GETPRODUCTCODEMRPLIST';
  public SAVEUPDATECLAIMREPORT = this.sharedService.ApiUrl + '/api/Reports/SAVEUPDATECLAIMREPORT';
  public GETCMEMASTERLIST = this.sharedService.ApiUrl + '/api/Cme/GETCMEMASTERLIST';
  public SAVECMEREQUEST = this.sharedService.ApiUrl + '/api/Cme/SAVECMEREQUEST';
  public Upload = this.sharedService.ApiUrl + '/api/Cme/Upload';
  public GETCMEDOCTORLIST = this.sharedService.ApiUrl + '/api/Cme/GETCMEDOCTORLIST';
  public GETCMEREQUESTLIST = this.sharedService.ApiUrl + '/api/Cme/GETCMEREQUESTLIST';
  public GETCMEREQUESTLISTUSERID = this.sharedService.ApiUrl + '/api/Cme/GETCMEREQUESTLISTUSERID';
  public GETCMEREQUESTDATABYCMENO = this.sharedService.ApiUrl + '/api/Cme/GETCMEREQUESTDATABYCMENO';
  public APPROVECMEREQUEST = this.sharedService.ApiUrl + '/api/Cme/APPROVECMEREQUEST';
  public UploadFiles = this.sharedService.ApiUrl + '/api/Cme/UploadFiles';
  public GETCMEAPPROVEDLISTUSERID = this.sharedService.ApiUrl + '/api/Cme/GETCMEAPPROVEDLISTUSERID';
  public GETCMEREQUESTPAYMENTLISTBYUSERID = this.sharedService.ApiUrl + '/api/Cme/GETCMEREQUESTPAYMENTLISTBYUSERID';
  public GETPAYMENTMASTERLIST = this.sharedService.ApiUrl + '/api/Cme/GETPAYMENTMASTERLIST';
  public SAVECMEPAYMENT = this.sharedService.ApiUrl + '/api/Cme/SAVECMEPAYMENT';
  public GETCMEPAYMENTLISTBYUSERID = this.sharedService.ApiUrl + '/api/Cme/GETCMEPAYMENTLISTBYUSERID';
  public GETPOSTCMELISTBYUSERID = this.sharedService.ApiUrl + '/api/Cme/GETPOSTCMELISTBYUSERID';
  public POSTCMEMASTERLIST = this.sharedService.ApiUrl + '/api/Cme/POSTCMEMASTERLIST';
  public GETPOSTCMEMASTERLIST = this.sharedService.ApiUrl + '/api/Cme/GETPOSTCMEMASTERLIST';
  public SAVEPOSTCMEREQUEST = this.sharedService.ApiUrl + '/api/Cme/SAVEPOSTCMEREQUEST';
  public GETDETAILSPOSTCMEREQUEST = this.sharedService.ApiUrl + '/api/Cme/GETDETAILSPOSTCMEREQUEST';
  // public ConvertHtmlToBase64 = this.sharedService.ApiUrl + '/api/Cme/ConvertHtmlToBase64';
  public ConvertHtmlToBase64 = this.sharedService.ApiUrl + '/api/Cme/DownloadToPdf';
  public getfolder = this.sharedService.ApiUrl + '/api/Reports/GetFolder';
  public downloadZip = this.sharedService.ApiUrl + '/api/Reports/DownloadFolderAsZip';
  public getStatus = this.sharedService.ApiUrl + '/api/Reports/GETSTATUS';
  public getMoeMergedReport = this.sharedService.ApiUrl + '/api/Reports/GETMOEMERGEDREPORT';
  public ConvertBase64ToPdf = this.sharedService.ApiUrl + '/api/Cme/ConvertBase64ToPdf';
  public getTargetList = this.sharedService.ApiUrl + '/api/Cme/GETTARGETYEAR';
  public saveUploadMktReport = this.sharedService.ApiUrl + '/api/Cme/SAVEUPLOADMKTGREPORT';
  public getMoeTargetReport = this.sharedService.ApiUrl + '/api/Reports/GETMOETARGETREPORT';
  public GETMOETARGETMERGEDREPORT = this.sharedService.ApiUrl + '/api/Reports/GETMOETARGETMERGEDREPORT';
  public getFileName = this.sharedService.ApiUrl + '/api/Reports/GETFILENAME';
  public DivisionSalesReport = this.sharedService.ApiUrl + '/api/Reports/DivisionSalesReport';
  public UPDATEPOSTPONECMEREQUEST = this.sharedService.ApiUrl + '/api/Cme/UPDATEPOSTPONECMEREQUEST';
  public ProductSalesReport = this.sharedService.ApiUrl + '/api/Reports/ProductSalesReport';
  public GETMASTERLISTFORCMEREPORT = this.sharedService.ApiUrl + '/api/MasterMobile/GETMASTERLISTFORCMEREPORT';
  public getIncentiveList = this.sharedService.ApiUrl + '/api/Dashboard/GETINCENTIVELIST';
  public GETSAMPLEREQUISITIONMASTERLIST = this.sharedService.ApiUrl + '/api/SampelRequisition/GETSAMPLEREQUISITIONMASTERLIST';
  public GETSAMPLEREQUISITIONLISTBYCYCLEID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETSAMPLEREQUISITIONLISTBYCYCLEID';
  public SAVESAMPLEREQUISITION = this.sharedService.ApiUrl + '/api/SampelRequisition/SAVESAMPLEREQUISITION';
  public GETHQCODELISTBYPOOLCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/GETHQCODELISTBYPOOLCODE';
  public GETSAMPLEREQUISITIONLISTBYUSERID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETSAMPLEREQUISITIONLISTBYUSERID';
  public GETCALCULATEPACKQTYBYPOOLCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/GETCALCULATEPACKQTYBYPOOLCODE';
  public SAVEHQCODEBYPOOLCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/SAVEHQCODEBYPOOLCODE';
  public SAVESAMPLEREQUISITIONCYCLEDATA = this.sharedService.ApiUrl + '/api/SampelRequisition/SAVESAMPLEREQUISITIONCYCLEDATA';
  public GETSAMPLEREQUISITIONLISTBYTRXNID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETSAMPLEREQUISITIONLISTBYTRXNID';
  public APPROVEDSAMPLEREQUISITION = this.sharedService.ApiUrl + '/api/SampelRequisition/APPROVEDSAMPLEREQUISITION';
  public GETSMCALCULATEPACKQTYBYPOOLCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/GETSMCALCULATEPACKQTYBYPOOLCODE';
  public GETPMTSAMPLEREQUISITIONLISTBYUSERID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETPMTSAMPLEREQUISITIONLISTBYUSERID';
  public GETPRODUCTLISTBYTRXNID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETPRODUCTLISTBYTRXNID';
  public GETHQCODELISTBYPRODUCTCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/GETHQCODELISTBYPRODUCTCODE';
  public GETPMTCALCULATEPACKQTYBYPOOLCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/GETPMTCALCULATEPACKQTYBYPOOLCODE';
  public SAVEPMTSAMPLEREQUISITIONDATA = this.sharedService.ApiUrl + '/api/SampelRequisition/SAVEPMTSAMPLEREQUISITIONDATA';
  public PAYMENTSAVEVALIDATION= this.sharedService.ApiUrl + '/api/Cme/PAYMENTSAVEVALIDATION';
  public GETAPPROVEDPAYMENTLIST= this.sharedService.ApiUrl + '/api/Cme/GETPAYMENTAPPROVEDLISTBYUSERID';
  public STOCKSAVEVALIDATION= this.sharedService.ApiUrl + '/api/SampleProduct/STOCKSAVEVALIDATION';
  public GETSAMPLERECEIVEDETAILSBYUSERID= this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLERECEIVEDETAILSBYUSERID';
  public UPDATESAMPLEINVOICERECEIVESTATUS= this.sharedService.ApiUrl + '/api/SampleProduct/UPDATESAMPLEINVOICERECEIVESTATUS';
  public GETHQFORSAMPLERECEIVELIST= this.sharedService.ApiUrl + '/api/SampleProduct/GETHQFORSAMPLERECEIVELIST';
  public getIncentiveReport = this.sharedService.ApiUrl + '/api/Reports/GetIncentiveReport';
  public getIncentiveReportListFilter = this.sharedService.ApiUrl + '/api/Reports/GetIncentiveReportFilter';
  public UPDATEPMTREQINNERPACKBYHQCODE = this.sharedService.ApiUrl + '/api/SampelRequisition/UPDATEPMTREQINNERPACKBYHQCODE';
  public GETHQCODEEXCELDOWNLOADDATABYUSERID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETHQCODEEXCELDOWNLOADDATABYUSERID';
  public GETSAMPLEPRODUCTREPORT= this.sharedService.ApiUrl + '/api/SampleProduct/GETSAMPLEPRODUCTREPORT';
  public GETCONFORMATIONPOPUPMESS = this.sharedService.ApiUrl + '/api/SampelRequisition/GETCONFORMATIONPOPUPMESS';
  public GETPRODUCTLISTBYCYCLEID = this.sharedService.ApiUrl + '/api/SampelRequisition/GETPRODUCTLISTBYCYCLEID';
  public APPROVEDPMTSAMPLEREQUISITIONDATA = this.sharedService.ApiUrl + '/api/SampelRequisition/APPROVEDPMTSAMPLEREQUISITIONDATA';


}