
async function main() {
  const missingBetsRequest = await fetch('/missingbets');
  let response = await missingBetsRequest.json();
  //console.log(response.message);
  //remove loader
  let loaderElement = document.getElementsByClassName('loader')[0];
  loaderElement.remove();
  
  //Include message
  let pElement = document.getElementById('message');
  pElement.textContent = response.message;

  //Copiar para Clipboard
  navigator.clipboard.writeText(response.message);
}

main()