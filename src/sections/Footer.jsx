/** Rodapé da página. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          <strong>Página Aberta</strong> — livraria fictícia criada para fins acadêmicos.
        </p>
        <p>Atividade ReactJS · Engenharia de Software · UCSAL · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
