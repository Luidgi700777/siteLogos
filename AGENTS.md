# LOGOS demonstrativo — estado do trabalho

Atualizado em 21/11/2026.

## Objetivo e regras do produto

Replicar no app demonstrativo as telas e os fluxos visuais do app oficial LOGOS, usando como referência os prints enviados pelo usuário e a exploração feita no app oficial. Quando houver vários prints da mesma tela, priorizar o mais recente.

O demonstrativo serve para apresentar e navegar pela interface. Ações finais como salvar, cadastrar, excluir, enviar e exportar devem permanecer sem efeito persistente. Navegação, abrir/fechar painéis, pesquisa visual, seleção e edição temporária de campos podem funcionar para demonstrar o fluxo.

Se algum detalhe de fluxo não estiver claro, perguntar ao usuário antes de inventar comportamento.

## Repositório e branch

- Repositório: `Luidgi700777/siteLogos`
- Branch de trabalho: `correcoes`
- As alterações desta etapa estão sendo gravadas por commits do conector GitHub.
- Em 21/11/2026, o código não está clonado neste diretório de conversa; conferir o branch remoto antes de editar.

## O que já foi implementado

- **Veículos:** listagem, filtros de status/ordenação e limites de vínculos; detalhe com informações do veículo, endereço e abas/itens vinculados; formulário novo/edição. A tela de detalhe e as interações usam o veículo de demonstração LOGOS. Salvar/excluir não persistem.
- **Clipping:** páginas de agrupamento anual, clientes do ano, clippings do cliente, seleção e detalhes; formulário novo/edição; seleção de cliente, busca simulada, captura de imagem e importação; modal de dados encontrados. O formulário não persiste.
- **Mailing:** listagem, busca, filtros, seleção, detalhe e formulário novo/edição; seletor visual de veículo. Interações são locais ao demonstrativo.
- **Templates:** biblioteca, prévias, criação/edição de blocos e fluxo de criar cópia. O nome de rota para cópia é “Edição de cópia”. A ação de salvar template foi alterada para não gravar nem adicionar templates à biblioteca.
- **Navegação:** foram acrescentadas rotas para os módulos/telas ainda em construção, incluindo Releases, Relatórios e alguns cadastros.

Arquivos principais alterados no branch: `index.html`, `script.js`, `style.css`.

## Estado confirmado em 21/11/2026

- Mailing está presente nos três arquivos e tem markup, estilos e interações locais.
- Veículos e Clipping já possuem telas próprias e fluxos demonstrativos no branch.
- As páginas de Releases e Relatórios ainda **não** foram adicionadas ao HTML. Uma tentativa de inserir a estrutura de Releases foi interrompida antes de ser gravada.
- Funcionários, Convites e Configurações ainda precisam ser comparados e completados conforme as telas do app oficial.
- O fluxo deve ser revisado visualmente no navegador depois de concluir as telas. Não declarar paridade total antes dessa revisão.

## Próximas etapas sugeridas

1. Conferir o estado mais recente do branch `correcoes` antes de editar.
2. Finalizar detalhes visuais e interações de Mailing.
3. Implementar Releases: listagem/filtros, detalhe e wizard de cinco etapas (destino, template, conteúdo, e-mail e revisão), mantendo envio/salvamento apenas visuais.
4. Implementar Relatórios: listagem, filtros, criação e seleção de matérias, detalhe, slides, edição e revisão visual.
5. Completar Funcionários, Convites e Configurações.
6. Navegar pelo demonstrativo no navegador e ajustar diferenças em relação aos prints atuais do app oficial.

## Histórico recente

- Foi confirmado que os commits mais recentes de rotas, Mailing e estilos foram gravados em `correcoes`.
- A tentativa posterior de adicionar as telas de Releases foi cancelada pelo usuário ao encerrar o trabalho naquele dia; a conferência do branch confirmou que a marcação `data-view="novo-release"` não existe.
- Nenhum teste automatizado foi executado nesta etapa.
