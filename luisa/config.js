/**
 * Configuração da página de links — edite aqui sem mexer no HTML.
 *
 * photo:     caminho da foto relativo a /luisa/. Coloque o arquivo em
 *            public/luisa/ (ex.: public/luisa/foto.jpg) e use 'foto.jpg'.
 *            Deixe '' para exibir o placeholder com as iniciais.
 * showBadge: exibe o selo ao lado do nome. É apenas um selo visual do
 *            próprio site — não representa verificação de nenhuma plataforma.
 * isOnline:  true → "Online agora" (bolinha verde pulsando);
 *            false → "Volto em breve". Valor fixo, sem integração em tempo real.
 */
export const profile = {
  name: 'Luisa Guimarães',
  initials: 'LG',
  photo: '',
  photoAlt: 'Foto de perfil de Luisa Guimarães',
  showBadge: true,
  badgeLabel: 'Página oficial',
  isOnline: true,
  onlineText: 'Online agora',
  offlineText: 'Volto em breve',
  headline: 'Meu lado exclusivo está aqui\u00A0💗', // \u00A0 mantém o emoji junto da palavra
  subheadline: 'Escolha por onde você quer se aproximar.',
};

/**
 * Botões, na ordem de exibição.
 * variant: 'primary' (destaque), 'soft' (rosa suave) ou 'outline' (branco com borda).
 * icon:    'crown', 'lock' ou 'telegram'.
 */
export const links = [
  {
    title: 'Exclusivo',
    subtitle: 'Conheça meu conteúdo exclusivo',
    url: 'https://exclusivoluisa.netlify.app/',
    icon: 'crown',
    variant: 'primary',
  },
  {
    title: 'Segredinho',
    subtitle: 'Um segredinho só entre nós',
    url: 'https://telegram.me/LuisaGuimaraesOfc_bot',
    icon: 'lock',
    variant: 'soft',
  },
  {
    title: 'Prévias',
    subtitle: 'Veja minhas prévias',
    url: 'https://t.me/luisaguimaraaesofc',
    icon: 'telegram',
    variant: 'outline',
  },
];
