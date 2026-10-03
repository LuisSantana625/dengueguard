# 🦟 DengueGuard

## Sistema de Monitoramento Epidemiológico e Triagem Educativa da Dengue

O **DengueGuard** é uma aplicação web desenvolvida com o objetivo de facilitar o acesso a informações epidemiológicas sobre dengue e disponibilizar uma ferramenta educativa de triagem de sintomas.

A plataforma reúne dados epidemiológicos públicos, informações ambientais e uma triagem interativa em uma interface moderna, responsiva e de fácil utilização.

---

## 📌 Problemática

A dengue representa um importante problema de saúde pública no Brasil, apresentando períodos de aumento da transmissão e diferentes cenários epidemiológicos entre municípios e regiões.

Embora existam bases públicas com informações epidemiológicas relevantes, esses dados nem sempre são apresentados de maneira simples e acessível para a população.

Além disso, diante do aparecimento de sintomas, muitas pessoas podem apresentar dúvidas sobre sinais que merecem maior atenção e sobre quando procurar avaliação profissional.

Diante desse cenário, o **DengueGuard** foi desenvolvido como uma ferramenta digital capaz de aproximar informações epidemiológicas públicas do usuário e oferecer uma triagem educativa de sintomas em uma única plataforma.

---

## 🎯 Objetivo da aplicação

O DengueGuard tem como objetivo disponibilizar uma interface simples, moderna e interativa para:

- consultar informações epidemiológicas recentes sobre dengue;
- identificar automaticamente o município a partir do CEP informado;
- apresentar indicadores epidemiológicos de maneira compreensível;
- apresentar informações ambientais e de receptividade climática disponibilizadas pela fonte epidemiológica;
- permitir a realização de uma triagem educativa de sintomas;
- identificar a presença de sinais que indiquem necessidade de avaliação profissional;
- gerar um resumo da triagem em PDF;
- facilitar o acesso a informações relacionadas ao monitoramento da dengue.

---

## 🚀 Principais funcionalidades

### 🌎 Consulta epidemiológica por região

O usuário pode informar seu **CEP** para identificar o município correspondente e consultar os dados epidemiológicos mais recentes disponíveis.

A aplicação apresenta informações como:

- município e estado;
- período correspondente à semana epidemiológica;
- casos notificados;
- casos estimados;
- incidência por 100 mil habitantes;
- nível de alerta epidemiológico;
- temperatura média;
- umidade média;
- indicador de receptividade climática.

A aplicação busca apresentar a **semana epidemiológica mais recente disponível na fonte de dados**, evitando depender exclusivamente da semana atual.

---

### 🌦️ Interpretação das condições climáticas

Além dos indicadores epidemiológicos, o DengueGuard apresenta informações ambientais disponibilizadas pela fonte consultada, como temperatura média, umidade média e indicador de receptividade climática.

A receptividade climática é apresentada de forma interpretativa para facilitar a compreensão do usuário sobre as condições ambientais relacionadas à transmissão.

---

### 🩺 Triagem educativa de sintomas

A plataforma possui uma ferramenta interativa na qual o usuário pode selecionar sintomas apresentados recentemente.

A partir das opções selecionadas, o sistema apresenta uma classificação educativa e orientações correspondentes.

A lógica considera também a presença de sintomas tratados pela aplicação como sinais que justificam maior atenção.

A triagem possui **caráter exclusivamente informativo e auxiliar**, não constituindo diagnóstico médico e não substituindo avaliação realizada por profissional de saúde.

---

### 📄 Geração de resumo da triagem em PDF

Após a realização da triagem, quando disponível para a classificação apresentada, o usuário pode gerar um documento contendo:

- data da avaliação;
- resultado da triagem;
- sintomas informados;
- orientação correspondente;
- aviso sobre o caráter informativo da ferramenta;
- informações relacionadas à privacidade.

O PDF é gerado diretamente pela aplicação utilizando a biblioteca **jsPDF**.

---

## 🔐 Privacidade e proteção de dados

A triagem foi projetada sem solicitar informações diretamente identificadoras, como nome, CPF, telefone ou e-mail.

As informações selecionadas durante a triagem são utilizadas para produzir o resultado apresentado ao usuário e gerar o resumo solicitado.

A aplicação possui uma área destinada a apresentar informações sobre finalidade, privacidade, fontes utilizadas e limitações da ferramenta.

O projeto considera os princípios relacionados à proteção de dados pessoais previstos na **Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018)**.

---

## 🔗 APIs e fontes de dados

### 🦟 InfoDengue

Os dados epidemiológicos e indicadores utilizados na consulta regional são provenientes do **InfoDengue**, sistema de monitoramento de arboviroses.

A aplicação utiliza esses dados para apresentar informações epidemiológicas e ambientais relacionadas ao município consultado.

O DengueGuard atua como uma interface de consulta e apresentação dessas informações, não sendo responsável pela produção dos dados epidemiológicos originais.

### 📍 ViaCEP

A aplicação utiliza o **ViaCEP** para consultar o CEP informado pelo usuário.

A partir dessa consulta são obtidas informações relacionadas à localização, incluindo dados necessários para identificação do município e seu código IBGE, posteriormente utilizado na consulta epidemiológica.

---

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

- **React**
- **Vite**
- **JavaScript**
- **HTML5**
- **CSS3**
- **jsPDF**
- **Git**
- **GitHub**
- **Vercel**
- **InfoDengue**
- **ViaCEP**

---

## 📁 Estrutura principal do projeto

