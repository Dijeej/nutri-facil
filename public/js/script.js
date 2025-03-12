function validarFormularioPesquisa() {
    const form = document.getElementById("form-pesquisa");
    
    form.addEventListener("submit", function(event) {
      const inputPesquisa = document.getElementById("input-pesquisa").value.trim();
      
      if (!inputPesquisa) {
        event.preventDefault(); // Impede envio se estiver vazio
        alert("Digite um termo para pesquisar!");
      }
    });
}
function adicionarRedirecionamentoImg() {
    // Seleciona todas as imagens com a classe "link-img"
    let imagens = document.querySelectorAll(".link-img");

    // Adiciona um evento de clique para cada uma delas
    imagens.forEach(function(imagem) {
      imagem.style.cursor = "pointer";
      imagem.onclick = function() {
        window.location.href = "receita.html";  // Redireciona para a página
      };
    });
}
function adicionarRedirecionamentoPerfil() {
    let perfis = document.getElementsByClassName("perfil-icone");
    for (let perfil of perfis) {
        perfil.onclick = function() {
            window.location.href = "perfil.html";
        };
    }
}
function adicionarRedirecionamentoHomepage() {
    let logos = document.getElementsByClassName("homepage");
    for (let logo of logos) {
        logo.onclick = function() {
            window.location.href = "main.html";
        };
    }
}
function trocaTabAtivaPagPerfil() {
  document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        
        document.querySelectorAll(".tab-link").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
        
        this.classList.add("active");
        document.getElementById(this.dataset.tab).classList.add("active");
    });
  });
}
function trocaCoracao() {
  document.querySelectorAll(".botao-curtida").forEach(heart => {
    heart.addEventListener("click", () => {
        heart.classList.toggle("bi-heart"); // Remove a versão de contorno
        heart.classList.toggle("bi-heart-fill");   // Adiciona a versão preenchida
        heart.classList.toggle("curtida");      // Aplica a animação
    });
});
}
  // Chamada de funcoes de redirecionamento
  adicionarRedirecionamentoImg();
  validarFormularioPesquisa();
  adicionarRedirecionamentoPerfil();
  adicionarRedirecionamentoHomepage();


  trocaTabAtivaPagPerfil();
  trocaCoracao();