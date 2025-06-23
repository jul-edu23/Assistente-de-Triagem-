
// --- Lógica da Triagem (Função Principal) ---
function calcularUrgencia(
    idade,
    sintomas,
    doencaCronicaInput,
    medicacoesInput,
    alergiasInput,
    historicoFamiliarInput,
    fumaSim,
    bebeSim,
    atividadeFisicaNao,
    avaliacaoDor
) {
    let pontosUrgencia = 0;
    let ficha = "";

    // 1. Idade
    if (idade >= 65) {
        pontosUrgencia += 3;
    } else if (idade < 12) {
        pontosUrgencia += 2;
    }

    // 2. Sintomas
    const sintomasUrgentes = [
        "dor no peito", "dificuldade para respirar", "desmaio", "perda de consciência",
        "hemorragia", "febre alta persistente", "confusão mental", "convulsão",
        "dor abdominal intensa", "dor de cabeça forte", "vômito constante", "tontura"
    ];
    for (const sintoma of sintomas) {
        if (sintomasUrgentes.includes(sintoma.toLowerCase())) {
            pontosUrgencia += 5;
        } else {
            pontosUrgencia += 1; // Outros sintomas leves
        }
    }

    // Doenças Crônicas
    if (doencaCronicaInput.length > 0) {
        pontosUrgencia += 3;
        if (doencaCronicaInput.some(d => d.toLowerCase().includes("diabetes") || d.toLowerCase().includes("hipertensão"))) {
            pontosUrgencia += 2;
        }
    }

    // Medicações
    if (medicacoesInput.length > 0) {
        pontosUrgencia += 1;
        if (medicacoesInput.some(m => m.toLowerCase().includes("insulina") || m.toLowerCase().includes("varfarina"))) {
            pontosUrgencia += 2;
        }
    }

    // Alergias
    if (alergiasInput.length > 0) {
        pontosUrgencia += 2;
    }

    // Histórico Familiar
    if (historicoFamiliarInput.length > 0) {
        pontosUrgencia += 1;
    }

    // Fuma
    if (fumaSim === 'sim') {
        pontosUrgencia += 2;
    }

    // Bebe
    if (bebeSim === 'sim') {
        pontosUrgencia += 1;
    }

    // Atividade Física
    if (atividadeFisicaNao === 'não') {
        pontosUrgencia += 1;
    }

    // Avaliação de Dor
    if (avaliacaoDor !== null && avaliacaoDor !== undefined) {
        pontosUrgencia += parseInt(avaliacaoDor);
    }

    // Cor da Ficha
    if (pontosUrgencia >= 30) {
        ficha = "Vermelha (Emergência - Risco Imediato de Vida)";
    } else if (pontosUrgencia >= 20) {
        ficha = "Laranja (Muito Urgente - Risco Potencial de Piora)";
    } else if (pontosUrgencia >= 12) {
        ficha = "Amarela (Urgente - Necessita Avaliação Rápida)";
    } else if (pontosUrgencia >= 6) {
        ficha = "Verde (Pouco Urgente - Pode Aguardar)";
    } else {
        ficha = "Azul (Não Urgente - Atendimento Eletivo)";
    }

    return { ficha: ficha, pontos_urgencia: pontosUrgencia };
}

// --- Listas de Dados Predefinidos para Autocompletar ---
const sintomasPreDefinidos = [
    "Dor no peito", "Dificuldade para respirar", "Desmaio", "Perda de consciência",
    "Hemorragia", "Febre alta persistente", "Confusão mental", "Convulsão",
    "Dor abdominal intensa", "Dor de cabeça forte", "Vômito constante", "Tontura",
    "Dor de garganta", "Tosse", "Coriza", "Dor nas costas", "Fadiga", "Náusea",
    "Diarreia", "Erupção cutânea", "Inchaço", "Dor nas articulações",
    "Palpitações", "Formigamento", "Fraqueza muscular", "Perda de apetite",
    "Perda de peso inexplicada", "Dificuldade para engolir", "Azia", "Insônia",
    "Cansaço", "Mal-estar geral", "Calafrios", "Suores noturnos", "Dor muscular",
    "Manchas na pele", "Dor ao urinar", "Aumento da frequência urinária",
    "Perda de olfato", "Perda de paladar", "Olhos vermelhos", "Dor nos olhos",
    "Inchaço nas pernas", "Dor nas pernas", "Queimação ao urinar", "Dores na coluna",
    "Sensação de dormência", "Sangramento anormal"
];

