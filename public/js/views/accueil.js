import Config from "../module.js"

function Accueil(doc, options){

    // LOAD CSS 
        let cssNormalService = document.getElementById('cssNormalService')
        cssNormalService.href = '/css/module/style.css';
        let cssResponsiveService = document.getElementById('cssResponsiveService')
        cssResponsiveService.href = '/css/module/responsive.css';
    // LOAD CSS 

    let loaderHTML

    let ContainerPrincipaleContent = document.getElementById("ShellBody");
    ContainerPrincipaleContent.innerHTML = ""

    let cadreService = document.createElement('div')
    cadreService.classList.add('cadre__service')
        {
            // let logoServiceHTML = document.createElement('img')
            // logoServiceHTML.classList.add('cadre__service_logo')
            // logoServiceHTML.src = options.logo
            // cadreService.append(logoServiceHTML)
            // let titleHTML = document.createElement('h2')
            // titleHTML.innerText = options.app
            // cadreService.append(titleHTML)
            let descriptionHTML = document.createElement('small')
            descriptionHTML.innerText = Config.description
            cadreService.append(descriptionHTML)
            
        }
    ContainerPrincipaleContent.append(cadreService)

    if(options.mobile){
        ContainerPrincipaleContent = document.getElementById('blockContainer__contenu-content')
    } else {
        ContainerPrincipaleContent = document.getElementById('ShellBody')
    }

    ContainerPrincipaleContent.innerHTML = ''

    let alertHTML = document.createElement('div')
    alertHTML.classList.add('alert')
    alertHTML.style.display = "none"
    ContainerPrincipaleContent.append(alertHTML)
    
    let containerHTML = document.createElement('div')
    containerHTML.classList.add('container__application')
    ContainerPrincipaleContent.append(containerHTML)

    let containerCheckEmailHTML = document.createElement('div')
    containerCheckEmailHTML.classList.add('container__checkemail')
    {
        let cadreCenterHTML = document.createElement('div')
        cadreCenterHTML.classList.add('cadre__center')
        {
            let titreHTML = document.createElement('h1')
            titreHTML.innerText = "Vous cherchez à vérifier si une boite au lettre existe ou pas."
            cadreCenterHTML.append(titreHTML)
            let paragrapheHTML = document.createElement('p')
            paragrapheHTML.innerText = "Cet outil vérifie si la boite au lettre existe ou pas."
            cadreCenterHTML.append(paragrapheHTML)
            let breakUnHTML = document.createElement('br')
            cadreCenterHTML.append(breakUnHTML)
            let breakDeuxHTML = document.createElement('br')
            cadreCenterHTML.append(breakDeuxHTML)

            let centerHTML = document.createElement('center')
            {
                loaderHTML = document.createElement('div')
                loaderHTML.classList.add('loader')
                loaderHTML.style.display = "none"
                centerHTML.append(loaderHTML)
            }
            cadreCenterHTML.append(centerHTML)

            let cadreCheckHTML = document.createElement('div')
            cadreCheckHTML.classList.add('cadre__check')
            {
                let inputMailHTML = document.createElement('input')
                inputMailHTML.classList.add('inputMail')
                cadreCheckHTML.append(inputMailHTML)
                let buttonCheckHTML = document.createElement('button')
                buttonCheckHTML.classList.add('checkemail__btnMail')
                buttonCheckHTML.innerText = "Vérifier"
                cadreCheckHTML.append(buttonCheckHTML)

                inputMailHTML.addEventListener('input', function() {

                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputMailHTML.value))
                    {
                        buttonCheckHTML.disabled = false
                    } else {
                        buttonCheckHTML.disabled = true
                    }
        
                })

                buttonCheckHTML.addEventListener('click', function() {

                    if(inputMailHTML.value.length == 0) {
                        alertHTML.style.display = null 
                        alertHTML.innerText = "Le champ email est obligatoire..."
        
                        setTimeout(() => {
                            alertHTML.style.display = "none";
                        }, 5000);
        
                    } else {

                        loaderHTML.style.display = null;
        
                        cadreCheckHTML.style.display = "none";
        
                        let myHeaders = new Headers();
                        myHeaders.append("Accept", "application/json");
                        myHeaders.append("Content-Type", "application/json");
        
                        let raw = JSON.stringify({
                            "email": inputMailHTML.value
                        });
        
                        let requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw
                        };
        
                        fetch("/api/checkemail/check", requestOptions)
                        .then(response => response.text())
                        .then(result => {
        
                            let resultat = JSON.parse(result)
        
                            gtag('event', 'service_checkemail', {
                                'status': resultat.status,
                                'email': inputMailHTML.value
                            })

                            if(resultat.status === true){
        
                                alertHTML.classList.add('success')
                                alertHTML.style.display = null 
                                alertHTML.innerText = resultat.message
                                loaderHTML.style.display = "none";
                                cadreCheckHTML.style.display = null;
        
                                setTimeout(() => {
                                    alertHTML.classList.remove('success')
                                    alertHTML.style.display = "none";
                                }, 5000);
        
                            } else if(resultat.status === "exist") {

                                alertHTML.classList.add('warning')
                                alertHTML.style.display = null 
                                alertHTML.innerText = resultat.message
                                loaderHTML.style.display = "none";
                                cadreCheckHTML.style.display = null;
        
                                setTimeout(() => {
                                    alertHTML.classList.remove('warning')
                                    alertHTML.style.display = "none";
                                }, 5000);
        
                            } else {
                                
                                alertHTML.style.display = null 
                                alertHTML.innerText = resultat.message
                                loaderHTML.style.display = "none";
                                cadreCheckHTML.style.display = null;
        
                                setTimeout(() => {
                                    alertHTML.style.display = "none";
                                }, 5000);
        
                            }
        
                            // console.log(resultat)
        
                        })
                        .catch(error => console.log('error', error));
        
                    }

                })

            }
            cadreCenterHTML.append(cadreCheckHTML)

        }
        containerHTML.append(cadreCenterHTML)
    }


    containerHTML.append(containerCheckEmailHTML)

}

export default Accueil;