export default class MasterclassPage {
    constructor(page){
        this.page = page;
        this.masterclass = page.locator("//a[normalize-space()='Masterclass']");
        this.shareButton = page.locator("(//img[@alt='share-button'])[1]");
        this.enrollNow = page.locator("//button[@id='masterclassEnroll-Btn']");
        this.name = page.locator("//input[@name='full_name']");
        this.email = page.locator("//input[@name='email']");
        this.mobileNumber = page.locator("//input[@placeholder='Mobile Number*']");
        this.nameToast = page.locator("//span[normalize-space()='This is a invalid name.']");
        this.nameToast2 = page.locator("//span[normalize-space()='Name cannot be empty']");
        this.emailToast = page.locator("//span[normalize-space()='Please enter a valid email address']");
        this.emailToast2 = page.locator("//span[normalize-space()='Email address cannot be empty']");
        this.mobileNumberToast = page.locator("//span[normalize-space()='This is an invalid number']");  
        this.mobileNumberToast2 = page.locator("//span[normalize-space()='Phone number cannot be empty']");
        this.checkbox = page.locator("//input[@name='consent']");
        this.firstTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][1]");
        this.secondTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][2]");
        this.thirdTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][3]");
        this.fourthTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][4]");
        this.fifthTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][5]");
        this.sixthTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][6]");
        this.seventhTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][7]");
        this.eighthTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][8]");
        this.ninethTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][9]");
        this.tenthTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][10]");
        this.eleventhTile = page.locator("//div[contains(@class,'accordion_accordion__3tr6O')][11]")
        this.firstCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[1]");
        this.secondCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[2]");
        this.thirdCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[3]");
        this.fourthCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[4]");
        this.fifthCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[5]");
        this.sixthCard = page.locator("(//div[@class='catchup_cathup-profile-info__TPXuX'])[6]");
        this.watchFullMasterclass = page.locator("//span[@class='audio_watch_full_masterclass__KqoJI']");
        this.submitButton = page.locator("//button[@class='FormEnrollment_form-btn___CGRO']");
        this.positiveFeedback = page.locator("//img[@src='/images/masterclass/positive-feedback.svg']");
        this.viewAllMasterclasses = page.locator("//a[normalize-space()='View all the Masterclasses']");
    }
}

