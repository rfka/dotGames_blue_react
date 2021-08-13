import React from 'react';
import './Incluir.css';
import './Main';

export default class Incluir extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            jogos: [
                {
                    id:1,
                    nome:"Blaster Master Zero 3",
                    urlimagem:"https://www.ultimaficha.com.br/wp-content/uploads/2021/05/blaster-master-zero-3-780x470.jpg",
                    categoria:"Ação/Aventura",
                    classificacao:"12"
                },
                {
                    id:2,
                    nome:"Final Fantasy III",
                    urlimagem:"https://images6.alphacoders.com/105/thumb-1920-1053313.jpg",
                    categoria:"RPG",
                    classificacao:"14"
                },
                {
                    id:3,
                    nome:"Crash Bandicoot™ N. Sane Trilogy",
                    urlimagem:"https://cdn02.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_CrashBandicootNSaneTrilogy.jpg",
                    categoria:"Aventura",
                    classificacao:"10"
                },
                {
                    id:4,
                    nome:"Diablo IV",
                    urlimagem:"https://bnetcmsus-a.akamaihd.net/cms/page_media/xb/XBMMNKOZ8ILU1625080135362.jpg",
                    categoria:"RPG",
                    classificacao:"16"
                },
                {
                    id:5,
                    nome:"Street Fighter IV",
                    urlimagem:"https://mcdn.wallpapersafari.com/medium/7/97/Z5pHiS.jpg",
                    categoria:"Luta",
                    classificacao:"10"
                },
                {
                    id:6,
                    nome:"Enduro - Atari",
                    urlimagem:"https://s2.glbimg.com/jFOk7XHORze18GQbFeja4bLQYDU=/0x0:695x390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2017/O/J/jAKrPMRfOMd1iV9iKezg/atari-2600-corrida-enduro.jpg",
                    categoria:"Corrida",
                    classificacao:"L"
                },
            ],
                nomeJogo: "",
                imagemurlJogo:"",
                classificacaoJogo:"",
                categoriaJogo:"",
                editando: false,
                indexEditando: null,
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {jogos, editando, indexEditando, nomeJogo, imagemurlJogo, classificacaoJogo, categoriaJogo} = this.state;

        if (editando) {
            const jogosAtualizados = jogos.map((j, index) =>{
                if(indexEditando === index) {
                    j.nome = nomeJogo;
                    j.imagemurl = imagemurlJogo;
                    j.categoria = categoriaJogo;
                    j.classificacao = classificacaoJogo;
                }
    
            return j;
        });
    
        this.setState({
            jogos: jogosAtualizados,
            indexEditando: null,
            editando: false,
        });
        }else{
            this.setState({
                jogos: [...jogos,
                {
                    nome: nomeJogo,
                    imagemurl: imagemurlJogo,
                    categoria: categoriaJogo,
                    classificacao: classificacaoJogo,
                },
            ],
        });
        }
    
        this.setState({
            nomeJogo: "",
            imagemurlJogo: "",
            categoria: categoriaJogo,
            classificacao: classificacaoJogo,
        });
        };
    
        deletar = (index) => {
            const {jogos} = this.state;
            this.setState({
                jogos: jogos.filter((j, i) => i!== index),
            });
        };
        
        render(){
            const {jogos, nomeJogo, imagemurlJogo, classificacaoJogo, categoriaJogo, editando, indexEditando} = 
                this.state;
            return(
                <>
                <article id='incluir'>
                    <div className='conteudo'>
                        <h1>{editando ? `Editando: ${jogos[indexEditando].nome}`: "Cadastre um novo Jogo!!"}</h1>
                        <form className='formulario' onSubmit={this.onSubmit}>
                            <input placeholder="Nome" value={nomeJogo} onChange={(e) =>{
                                this.setState({
                                    nomeJogo: e.target.value,
                                });
                            }}/>
                            <br />
                            <input placeholder="URL da imagem" value={imagemurlJogo} onChange={(e) =>{
                                this.setState({
                                    imagemurlJogo: e.target.value,
                                });
                            }}/>
                            <br />
                            <input placeholder="Categoria" value={categoriaJogo} onChange={(e) =>{
                                this.setState({
                                    categoriaJogo: e.target.value,
                                });
                            }}/>
                            <br />

                            <select
                                value={this.state.selectedValue}
                                onChange={this.handleSelectChange}>
                                    <option value="#">Selecione a Classificação</option>
                                    <option value="L">Livre</option>
                                    <option value="10">10 Anos</option>
                                    <option value="12">12 Anos</option>
                                    <option value="14">14 Anos</option>
                                    <option value="16">16 Anos</option>
                                    <option value="18">18 Anos</option>
                            </select>


                            {/* <input placeholder="Classificação" value={classificacaoJogo} onChange={(e) =>{
                                this.setState({
                                    classificacaoJogo: e.target.value,
                                });
                            }}/> */}
                            <br />
                            <input type="submit" value='Salvar'/>
                        </form>
                    </div>
                </article>
                </>
            );
        }
    }