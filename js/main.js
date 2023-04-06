class GetDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data;
            });
        return this.data;
    }

}

class Header {
    headerElement;
    figureElement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarElement;
    avatarBodyElement;
    avatarHeadElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-money-bill-transfer";

        this.logoHeadingElement = document.createElement("h2");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarWrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);
    }
}

class BankyMain{
    placeToRenderBankyMain;
    leftSection;
    rightSection;
    data;
    

    constructor(placeToRenderBankyMain){
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        /* main */
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this);
    }

    makeButtonsFromData(data){
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data){
        this.leftSection.makeTransactionsFromData(Object.entries(data)[0][0], data);
    }

    callFromRightSection(account, data){
        this.leftSection.makeTransactionsFromData(account, data);
    }

    render(){
        this.placeToRenderBankyMain.appendChild(this.mainElement);

        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection{
    mainElement;
    constructor(mainElement){
        this.mainElement = mainElement;
        // left section
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left"

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoTextElement = document.createElement("h1");
        this.bankyLogoTextElement.classList = "banky__money";

        this.eyeButtonElement = document.createElement("button");
        this.eyeButtonElement.classList = "banky__eyeButton";
        this.eyeButtonElement.onclick = this.eyeButtonClicked;


        this.eyeFigureElement = document.createElement("figure");
        this.eyeFigureElement.classList = "banky__eye";

        this.eyeIElement = document.createElement("i");
        this.eyeIElement.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

        this.transferButtonElement = document.createElement("button");
        this.transferButtonElement.classList = "banky__transferButton";
        this.transferButtonElement.innerText = "Overboeken"
    }

    eyeButtonClicked = () =>{
        this.transactionsElement.classList.toggle("banky__transactions--blur");
        this.bankyLogoTextElement.classList.toggle("banky__money--blur");
    }

    makeTransactionsFromData(accountToShow, data){
        let totalMoney = 0;
        for(let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
        }

        this.bankyLogoTextElement.innerText = "Saldo " +  " €" + totalMoney;

        this.transactionsElement.innerHTML = "";

        for(let i = 0; i < data[accountToShow].length; i++){
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";
    
            this.transactionFromElement = document.createElement("h3");
            this.transactionFromElement.classList = "banky__name";
            this.transactionFromElement.innerText = data[accountToShow][i]["from/to"];
    
            this.transactionAmountElement = document.createElement("h3");
            this.transactionAmountElement.classList = "banky__amount";
            this.transactionAmountElement.innerText = "€" + data[accountToShow][i]["amount"];

            this.leftSectionElement.appendChild(this.transactionsElement);
            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFromElement);
            this.transactionElement.appendChild(this.transactionAmountElement);
        }
        this.leftSectionElement.appendChild(this.transferButtonElement);

    }
    
    render(){
        // left section
        this.mainElement.appendChild(this.leftSectionElement);
        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoTextElement);
        this.bankyHeaderWrapElement.appendChild(this.eyeButtonElement);
        this.eyeButtonElement.appendChild(this.eyeFigureElement);
        this.eyeFigureElement.appendChild(this.eyeIElement);
        
    }
}



class BankyRightSection {
    mainElement;
    bankyMain;
    constructor(mainElement, bankyMain) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.bankyAcounts = document.createElement("ul");
        this.bankyAcounts.classList = "banky__accounts";


    }

    makeButtonsFromData(data) {
        Object.entries(data).forEach((entry) => {
            this.bankyAcount = document.createElement("li");
            this.bankyAcount.classList = "banky__account";
            this.bankyAcount.onclick = () => {
                this.bankyMain.callFromRightSection(entry[0], data);
            }

            this.switchAccountButton = document.createElement("button");
            this.switchAccountButton.classList = "banky__switchAccount";


            this.accountName = document.createElement("h4");
            this.accountName.classList = "banky__nameOfAccount";
            this.accountName.innerText = "Bankrekening";

            this.switchaccountFigure = document.createElement("figure");
            this.switchaccountFigure.classList = "banky__logo";

            this.switchAccountLogoElement = document.createElement("i");
            this.switchAccountLogoElement.classList = (entry[1][0]["logo"]);
    
            this.switchZZPAccountElement = document.createElement("i");
            this.switchZZPAccountElement.classList = (entry[1][0]["logo"]);

            this.bankyLogo2Element = document.createElement("i");
            this.bankyLogo2Element.classList = "fa-solid fa-mug-hot";

            this.bankyAccountName = document.createElement("h4");
            this.bankyAccountName.classList = "banky__nameOfAccount";
            this.bankyAccountName.innerText = "Bankrekening";
            this.bankyAccountName.innerText = entry[0];

            this.bankyAcounts.appendChild(this.bankyAcount);
            this.bankyAcount.appendChild(this.switchAccountButton);
            this.switchAccountButton.appendChild(this.switchaccountFigure);
            this.switchaccountFigure.appendChild(this.switchZZPAccountElement);
            this.bankyAcount.appendChild(this.bankyAccountName);


        })
    }

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.bankyAcounts);
    }
}

class App {
    bankyHeader;
    bankyMain;
    getDataFromApi;
    constructor() {
        this.header = new Header("body");
        this.bankyMain = new BankyMain("body");

        this.getDataFromApi = new GetDataFromApi("./data/transactions.json");

        this.getDataFromApi
            .getData().then((data) => {
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonsFromData(data);
            });

        this.header.render();
        this.bankyMain.render();
    }
}

const app = new App()