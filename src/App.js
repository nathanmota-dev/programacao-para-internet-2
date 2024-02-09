import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from './services/api';
import HistoryCard from './services/HistoryCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './style.css'

function App() {

  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');
  const [historico, setHistorico] = useState([]);

  /*const addToHistorico = async (item) => {
    try {
      const response = await api.post('/names', item);
      const { id } = response.data; // Capturando o ID retornado pela API
      setHistorico([...historico, { ...item, id }]);
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
    }
  };*/

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        
        const response = await api.get('/names');
        const historicoData = response.data;
        
        setHistorico(historicoData);
      } catch (error) {
        console.error('Erro ao recuperar histórico:', error);
      }
    };

    fetchHistorico();
  }, []);

  async function handleSearch() {
    if (input === '') {
      alert('Digite um nome válido');
      return;
    }

    try {
      const response = await api.get(`/buscar-nome/${input}`);
      const responseData = response.data;

      if (responseData && responseData.length > 0) {
        const firstResult = responseData; // Não acessa o índice 0 diretamente

        setNome(firstResult);
        const currentDate = new Date().toLocaleDateString();

        // Ajuste para a estrutura da resposta do backend
        await api.post('/names', { nome: input, data: currentDate });

        setHistorico([...historico, { nome: input, data: currentDate }]);
        setInput(''); // Limpa o input

      } else {
        alert('Nome não encontrado');
        setInput('');
      }
    } catch (error) {
      console.error('Erro ao buscar nome:', error);
      if (error.response) {
        console.error('Detalhes do erro 400:', error.response.data);
      }
      alert('Ocorreu um erro ao buscar o nome. Tente novamente mais tarde.');
      setInput('');
    }
  }

  function handleDelete(id) {
    api.delete(`/names/${id}`)
      .then(() => {
        setHistorico(historico.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar nome:', error);
        alert('Ocorreu um erro ao deletar o nome. Tente novamente mais tarde.');
      });
  }

  return (
    <>

      <div className="sidebar">
        <div className="history-container">
          <h2>Histórico</h2>
          {historico.map((item, index) => (
            <HistoryCard key={item.id} id={item.id} nome={item.nome} data={item.data} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      <div className="container">

        <h1 className='title'>Buscador de Nome</h1>

        <div className="containerInput">

          <input type="text"
            placeholder="Digite o nome"
            value={input}
            onChange={(e) => setInput(e.target.value)}>
          </input>

          <button type="button" className='button-Search' onClick={handleSearch}>
            <FiSearch size={25} color='#FFF' />
          </button>
        </div>

        {nome && (

          <main className='main'>
            {nome && nome.length > 0 ? (
              <>
                <h2>NOME: {nome[0].nome}</h2>
                <table className='styled-table'>
                  <thead>
                    <tr>
                      <th>Período</th>
                      <th>Frequência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nome && nome[0] && nome[0].res && nome[0].res.map((item, index) => (
                      <tr key={index}>
                        <td>{item.periodo}</td>
                        <td>{item.frequencia}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>Nenhum resultado encontrado para o nome fornecido.</p>
            )}

            <div className="chart-container">
              <h2>Evolução por Período</h2>
              <BarChart width={500} height={250} data={nome[0].res}>
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="frequencia" fill="#202A43" />
              </BarChart>
            </div>

          </main>

        )}

      </div>
    </>
  );
}

export default App;
