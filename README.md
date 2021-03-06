
<p align="center">
    <img width="170" src="src/static/icons/256x256.png" title="Logo do projeto"><br /><br />
    <img src="https://img.shields.io/maintenance/yes/2022?style=for-the-badge" title="Status do projeto">
    <img src="https://img.shields.io/github/workflow/status/practice-uffs/app-boas-vindas/ci.uffs.cc?label=Build&logo=github&logoColor=white&style=for-the-badge" title="Status do build">
</p>

# UFFS Boas Vindas

Esse repositório contém o código-fonte do aplicativo UFFS Boas Vindas

### Descrição

Como objetivo principal, o PRACTICE busca estruturar ambientes, capacitar agentes educacionais e produzir e mediar na produção de conteúdos que possibilitem a produção de conteúdos de ensino e tecnologias baseadas em metodologias ativas para promover a inovação do processo de aprendizagem de estudantes em componentes curriculares e extracurriculares da UFFS. 

Esse aplicativo é um dos facilitadores que está sendo desenvolvido para ajudar a comunidade acadêmica, principalmente aqueles que são novos na universidade. O objetivo do aplicativo é disponibilizar com poucos toques informações relativas aos diversos campus da Universidade Federal da Fronteira Sul. No app o(a) acadêmico(a) pode encontrar informações sobre o Campus que irá estudar, utilizando apenas o seu celular, ele(ela) também encontrará orientações sobre os principais procedimentos, auxílio estudantil, canais de contato, clima local, história da cidade, opções de lazer, dicionário local, dentre outras informações relacionadas às cidades em que os Campi da UFFS estão presentes.

### Equipe

**Coordenação:**
* Fernando Bevilacqua - _Professor Ciência da Computação, UFFS Chapecó/SC - [fernando.bevilacqua@uffs.edu.br](mailto:fernando.bevilacqua@uffs.edu.br)_

