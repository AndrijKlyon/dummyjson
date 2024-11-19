"use strict";

// Выбор элементов
const usersTable = document.getElementById("users-table");
const authForm = document.forms["auth-form"];

// Получение пользователей
getUsers().then((users) => fillTable(users, usersTable));

async function getUsers() {
  const response = await fetch("https://dummyjson.com/users?limit=5");
  const json = await response.json();
  const users = json.users.map((item) => ({
    id: item.id,
    username: item.username,
    password: item.password,
  }));
  console.log(users);
  return users;
}

// Занесение пользователей в таблицу
function fillTable(users, table) {
  users.forEach((user) => {
    table.tBodies[0].insertAdjacentHTML(
      "beforeend",
      `
			<tr>
				<td>${user.id}</td>
				<td>${user.username}</td>
				<td>${user.password}</td>
			</tr>
		`
    );
  });
}

// Отправка формы аутентификации
authForm.onsubmit = async function (event) {
  event.preventDefault();
  const data = new FormData(this);

  // Аутентификация
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://andrijklyon.github.io",
    },
    body: JSON.stringify({
      username: "emilys",
      password: "emilyspass",
      expiresInMins: 30, // optional, defaults to 60
    }),
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  })
    .then((res) => res.json())
    .then(console.log);
};
