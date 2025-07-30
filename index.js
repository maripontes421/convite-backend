const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('./generated/prisma')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Rota POST para salvar dados
app.post('/convidado', async (req, res) => {
  const { nome, telefone, acompanhante, nomeDoAcompanhante } = req.body

  try {
    const novoConvidado = await prisma.convidado.create({
      data: { nome, telefone, acompanhante, nomeDoAcompanhante },
    })
    res.status(200).json(novoConvidado)
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar', detalhes: err.message })
  }
})

// Rota GET para listar mensagens
/*app.get('/mensagens', async (req, res) => {
  const mensagens = await prisma.mensagem.findMany()
  res.json(mensagens)
})*/

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
