const SUPABASE_URL = "https://qjdggpdlwhiydrabwyyk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZGdncGRsd2hpeWRyYWJ3eXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Nzg4NTAsImV4cCI6MjA1ODA1NDg1MH0.VmmnOuz3Xkt40MdztobCiXY1oofzaECF7Kg7U-SeEQg";
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);


async function carregarLeads() {
  const { data, error } = await supabaseClient.from("leads").select("whatsapp_id, nome, modo_humano");
  const select = document.getElementById("leadSelect");

  if (error) {
    document.getElementById("status").innerText = "Erro ao carregar leads.";
    console.error(error);
    return;
  }

  data.forEach(lead => {
    const option = document.createElement("option");
    option.value = lead.whatsapp_id;
    option.textContent = `${lead.nome} (ID: ${lead.whatsapp_id})`;
    select.appendChild(option);
  });

  document.getElementById("status").innerText = "Leads carregados.";
}

async function atualizarModo(valor) {
  const whatsapp_id = document.getElementById("leadSelect").value;
  if (!lead.whatsapp_id) return alert("Selecione um lead primeiro.");

  const { error } = await supabaseClient
    .from("leads")
    .update({ modo_humano: valor })
    .eq("id", whatsapp_id);

  if (error) {
    alert("Erro ao atualizar o modo.");
    console.error(error);
  } else {
    alert("Modo atualizado com sucesso.");
  }
}

carregarLeads();
