function displayName() {
    let userName = document.getElementById("userName").value;
    sessionStorage.setItem('userName', userName);
    window.location.href = 'quiz.html';
}