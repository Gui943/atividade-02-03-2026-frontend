import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Tema = 'light' | 'dark' | 'green' | 'purple';

interface TemaContextType {
  tema: Tema;
  nomeTema: string;
  proximoTema: () => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

const temas: Tema[] = ['light', 'dark', 'green', 'purple'];

function formatarNomeTema(tema: Tema) {
  if (tema === 'green') return 'Verde';
  if (tema === 'purple') return 'Roxo';
  return tema === 'dark' ? 'Escuro' : 'Claro';
}

export const TemaProvider = ({ children }: { children: ReactNode }) => {
  const [tema, setTema] = useState<Tema>(() => {
    return (localStorage.getItem('tema') as Tema) || 'light';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('theme-green', 'theme-purple');
    html.dataset.bsTheme = tema === 'dark' ? 'dark' : 'light';
    html.dataset.theme = tema;

    if (tema === 'green') html.classList.add('theme-green');
    if (tema === 'purple') html.classList.add('theme-purple');

    localStorage.setItem('tema', tema);
  }, [tema]);

  const proximoTema = () => {
    const indice = temas.indexOf(tema);
    setTema(temas[(indice + 1) % temas.length]);
  };

  return (
    <TemaContext.Provider value={{ tema, nomeTema: formatarNomeTema(tema), proximoTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema deve ser usado dentro de TemaProvider');
  }
  return context;
};