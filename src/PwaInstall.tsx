import { useEffect,useRef,useState } from 'react';
import { DownloadSimple,ShareNetwork,X } from '@phosphor-icons/react';

type InstallPromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:'accepted'|'dismissed';platform:string}>};

export function PwaInstall(){
 const [prompt,setPrompt]=useState<InstallPromptEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const [showHelp,setShowHelp]=useState(false);
 const [ios,setIos]=useState(false);
 const help=useRef<HTMLDialogElement>(null);

 useEffect(()=>{
  const standalone=window.matchMedia('(display-mode: standalone)').matches||('standalone'in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true);
  setInstalled(standalone);
  setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
  const onPrompt=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPromptEvent)};
  const onInstalled=()=>{setInstalled(true);setPrompt(null)};
  window.addEventListener('beforeinstallprompt',onPrompt);
  window.addEventListener('appinstalled',onInstalled);
  if('serviceWorker'in navigator)void navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then((registration)=>{
   const active=registration.active;
   const urls=performance.getEntriesByType('resource').map((entry)=>entry.name).filter((url)=>url.startsWith(location.origin));
   active?.postMessage({type:'CACHE_URLS',urls});
  }).catch(()=>{});
  return()=>{window.removeEventListener('beforeinstallprompt',onPrompt);window.removeEventListener('appinstalled',onInstalled)};
 },[]);

 useEffect(()=>{
  const dialog=help.current;
  if(showHelp&&!dialog?.open)dialog?.showModal();
  if(!showHelp&&dialog?.open)dialog.close();
 },[showHelp]);

 if(installed)return null;
 const install=async()=>{
  if(!prompt){setShowHelp(true);return}
  await prompt.prompt();
  const result=await prompt.userChoice;
  if(result.outcome==='accepted')setPrompt(null);
 };

 return <>
  <button type="button" className="pwa-install-button" onClick={install} aria-label="Instalar Monte & Peça no dispositivo"><DownloadSimple size={19} weight="bold"/><span>Instalar app</span></button>
  <dialog className="pwa-help-dialog" ref={help} onCancel={()=>setShowHelp(false)} onClose={()=>setShowHelp(false)} aria-labelledby="pwa-help-title">
   <div className="pwa-help-card"><button className="icon-button" type="button" aria-label="Fechar instruções de instalação" onClick={()=>setShowHelp(false)}><X size={21}/></button><span className="eyebrow">MONTE & PEÇA NO SEU CELULAR</span><h2 id="pwa-help-title">Leve o app com você.</h2><p>{ios?'No Safari, toque em Compartilhar e escolha “Adicionar à Tela de Início”.':prompt?'Seu navegador vai abrir a confirmação para instalar.':'No menu do navegador, escolha “Instalar app” ou “Adicionar à tela inicial”.'}</p>{ios&&<span className="pwa-share-hint"><ShareNetwork size={18}/> Compartilhar <span>›</span> Adicionar à Tela de Início</span>}</div>
  </dialog>
 </>;
}
