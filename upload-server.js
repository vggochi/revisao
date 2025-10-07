const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3004;

// Configurar storage do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        // Crie o diretório se não existir
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Gere nome único com timestamp
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// Configurar filtros de arquivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(fileExt)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não permitido'), false);
    }
};

// Configurar multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

app.use(express.json());
app.use(express.static('public'));

// Rota para upload único
app.post('/upload', upload.single('arquivo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
        }

        // Retorne informações do arquivo
        res.json({
            mensagem: 'Arquivo enviado com sucesso!',
            arquivo: req.file
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para listar arquivos
app.get('/arquivos', (req, res) => {
    try {
        // Leia o diretório uploads
        const arquivos = fs.readdirSync('./uploads');
        res.json({ arquivos });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar arquivos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de upload rodando em http://localhost:${PORT}`);
});
