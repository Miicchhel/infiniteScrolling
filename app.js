//api de dados fake onde buscaremos as info: https://jsonplaceholder.typicode.com/

const postContainer = document.querySelector('#posts-container');
const loaderContainer = document.querySelector('.loader');

let page = 1;
let limit = 5;
const getPosts = async() => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  return response.json();
};

const addPostsIntoDOM = async() => {
  const posts = await getPosts()
  const postsTemplate = posts.map(({id, title, body}) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-tilte">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
    </div>
  `).join('');
  postContainer.innerHTML += postsTemplate;
}

addPostsIntoDOM()

const getNextPosts = () => {
  page += 1;

  addPostsIntoDOM();
};

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show');
    getNextPosts();
  }, 1000);
}

const showLoader = () => {
  loaderContainer.classList.add('show');
  removeLoader();
}

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight} = document.documentElement;
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;

  if (isPageBottomAlmostReached) {
    showLoader()
  }
});

  /*
  document.documentElement.scrollTop;
  - pixels de distância entre o topo do documento e o topo visível do documento;
  
  document.documentElement.clientHeight;
  - altura da parte visível do documento, em pixels,

  document.documentElement.scrollHeight;
  - tamanho, em pixels, da altura total do documento. Isso inclui as partes não visíveis na tela.
  */