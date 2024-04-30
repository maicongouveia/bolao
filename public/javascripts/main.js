async function missingBets() {
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
  //navigator.clipboard.writeText(response.message);
}

async function getBets(date = null){
  const getBetsRequest = await fetch('/users/bets');
  let {bets} = await getBetsRequest.json();

  //console.log(response.bets);

  let betsTab = document.getElementById('bets')

  let form = document.createElement('form');
  form.setAttribute('action', '/bet?date=' + date);

  Object.keys(bets).forEach( name => {
    let row = document.createElement('div');
    row.setAttribute('class', 'row');

    let label = document.createElement('label');
    label.innerText = name + ": ";
    label.setAttribute('for', name);

    let input = document.createElement('input')
    input.type = 'text';
    input.id = name;
    if(bets[name] != '0'){
      input.value = bets[name];
    }

    row.appendChild(label);
    row.appendChild(input);

    form.appendChild(row);

    betsTab.appendChild(form);
  }
  )


}

function getDate(){
  let now = new Date();
  now = now.toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}).split("/");
  let date = now[0]+"/"+now[1];
  //console.log(date);
  return date;
}

function getValues(){
  let inputs = document.getElementsByTagName('input');
  let values = {};

  Object.keys(inputs).forEach(index => {
    values[inputs[index].id] = inputs[index].value;
  })

  console.log(values)

  return values;
}

async function main() {  
  await missingBets();
  await getBets(getDate());

  let inputs = document.getElementsByTagName('input');

  //console.log(inputs);

  let form = document.getElementsByTagName('form')[0];

  Object.keys(inputs).forEach(async (index) => {
    inputs[index].addEventListener('input', async () => {
      //pegar valores
      let values = getValues();
      
      //request
      const request = await fetch(form.getAttribute('action'), {
        method: 'POST',
        body: JSON.stringify(values),
      });
      let response = await request.json();

      console.log(response);
    });
  })
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

main();