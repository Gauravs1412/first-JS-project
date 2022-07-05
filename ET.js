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

    axios.post("https://crudcrud.com/api/8044292722d24faeab1be27aa73ab72f/expenseData",myObj)
    .then((response)=>{
        showUsersOnMyScreen(response.data)
        console.log(response)
    })
    .catch((err) =>{
        console.log(err)
    })

    // localStorage.setItem(myObj.discription, JSON.stringify(myObj));

    // showUsersOnMyScreen(myObj);

}

window.addEventListener("DOMContentLoaded", () =>{

    axios.get('https://crudcrud.com/api/8044292722d24faeab1be27aa73ab72f/expenseData')
    .then((response) => {
        console.log(response.data)

        for(var i=0; i<response.data.length; i++){
            showUsersOnMyScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    // const localStorageObject = localStorage;
    // const localStorageKeys = Object.keys(localStorageObject);

    // for(let i=0; i<localStorageKeys.length; i++){
    //     const key = localStorageKeys[i];
    //     const userDetailString = localStorageObject[key];
    //     const userDetailsObj = JSON.parse(userDetailString);
    //     showUsersOnMyScreen(userDetailsObj);
    // }
})

function showUsersOnMyScreen(user){

    const parentNode = document.getElementById('users')
    const childHTML = `<li id =${user._id}> ${user.expenseAmount} - ${user.discription} - ${user.choosing}  
                    
                   <button onclick = deleteUser('${user._id}')> Delete Expense </button>
                   <button onclick = editUserDetails('${user.discription}','${user.expenseAmount}','${user.choosing},'${user._id}')>Edit User</button>
    
        </li>` 

    

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserDetails(discription,expenseAmount,choosing,userId){
    document.getElementById('discription').value = discription;
    document.getElementById('expenseAmount').value = expenseAmount;
    document.getElementById('choosing').value = choosing;

    deleteUser(userId)

}

function deleteUser(userId){

    axios.delete(`https://crudcrud.com/api/8044292722d24faeab1be27aa73ab72f/expenseData/${userId}`)
        .then((response) =>{
            removeFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })
    // localStorage.removeItem(discription)
    // removeFromScreen(discription);
}

function removeFromScreen(userId){
    const parentNode = document.getElementById('users');
    const childToBeDeleted = document.getElementById(userId);

    parentNode.removeChild(childToBeDeleted)
}

