

export default class UserInfo {
    constructor(nameElement, jobElement){
        this._userJobElement = jobElement; 
        this._userNameElement = nameElement;
    }

    getUserInfo() {
        const userJob = this._userJobElement.textContent;
        const userName = this._userNameElement.textContent;
        return {userJob, userName};
    }

    setUserInfo(nameInput,jobInput) {
        this._userJobElement.textContent = jobInput;
        this._userNameElement.textContent = nameInput;
    }
}