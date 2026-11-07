import Accordion from '../components/Accordion/Accordion';
import { FAQ_ITEMS } from '../data/faq';

/** Seção de Perguntas Frequentes: passa os itens para o Acordeão via props. */
export default function Faq() {
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-titulo">
      <h2 id="faq-titulo" className="section__title section__title--small">
        Perguntas frequentes
      </h2>
      <p className="section__subtitle">Não encontrou sua dúvida? Fale com a gente pelo e-mail contato@paginaaberta.example.</p>
      <Accordion items={FAQ_ITEMS} defaultOpenId="prazo" />
    </section>
  );
}
