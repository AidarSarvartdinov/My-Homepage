let comicTitle = document.getElementById("comic-title")
let comicImg = document.getElementById("comic-img")
let comicDate = document.getElementById("comic-date")
let emailError = document.getElementById("email-error")
let email = document.getElementById("email")

document.getElementById("comic-form").addEventListener("submit", getComic)

async function getComic(event) {
    event.preventDefault()
    let param = new URLSearchParams();
    param.append("email", email.value);

    let response = await fetch("https://fwd.innopolis.university/api/hw2?" + param.toString())
    response.json()
    .then(result => {
        param = new URLSearchParams()
        param.append("id", result)
        fetch("https://fwd.innopolis.university/api/comic?" + param.toString())
        .then(answ => answ.json())
        .then(jsonObj => {
            comicTitle.textContent = jsonObj["safe_title"]            
            comicImg.src = jsonObj["img"]
            comicImg.alt = jsonObj["alt"]
            let date = new Date(Date.UTC(jsonObj["year"], jsonObj["month"] - 1, jsonObj["day"]))
            comicDate.textContent = date.toLocaleDateString()
            emailError.textContent = ""
            email.value = ""
        })
    }).catch(error => {
        emailError.textContent = "Incorrect innopolis email"
        email.value = ""
    })


    
}