**[Equipe de desenvolvimento](https://github.com/orgs/practice-uffs/teams/dev)**

**Suporte:**
* [Equipe PRACTICE](https://practice.uffs.cc/)

## Informações para desenvolvedores

### 1. Pré-requisitos

Você precisa ter [NodeJS](https://nodejs.org/en/) versão `>=13.8` instalado no seu sistema. Depois, rode:

```
npm i framework7-cli cordova -g
```

### 2. Preparar o projeto

Faça um `fork` deste repositório em seu próprio GitHub e clone seu `fork` em seu computador:

```
git clone https://github.com/SEU_USUARIO/template-apps-f7 && cd template-apps-f7
```

Instale todas as dependências:

```
npm install
```

### 3. Testar

Para testar o projeto localmente, rode:

```
npm start
```

O browser abrirá apontando para o endereço [http://localhost:8080/](http://localhost:8080/) para você acessar o app. Se estiver usando o Chrome, pressione <kbd>F12</kbd> para abrir as Ferramentas de Desenvolvedor e visualizar a página como se fosse um celular.

### 4. Build e deploy

#### 4.1 Pré-requisitos

Para ser possível gerar o APK do aplicativo é necessario instalar o Android SDK, o JDK 8 e também o Gradle. Caso haja mais de uma versão do JDK instalada no computador é necessário selecionar a versão 8 para ser utilizada.  Além disso, é necessário configurar as seguintes variaveis de ambiente: `JAVA_HOME`, `ANDROID_HOME` e `ANDROID_SDK_ROOT`.

O Android SDK pode ser instalado tanto manualmente quanto por meio da instalação do Android Studio (sendo esta ultima possívelmente a mais simples). Com o SDK instalado é necessário também aceitar as licenças do Android, caso a instalação do SDK tenha sido feita por meio do Android Studio basta acessar `Configurações > SDK Manager > SDK Tools`, instalar `Google Play Licensing Library` e aceitar as licenças. 
Por fim, é preciso instalar o Gradle e a instalação deste pode variar de acordo com o sistema operacional utilizado.

Além disso, para gerar o apk com o plugin do fcm adicionado é necessário:

1. Garantir que a linha `<widget id="cc.uffs.practice" version="0.4.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">` do arquivo `config.xml` possua o id **igual** ao nome do pacote criado no firebase.
2. Caso o pacote criado possua um nome diferente do que esta previamente configurado no arquivo `config.xml` é necessario remover e readicionar a plataforma android por meio do cordova.
3. Adicionar o arquivo `google-services.json` gerado pelo firebase à pasta `/cordova/platforms/android/app/src/google-services.json`

#### 4.2 Build

Para fazer build (dev) da aplicação, rode:

```
npm run build-dev
```

A aplicação pronta para uso estará no diretório `www` na raiz do respositório. Você também pode fazer um build de produção, rode:

```
npm run build-prod
```
#### 4.3 Deploy

### 5. Build e deploy Google Play

Para fazer um build e deploy para a Google Play, você precisa de um ambiente de desenvolvimento Android disponível na máquina. Instale, por exemplo, o Android SDK e afins (Grade, JDK, etc). Para build nesse projeto, você precisa do `JDK 1.8` e de uma versão especifica do node (instale o `nvm`, por exemplo).

Instale o Cordova:

```
npm install -g cordova
```

Instale as dependencias:

```
npm run install-deps-cordova
```

Faça um build da aplicação:

```
npm run build-dev-cordova
```

Faça os testes cabíveis, como instalar em algum dispositivo Android o `.apk` gerado no processo.

Após gerar o `.apk` é necessário verificar se a permissão para utilizar a câmera foi adicionada ao arquivo: `cordova/platforms/android/app/src/main/AndroidManifest.xml`. Para isso basta verificar se o mesmo possui uma linha com o conteúdo: `<uses-permission android:name="android.permission.CAMERA" />`. Caso não possua, é necessário adicionar esta linha para que o aplicativo consiga acessar a câmera do dispositivo, após isso basta executar o comando novamente para gerar um novo `.apk` do aplicativo.

Se tudo estiver certo, para fazer deploy (final) na Google Play, rode:

```
npm run build-prod-cordova
```

#### 5.1 Assinatura do App blundle

Essa etapa é necessária para realizar o upload do aplicativo na Google Play Store. Para isso, é necessário utilizar a `chave` de assinatura encontrada no drive do `dev`. Você deve baixar o arquivo `keys.zip` e extraí-lo na mesma pasta aonde foi gerado a build de produção do aplicativo, o caminho do arquivo provavelmente será esse: `app-practice/cordova/platforms/android/app/build/outputs/bundle/release/app-release.aab`. Com o `app-release.aab` e o `keystore.jsk` na mesma pasta, você deve abrir um terminal (Linux) neste diretório e executar esse comando:

```
jarsigner -tsa http://timestamp.digicert.com -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore.jks app-release.aab upload
```

Após isso, seu build pode ser carregado na Google Play Store através do [Google Play Console](https://play.google.com/console/developers).

## Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, [sugerir uma nova funcionalidade](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=&template=feature_request.md&title=), [reportar um problema/bug](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=bug&template=bug_report.md&title=), ou simplemente utilizar o projeto e comentar sua experiência.

Veja o arquivo [ROADMAP.md](ROADMAP.md) para ter uma ideia de como o projeto deve evoluir.


## Licença

Esse projeto é licenciado nos termos da licença open-source [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) e está disponível de graça.

## Changelog

Veja todas as alterações desse projeto no arquivo [CHANGELOG.md](CHANGELOG.md).

## Créditos de ícones e arte

Os ícones e o logo utilizados nesse aplicativo foram feitos por diversos artistas:

<a class="link external" href="https://thenounproject.com/dinosoftlab" target="_blank">DinosoftLab</a>
Icons made by [dinosoftlab](https://thenounproject.com/dinosoftlab)