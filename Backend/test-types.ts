// Teste simples para verificar as tipagens
import { autorizacao } from '../Sistema_De_Gerenciamento_De_TCC-master/Backend/src/minhaAPI/Middlewares/JWT/autorizacao';
import { Router } from 'express';

const router = Router();

// Teste: verificar se o middleware funciona sem erros de tipo
router.use(autorizacao);

console.log('✅ Tipagens estão funcionando corretamente!');
