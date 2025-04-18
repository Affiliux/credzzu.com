Especificações para a IA entender qual as definições padrões do projeto.

Regras de instalação:

- Instale novas dependências utilizando o yarn
- Para dependências de type instale com -D

Regras de design:

- Tente seguir um design minimalista e com cores pouco vibrantes e com cores mais escuras, utilizando componentes do shadcn.

Regras de Syntax:

- Todo useState() deve conter a tipagem definida e deve ser em camelcase e utilizar o \_ para separar espaços, segue exemplo: const [is_loading, set_loading] = useState<boolean>(false)
- Quando for criar um função dentro de um componente ou tela, criar com nome handle na frente e utilizar function e não array function. Ex: async function handleSubmit() {}
- Quando criar variáveis fora de funções utilizar Uppercase: const MAX_WIDTH = 100

Regras de organização de pastas e imports:

- Quando for utilizar algum hook do React ou type, sempre importe ele, não utilize dessa forma ex: React.useState() ou React.useEffect()
- Sempre que importar uma interface ou type coloque dessa forma ex: import type {} from '' ou import { type ExemploType } from ''
- Todo arquivo de masks deve ficar dentro de 'src/application/lib/masks' e seguir o exemplo dos outros já criados
- Todo arquivo de formatter deve ficar dentro de 'src/application/lib/formatters' e seguir o exemplo dos outros já criados! Ex de formatters: formatar dinheiro, data, mas nunca formatter de formulários, para isso crie dentro de 'src/application/lib/masks'
- Todo arquivo de validação/validators para validar formulários e etc deve ficar dentro de 'src/application/lib/validators' e seguir o exemplo dos outros já criados
- Criar contexts dentro de 'src/application/contexts' e seguir padrão dos outros e adicionar o provider do context criado dentro de index.tsx em contexts para exportar.
- Criar hooks dentro de 'src/application/hooks' e seguir o mesmo padrão dos outros.
- Criar componentes dentro de 'src/presentation/components' e seguir mesmo padrão de organização de pastas e código.
- Quando for criar algum service de api, crie dentro de 'src/infrastructure/http/services'
- Dentro de um componente/pagina a organização deve ser dessa forma ex: // hooks, // contexts, // states, // handlers, // effects