const alergiasPreDefinidos = [
    "Amendoim", "Glúten", "Lactose", "Frutos do mar", "Ovos", "Leite", "Soja",
    "Pólen", "Ácaros", "Pelo de animal", "Picada de inseto", "Látex",
    "Penicilina", "Sulfas", "Aspirina", "Anti-inflamatórios", "Iodo", "Contraste"
];

const doencasCronicasPreDefinidos = [
    "Diabetes", "Hipertensão", "Asma", "Doença Pulmonar Obstrutiva Crônica (DPOC)",
    "Doença Cardíaca Coronariana", "Insuficiência Cardíaca", "Doença Renal Crônica",
    "Tireoidismo (Hipotireoidismo/Hipertireoidismo)", "Artrite Reumatoide",
    "Lúpus", "Esclerose Múltipla", "Doença de Crohn", "Retocolite Ulcerativa",
    "Epilepsia", "Depressão Crônica", "Ansiedade Generalizada", "Câncer (em remissão/tratamento)",
    "Fibromialgia", "Osteoporose", "Glaucoma", "Catarata", "Doença de Parkinson",
    "Alzheimer", "Hepatite Crônica", "Cirrose Hepática", "Psoríase", "Doença Celíaca"
];


const medicacoesPreDefinidos = [
    "Insulina", "Sinvastatina", "Losartana", "Amlodipina", "Omeprazol",
    "Metformina", "Levotiroxina", "AAS", "Dipirona", "Paracetamol", "Ibuprofeno",
    "Amoxicilina", "Azitromicina", "Clopidogrel", "Varfarina", "Rivoxaraban",
    "Captopril", "Hidroclorotiazida", "Furosemida", "Digoxina", "Escitalopram",
    "Sertralina", "Clonazepam", "Bromazepam", "Rivotril", "Frontal"
];

const historicoFamiliarPreDefinido = [
    "Doença cardíaca", "Diabetes", "Câncer", "Hipertensão", "Acidente Vascular Cerebral (AVC)",
    "Doença renal", "Asma", "Alzheimer", "Parkinson", "Obesidade", "Doença autoimune",
    "Trombose", "Colesterol alto", "Glaucoma", "Anemia falciforme", "Fibrose cística"
];

// --- Lógica para Campo de Autocompletar e Tags ---
function setupTagInput(inputId, tagsContainerId, suggestionsListId, predefinedData, tagClassName) {
    const inputElement = document.getElementById(inputId);
    const tagsContainer = document.getElementById(tagsContainerId);
    const suggestionsList = document.getElementById(suggestionsListId);
    let selectedItems = [];

    function renderTags() {
        tagsContainer.innerHTML = '';
        selectedItems.forEach(item => {
            const tagDiv = document.createElement('div');
            tagDiv.classList.add(tagClassName);
            tagDiv.textContent = item;

            const removeSpan = document.createElement('span');
            removeSpan.classList.add('remove-tag');
            removeSpan.textContent = 'x';
            removeSpan.onclick = (e) => {
                e.stopPropagation(); // Evita que o clique se propague para o container
                removeItem(item);
            };

            tagDiv.appendChild(removeSpan);
            tagsContainer.appendChild(tagDiv);
        });

    }

    function removeItem(itemToRemove) {
        selectedItems = selectedItems.filter(item => item !== itemToRemove);
        renderTags();
        inputElement.dispatchEvent(new Event('input'));
    }

    inputElement.addEventListener('input', () => {
        const searchTerm = inputElement.value.toLowerCase().trim();
        suggestionsList.innerHTML = '';

        if (searchTerm.length > 0) {
            const filteredSuggestions = predefinedData.filter(item =>
                item.toLowerCase().includes(searchTerm) && !selectedItems.includes(item)
            ).slice(0, 7);

            if (filteredSuggestions.length > 0) {
                filteredSuggestions.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    li.onclick = () => {
                        selectedItems.push(item);
                        renderTags();
                        inputElement.value = '';
                        suggestionsList.classList.remove('show');
                        inputElement.dispatchEvent(new Event('input'));
                    };
                    suggestionsList.appendChild(li);
                });
                suggestionsList.classList.add('show');
            } else {
                suggestionsList.classList.remove('show');
            }
        } else {
            suggestionsList.classList.remove('show');
        }
    });

    inputElement.addEventListener('blur', () => {
        setTimeout(() => {
            suggestionsList.classList.remove('show');
        }, 150);
    });

    // Mostrar sugestões quando o input ganha foco (se houver texto ou se a lista não estiver vazia)
    inputElement.addEventListener('focus', () => {
        if (inputElement.value.length > 0 || suggestionsList.children.length > 0) {
            inputElement.dispatchEvent(new Event('input'));
        }
    });

    // Permite clicar na área de tags para focar o input
    tagsContainer.addEventListener('click', () => {
        inputElement.focus();
    });

    return {
        get: () => selectedItems
    };
}

