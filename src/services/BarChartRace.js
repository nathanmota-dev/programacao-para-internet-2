import React, { Component } from "react";
import '../style.css'

class BarChartRace extends Component {
    componentDidMount() {
        // Pega os dados do bar chart race do state do React
        const dados = this.props.data;

        // Renderiza o bar chart race
        this.renderBarChartRace(dados);
    }

    renderBarChartRace(dados) {
        // Renderiza o gráfico (implemente a lógica aqui)
        console.log("Renderizando Bar Chart Race:", dados);
    }

    render() {
        return (
            <div className="bar-char-race">
                {/* O gráfico será renderizado dentro do método renderBarChartRace */}
            </div>
        );
    }
}

export default BarChartRace;