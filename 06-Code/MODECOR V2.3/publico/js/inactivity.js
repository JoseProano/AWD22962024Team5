const inactivityTime = 300000; 

function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

setTimeout(logoutUser, inactivityTime);