// --- Inicialização dos Campos de Autocompletar ---
const sintomasSelecionados = setupTagInput('sintomasInput', 'sintomasTags', 'sintomasSugestoes', sintomasPreDefinidos, 'sintoma-tag');
const alergiasSelecionadas = setupTagInput('alergiasInput', 'alergiasTags', 'alergiasSugestoes', alergiasPreDefinidos, 'alergia-tag');
const doencaCronicaSelecionada = setupTagInput('doencaCronicaInput', 'doencaCronicaTags', 'doencaCronicaSugestoes', doencasCronicasPreDefinidos, 'doenca-cronica-tag');
const medicacoesSelecionadas = setupTagInput('medicacoesInput', 'medicacoesTags', 'medicacoesSugestoes', medicacoesPreDefinidos, 'medicacao-tag');
const historicoFamiliarSelecionado = setupTagInput('historicoFamiliarInput', 'historicoFamiliarTags', 'historicoFamiliarSugestoes', historicoFamiliarPreDefinido, 'historico-tag');

// --- Gerenciamento do Diálogo e Overlay ---
const dialog = document.getElementById('dialog');
const submitFormButton = document.getElementById('submitFormButton');
const closeDialogX = document.getElementById('fecharDialog'); // O 'x' no cabeçalho do dialog
const btnCancelarDialog = document.getElementById('closeDialog'); // O botão "Cancelar"
const btnConfirmarDialog = document.getElementById('confirmDialog'); // O botão "Confirmar"
const overlay = document.getElementById('overlay');

// Função para abrir o diálogo e mostrar o overlay
function openDialog() {
    overlay.style.display = 'block';
    dialog.showModal();
}

// Função para fechar o diálogo e esconder o overlay
function closeDialog() {
    dialog.close();
    overlay.style.display = 'none';
}

// Evento para abrir o diálogo ao clicar no botão "ENVIAR" do formulário
submitFormButton.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    // Validação básica do formulário antes de abrir o diálogo
    const form = document.getElementById('triagemForm');
    if (!form.checkValidity()) {
        form.reportValidity(); // Mostra as mensagens de erro nativas do navegador
        return; // Sai da função se o formulário não for válido
    }
    openDialog();
});

// Eventos para fechar o diálogo
closeDialogX.addEventListener('click', closeDialog);
btnCancelarDialog.addEventListener('click', closeDialog);

// Evento para confirmar o envio do formulário no diálogo
btnConfirmarDialog.addEventListener('click', () => {
    closeDialog();
    // Coletar todos os dados do formulário e calcular a urgência
    const idade = parseInt(localStorage.getItem('idadePaciente'), 10); // PEGA A IDADE DO LOCALSTORAGE
    const fuma = document.querySelector('input[name="fuma"]:checked')?.value || 'não';
    const bebe = document.querySelector('input[name="bebe"]:checked')?.value || 'não';
    const atividadeFisica = document.querySelector('input[name="atividadeFisica"]:checked')?.value || 'não';
    const avaliacaoDor = document.querySelector('input[name="avaliacaoDor"]:checked')?.value;

    // Chamar a função de triagem com TODOS os dados coletados
    const resultadoTriagem = calcularUrgencia(
        idade,
        sintomasSelecionados.get(),
        doencaCronicaSelecionada.get(),
        medicacoesSelecionadas.get(),
        alergiasSelecionadas.get(),
        historicoFamiliarSelecionado.get(),
        fuma,
        bebe,
        atividadeFisica,
        avaliacaoDor
    );

    const fichaCor = resultadoTriagem.ficha.split(' ')[0]; // Pega a primeira palavra para a classe CSS

    // SALVE O RESULTADO NO LOCALSTORAGE PARA USAR NA fichaR.html
    localStorage.setItem('resultadoTriagem', JSON.stringify({
        ficha: resultadoTriagem.ficha,
        pontos: resultadoTriagem.pontos_urgencia,
        cor: fichaCor.toLowerCase()
    }));


});