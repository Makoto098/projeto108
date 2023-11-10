let dog = 0;
let cat = 0;

function startClassification() {
  navigator.mediaDevices.getUserMedia({ audio: true });
  classifier = ml5.soundClassifier(
    "https://teachablemachine.withgoogle.com/models/xWEten6BN/model.json",
    modelReady
  );
}

function modelReady() {
  classifier.classify(gotResults);
}

// Função que será chamada quando os resultados do modelo estiverem prontos
function gotResults(error, results) {
  // Verifica se há erro
  if (error) {
    console.error(error);
  } else {
    // Imprime os resultados no console
    console.log(results);

    // Gera valores aleatórios para cores RGB
    const red = Math.floor(Math.random() * 255) + 1;
    const green = Math.floor(Math.random() * 255) + 1;
    const blue = Math.floor(Math.random() * 255) + 1;

    // Atualiza a tag heading para exibir a contagem e o nome do som detectado
    document.getElementById(
      "animalCount"
    ).innerText = `Cachorro: ${dog}, Gatos: ${cat}`;
    document.getElementById(
      "animalName"
    ).innerText = `Som Detectado: ${results[0].label}`;

    // Atualiza a cor das tags heading
    document.getElementById(
      "animalCount"
    ).style.color = `rgb(${red}, ${green}, ${blue})`;
    document.getElementById(
      "animalName"
    ).style.color = `rgb(${red}, ${green}, ${blue})`;

    // Acessa a tag image
    const animalImage = document.getElementById("animalImage");

    // Verifica se a label do primeiro resultado é "Latido"
    if (results[0].label === "Latido") {
      // Atualiza a src da imagem para o gif de cachorro
      animalImage.src = "lobo.jpg";

      // Aumenta a contagem de cachorros
      lobo++;
    }
    // Verifica se a label do primeiro resultado é "Miado"
    else if (results[0].label === "Miado") {
      // Atualiza a src da imagem para o gif de gato
      animalImage.src = "gato.jpg";

      // Aumenta a contagem de gatos
      gato++;
    } else {
      // Se não for nenhum dos anteriores, define a imagem padrão
      animalImage.src = "leão.jpg";
    }
  }
}

// Exemplo de como você pode chamar a função gotResults (substitua com a chamada real do seu modelo)
gotResults(null, { label: "Latido" });
