// Variáveis
const URLback = "http://localhost:3000"
const accessForm = document.querySelectorAll(".accessForm")[0]
const formLogin = document.querySelector('#formLogin')
const btnAccessBar = document.querySelectorAll("button")[0]
const btnRegisterBar = document.querySelectorAll("button")[1]
const btnHiddenForm = accessForm.querySelectorAll(".btnHidden")[0]
const btnSubmit = document.querySelector("#acessar")

console.log(btnRegisterBar);
// Eventos
btnAccessBar.addEventListener("click", showAcessForm)
btnHiddenForm.addEventListener("click", hiddenAcessForm)
btnRegisterBar.addEventListener("click", () => window.location.href = "registro.html")
formLogin.addEventListener('submit', login)


//Funções
async function login(e) {
	e.preventDefault()
	const email = document.querySelector('[name="email"]').value
	const password = document.querySelector('[name="password"]').value
	const response = await fetch(`${URLback}/login`, {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" }
	})
	const data = await response.json()
	if (response.status !== 200) {
		invalidLogin(data.message)
		return
	}
	localStorage.setItem("Token", data.token)
	data.patient == false ? window.location.href = "provider.html" : window.location.href = "user.html"
}

function showAcessForm() {
	accessForm.style.top = "70px"
	document.querySelector('[name="email"]').value = ""
	document.querySelector('[name="password"]').value = ""
}

function hiddenAcessForm() {
	accessForm.style.transition = "350ms"
	accessForm.style.top = "-320px"
	document.querySelector('[name="email"]').style.borderColor = ""
	document.querySelector('[name="password"]').style.borderColor = ""
	document.querySelector('#alertLogin').style.color = ""
	document.querySelector('#alertLogin').textContent = "-"
}

function invalidLogin(params) {
	document.querySelector('[name="email"]').style.borderColor = "red"
	document.querySelector('[name="password"]').style.borderColor = "red"
	document.querySelector('#alertLogin').style.color = "red"
	document.querySelector('#alertLogin').textContent = params
}


const formEmail = document.querySelector('#formSendEmail')

formEmail.addEventListener('submit', sendEmail)


async function sendEmail(e) {
	e.preventDefault()


	

	const sendEmail = await emailjs.sendForm('service_an5y8sf', 'template_3o8qe56', formEmail)
	console.log(sendEmail);

}



// Chamadas
localStorage.clear()