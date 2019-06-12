# Video Maker Robots
##### ( Protuguês - English  - Francaise )

Projeto open source para fazer vídeos automatizados
> Elaborado com base no projeto do canal de tecnologia 
[Filipe Deschamps](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw)
e sua Playlist 
[4 robôs que criam vídeos no YouTube](https://www.youtube.com/playlist?list=PLMdYygf53DP4YTVeu0JxVnWq01uXrLwHi) 
a quem agradeço e dou crédito por esse conhecimento inestimável

Open source project to make automated videos
> Elaborated on the basis of the technology channel project
[Filipe Deschamps](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw)
and your Playlist 
[4 robôs que criam vídeos no YouTube](https://www.youtube.com/playlist?list=PLMdYygf53DP4YTVeu0JxVnWq01uXrLwHi)
to whom I thank and credit for ths invaluable knowledge

Project open source pour réaliser des vidéos automatisées
> Elaboré sur la base du projet de canal technologique
[Filipe Deschamps](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw)
et votre Playlist 
[4 robôs que criam vídeos no YouTube](https://www.youtube.com/playlist?list=PLMdYygf53DP4YTVeu0JxVnWq01uXrLwHi)
à qui je remercie et attribue cette précieuse connaissance

#### Pré requisitos - Requirements - Les exigences

- Git (https://git-scm.com/)
- Node (https://nodejs.org)

#### Instalação - Install - L'installation

- clone o repositório - clone the repositore  - cloner le référentiel

   ```bash
    git clone https://github.com/rafalogan/videoboots.git
    cd videoboots
    npm install
   ```

#### Algorithmia - API

É necessário criar a sua chave de acesso para poder testar os robôs, 
para isso você precisa acessar o site do [Algorithmia](https://algorithmia.com/), 
**copie** a chave de acesso, na pasta do projeto crie uma pasta **credentials** e 
crie um arquivo `algorithmia.json`, com a estrutura abaixo:

It is necessary to create your access key to test the robots,
to this you need to access the [Algorithmia](https://algorithmia.com/),
**copy** the access key, in folder of project make one folder **credeintials**
and make the file `algorithmia.json`, with the below structure:

Il est nécessaire de créer votre clé d'accès pour pouvoir tester les robots,
pour cela, vous devez accéder à la [Algorithmia](https://algorithmia.com/),
**copie** le clé d'accès, dans le dossier du project créer un dossier **credeintials**
et créer un ficher `algorithmia.json`, avec la structure ci-dessous:

``` js
{
  "apiKey": "API_KEY_AQUI"
}
```

#### Watson - API

É necessário criar também as credenciais do *Watson* no site da [IBM](https://cloud.ibm.com/login), 
cadastre-se, logado clique em **Catálogo**, depois dentro de **IA** 
procure por *Natural Language Understanding* voltando na pasta do projeto ainda dentro da pasta **credentials** 
crie um arquivo com o nome `watson-nlu.json` 
com as credenciais que copiou anteriormente:

You must also create the *Watson* on the [IBM](https://cloud.ibm.com/login),
logged click on **Catalog**, then on **IA** search for *Naural Language Understanding*
returning in the project folder still inside the folser **credentials** 
create a file named  `watson-nlu.json`
with the credetials that you previously copied:

Vous devez également créer les informations d'identification *Watson* sur le [IBM](https://cloud.ibm.com/login),
inscrivez-vous, connectez-vous cliquez **Catalogue**, puis à **IA**
recherchez *Natural Language Understanding* 
en returnat das le dossier du projet toujour dans le dossier **credentials**
créer un fichier nommé `watson-nlu.json`
avec les informations d'identification que vous avez précédemment copiées:

``` js
{
  "apikey" : "...",
  "iam_apikey_description" : "...",
  "iam_apikey_name": "...",
  "iam_role_crn": "...",
  "iam_serviceid_crn": "...",
  "url": "..."
}
```

#### Google Cloud Plataform

Vincule a conta do Google com o [Google Cloud Plataform](https://cloud.google.com/):
> Obs.: É importante lembrar que alguns recursos do **Google Cloud Plataform** são **Pagos**, 
mas, todos os recursos utitlizados são  **Gratuitos**

Link your Google account with [Google Cloud Plataform](https://cloud.google.com/):
> Ps.: It is important to remenber that some features of the **Google Cloud Plataform** are **Payments**,
but all the resources used are **free**

Associez votre compte Google à [Google Cloud Plataform](https://cloud.google.com/):
> Ps.: Il est important de se rappeler que certaines ressources du **Google Cloud Plataform** des **paiements**,
mais toutes les ressources utilisées sont **gratuites** 
