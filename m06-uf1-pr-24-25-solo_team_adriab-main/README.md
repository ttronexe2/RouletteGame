# **M06-UF1-PR01_INITIAL_CODE**
Repositori del codi inicial de la pràctica M06-UF1

# **Instruccions**
- Si el professor ho considera convenient serà necessari superar una entrevista o presentació de la pràctica mostrant el correcte funcionament de l'aplicació per poder obtenir una nota.
- L'entrega es realitzarà utilitzant 2 plataformes: Sallenet i Github. És obligatoria l'entrega dins del termini a les dues per poder obtenir una nota.


# **Enunciat**
## **CASINO ROULETTE**
El casino online LaSalleBet ens demana que creem una web per poder apostar a la ruleta.

1. *(1p)* ***(Feature1)*** Quan es carregui la pàgina es veurà a dalt a la dreta un número dins d'un tag "**p**" amb **id="chips"**. Aquest serà el nombre de fitxes que té l'usuari que estarà guardat a les cookies amb nom **"myChips"**. Si no hi ha res a les cookies, serà 0.

### **Accions:**
#### **Comprar fitxes *(Feature2)*:**
2. *(1p)* Hi haurà un botó de "+" amb **id="add-chips-btn"** i amb un input HTML amb **id="add-chips"**. Quan es cliqui al botó cal sumar el número introduit al número de fitxes actuals, sobreescriurà la variable de les cookies amb el número de fitxes, i es netejarà l'input amb id="add-chips".
    - No s'ha de poder posar un nombre negatiu.

#### **Apostar *(Feature3)*:**
3. *(1p)* Indicar en un input HTML amb **id="bet"** quantes fitxes vol apostar.
    - No es pot apostar més fitxes de les que té l'usuari. Quan es cliqui al botó d'apostar (id="bet-btn"), ha de sortir un missatge d'error en un alert i borrar el valor de l'input HTML.
    - No s'ha de poder posar un nombre negatiu.

4. Indicar en un desplegable HTML amb **id="bet-type"** quin tipus de número vol apostar ("parell" o "imparell", les opcions estaran predefinides en el HTML i cal que es diguin així).

5. *(1p)* Indicar en un input HTML amb **id="bet-number"** a quin número aposta.
    - Cal comprobar si realment el número introduit per l'usuari és del tipus definit anteriorment.
    - L'usuari pot deixar l'input en blanc i voldrà dir que aposta a un tipus, no a un número.????????
    - A part cal comprobar que el número sigui enter i entre 0 i 36 (inclosos).

6. *(1p)* Clicar a un botó amb **id="bet-btn"** per fer rodar la ruleta. Mostrant només un número aleatori per pantalla a una etiqueta "p" amb **id="result"**.

7. *(1p)* Resolució:
    - Si l'usuari havia apostat a un tipus i l'encerta, recupera el que ha apostat i guanya la meitat del nombre de fitxes apostades.
    - Si l'usuari havia apostat a un número i l'encerta, recupera el que ha apostat i guanya el doble del nombre de fitxes apostades.
    - Si l'usuari no encerta, pert el que ha apostat.

    - **Atenció!:** En tot cas sempre se li ha de mostrar un missatge a l'usuari informant del que ha passat. S'actualitzarà l'element amb id="chips". I es guardarà a les cookies el nombre de fitxes que li queden.

#### **Testing:**
8. *(2p)* Hi haurà un desplegable amb **id="test-mode"** que servirà per testejar.
    - Si té el valor **"test-win"** l'usuari sempre guanyarà (si ha apostat només al tipus, guanyarà al tipus. Si ha apostat també al número, guanyarà al número).
    - Si té el valor **"test-loose"**, l'usuari sempre perdrà.
    - Si té el valor **"no-test"**, es farà la partida normalment amb el número aleatori.

#### **Instruccions generals per tots els apartats anteriors:**
- Sempre que s'hagi de mostrar un missatge d'error a l'usuari, es farà a través d'un "alert" i sempre començarà pel text "ERROR".
- Quan l'usuari guanyi s'ha de mostrar un missatge en un "alert" i començarà pel text "VICTORIA".
- Quan l'usuari perdi s'ha de mostrar un missatge en un "alert" i començarà pel text "HAS PERDUT".

#### **Altres:**
9. *-0,25p* Per cada error de qualitat de codi (HTMLHint i ESLint).

10. *(1p)* *Estils: Cal que hi hagi suficient codi CSS per a que es pugui valorar.

11. *(1p)* *Seguiment fent servir GitHub amb branques una per cada feature (3 branques) i un commit per classe (amb suficient feina feta), els noms de les branques i dels commits han de seguir la convenció i tenir sentit.

    - *Les dues anteriors puntuacions, només s'obtindran completes si tots els tests e2e funcionen correctament, i no hi ha més de 4 errors de qualitat de codi.
    - *S'obtindrà la meitat de les dues anteriors puntuacions si falla algun dels tests e2e o hi ha més de 4 errors de qualitat de codi, i s'aprova la pràctica amb la resta de les puntuacions