```text
dengueguard/
│
├── api/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── ConsultaRegiao.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── InformacoesLegais.jsx
│   │   ├── ResultadoTriagem.jsx
│   │   ├── SobreDados.jsx
│   │   ├── TriagemSintomas.jsx
│   │   └── VisaoGeral.jsx
│   │
│   ├── services/
│   │   ├── infoDengueService.js
│   │   └── viaCepService.js
│   │
│   ├── utils/
│   │   └── gerarRelatorioPDF.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/LuisSantana625/dengueguard.git
```

### 2. Entre na pasta do projeto

```bash
cd dengueguard
```

### 3. Instale as dependências

É necessário possuir o **Node.js** instalado no computador.

Execute:

```bash
npm install
```

### 4. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

### 5. Acesse a aplicação

Após executar o comando, o Vite apresentará no terminal o endereço local da aplicação.

Normalmente:

```text
http://localhost:5173
```

Abra o endereço apresentado pelo Vite no navegador.

---

## 🌐 Aplicação publicada

A versão publicada do DengueGuard está disponível na **Vercel**:

**DengueGuard:**  
https://dengueguard-kohl.vercel.app/

---

# 🤖 Utilização de Inteligência Artificial

Ferramentas de **Inteligência Artificial** foram utilizadas como apoio durante o processo de desenvolvimento do DengueGuard.

A IA foi utilizada principalmente para auxiliar em:

- estruturação e organização do projeto;
- desenvolvimento e revisão dos componentes React;
- implementação e revisão da lógica em JavaScript;
- integração com APIs;
- investigação e correção de erros;
- desenvolvimento da interface e experiência do usuário;
- implementação da geração do resumo em PDF;
- revisão de textos da aplicação;
- documentação do projeto.

As respostas e sugestões fornecidas pela IA foram utilizadas como apoio ao processo de desenvolvimento, sendo posteriormente implementadas, testadas e ajustadas de acordo com as necessidades do projeto.

---

## 📝 Registro de prompts utilizados

Conforme solicitado na atividade, abaixo estão registrados exemplos de prompts relevantes utilizados durante o desenvolvimento com auxílio de Inteligência Artificial.

### Prompt 1 — Estruturação do projeto

**Prompt utilizado:**

> "Quero desenvolver o DengueGuard AI, um sistema inteligente de triagem e monitoramento da dengue utilizando React e Vite. A aplicação deve permitir consultar dados epidemiológicos da dengue por município e possuir uma triagem de sintomas. Quero uma interface moderna, tecnológica, responsiva e de fácil utilização."

**Objetivo:**

Utilizar a IA como apoio para estruturar a aplicação, organizar seus componentes e desenvolver as principais funcionalidades utilizando React e Vite.

---

### Prompt 2 — Consulta epidemiológica

**Prompt utilizado:**

> "Quero que a consulta epidemiológica utilize o CEP informado pelo usuário para identificar o município e o código IBGE. Depois, consulte a API do InfoDengue e apresente os dados da semana epidemiológica mais recente disponível, incluindo casos, incidência, nível de alerta e informações climáticas."

**Objetivo:**

Auxiliar no desenvolvimento da integração entre os dados obtidos por meio do ViaCEP e os dados epidemiológicos disponibilizados pelo InfoDengue, permitindo realizar a consulta correspondente ao município identificado.

---

### Prompt 3 — Triagem de sintomas

**Prompt utilizado:**

> "Quero criar uma triagem educativa de sintomas de dengue. O usuário poderá selecionar os sintomas apresentados e o sistema deverá identificar diferentes níveis de atenção, destacando sinais de alarme. O resultado deve aparecer em uma janela e permitir gerar um resumo da triagem em PDF."

**Objetivo:**

Auxiliar na implementação da lógica da triagem, apresentação dos resultados e geração do resumo das informações em formato PDF.

---

## 🧠 Como a IA contribuiu para o desenvolvimento

A Inteligência Artificial atuou como uma ferramenta de apoio durante diferentes etapas do projeto.

Além da geração e revisão de código, ela foi utilizada durante a resolução de problemas encontrados no desenvolvimento.

Entre os exemplos estão:

- ajustes na comunicação com serviços externos;
- análise de erros apresentados no console do navegador;
- ajustes na geração e abertura do PDF em diferentes navegadores;
- organização dos componentes da aplicação;
- melhorias de responsividade e experiência do usuário;
- adequação da aplicação para publicação em ambiente de produção.

O processo envolveu interação entre o desenvolvedor e a ferramenta de IA, com realização de testes e ajustes sucessivos até alcançar o funcionamento esperado.

---

## ⚠️ Aviso importante

O **DengueGuard possui finalidade educativa e informativa**.

A triagem disponibilizada pela plataforma **não realiza diagnóstico médico** e não deve ser utilizada como substituta de consulta, avaliação clínica, diagnóstico ou orientação realizada por profissional de saúde.

Caso ocorram agravamento dos sintomas, sinais de alerta ou qualquer preocupação relacionada ao estado de saúde, o usuário deve procurar avaliação de um profissional ou serviço de saúde.

---

## 👨‍💻 Desenvolvedor

**Luis Felipe**

Projeto desenvolvido para fins acadêmicos e educacionais.

---

## 📚 Fontes e serviços utilizados

- **InfoDengue** — fonte dos dados epidemiológicos e indicadores utilizados na consulta regional.
- **ViaCEP** — serviço utilizado para consulta de CEP e identificação do município.
- **jsPDF** — biblioteca utilizada para geração do resumo da triagem em formato PDF.

---

## 📌 Status do projeto

✅ Aplicação desenvolvida  
✅ Integração com dados epidemiológicos  
✅ Consulta por CEP  
✅ Triagem educativa de sintomas  
✅ Geração de resumo em PDF  
✅ Interface responsiva  
✅ Repositório no GitHub  
✅ Aplicação publicada na Vercel