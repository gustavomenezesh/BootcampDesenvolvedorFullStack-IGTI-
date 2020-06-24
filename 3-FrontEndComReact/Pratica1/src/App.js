import React, { Component } from 'react';
import Bar from './components/Bar/bar';
import './App.css'
import  calculateSalaryFrom from './salary'


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      bar1: 7.5,
      bar2: 0,
      bar3: 92.5,
      fullSalary: "1000",
      baseINSS: 1000,
      discountINSS: 75,
      baseIRPF: 925,
      discountIRPF: 0,
      netSalary: 925,
    };
  }

  render() {

    return (
      <div id = "screen">
        <h1>React Salário</h1>
        <div id = "salario-bruto">
          <label>
            Salário Bruto
            <input
              type = "number"
              id = "full"
              value = {this.state.fullSalary}
              onChange = {async e => {
                const {baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary} = calculateSalaryFrom.calculateSalaryFrom(e.target.value);
                const bar1 = discountINSS*100/e.target.value;
                const bar2 = discountIRPF*100/e.target.value;
                const bar3 = netSalary*100/e.target.value;
                this.setState({bar1, bar2, bar3, fullSalary: e.target.value, baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary})   
                console.log(this.state);            
              }}
              min = "1000"
              step = "100"/>
          </label>
        </div>
        <div id="descontos">
          <label id = "base-inss">
            Base INSS
            <input
              type = "text"
              value = {"R$ "+Number(this.state.baseINSS).toFixed(2)}
            />
          </label>
          <label id = "desconto-inss">
            Desconto INSS
            <input
              type = "text"
              value = {"R$ "+this.state.discountINSS.toFixed(2)+" ("+this.state.bar1.toFixed(2)+"%)"}
              id = "inss"
            />
          </label>
          <label id = "base-iprf">
            Base IRPF
            <input
              type = "text"
              value = {"R$ "+this.state.baseIRPF.toFixed(2)}
            />
          </label>
          <label id = "desconto-iprf">
            Desconto IRPF
            <input
              type = "text"
              value = {"R$ "+this.state.discountIRPF.toFixed(2)+" ("+this.state.bar2.toFixed(2)+"%)"}
              id = "irpf"
            />
          </label>
        </div>
        <div id = "salario-liquido">
          <label>
              Salário Líquido
              <input
                type = "text"
                value = {"R$ "+this.state.netSalary.toFixed(2)+" ("+this.state.bar3.toFixed(2)+"%)"}
                id = "liquid"
              />
          </label>
        </div>
        <div id = "bars">
          <Bar value={this.state.bar1} color="rgb(235,145,64)" />
          <Bar value={this.state.bar2} color="rgb(217,66,20)" />
          <Bar value={this.state.bar3} color="rgb(79,201,173)" />
        </div>
      </div>
    );
  }
}
