Especificações para a IA entender qual as definições padrões do projeto.

Regras de design:

- Tente seguir um design minimalista e com cores pouco vibrantes e com cores mais escuras, utilizando componentes do shadcn.

Regras de Syntax:

- Todo useState() deve conter a tipagem definida e deve ser em camelcase e utilizar o \_ para separar espaços, segue exemplo: const [is_loading, set_loading] = useState<boolean>(false)
- Quando for criar um função dentro de um componente ou tela, criar com nome handle na frente e utilizar function e não array function. Ex: async function handleSubmit() {}
- Quando criar variáveis fora de funções utilizar Uppercase: const MAX_WIDTH = 100

Regras de organização de pastas:

- Todo arquivo de masks deve ficar dentro de 'src/application/lib/masks' e seguir o exemplo dos outros já criados
- Todo arquivo de formatter deve ficar dentro de 'src/application/lib/formatters' e seguir o exemplo dos outros já criados
- Criar contexts dentro de 'src/application/contexts' e seguir padrão dos outros e adicionar o provider do context criado dentro de index.tsx em contexts para exportar.
- Criar hooks dentro de 'src/application/hooks' e seguir o mesmo padrão dos outros.
- Criar componentes dentro de 'src/presentation/components' e seguir mesmo padrão de organização de pastas e código.
