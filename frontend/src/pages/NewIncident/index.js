import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logoImg.svg';
import api from '../../services/api';

export default function NewIncident() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');


    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso');
        }
    }

    return (<div className="register-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente e ajude pessoas a encontrar os casos da sua ONG.</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#e02041" />
            Voltar para a Página Inicial
            </Link>
            </section>
            <form>
                <input
                    placeholder="Título do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

                <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
            </form>

        </div>
    </div>);
}