(function(){
  window.FEMIC_DEMO = true;

  function today(offset){
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  }

  if(!localStorage.getItem('femic_demo_seeded')){
    localStorage.setItem('femic_config', JSON.stringify({ initialized:true, aiProvider:'gemini', aiConcise:true }));
    localStorage.setItem('femic_patients', JSON.stringify([
      { id:'demo-paciente-1', name:'Mariana Costa', pathology:'Lombalgia mecânica', whatsapp:'(16) 99999-0001', archived:false, created_at:new Date().toISOString() },
      { id:'demo-paciente-2', name:'Rafael Almeida', pathology:'Tendinopatia de ombro', whatsapp:'(16) 99999-0002', archived:false, created_at:new Date().toISOString() },
      { id:'demo-paciente-3', name:'Sofia Martins', pathology:'Pós-operatório de joelho', whatsapp:'(16) 99999-0003', archived:false, created_at:new Date().toISOString() }
    ]));
    localStorage.setItem('femic_sessions', JSON.stringify([
      { id:'demo-sessao-1', patient_id:'demo-paciente-1', date:today(-7), pain:6, functionality:5, satisfaction:8, symptoms:['Dor em movimento','Rigidez'], obs:'Relata melhora após os exercícios.', source:'manual', created_at:new Date().toISOString() },
      { id:'demo-sessao-2', patient_id:'demo-paciente-1', date:today(-1), pain:3, functionality:7, satisfaction:9, symptoms:['Dor em movimento'], obs:'Boa evolução funcional.', source:'manual', created_at:new Date().toISOString() },
      { id:'demo-sessao-3', patient_id:'demo-paciente-2', date:today(-2), pain:5, functionality:6, satisfaction:8, symptoms:['Limitação ADM'], obs:'Mantido plano de fortalecimento.', source:'manual', created_at:new Date().toISOString() }
    ]));
    localStorage.setItem('femic_anamneses', JSON.stringify([{ id:'demo-anamnese-1', patient_id:'demo-paciente-1', chief_complaint:'Dor lombar ao permanecer sentada por longos períodos.', history:'Quadro mecânico-postural com início gradual.', diagnosis:'Hipótese compatível com lombalgia mecânica.', limitations:'Limitação para flexão de tronco e permanência sentada.', goals:'Redução da dor e retorno gradual às atividades.', obs:'Dados fictícios para demonstração.', created_at:new Date().toISOString() }]));
    localStorage.setItem('femic_clinical_evolutions', JSON.stringify([{ id:'demo-evolucao-1', patient_id:'demo-paciente-1', date:today(-1), conduct:'Exercícios de mobilidade lombopélvica e fortalecimento de core.', guidance:'Orientada sobre pausas posturais e exercícios domiciliares.', created_at:new Date().toISOString() }]));
    localStorage.setItem('femic_documents', '[]');
    localStorage.setItem('femic_demo_seeded', '1');
  }

  window.addEventListener('DOMContentLoaded', function(){
    var notice = document.createElement('div');
    notice.className = 'femic-demo-notice';
    notice.textContent = 'DEMONSTRAÇÃO: dados fictícios e salvos apenas neste navegador. Integrações externas estão desativadas.';
    document.body.prepend(notice);
  });

  var originalOpen = window.open;
  window.open = function(url){
    if(typeof url === 'string' && /wa\.me|whatsapp\.com/i.test(url)){
      alert('O envio por WhatsApp está desativado nesta demonstração.');
      return null;
    }
    return originalOpen.apply(window, arguments);
  };
})();
