// seleciona o formulário(1)
const controles = document.getElementById('controles');

// seleciona o css(2)
const cssText = document.querySelector('.css');

// seleciona o botão que será modificado(3)
const btn = document.querySelector('.btn');

// remover os dados salvos no local storage, e reseta o browser do usuário(12)
// caso o usuário use o botão de reload do próprio browser,
// os dados não são apagados do local storage
const btnClean = document.querySelector('.limpar');
btnClean.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

// função que, quando houver alguma mudança o 'handleChange' será ativado(5)
controles.addEventListener('change', handleChange);

// contém todos os estilos do 'btn',(6)
// cada objeto é acessado através de uma string com o 'name' da classe (acessado na função 4)
const handleStyle = {

  // o elemento a ser modificado é o 'btn'
  element: btn,
  backgroundColor(value) {
    this.element.style.backgroundColor = value;
  },
  height(value) {
    this.element.style.height = value + 'px';
  },
  width(value) {
    this.element.style.width = value + 'px';
  },
  texto(value) {
    this.element.innerText = value;
  },
  color(value) {
    this.element.style.color = value;
  },
  border(value) {
    this.element.style.border = value;
  },
  borderRadius(value) {
    this.element.style.borderRadius = value + 'px';
  },
  fontFamily(value) {
    this.element.style.fontFamily = value;
  },
  fontSize(value) {
    this.element.style.fontSize = value + 'rem';
  },
};

// função que lida com as mudanças/eventos(4)
function handleChange(event) {
  const { name } = event.target;
  const { value } = event.target;

  // ativação do objeto 'handleStyle'(7)
  handleStyle[name](value);

  // ativação do objeto 'saveValues'(10)
  saveValues(name, value);
  showCss();
}

// função que salva as informações definidas(9)
function saveValues(name, value) {
  localStorage[name] = value;
}

// função que seta as informações definidas, e retorna mesmo que o console seja atualizado
function setValues() {
  const properties = Object.keys(localStorage);
  properties.forEach((propertie) => {
    // ativiação do setValues(11)
    handleStyle[propertie](localStorage[propertie]);
    controles.elements[propertie].value = localStorage[propertie];
  });
  // mostra o css setado
  showCss();
}

setValues();

// pega todos os estilos que foram modificados e mostra na tela(8)
// ele usa o 'split' para transformar o 'innerHtml' em string,
// e cortar onde tem ';', e une com ';' e fecha spam
function showCss() {
  cssText.innerHTML = '<span>' + btn.style.cssText.split('; ').join(';</span><span>');
}
