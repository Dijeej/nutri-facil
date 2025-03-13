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
function adicionarRedirecionamentoHomepage() {
    let logos = document.getElementsByClassName("homepage");
    for (let logo of logos) {
        logo.onclick = function() {
            window.location.href = "/";
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
        heart.classList.toggle("bi-heart"); 
        heart.classList.toggle("bi-heart-fill");   
        heart.classList.toggle("curtida");      
    });
});
}

  // Chamada de funcoes de redirecionamento
  validarFormularioPesquisa();
  adicionarRedirecionamentoHomepage();


  trocaTabAtivaPagPerfil();
  trocaCoracao();