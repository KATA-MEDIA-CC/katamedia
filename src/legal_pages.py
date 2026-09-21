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
.lk .t{display:block;margin-top:7px}  /* a span, so it needs block to take the gap: 0.036 x 112 + 3 */
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
<title>{title} · Kata</title>
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
  <a class="lk" href="/" aria-label="Kata, zur Startseite">{MARK}<span class="t">{TAG}</span></a>
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

# section 2 follows src/tags.json: no IDs, no tracking; with IDs, the consent text
TG=json.load(open(f'{HERE}/tags.json',encoding='utf-8'))
_P=[]
if TG['linkedin_partner_id']:
    _P.append(dict(name='LinkedIn', us='LinkedIn Corporation', nets=['LinkedIn'],
        tool='das LinkedIn Insight Tag der LinkedIn Ireland Unlimited Company (Dublin, Irland)',
        cookies='https://www.linkedin.com/legal/l/cookie-table',
        policy='https://www.linkedin.com/legal/privacy-policy'))
if TG['meta_pixel_id']:
    _P.append(dict(name='Meta', us='Meta Platforms, Inc.', nets=['Instagram','Facebook'],
        tool='das Meta-Pixel der Meta Platforms Ireland Limited (Dublin, Irland)',
        cookies='https://www.facebook.com/privacy/policies/cookies/',
        policy='https://www.facebook.com/privacy/policy/',
        jca='https://www.facebook.com/legal/controller_addendum'))
_tools=[p['tool'] for p in _P]; _us=[p['us'] for p in _P]; _nets=[n for p in _P for n in p['nets']]
_two=len(_P)==2
def _und(xs): return xs[0] if len(xs)==1 else ', '.join(xs[:-1])+' und '+xs[-1]
def _a(url,text): return f'<a href="{url}" rel="noopener">{text}</a>'
# Art. 26(2): where a provider publishes the joint-controller terms, link them
_jca=''.join(f' Die Vereinbarung über die gemeinsame Verantwortlichkeit mit {p["name"]} ist im '
             +_a(p['jca'],'Controller Addendum')+f' von {p["name"]} veröffentlicht.' for p in _P if p.get('jca'))
if _two:
    _joint=('mit dem jeweiligen Anbieter gemeinsam verantwortlich (Art. 26 DSGVO); Ihre Rechte können Sie '
            'sowohl uns als auch dem jeweiligen Anbieter gegenüber geltend machen. Die weitere Verarbeitung '
            'verantwortet der jeweilige Anbieter allein; er kann die Daten dabei mit einem bestehenden '
            'Nutzerkonto verknüpfen und für eigene Zwecke verwenden.')
    _keep=('Welche Cookies die Anbieter setzen und wie lange sie gespeichert bleiben, zeigen ihre '
           'Cookie-Übersichten ('+', '.join(_a(p['cookies'],p['name']) for p in _P)+'); wie lange sie die '
           'übrigen Daten speichern, beschreiben ihre Datenschutzrichtlinien ('
           +', '.join(_a(p['policy'],p['name']) for p in _P)+').')
elif _P:
    _n=_P[0]['name']
    _joint=(f'mit {_n} gemeinsam verantwortlich (Art. 26 DSGVO); Ihre Rechte können Sie sowohl uns als auch '
            f'{_n} gegenüber geltend machen. {_n} verantwortet die weitere Verarbeitung allein und kann die '
            f'Daten dabei mit einem bestehenden Nutzerkonto verknüpfen und für eigene Zwecke verwenden.')
    _keep=(f'Welche Cookies {_n} setzt und wie lange sie gespeichert bleiben, zeigt die '
           +_a(_P[0]['cookies'],f'Cookie-Übersicht von {_n}')+f'; wie lange {_n} die übrigen Daten '
           'speichert, beschreibt die '+_a(_P[0]['policy'],f'Datenschutzrichtlinie von {_n}')+'.')
if _tools:
    consent=f"""<h2>2. Cookies und Einwilligung</h2>
<p>Ohne Ihre Einwilligung setzt diese Website keine Cookies und bindet keine Analyse- oder Tracking-Dienste
ein. Die Schriften werden von unserem eigenen Server ausgeliefert.</p>
<p>Beim ersten Besuch fragen wir, ob wir Marketing-Cookies verwenden dürfen. Ihre Entscheidung speichern wir
im lokalen Speicher Ihres Browsers, damit wir nicht bei jedem Aufruf erneut fragen; das ist technisch
erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Nach zwölf Monaten fragen wir erneut.</p>
<p>Nur wenn Sie zustimmen, binden wir {' und '.join(_tools)} ein. {'Beide Dienste setzen' if _two else 'Der Dienst setzt'}
Cookies und {'verarbeiten' if _two else 'verarbeitet'} dabei insbesondere Ihre IP-Adresse, Angaben zu Browser und Gerät sowie die
aufgerufenen Seiten. So können wir Menschen, die unsere Website besucht haben, auf {_und(_nets)} unsere
Beiträge und Anzeigen zeigen und deren Reichweite messen. Für die Erhebung und Übermittlung dieser Daten sind
wir {_joint} Dabei können Daten an {' und '.join(_us)} in den USA übermittelt werden.
{'Beide Unternehmen sind' if _two else 'Das Unternehmen ist'} nach dem EU-US Data Privacy Framework zertifiziert, für das ein
Angemessenheitsbeschluss der Europäischen Kommission besteht.{_jca}</p>
<p>Rechtsgrundlage ist Ihre Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Sie können sie
jederzeit mit Wirkung für die Zukunft widerrufen, über den Link „Cookie-Einstellungen“ im Fußbereich der
Website. {_keep}</p>
"""
else:
    consent="""<h2>2. Grundsatz</h2>
<p>Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und bindet keine
Inhalte von Drittanbietern ein, die beim Aufruf Daten an Dritte übertragen. Die Schriften werden von
unserem eigenen Server ausgeliefert.</p>
"""

