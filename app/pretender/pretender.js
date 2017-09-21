import Pretender from 'pretender';
import { filter, find } from 'lodash';

export default function init() {
  const server = new Pretender(function() {});
  server.prepareBody = function(body) {
    return body ? JSON.stringify(body) : '{"error": "not found"}';
  };

  const grietas = [
    {
      id: 1,
      critica: false,
      desplomes: false,
      desprendimiento: false,
      diagonalConHorizontalDePiso: false,
      diagonalEnLozaDeEsquinaACentro: false,
      externa: false,
      geoPt: {},
      golpeteo: false,
      hundimientos: false,
      interna: false,
      loza: false,
      message: 'lorem ipsum',
      paralelaAlPiso: false,
      pared: false,
      pisosHuecos: false,
      reportadaPor: 'john doe',
      vibraciones: false,
    },
    {
      id: 2,
      critica: true,
      desplomes: true,
      desprendimiento: true,
      diagonalConHorizontalDePiso: true,
      diagonalEnLozaDeEsquinaACentro: true,
      externa: true,
      geoPt: {},
      golpeteo: true,
      hundimientos: true,
      interna: true,
      loza: true,
      message: 'dolor sit',
      paralelaAlPiso: true,
      pared: true,
      pisosHuecos: true,
      reportadaPor: 'jane doe',
      vibraciones: true,
    },
  ];

  const revisiones = [
    {
      id: 1,
      comentariosAdicionales: 'string',
      createdOn: 'string',
      diagonalEnLozaDeEsquinaACentro: false,
      grietaModelRef: 1,
      grietasFormanDiagonalDelPiso: false,
      grietasParalelasAPiso: false,
      loza: false,
      peligroIniminente: false,
      piso: false,
      revisadaPor: 'john doe',
    },
    {
      id: 2,
      comentariosAdicionales: 'string',
      createdOn: 'string',
      diagonalEnLozaDeEsquinaACentro: false,
      grietaModelRef: 1,
      grietasFormanDiagonalDelPiso: false,
      grietasParalelasAPiso: false,
      loza: false,
      peligroIniminente: false,
      piso: false,
      revisadaPor: 'john doe',
    },
    {
      id: 3,
      comentariosAdicionales: 'string',
      createdOn: 'string',
      diagonalEnLozaDeEsquinaACentro: false,
      grietaModelRef: 2,
      grietasFormanDiagonalDelPiso: false,
      grietasParalelasAPiso: false,
      loza: false,
      peligroIniminente: false,
      piso: false,
      revisadaPor: 'john doe',
    },
    {
      id: 4,
      comentariosAdicionales: 'string',
      createdOn: 'string',
      diagonalEnLozaDeEsquinaACentro: false,
      grietaModelRef: 2,
      grietasFormanDiagonalDelPiso: false,
      grietasParalelasAPiso: false,
      loza: false,
      peligroIniminente: false,
      piso: false,
      revisadaPor: 'john doe',
    },
  ];

  server.get('/api/grieta', () => [
    200,
    { 'Content-Type': 'application/json' },
    {
      items: grietas,
    },
  ]);

  server.get('/api/grieta/:id', request => [
    200,
    { 'Content-Type': 'application/json' },
    find(grietas, { id: parseInt(request.params.id, 10) }),
  ]);

  server.get('/api/grieta/:id/revision', request => [
    200,
    { 'Content-Type': 'application/json' },
    {
      items: filter(revisiones, { grietaModelRef: parseInt(request.params.id, 10) }),
    },
  ]);

  server.get('/api/grieta/:id/revision/:revId', request => [
    200,
    { 'Content-Type': 'application/json' },
    find(revisiones, {
      grietaModelRef: parseInt(request.params.id, 10),
      id: parseInt(request.params.revId, 10),
    }),
  ]);

  server.get('/api/revision', () => [
    200,
    { 'Content-Type': 'application/json' },
    {
      items: revisiones,
    },
  ]);

  server.get('/api/revision/:id', request => [
    200,
    { 'Content-Type': 'application/json' },
    find(revisiones, {
      id: parseInt(request.params.id, 10),
    }),
  ]);
}
