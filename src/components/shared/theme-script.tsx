// Runs before paint to set the theme class with no flash of the wrong mode.
const SCRIPT = `(function(){try{var t=localStorage.getItem('armatis-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
