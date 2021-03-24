// Elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){
    let username = nameInput.value.trim();

    if (username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin.");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı");
            }
            else{
                ui.addSearchedUsersToUI(username);
                Storage.addSearchedUsersToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err));
    }



    ui.clearInput();//input temizleme
    e.preventDefault();
}

function clearAllSearched(){
    //Tüm arananları temizle
    if (confirm("Emin misiniz ?")){
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan temizleme
        ui.clearAllSearchedFromUI();
    }





}

function getAllSearched(){
    //Aramaları Storagedan al ve uı ye ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        // result += `<li class="list-group-item">${user}</li>`

        const li = document.createElement("li");
            
            li.className = "list-group-item";
            li.textContent = user;

            const button = document.createElement("button");
            button.innerHTML = "delete";
            button.addEventListener("click",ui.deleteLastSearch);
            li.appendChild(button);

            lastUsers.appendChild(li);
    });

}