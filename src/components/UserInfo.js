

export default class UserInfo {
    constructor(nameElement, jobElement, avatarElement){
        this._userJobElement = jobElement; 
        this._userNameElement = nameElement;
        this._userAvatarElement = avatarElement;
    }

    getUserInfo() {
        const userJob = this._userJobElement.textContent;
        const userName = this._userNameElement.textContent;
        return {userJob, userName};
    }

    setUserInfo(nameInput,jobInput, avatarLink) {
        this._userJobElement.textContent = jobInput;
        this._userNameElement.textContent = nameInput;
        avatarLink && (this._userAvatarElement.src = avatarLink);
    }

    setAvatar(avatarLink) {
        this._userAvatarElement.src = avatarLink;
    }
}