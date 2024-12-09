const searchField = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const userDiv = document.getElementById('user');

const err = () =>
    userDiv.innerHTML = '<p class="error">User not found!</p>';

const updateUserDiv = user =>
    userDiv.innerHTML =
        `
<img src="${user.avatar_url}" alt="avatar" class="avatar">
<div class="user-info">
    <h2 class="username">${user.login}</h2>
    <h3 class="name">${user.name}</h3>
    <p class="description">${user.bio == null ? 'bio not created!' : user.bio}</p>
    <div class="followers">
        <p class="description">Followers: ${user.followers}</p>
        <p class="description">Following: ${user.following}</p>
    </div>
<p class="description">Total public repos: ${user.public_repos}</p>
<p class="description">GitHub profile: <a href="${user.html_url}" target="_blank">${user.login}</a></p>
        `

async function searchUser(username) {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    if (userInfo.status === 404) {
        err();
        return;
    }

    try {
        const user = await userInfo.json();
        console.log(user.bio == null);
        updateUserDiv(user);
    } catch (err) {
        throw new Error(err);
    }
}

searchBtn.addEventListener('click', () => {
    searchUser(searchField.value);
    searchField.value = '';
});

searchField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchUser(e.target.value);
        e.target.value = '';
    }
});