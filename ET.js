function saveData(event){
    event.preventDefault();

    let expenseAmount = event.target.expenseAmount.value;
    let discription = event.target.discription.value;
    let choosing = event.target.choosing.value;

    let myObj = {
        expenseAmount,
        discription,
        choosing
    }

    localStorage.setItem(myObj.discription, JSON.stringify(myObj));

    showUsersOnMyScreen(myObj);

}

window.addEventListener("DOMContentLoaded", () =>{
    const localStorageObject = localStorage;
    const localStorageKeys = Object.keys(localStorageObject);

    for(let i=0; i<localStorageKeys.length; i++){
        const key = localStorageKeys[i];
        const userDetailString = localStorageObject[key];
        const userDetailsObj = JSON.parse(userDetailString);
        showUsersOnMyScreen(userDetailsObj);
    }
})

function showUsersOnMyScreen(user){

    const parentNode = document.getElementById('users')
    const childHTML = `<li> ${user.expenseAmount} - ${user.discription} - ${user.choosing}  
                    
                   <button onclick = deleteUser('${user.discription}')>Delete Expense</button>
    
        </li>` 

    

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function deleteUser(item){
    localStorage.removeItem(item)
}

