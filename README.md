# Documentatie - Poienariu Vlad
* Website: https://vladpoienariu.netlify.app/
* Github: https://github.com/VladQweqw?tab=repositories
* LinkedIn: https://www.linkedin.com/in/vlad-poienariu-0a79a721a/

---

## Link-uri proiect
* API: https://github.com/VladQweqw/artist-api
* React: https://github.com/VladQweqw/artist-portofolio
* Routele Postman sunt in fisierul artist.json din folderul atasat
---

### Frontend
Pentru Front-End urmati pasii urmatori:
1. npm install
2. npm run dev
3. asigurati-va ca port: 5173 este liber
4. ar trebuie localhost:5173 sa apara site-ul

Pentru partea de Front-End am folosit React + Vite + TypeScript. Mie personal imi place sa folosesc *Vite.js* in proiectele mele deoarece este foarte rapid, produce un build de dimensiuni mici si rapid. Overall mi se pare o imbunatatire fara de React Vanilla.
TypeScript dupa parerea mea ar trebui sa fie folosit in orice website modern, deoarece previne bug-urile si ofera o experienta de developement foarte usor de inteles si previzibila.

---
### Backend
Pentru Back-End urmati pasii urmatori:
1. npm i
2. npm run start:dev
3. asigurati-va ca port: 3333 este liber ( se poate modifica din main.ts )
4. dupa acesti pasi, ar trebuie pe localhost:3333 sa ruleze API-ul
5. Conectarea la o baza de date, ( Eu am folosit mongoDB)

Partea de Back-end este sigurata datorita integrari JWT, un JWT este generat la fiecare logare si este folosit pe tot parcursul folosinti site-ului de catre user. Pentru backend am mai folosit si MongoDB + mongoose.

---
### Explicatia aplicatiei

Aplicatia create are scopul de a servi ca o platforma in care fotografii, artisti de toate felurile sau chiar artisti digitali sa isi poate expune creatiile cu usurinta. Aplicatia beneficiaza de un design modern, usor de inteles si o paleta de culori calda. 
Rutele existente sunt:
/ -> Home

/login -> pagina de login

/signup -> pagina de sign up

/account -> pagina user-ului conectat

/contact -> pagina de contanct 

/pieces/:id -> pagina dynamica a unei creatii

/users/:id -> pagina dinamica a unui user

/* -> pagina 404

Pe pagina individuala a unei creatii regasim atat numele creatiei, imaginea, cat si detalii despre author
Pe pagina individuala a unui user, regasit toate detalile user-ului, dar si toate creatile sale.

Daca user-ul nu este conectat, in navbar, butonul cu textul account v-a fi inlocuit cu unul de sign up


---
### Folosirea aplicatiei

In momentul in care aplicatia s-a deschis, ar fi indicat sa ne creem un cont urmand /signup sau apasand pe butonul *Sign Up* din navbar, Dupa accea ne alegem un Username, un email real, deorece v-a fi validat, si o parola fara restrictii. Dupa apasam pe butoul de *Sign up*. Daca avem deja cont avem optiunea de a navigate catre /login pentru a ne loga. 

Dupa apasare vom fi redirectionati catre /login unde ne logam cu email si parola. Daca credentials-urile sunt corecte vom fi redirectionati pe pagina principala si ne v-a aparea butonul acccount.

Daca scrollam gasim toate postarile de la toti useri de pana acum, daca apasam pe o imagine vom fi redirectionati catre /piece/id unde vom afla mai multe detalii despre imagine, cat si user-ul,

La fiecare imagine in coltul din stanga jos este prezentata imaginea user-ului pe care putem da si ne v-a conduce la user/id, care este pagina dedicata user-ului. unde putem vedea si toate postarile acestuia.

Pe pagina account avem optiunea de a ne modifica poza de profil dar si numele, sa vedem toate postarile noastrea dar si sa adaugam postari prin formular de jos.

Urmarea oricarei rute care nu este valida ne v-a redirectiona la pagina principala /

---
### Multumesc pentru oportunitate
Timpul total alocat acestui proiect a fost limitat din cauze diversilor factori, din pacate se pot regasii multe edge case-uri, am incercat sa ofer un design UI&UX cat mai placut si o calitate cat mai inalta, Multumesc!


