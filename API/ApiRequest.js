// API/ApiRequest.js

// liste des fonction utiles aux requètes du serveur dans la base de donnée d'odoo
// les fonctions requestLogin et requestSignUp utilisent la méthode POST pour envoyer le JSON de la payload

export function getProducts () {
  const url = 'http://192.168.43.196/projet_odoo/back-symfony/webservices-app/public/index.php/products'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}


export function requestLogin (opts) {
  const url = 'http://192.168.43.196/projet_odoo/back-symfony/webservices-app/public/index.php/login'
  var myInit = { method: 'POST',
                  body: JSON.stringify(opts)}
  return fetch(url,myInit)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export function requestSignUp (opts) {
  const url = 'http://192.168.43.196/projet_odoo/back-symfony/webservices-app/public/index.php/SignUp'
  var myInit = { method: 'POST',
                  body: JSON.stringify(opts)}
  return fetch(url,myInit)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export function getUser (token) { 
  const url = 'http://192.168.43.196/projet_odoo/back-symfony/webservices-app/public/index.php/HomeLogged/'+token;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSignout(token) {
  const url = 'http://192.168.43.196/projet_odoo/back-symfony/webservices-app/public/index.php/SignOut/'+token;
  return fetch(url)
    .then((response) => response.text())
    .catch((error) => console.error(error))
}