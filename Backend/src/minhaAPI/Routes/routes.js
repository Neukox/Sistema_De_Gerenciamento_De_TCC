"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./routesPublic/routes"));
const routes_2 = __importDefault(require("./routesPrivate/routes"));
const routes = (0, express_1.Router)();
// Usando as rotas públicas (sem autenticação)
routes.use('/', routes_1.default);
// Usando as rotas privadas (com autenticação)
routes.use('/', routes_2.default);
exports.default = routes;
