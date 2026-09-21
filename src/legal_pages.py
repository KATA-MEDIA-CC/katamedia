# executed inside build.py — writes site/imprint/ and site/privacy/
L=LEGAL
MARK=open(f'{ASSETS}/mark.svg',encoding='utf-8').read().strip()
TAG=open(f'{ASSETS}/tagline.svg',encoding='utf-8').read().strip()
def v(x):
    """a known value, or a visible gap the gate will catch"""
    x=html.escape(str(x))
    return re.sub(r'\[\[(.+?)\]\]',r'<mark class="gap">[[\1]]</mark>',x)
def present(x): return str(x).strip().lower()!='none'

CSS='''
:root{--ink:#0B0B0F;--graphite:#6B6F76;--glacier-deep:#2E5A7D;--hair:#E2E7EC;
  --serif:"Newsreader",Georgia,serif;--sans:"Hanken Grotesk","Helvetica Neue",Arial,sans-serif;
  --gut:clamp(20px,5vw,64px)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#fff;color:var(--ink);font-family:var(--sans);font-size:15.5px;line-height:1.7;
  -webkit-font-smoothing:antialiased}
.bar{max-width:1380px;margin-inline:auto;padding:22px var(--gut);display:flex;
  align-items:center;justify-content:space-between;gap:24px}
.lk{display:block;width:112px;color:var(--ink)} .lk svg{display:block;width:100%;height:auto;fill:currentColor}
.lk .t{margin-top:7px}
.back{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--graphite);text-decoration:none}
.back:hover{color:var(--ink)}
main{max-width:760px;margin-inline:auto;padding:clamp(48px,8vw,96px) var(--gut) clamp(64px,9vw,120px)}
.kicker{display:flex;align-items:center;gap:14px;margin:0 0 20px;font-weight:500;font-size:13px;
  letter-spacing:.24em;text-transform:uppercase}
.kicker::before{content:"";width:26px;height:1px;background:var(--glacier-deep)}
h1{font-family:var(--serif);font-weight:300;font-size:clamp(2.4rem,6vw,3.8rem);line-height:1.02;
  letter-spacing:-.018em;margin:0 0 clamp(36px,5vw,56px)}
h2{font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:.2em;text-transform:uppercase;
  margin:40px 0 10px;color:var(--ink)}
p{margin:0 0 12px;max-width:62ch;color:var(--graphite)} p b{color:var(--ink);font-weight:500}
a{color:var(--glacier-deep)}
mark.gap{background:#FFF1C2;color:#6B4E00;padding:1px 4px;border-radius:2px;font-weight:500}
footer{border-top:1px solid var(--hair)}
footer .bar{flex-wrap:wrap;font-size:12px;color:var(--graphite)}
footer a{color:var(--graphite);text-decoration:none;margin-left:22px} footer a:hover{color:var(--ink)}
footer nav a:first-child{margin-left:0}
:focus-visible{outline:1px solid var(--glacier-deep);outline-offset:3px}
'''
def page(slug,title,kicker,content):
    doc=f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} — Kata</title>
<meta name="description" content="{title} der {html.escape(L["entity"])}.">
<link rel="canonical" href="{SITE}/{slug}">
<link rel="preload" href="/fonts/{SANS_LATIN}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<style>{CSS}</style>
</head>
<body>
<header><div class="bar">
  <a class="lk" href="/" aria-label="Kata — zur Startseite">{MARK}<span class="t">{TAG}</span></a>
  <a class="back" href="/">← Zur Startseite</a>
</div></header>
<main>
<p class="kicker">{kicker}</p>
<h1>{title}</h1>
{content}
</main>
<footer><div class="bar">
  <span>© 2026 {html.escape(L["entity"])}</span>
  <nav><a href="/">Startseite</a><a href="/imprint">Impressum</a><a href="/privacy">Datenschutz</a></nav>
</div></footer>
</body>
</html>
'''
    os.makedirs(f'{DIST}/{slug}',exist_ok=True)
    open(f'{DIST}/{slug}/index.html','w',encoding='utf-8').write(doc)

partners=', '.join(L['partners'])
addr=f'{v(L["street"])}<br>{v(L["city"])}'

imp=f'''
<h2>Angaben gemäß § 5 DDG</h2>
<p><b>{v(L["entity"])}</b><br>{addr}</p>
<h2>Vertreten durch die Gesellschafter</h2>
<p>{v(partners)}</p>
<h2>Kontakt</h2>
<p>Telefon: {v(L["phone"])}<br>E-Mail: <a href="mailto:{L["email"]}">{L["email"]}</a></p>
'''
if present(L['register']):
    imp+=f'''<h2>Registereintrag</h2>
<p>Eingetragen im Gesellschaftsregister.<br>{v(L["register"])}</p>
'''
if present(L['vat']):
    imp+=f'''<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>{v(L["vat"])}</p>
'''
imp+=f'''<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>{v(L["responsible"])}<br>Anschrift wie oben</p>
'''
page('imprint','Impressum','Rechtliches',imp)

priv=f'''
<h2>1. Verantwortlicher</h2>
<p><b>{v(L["entity"])}</b><br>{addr}<br>
Vertreten durch die Gesellschafter {v(partners)}<br>
E-Mail: <a href="mailto:{L["email"]}">{L["email"]}</a></p>

<h2>2. Grundsatz</h2>
<p>Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und bindet keine
Inhalte von Drittanbietern ein, die beim Aufruf Daten an Dritte übertragen. Die Schriften werden von
unserem eigenen Server ausgeliefert.</p>

<h2>3. Hosting und Server-Logfiles</h2>
<p>Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Website verarbeitet der Hoster
technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene
Seite sowie Browsertyp und Betriebssystem (Server-Logfiles). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
DSGVO; unser berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung der Website. Mit
Vercel besteht ein Vertrag zur Auftragsverarbeitung; die Übermittlung in die USA stützt sich auf die
Standardvertragsklauseln der Europäischen Kommission.</p>

<h2>4. Kontaktformular</h2>
<p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die Angaben aus dem Formular — Name,
E-Mail-Adresse, Unternehmen, Rolle, ob Sie für eine Marke oder eine Agentur anfragen, Ihr Anliegen, den
Zeitrahmen und Ihre Nachricht —, um Ihre Anfrage zu beantworten. Die Anfrage wird in unserem CRM-System
Attio (Attio Ltd., Vereinigtes Königreich) gespeichert; die Eingangsbestätigung an Sie und die interne
Benachrichtigung versenden wir über Resend (Resend Inc., USA). Mit beiden Anbietern bestehen Verträge
zur Auftragsverarbeitung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen
Vertrag zielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Wir löschen Ihre Anfrage, sobald sie abschließend
bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>

<h2>5. Kontakt per E-Mail</h2>
<p>Wenn Sie uns per E-Mail schreiben, verarbeiten wir die Angaben, die Sie uns mitteilen — in der Regel
Name, E-Mail-Adresse, Unternehmen und Ihre Nachricht —, um Ihre Anfrage zu beantworten. Rechtsgrundlage
ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag zielt, im Übrigen Art. 6 Abs. 1
lit. f DSGVO. Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist, sofern keine gesetzlichen
Aufbewahrungspflichten entgegenstehen.</p>

<h2>6. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die
Verarbeitung (Art. 21 DSGVO). Schreiben Sie dazu an <a href="mailto:{L["email"]}">{L["email"]}</a>.
Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).</p>

<p style="margin-top:36px">Stand: {v(L["stand"])}</p>
'''
page('privacy','Datenschutzerklärung','Rechtliches',priv)
