import Pretender from 'pretender';
import { filter, find, isEmpty, mapValues } from 'lodash';

export default function init() {
  const server = new Pretender(function() {});
  server.prepareBody = function(body) {
    return body ? JSON.stringify(body) : '{"error": "not found"}';
  };

  const grietas = [
    {
      id: 1,
      critica: true,
      desplomes: false,
      desprendimiento: false,
      diagonalConHorizontalDePiso: false,
      diagonalEnLozaDeEsquinaACentro: false,
      externa: true,
      interna: true,
      geoPt: {},
      golpeteo: false,
      hundimientos: false,
      loza: false,
      message: 'lorem ipsum',
      paralelaAlPiso: false,
      pared: false,
      pisosHuecos: false,
      reportadaPor: 'john doe',
      vibraciones: false,

      // Undocumented fields
      tipo: 'Interna',
      ubicacion: 'Losa',
      comentario:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
    {
      id: 2,
      critica: true,
      desplomes: true,
      desprendimiento: true,
      diagonalConHorizontalDePiso: true,
      diagonalEnLozaDeEsquinaACentro: true,
      externa: true,
      interna: false,
      geoPt: {},
      golpeteo: false,
      hundimientos: true,
      loza: true,
      message: 'dolor sit',
      paralelaAlPiso: true,
      pared: true,
      pisosHuecos: true,
      reportadaPor: 'jane doe',
      vibraciones: true,

      // Undocumented fields
      tipo: 'Interna',
      ubicacion: 'Losa',
      comentario:
        'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 3,
      critica: false,
      desplomes: false,
      desprendimiento: false,
      diagonalConHorizontalDePiso: false,
      diagonalEnLozaDeEsquinaACentro: false,
      externa: false,
      interna: true,
      geoPt: {},
      golpeteo: false,
      hundimientos: false,
      loza: false,
      message: 'lorem ipsum',
      paralelaAlPiso: false,
      pared: false,
      pisosHuecos: false,
      reportadaPor: 'john doe',
      vibraciones: false,

      // Undocumented fields
      tipo: 'Interna',
      ubicacion: 'Losa',
      comentario:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.',
    },
    {
      id: 4,
      critica: false,
      desplomes: true,
      desprendimiento: true,
      diagonalConHorizontalDePiso: true,
      diagonalEnLozaDeEsquinaACentro: true,
      externa: false,
      interna: true,
      geoPt: {},
      golpeteo: false,
      hundimientos: true,
      loza: true,
      message: 'dolor sit',
      paralelaAlPiso: true,
      pared: true,
      pisosHuecos: true,
      reportadaPor: 'jane doe',
      vibraciones: true,

      // Undocumented fields
      tipo: 'Interna',
      ubicacion: 'Losa',
      comentario:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

  server.get('/api/grieta', request => {
    let items;

    if (isEmpty(request.queryParams)) {
      items = grietas;
    } else {
      const queryParams = mapValues(
        request.queryParams,
        value => (value === 'true' || value === 'false' ? value === 'true' : value)
      );
      items = filter(grietas, queryParams);
    }

    return [
      200,
      { 'Content-Type': 'application/json' },
      {
        items,
      },
    ];
  });

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
