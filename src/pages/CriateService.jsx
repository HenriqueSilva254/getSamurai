import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";
import { useNavigate, useParams } from "react-router-dom";
import services from "../services/apiServices";
import Headers from "../components/header";
import Footer from "../components/Rodape";

export default function CriateService() {
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [imagem, setImagem] = useState();
  const [preco, setPreco] = useState();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  function novoServico(e) {
    e.preventDefault();
    const dados = {
      titulo,
      descricao,
      imagem,
      preco,
      name: user.name,
    };

    console.log(dados);
    services
      .postService(user.token, dados)
      .then(navigate("/HomePage"))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <ContainerMain>
        <Headers></Headers>
        <Container>
          <h1>Criar Serviço</h1>
          <form onSubmit={novoServico}>
            <Formgroup>
              <label for="titulo">Serviço Prestado</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Formgroup>
            <Formgroup>
              <label for="descricao">Descrição do Serviço</label>
              <textarea
                id="descricao"
                name="descricao"
                required
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </Formgroup>
            <Formgroup>
              <label for="Imagem">Imagem do Serviço Prestado</label>
              <input
                type="text"
                id="Imagem"
                name="Imagem"
                pattern="https://.+"
                required
                onChange={(e) => setImagem(e.target.value)}
              />
            </Formgroup>
            <Formgroup>
              <label for="Imagem">Preço</label>
              <input
                placeholder="0,00"
                type="number"
                min={0}
                step="0.01"
                required
                onChange={(e) => setPreco(e.target.value.toString())}
              />
            </Formgroup>
            <Formgroup>
              <input type="submit" value="Enviar Projeto" />
            </Formgroup>
          </form>
        </Container>
      </ContainerMain>
      <Footer />
    </>
  );
}
const ContainerMain = styled.main`
  width: 100%;
  display: flex;
    background-color: rgb(34, 20, 20);
    flex-direction: column;
    height: 1200px;
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  color: white;
  input, textarea{
    background-color: rgba(255, 255, 255, 0.8);
  }
  
`;
const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;
const Formgroup = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  margin-left: 10px;
  width: 100%;
  max-width: 1080px;
  @media (max-width: 768px) {
    max-width: 350px; /* Reduza a altura da imagem em telas menores */
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 25px;
  }
  textarea,
  input[type="text"],
  input[type="email"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  textarea {
    width: calc(100% - 30px);
    height: 100px;
  }
  input[type="number"]{
    padding: 10px;
  }
  input[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    
    border-radius: 5px;
    cursor: pointer;
    width: calc(100% - 5px);
  }
  select {
    width: 40%;
    height: 40px;
    font-size: 20px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
`;
