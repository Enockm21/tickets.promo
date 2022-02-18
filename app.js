const description = document.getElementById("description");
const form = document.getElementById("form");
const person = document.getElementById("person");
const submit = document.getElementById("submit");
const tbody = document.getElementById("tbody");
const select = document.getElementById("select");
const elementtr = document.getElementById("tr");
// const eltd = document.createElement("td");
let users = [];
const allusers = async () => {
  const response = await fetch(
    "https://web-help-request-api.herokuapp.com/users"
  );
  const data = await response.json();
  users = data.data;
  console.log(data);

  users.forEach(function (user) {
    select.innerHTML += `<option value="${user.id}">${user.username}</option>`;
  });
};

allusers();

const addtickets = async () => {
  const res = await fetch(
    "https://web-help-request-api.herokuapp.com/tickets",
    {
      method: "POST",
      body: new URLSearchParams({
        subject: description.value,
        userId: select.value,
      }),
    }
  );
  console.log(res);
};
form.addEventListener("submit", addtickets);
let tickets = [];
const alltickets = async () => {
  const response = await fetch(
    "https://web-help-request-api.herokuapp.com/tickets"
  );
  const data = await response.json();

  tickets = data.data;
  // tickets.forEach(function (ticket) {
  //   let userName = users.map((el) => {
  //     if (ticket.users_id === el.id) {
  //       return el.username;
  //     }
  //   });
  //   //
  //   console.log(userName);
  //   // }
  //   // console.log(ticket.users_id);
  // });

  for (let i = 0; i < tickets.length; i++) {
    tbody.innerHTML += `<tr>
                          <td>${tickets[i].id}</td>
                          <td></td>
                          <td>${tickets[i].subject}</td>
                          <td>${tickets[i].date}</td>
                      </tr>`;
  }
};
alltickets();

// function send(e) {
//   e.preventDefault();
//   fetch("https://web-help-request-api.herokuapp.com/tickets", {
//     method: "POST",

//     body: new URLSearchParams({
//       subject: description,
//       userId: 58,
//     }),
//   });
//   // .then(function (res) {
//   //   if (res.ok) {
//   //     return res.json();
//   //   }
//   // })
//   // .then(function (value) {
//   //   document.getElementById("description").innerText = value.postData.text;
//   // });
// }
// tickets.forEach(function (user) {
//   // eltd.innerHTML = "";
//   for (let i = 0; i < user.length; i++) {

//   }
// });

// console.log("tableau users", users);
// users.push(data);
tickets.forEach(function (ticket) {
  var userName = users.map((el) => {
    if (ticket.users_id === el.id) {
      console.log(el.username);
    }
    console.log(userName);
  });
});
