import {formatDistanceToNowStrict} from "date-fns";

let comicTitle = document.getElementById("comic-title") as HTMLDivElement;
let comicImg = document.getElementById("comic-img") as HTMLImageElement;
let comicDate = document.getElementById("comic-date") as HTMLDivElement;
let emailError = document.getElementById("email-error") as HTMLDivElement;
let email = document.getElementById("email") as HTMLInputElement;

let comicForm = document.getElementById("comic-form") as HTMLFormElement;
comicForm.addEventListener("submit", getComic);

interface ResponseData {
    "safe_title": string,
    "img": string,
    "alt": string,
    "year": number,
    "month": number,
    "day": number
}

async function getComic(event: Event) {
    event.preventDefault()
    let param = new URLSearchParams();
    param.append("email", email.value);

    let response = await fetch("https://fwd.innopolis.university/api/hw2?" + param.toString())
    response.json()
    .then((result: string) => {
        param = new URLSearchParams()
        param.append("id", result)
        fetch("https://fwd.innopolis.university/api/comic?" + param.toString())
        .then(answ => answ.json() as Promise<ResponseData>)
        .then(jsonObj => {
            comicTitle.textContent = jsonObj["safe_title"]        
            comicImg.src = jsonObj["img"]
            comicImg.alt = jsonObj["alt"]
            let date: Date = new Date(Date.UTC(jsonObj["year"], jsonObj["month"] - 1, jsonObj["day"]))
            comicDate.textContent = `${date.toLocaleDateString()}, ${formatDistanceToNowStrict(date)} ago`
            emailError.textContent = ""
            email.value = ""
        })
    }).catch(() => {
        emailError.textContent = "Incorrect innopolis email"
        email.value = ""
    })
}
