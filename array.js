const nomes = ['Rai', 'João', 'Julia', 'Emanuele', 'Giovanna',]
const idades = [16, 17, 17, 18, 17,]

function exibirNomes(){
    console.log('===LISTA DE NOMES===');
    nomes.forEach(function(nome) {
  console.log(nome);
});
}

function maioresDeIdade(){
    console.log('===MAIORES DE IDADE===');
    const maiores = idades.filter(TODO >=18)
    console.log(maiores);
}

function mediaIdades(idades) {
  const soma = idades.reduce((acumulador, idade) => acumulador + idade, 0);

  const media = soma / idades.length;

  console.log(`Média das idades: ${media}`);
}
