// Variáveis
const URLback = "http://localhost:3000"
let userData
let activityList = document.querySelectorAll(".listActivity")
let access = document.querySelectorAll('.access')[0]

let btnHiddenAccess = document.querySelector('#btcHiddenAccess')
const token = localStorage.getItem("Token")



btnHiddenAccess.addEventListener('click', hiddenAccess)






// Funções

async function getUser() { // GET dados do "Usuário"




	const response = await fetch(`${URLback}/getUser`, {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: { "Content-Type": "application/json" }
	})
	if (response.status === 401) {
		window.location.href = "index.html"
	}
	const data = await response.json()
	console.log(data);

	loadingData(data.user)
}

async function loadingData(e) { // Gera HTML da página com os dados do "Usuário"

	const response = await fetch(`${URLback}/getAllActivity`, {
		method: "POST",
		body: JSON.stringify({ token }),
		headers: { "Content-Type": "application/json" }
	})

	if (response.status === 204) {
		return console.log({ status: 204, menssage: "DataBase não possui atividades cadastradas!" })
	}
	const data = await response.json()

	console.log(e);
	let allActivity = data.allAct
	// document.querySelectorAll('.content h1')[0].textContent = `Bem vindo, ${e.name.split(" ").slice(0, 2).join(" ")}`
	// document.querySelectorAll('.perfilHeader img')[0].src = `../uploads/${e.src}`
	createActivity(data.allAct, e)
}

function createActivity(atividadeApi, userData) { // Cria e filtra as atividades que foram enviadas ao "Usuário" 

	activityList[0].innerHTML = ""
	let listHg = document.querySelectorAll(".higher")[0]
	let listLw = document.querySelectorAll(".lower")[0]
	for (let i = 0; i < userData.hg.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.hg[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rpth[i], userData.serh[i], userData)
				listHg.appendChild(newActivity)
			}
		});
	}
	for (let i = 0; i < userData.lw.length; i++) {
		atividadeApi.forEach(element => {
			if (userData.lw[i] === element._id) {
				let newActivity = document.createElement("li")
				newActivity.classList = "cardActivity"
				newActivity.innerHTML = createActivityHtml(element, userData.rptl[i], userData.serl[i], userData)
				listLw.appendChild(newActivity)
			}
		});
	}
}

function createActivityHtml(e, rpt, ser, userData) { // Cria o HTML de cada atividade 
	const html = `
        <div class="cardData">
            <span style="display:none;">${e._id}</span>
			<img src="../uploads/" alt="foto da atividade" class="actImg">
			<div>
				<h4>${e.name}</h4>
				<label>${rpt} - repetições</label>
				<br>
				<label>${ser} - séries</label>
				<br>
				<label style="font-size: 11px;">Enviado por: ${userData.by}</label>
			</div>
        </div>
        <div class="statusActivity">
			<a href="atividade.html?act=${e.web}&id=${token}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" id="acessActivityBtn"></i></a>
            <p>Acessar Atividade</p>
        </div>
    `
	return html
}

function hiddenAccess() {
	access.style.right = "-350px"
}

function showAccess() {
	access.style.transition = "300ms"
	access.style.right = "30px"
}




// Chamadas

setTimeout(showAccess, 3000)

getUser()  // GET dados do "Usuário"