priv=f'''
<h2>1. Verantwortlicher</h2>
<p><b>{v(L["entity"])}</b><br>{addr}<br>
Vertreten durch die Gesellschafter {v(partners)}<br>
E-Mail: <a href="mailto:{L["email"]}">{L["email"]}</a></p>
<p>Einen Datenschutzbeauftragten haben wir nicht benannt, weil wir dazu gesetzlich nicht verpflichtet sind.</p>

{consent}
<h2>3. Hosting und Server-Logfiles</h2>
<p>Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Website verarbeitet Vercel technisch
notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite sowie
Browsertyp und Betriebssystem (Server-Logfiles). Das ist nötig, um die Website auszuliefern und ihre Sicherheit
und Stabilität zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse
liegt in der sicheren und stabilen Bereitstellung der Website. Die Logfiles werden nur so lange gespeichert, wie
es dafür erforderlich ist, und danach automatisch gelöscht.</p>
<p>Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Vercel ist nach dem EU-US Data
Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der Europäischen Kommission besteht
(Art. 45 DSGVO); ergänzend gelten die Standardvertragsklauseln der Europäischen Kommission (Art. 46 DSGVO).
Die Verbindung zu dieser Website ist per TLS verschlüsselt.</p>

<h2>4. Kontaktformular</h2>
<p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Ihre Angaben aus dem Formular: Name,
E-Mail-Adresse, Unternehmen, Rolle, ob Sie für eine Marke, eine Agentur oder in anderer Funktion anfragen,
Ihr Anliegen, den Zeitrahmen und Ihre Nachricht. Name, E-Mail-Adresse und Nachricht brauchen wir, um Ihre
Anfrage beantworten zu können; alle anderen Angaben sind freiwillig. Wir verwenden die Angaben, um Ihre
Anfrage zu beantworten, und senden Ihnen eine automatische Eingangsbestätigung.</p>
<p>Die Anfrage wird in unserem CRM-System Attio (Attio Ltd., Vereinigtes Königreich) gespeichert; für das
Vereinigte Königreich besteht ein Angemessenheitsbeschluss der Europäischen Kommission. Die Eingangsbestätigung
an Sie und die interne Benachrichtigung versenden wir über Resend (Plus Five Five, Inc., USA); Resend ist nach
dem EU-US Data Privacy Framework zertifiziert. Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag oder auf vorvertragliche
Maßnahmen zielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt darin, Anfragen zu
beantworten. Wir löschen Ihre Angaben, sobald Ihre Anfrage abschließend bearbeitet ist, es sei denn, gesetzliche
Aufbewahrungspflichten stehen dem entgegen, etwa wenn aus der Anfrage ein Auftrag entsteht.</p>

<h2>5. Kontakt per E-Mail</h2>
<p>Wenn Sie uns per E-Mail schreiben, verarbeiten wir die Angaben, die Sie uns mitteilen (in der Regel Name,
E-Mail-Adresse, Unternehmen und Ihre Nachricht), um Ihre Anfrage zu beantworten. Ihre E-Mail wird bei unserem
E-Mail-Anbieter verarbeitet, mit dem ein Vertrag zur Auftragsverarbeitung besteht. Rechtsgrundlage ist Art. 6
Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag oder auf vorvertragliche Maßnahmen zielt, im Übrigen
Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt darin, Anfragen zu beantworten. Wir löschen Ihre
Anfrage, sobald sie abschließend bearbeitet ist, es sei denn, gesetzliche Aufbewahrungspflichten stehen dem
entgegen.</p>

<h2>6. Unsere Seite bei LinkedIn</h2>
<p>Wir unterhalten eine Unternehmensseite bei LinkedIn. Wenn Sie sie besuchen, verarbeitet die LinkedIn Ireland
Unlimited Company (Dublin, Irland) Ihre Daten nach ihren eigenen Bedingungen. Für die Seitenstatistiken, die
LinkedIn uns in zusammengefasster Form bereitstellt, sind wir mit LinkedIn gemeinsam verantwortlich
(Art. 26 DSGVO). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt darin, unsere
Arbeit dort vorzustellen und zu verstehen, wie die Seite genutzt wird. Ihre Rechte können Sie auch direkt
gegenüber LinkedIn geltend machen; Einzelheiten stehen in der
<a href="https://www.linkedin.com/legal/privacy-policy" rel="noopener">Datenschutzrichtlinie von LinkedIn</a>.
Der Link zu dieser Seite im Fußbereich unserer Website ist ein einfacher Link: Daten werden erst übertragen,
wenn Sie ihn anklicken.</p>

<h2>7. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung
der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20 DSGVO). Eine Einwilligung können Sie jederzeit mit
Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Schreiben Sie dazu an
<a href="mailto:{L["email"]}">{L["email"]}</a>. Außerdem haben Sie das Recht, sich bei einer
Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).</p>
<p>Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet bei uns
nicht statt.</p>

<h2>8. Widerspruchsrecht</h2>
<p><b>Soweit wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie dieser
Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen
(Art. 21 Abs. 1 DSGVO). Wir verarbeiten Ihre Daten dann nicht mehr, es sei denn, wir können zwingende
schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen,
oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Der Widerspruch
ist formfrei möglich, zum Beispiel per E-Mail an <a href="mailto:{L["email"]}">{L["email"]}</a>.</b></p>

<p style="margin-top:36px">Stand: {v(L["stand"])}</p>
'''
page('privacy','Datenschutzerklärung','Rechtliches',priv)
