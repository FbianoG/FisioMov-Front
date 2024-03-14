// Variáveis
const URLback = "https://fisio-mov-back.vercel.app"
// const URLback = "http://localhost:3000"
let userData
let activityList = document.querySelectorAll(".listActivity")
let access = document.querySelectorAll('.access')[0]

let btnHiddenAccess = document.querySelector('#btcHiddenAccess')
const token = localStorage.getItem("Token")



btnHiddenAccess.addEventListener('click', hiddenAccess)






// Funções

async function getUser() { // GET dados do "Usuário"
	try {
		const response = await fetch(`${URLback}/getUser`, {
			method: "POST",
			body: JSON.stringify({ token }),
			headers: { "Content-Type": "application/json" }
		})
		if (response.ok) {
			const data = await response.json()
			loadingData(data.user)
		} else if (response.status === 500) {
			location.href = "error.html"
		} else {
			throw new Error()
		}
	} catch (error) {
		console.log(Error);
		document.querySelector("body").innerHTML = "<h2>Acesso negado!</h2>"
		setTimeout(() => location.href = "index.html", 5000);
	}
}

async function loadingData(e) { // Gera HTML da página com os dados do "Usuário"
	try {
		const response = await fetch(`${URLback}/getAllActivity`, {
			method: "POST",
			body: JSON.stringify({ token }),
			headers: { "Content-Type": "application/json" }
		})
		if (response.ok) {
			const data = await response.json()
			createActivity(data.allAct, e)
		} else if (response.status === 500) {
			location.href = "error.html"
		} else {
			throw new Error("Acesso não permitido.")
		}
	} catch (error) {
		console.log(Error);
		document.querySelector("body").innerHTML = "<h2>Acesso negado!</h2>"
		setTimeout(() => location.href = "index.html", 5000);
	}
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