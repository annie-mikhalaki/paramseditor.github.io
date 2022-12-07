import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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

interface Param {
  id: number;
  name: string;
  type?: any
}

interface ParamValue {
  paramId: number;
  value: string | number | undefined;
  type?: any;
}

interface ParamValueComponent extends ParamValue {
  onChangeHandler(event: any, paramId: number): void;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State extends Props {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      params: this.props.params,
      model: this.props.model
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  onChangeHandler(event: any, paramId: number) {
      const paramValueIndex = this.state.model.paramValues.findIndex(value => value.paramId === paramId)
      
      this.setState({
        model: {
          ...this.state.model,
          paramValues: this.state.model.paramValues.map((item, index) => {
            if (index === paramValueIndex) {
              return {
                ...item,
                value: event.target.value
              }
            } else {
              return item
            }
          })
        }
      })
  }

  public getModel(): Model {
    return this.state.model
  }

  render() {
    const { model, params } = this.state
    return (
      <div className="params-editor">
        {
          params.map((param: Param) => {
            const parameterValue = model.paramValues.find((paramValue: ParamValue) => paramValue.paramId === param.id)?.value
            return (
              <div className="params-editor__item" key={`param${param.id}`}>
                <ParameterTitle
                  id={param.id}
                  name={param.name}
                />
                <ParameterValue
                    value={parameterValue}
                    paramId={param.id}
                    type={param.type}           
                    onChangeHandler={this.onChangeHandler}
                />
              </div>
            )
          }) 
        }
      </div>
    );
  }
}

root.render(
  <React.StrictMode>
    <App params={data.params} model={data.model} />
  </React.StrictMode>
);

function ParameterTitle (props: Param) {
  return (<div className="params-editor__title">{props.name}</div>)
}

function ParameterValue (props: ParamValueComponent) {
  function onChange (event: any) {
    props.onChangeHandler(event, props.paramId)
  }

  function getInputType(type: any) {
    switch(type) {
      case 'string': {
        return 'text'
      }
      case 'number': {
        return 'number'
      }
      case 'color': {
        return 'color'
      }
      default:
        return 'text'
    }
  }

  return (<input type={getInputType(props.type)} value={props.value} onChange={onChange}></input>)
}