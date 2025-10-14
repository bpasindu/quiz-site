window.onload = function() {
    const userName = sessionStorage.getItem('userName');
    if(userName) {
        document.getElementById("userName1").innerText = userName;
    }
}