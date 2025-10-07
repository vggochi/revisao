const fs = require('fs');
const path = require('path');

// TODO: Defina o caminho do arquivo
const arquivoUsuarios = path.join(__dirname, 'usuarios.json');

// TODO: Função para criar arquivo inicial se não existir
function criarArquivoInicial() {
    const usuariosIniciais = [
        { id: 1, nome: 'Ana Silva', email: 'ana@example.com', idade: 28 },
        { id: 2, nome: 'Bruno Costa', email: 'bruno@example.com', idade: 34 },
        { id: 3, nome: 'Carlos Lima', email: 'carlos@example.com', idade: 25 }
    ];
    
    if (!fs.existsSync(arquivoUsuarios)) {
        // TODO: Escreva o arquivo JSON
        fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuariosIniciais, null, 2));
        console.log('Arquivo usuarios.json criado!');
    }
}

// TODO: Função para ler usuários
function lerUsuarios() {
    try {
        // TODO: Leia e parse o JSON
        const dados = fs.readFileSync(arquivoUsuarios, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        console.error('Erro ao ler usuários:', error.message);
        return [];
    }
}

// TODO: Função para adicionar usuário
function adicionarUsuario(nome, email, idade) {
    const usuarios = lerUsuarios();
    
    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome,
        email,
        idade
    };
    
    // TODO: Adicione ao array
    usuarios.push(novoUsuario);
    
    // TODO: Salve no arquivo
    fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2));
    console.log(`Usuário ${nome} adicionado!`);
}

// TODO: Função para listar usuários
function listarUsuarios() {
    const usuarios = lerUsuarios();
    console.log('=== LISTA DE USUÁRIOS ===');
    usuarios.forEach((usuario) => {
        console.log(`ID: ${usuario.id} | Nome: ${usuario.nome} | Email: ${usuario.email} | Idade: ${usuario.idade}`);
    });
}

// TODO: Execute as funções
criarArquivoInicial();

adicionarUsuario('Daniela Rocha', 'daniela@example.com', 22);
adicionarUsuario('Eduardo Mendes', 'eduardo@example.com', 30);

listarUsuarios();