import React, {useState, useEffect} from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Incluir'
import './Main.css';

const BASE_URL = 'http://localhost:5000';

export default function Main() {

    const [jogos, setJogos] = useState([]);
    const [nomeJogo, setNomeJogo] = useState("");
    const [imagemUrlJogo, setImageUrlJogo] = useState("");
    const [classificacaoJogo, setClassificacaoJogo] = useState("");
    const [categoriaJogo, setCategoriaJogo] = useState("");
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);

    const loadJogos = async()=> {
        const response = await fetch(`${BASE_URL}/jogos`);
        const data = await response.json();
        setJogos(data);
    };

    useEffect(()=>{
        loadJogos();
    }, []);

    useEffect(()=>{
        if (idEditando !== null && editando){
            const jogo = jogos.find((j)=>j._id === idEditando);
            setNomeJogo(jogo.nome);
            setImageUrlJogo(jogo.imagemUrl);
            setCategoriaJogo(jogo.categoria);
            setClassificacaoJogo(jogo.classificacao);
        }
    }, [idEditando]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (editando) {
            await fetch(`${BASE_URL}/jogos/${idEditando}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeJogo,
                imagemUrl: imagemUrlJogo,
                classificacao: classificacaoJogo,
                categoria: categoriaJogo,
            }),
        });

        setEditando(false);
        setIdEditando(null);
        }else{
            await fetch(`${BASE_URL}/jogos`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},

                body: JSON.stringify({
                    nome: nomeJogo,
                    imagemUrl: imagemUrlJogo,
                    classificacao: classificacaoJogo,
                    categoria: categoriaJogo,
                }),
            });
        }

        loadJogos();
        setNomeJogo('');
        setImageUrlJogo('');
        setCategoriaJogo('');
        setClassificacaoJogo('');
    };

    const deletar = async (id) =>{
        await fetch(`${BASE_URL}/jogos/${id}`, {
            method: "DELETE",
        });
        loadJogos();
    };

    return(
        <>
        <h1>Catálago de Jogos dotGames</h1>
        <article id='jogos'>
            <div className='conteudo-jogos'>
                {jogos.map((j, index) => (
                    <div className='tudo_jogos'>
                        <div className='jogos'>
                            <div className='oculto' key={index}></div>
                            <div className='nome_jogo'>
                                <h3>{j.nome}</h3>
                            </div>
                            <div className='imagem_jogo'>
                                <img src={j.imagemUrl} alt={j.nome} />
                            </div>
                            <div className='categoria_jogo'>
                                <div>
                                    <p>Categoria:</p>
                                    <h3>{j.categoria}</h3>
                                </div>
                                <div>
                                    <p>Classificação: </p>
                                    <h3 className={'classificacao' + ' c'+j.classificacao}>
                                        {j.classificacao}
                                    </h3>
                                </div>
                            </div>
                            <div className="botoes">
                                <AnchorLink className="editar" href='#incluir'><button onClick={()=> {setEditando(true);setIdEditando(j._id)}}>Editar</button></AnchorLink>
                                <AnchorLink className="deletar" href='#jogos'><button onClick={()=> deletar(j._id)}>Deletar</button></AnchorLink>
                            </div>
                        </div>
                    </div>)
                )} 
            </div>
        </article>

        {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

        <article id='incluir'>
        <div className='conteudo'>
            <h1>{editando ? `Editando: ${jogos.find((j)=> j._id === idEditando)?.nome}`: "Cadastre um novo Jogo!!"}</h1>
            <div className='container-formulario'>
            <form className='formulario' onSubmit={onSubmit}>
                <input placeholder="Nome" value={nomeJogo} onChange={(e) =>{
                    setNomeJogo(e.target.value);
                }}/>
                <br />
                <input placeholder="URL da imagem" value={imagemUrlJogo} onChange={(e) =>{
                    setImageUrlJogo(e.target.value);
                }}/>
                <br />
                <input placeholder="Categoria" value={categoriaJogo} onChange={(e) =>{
                    setCategoriaJogo(e.target.value);
                }}/>
                <br />

                {/* <select
                    value={this.state.selectedValue}
                    onChange={this.handleSelectChange}>
                        <option value="#">Selecione a Classificação</option>
                        <option value="L">Livre</option>
                        <option value="10">10 Anos</option>
                        <option value="12">12 Anos</option>
                        <option value="14">14 Anos</option>
                        <option value="16">16 Anos</option>
                        <option value="18">18 Anos</option>
                </select> */}


                <input placeholder="Classificação" value={classificacaoJogo} onChange={(e) =>{
                    setClassificacaoJogo(e.target.value);
                }}/>
                <br />
                <input type="submit" value='Salvar'/>
            </form>
            </div>
        </div>
    </article>
        </>
    );
}
