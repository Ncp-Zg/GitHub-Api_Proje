class Storage{

    static getSearchedUsersFromStorage(){
        //tüm kullanıcıları al

        let users;

        if (localStorage.getItem("searched") === null) {
            users = [];

        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUsersToStorage(username){
        //kullanıcı ekle
        let users = this.getSearchedUsersFromStorage();

        //IndexOf
        if( users.indexOf(username) === -1) {
            users.unshift(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));


    }
    static clearAllSearchedUsersFromStorage(){
        //tüm kullanıcılar sil

        localStorage.removeItem("searched");
    }

    static clearCertainUser(el){
        //belli bir kişiyi silme

        const user = JSON.parse(localStorage.getItem("searched"));
        const x = user.findIndex(user=>user+"delete" === el);
        user.splice(x,1);
        localStorage.setItem("searched", JSON.stringify(user));





    }

}