<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TransitPay • NFC + Mascotas + Multipago + Modos</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              sky: '#38BDF8',      // sky-400
              skyDark: '#0EA5E9',  // sky-500
              teal: '#14B8A6',     // teal-500
              green: '#58CC02',    // Duolingo verde acento
            }
          },
          boxShadow: {
            soft: '0 10px 30px -12px rgba(2,132,199,.25)',
            card: '0 8px 20px -12px rgba(15,23,42,.25)'
          },
          keyframes: {
            ripple: { '0%': {transform:'scale(.9)', opacity:.6}, '100%': {transform:'scale(1.2)', opacity:0} },
            confetti: { '0%': { transform: 'translateY(-20px) rotate(0)' }, '100%': { transform: 'translateY(140px) rotate(360deg)', opacity: 0 } }
          },
          animation: {
            ripple: 'ripple 1.4s ease-out infinite',
            confetti: 'confetti 1s ease-out forwards'
          }
        }
      }
    }
  </script>
</head>
<body class="min-h-screen bg-gradient-to-b from-sky-50 to-white">
  <main class="max-w-sm mx-auto p-4 space-y-4">
    <!-- Header usuario -->
    <header class="rounded-2xl bg-brand-skyDark text-white p-4 flex items-center gap-3 shadow-soft">
      <img src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" class="w-10 h-10 rounded-full ring-2 ring-white/40" alt="avatar"/>
      <div class="leading-tight">
        <p class="text-xs opacity-90">¡Hola, María!</p>
        <p class="text-sm font-black">Usuario frecuente</p>
      </div>
      <div class="ml-auto">
        <span class="inline-block w-8 h-8 rounded-full bg-white/20 grid place-items-center">🔔</span>
      </div>
    </header>

    <!-- Saldo disponible -->
    <section class="rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <p class="text-xs text-slate-500 font-bold">Tu saldo disponible</p>
      <div class="flex items-end justify-between mt-1">
        <p id="saldoTxt" class="text-3xl font-black text-slate-800">Bs. 47.50</p>
        <button id="btnRecargar" class="px-3 py-1.5 rounded-xl text-sm font-black bg-sky-50 text-brand-skyDark border border-sky-100 hover:bg-sky-100">Recargar</button>
      </div>
      <p class="text-xs text-emerald-600 font-black mt-1">↑ Bs. 20.00 hoy</p>
    </section>

    <!-- Modalidad de pago (JS puro) -->
    <section class="rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <p class="text-xs text-slate-500 font-bold mb-2">Modalidad de pago</p>
      <div class="grid grid-cols-2 gap-2">
        <button id="btnIndividual" class="py-2 rounded-xl font-black text-sm bg-brand-skyDark text-white">Individual</button>
        <button id="btnGrupal" class="py-2 rounded-xl font-black text-sm bg-slate-100 text-slate-700">Grupal</button>
      </div>
    </section>

    <!-- Sección Individual (adulto/niño) -->
    <section id="modoIndividual" class="rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <div class="flex items-center justify-between mb-2">
        <p class="font-black text-slate-800">Pagarás por:</p>
        <p class="text-right">
          <span id="montoIndividual" class="text-brand-skyDark font-black">Bs. 2.50</span>
          <span class="block text-[11px] text-slate-500">Tarifa estándar</span>
        </p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <!-- Adulto -->
        <div class="p-3 rounded-xl border border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="font-black text-slate-800 leading-none">Adulto</p>
              <p class="text-xs text-slate-500">Bs. <span id="pAdulto">2.50</span></p>
            </div>
            <div class="flex items-center gap-2">
              <button id="menosAdulto" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 grid place-items-center font-black">−</button>
              <span id="qtyAdulto" class="w-6 text-center font-black">1</span>
              <button id="masAdulto" class="w-8 h-8 rounded-lg bg-sky-100 hover:bg-sky-200 text-brand-skyDark grid place-items-center font-black">+</button>
            </div>
          </div>
        </div>
        <!-- Niño -->
        <div class="p-3 rounded-xl border border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="font-black text-slate-800 leading-none">Niño</p>
              <p class="text-xs text-slate-500">Bs. <span id="pNino">1.25</span></p>
            </div>
            <div class="flex items-center gap-2">
              <button id="menosNino" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 grid place-items-center font-black">−</button>
              <span id="qtyNino" class="w-6 text-center font-black">0</span>
              <button id="masNino" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 grid place-items-center font-black">+</button>
            </div>
          </div>
        </div>
      </div>
      <p id="resumenIndividual" class="mt-3 text-sm text-slate-600">1 pasajero (Adulto)</p>
    </section>

    <!-- Sección Grupal (N pasajeros estándar) -->
    <section id="modoGrupal" class="hidden rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <div class="flex items-center justify-between mb-2">
        <p class="font-black text-slate-800">Grupo</p>
        <p class="text-right">
          <span id="montoGrupal" class="text-brand-skyDark font-black">Bs. 2.50</span>
          <span class="block text-[11px] text-slate-500">Tarifa estándar</span>
        </p>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-sm text-slate-600">Pasajeros</div>
        <div class="flex items-center gap-2">
          <button id="menosGrupo" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 grid place-items-center font-black">−</button>
          <span id="qtyGrupo" class="w-8 text-center font-black">1</span>
          <button id="masGrupo" class="w-8 h-8 rounded-lg bg-sky-100 hover:bg-sky-200 text-brand-skyDark grid place-items-center font-black">+</button>
        </div>
      </div>
      <p class="mt-3 text-sm text-slate-600">Pagarás por <span id="resumenGrupo" class="font-black">1</span> pasajero(s)</p>
    </section>

    <!-- Botón circular TOCAR -->
    <section class="rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <div class="relative grid place-items-center py-3">
        <div class="absolute w-44 h-44 rounded-full border-4 border-sky-100 animate-ripple"></div>
        <button id="btnTocar" class="w-40 h-40 rounded-full bg-gradient-to-b from-sky-200 to-brand-skyDark text-white grid place-items-center shadow-soft active:scale-95 transition">
          <div class="text-center leading-tight">
            <div class="text-3xl">📶</div>
            <div class="text-lg font-black tracking-wider">TOCAR</div>
            <div class="text-[11px]">para pagar</div>
          </div>
        </button>
      </div>
      <div class="flex items-center justify-between text-sm text-slate-600 mt-3">
        <span id="leyendaPago">Listo para pagar</span>
        <span class="text-emerald-600">✔</span>
      </div>
    </section>

    <!-- Código corto -->
    <section class="rounded-2xl bg-white p-4 shadow-card border border-slate-100">
      <button id="btnCodigo" class="w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 border border-slate-200 transition">
        Mostrar código corto (20s)
      </button>
      <div id="codigoBox" class="hidden mt-2 p-4 rounded-xl bg-white border border-sky-100 text-center">
        <p class="text-sm text-slate-500 mb-1">Tu código de un solo uso</p>
        <p class="text-3xl font-black tracking-widest text-brand-skyDark" id="codigoValor">— — — —</p>
        <p class="text-xs text-slate-500 mt-2">Expira en <span id="codigoTimer" class="font-black text-slate-700">20</span>s</p>
      </div>
    </section>
  </main>

  <!-- Modal de resultado -->
  <div id="modal" class="hidden fixed inset-0 bg-black/50 grid place-items-center p-4">
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-sky-100 relative overflow-hidden">
      <div id="confetti" class="pointer-events-none absolute inset-x-0 top-0 h-32"></div>
      <div class="w-20 h-20 rounded-2xl mx-auto grid place-items-center mb-4 text-white bg-gradient-to-br from-brand-sky to-brand-skyDark">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/></svg>
      </div>
      <h3 class="text-2xl font-black text-slate-800">¡Pago exitoso!</h3>
      <p id="detallePago" class="text-slate-600 mt-1"></p>
      <button id="cerrarModal" class="mt-6 w-full bg-brand-skyDark hover:bg-brand-sky text-white font-black py-3 rounded-2xl transition">Continuar</button>
    </div>
  </div>

  <script>
    // ---- Lógica JS pura ----
    let saldo = 47.50;
    const tarifas = { adulto: 2.50, nino: 1.25, estandar: 2.50 };
    const qty = { adulto: 1, nino: 0, grupo: 1 };
    let modo = 'individual'; // 'individual' | 'grupal'

    const $$ = (id) => document.getElementById(id);
    const Bs = (n) => `Bs. ${n.toFixed(2)}`;

    function actualizarUI() {
      // Totales y textos
      const totalIndividual = qty.adulto * tarifas.adulto + qty.nino * tarifas.nino;
      const totalGrupal = qty.grupo * tarifas.estandar;
      $$('#montoIndividual').textContent = Bs(totalIndividual || 0);
      $$('#montoGrupal').textContent = Bs(totalGrupal || 0);
      $$('#resumenIndividual').textContent = `${qty.adulto} pasajero(s) adulto + ${qty.nino} niño(s)`;
      $$('#resumenGrupo').textContent = qty.grupo;
    }

    // Cambiar modo
    $$('#btnIndividual').onclick = () => {
      modo = 'individual';
      $$('#btnIndividual').className = 'py-2 rounded-xl font-black text-sm bg-brand-skyDark text-white';
      $$('#btnGrupal').className = 'py-2 rounded-xl font-black text-sm bg-slate-100 text-slate-700';
      $$('#modoIndividual').classList.remove('hidden');
      $$('#modoGrupal').classList.add('hidden');
      actualizarUI();
    };
    $$('#btnGrupal').onclick = () => {
      modo = 'grupal';
      $$('#btnGrupal').className = 'py-2 rounded-xl font-black text-sm bg-brand-skyDark text-white';
      $$('#btnIndividual').className = 'py-2 rounded-xl font-black text-sm bg-slate-100 text-slate-700';
      $$('#modoGrupal').classList.remove('hidden');
      $$('#modoIndividual').classList.add('hidden');
      actualizarUI();
    };

    // Controles individual
    $$('#masAdulto').onclick = () => { qty.adulto++; $$('#qtyAdulto').textContent = qty.adulto; actualizarUI(); };
    $$('#menosAdulto').onclick = () => { qty.adulto = Math.max(0, qty.adulto - 1); $$('#qtyAdulto').textContent = qty.adulto; actualizarUI(); };
    $$('#masNino').onclick = () => { qty.nino++; $$('#qtyNino').textContent = qty.nino; actualizarUI(); };
    $$('#menosNino').onclick = () => { qty.nino = Math.max(0, qty.nino - 1); $$('#qtyNino').textContent = qty.nino; actualizarUI(); };

    // Controles grupal
    $$('#masGrupo').onclick = () => { qty.grupo++; $$('#qtyGrupo').textContent = qty.grupo; actualizarUI(); };
    $$('#menosGrupo').onclick = () => { qty.grupo = Math.max(1, qty.grupo - 1); $$('#qtyGrupo').textContent = qty.grupo; actualizarUI(); };

    // Botón TOCAR
    function confeti(){
      const wrap = $$('#confetti');
      wrap.innerHTML = '';
      const colors = ['#38BDF8','#0EA5E9','#14B8A6','#58CC02'];
      for(let i=0;i<18;i++){
        const s = document.createElement('div');
        s.className = 'absolute top-0';
        s.style.left = Math.random()*100 + '%';
        s.style.width = '8px'; s.style.height = '12px';
        s.style.background = colors[Math.floor(Math.random()*colors.length)];
        s.style.transform = `rotate(${Math.random()*360}deg)`;
        s.style.animation = `confetti ${0.9 + Math.random()*0.5}s ease-out ${Math.random()*0.3}s forwards`;
        s.style.borderRadius = '2px';
        wrap.appendChild(s);
      }
    }

    $$('#btnTocar').onclick = () => {
      const total = (modo === 'individual')
        ? qty.adulto * tarifas.adulto + qty.nino * tarifas.nino
        : qty.grupo * tarifas.estandar;
      if (total <= 0) return;
      $$('#leyendaPago').textContent = 'Procesando…';
      setTimeout(() => {
        saldo = Math.max(0, saldo - total);
        $$('#saldoTxt').textContent = Bs(saldo);
        const detalle = (modo === 'individual')
          ? `${qty.adulto} adulto(s) × ${Bs(tarifas.adulto)}${qty.nino? ' + ' + qty.nino + ' niño(s) × ' + Bs(tarifas.nino): ''}`
          : `${qty.grupo} pasajero(s) × ${Bs(tarifas.estandar)}`;
        $$('#detallePago').innerHTML = `<span class="font-black">${Bs(total)}</span> — ${detalle}`;
        confeti();
        $$('#modal').classList.remove('hidden');
        $$('#leyendaPago').textContent = 'Listo para pagar';
        // Reset individual por UX (1 adulto, 0 niño)
        qty.adulto = 1; qty.nino = 0; $$('#qtyAdulto').textContent = 1; $$('#qtyNino').textContent = 0; actualizarUI();
      }, 600);
    };
    $$('#cerrarModal').onclick = () => $$('#modal').classList.add('hidden');

    // Código corto (JS)
    const randCode = () => Array.from({length:4}, () => Math.floor(Math.random()*10)).join('');
    let tmr;
    $$('#btnCodigo').onclick = () => {
      clearInterval(tmr);
      $$('#codigoBox').classList.remove('hidden');
      $$('#codigoValor').textContent = randCode();
      let t = 20; $$('#codigoTimer').textContent = t;
      tmr = setInterval(() => { t--; $$('#codigoTimer').textContent = t; if (t<=0){ clearInterval(tmr); $$('#codigoBox').classList.add('hidden'); } }, 1000);
    };

    // Init
    actualizarUI();
  </script>
</body>
</html>
