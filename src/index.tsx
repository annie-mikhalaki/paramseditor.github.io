import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const data = { 
  params: [
    {
      id: 1,
      name: "Назначение",
      type: "string"
    },
    {
      id: 2,
      name: "Длина",
      type: "string"
    },
    {
      id: 3,
      name: "Количество",
      type: "number"
    },
    {
      id: 4,
      name: "Цвет",
      type: "color"
    }
  ],
  model: {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное"
      },
      {
        paramId: 2,
        value: "макси"
      },
      {
        paramId: 3,
        value: 12
      },
      {
        paramId: 4,
        value: "#c6d312"
      }
    ]
  }
}

root.render(
  <React.StrictMode>
    <App params={data.params} model={data.model} />
  </React.StrictMode>
);
