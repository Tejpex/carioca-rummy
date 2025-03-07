import styled from "styled-components"

export const RulesInfo = () => {
  return (
    <div>
      <h2>Regler</h2>
      <h3>Spelets mål</h3>
      <p>Målet med Carioca Rummy är att ha så lite poäng som möjligt vid spelets slut.</p>
      <h4>Kontrakt</h4>
      <p>Carioca Rummy spelas i åtta omgångar eller s.k. kontrakt. I varje kontrakt gäller det att så fort som möjligt
      spela ut alla sina kort.</p>
      <p>Varje kontrakt har sitt specifika mål som ska
      uppnås innan resterande kort får spelas ut.</p>
      <ul>
        <li>Kontrakt 1: 2 triss</li>
        <li>Kontrakt 2: 1 triss, 1 stege</li>
        <li>Kontrakt 3: 2 stegar</li>
        <li>Kontrakt 4: 3 triss</li>
        <li>Kontrakt 5: 2 triss, 1 stege</li>
        <li>Kontrakt 6: 1 triss, 2 stegar</li>
        <li>Kontrakt 7: 4 triss</li>
        <li>Kontrakt 8: 3 stegar</li>
      </ul>
      <p>När en spelare uppnått kontraktets mål kan
      denne spelare fortsätta spela ut kort genom att fylla på de triss och
      stegar som ligger på bordet (både egna och motståndarens). När en spelare
      spelat ut alla sina kort får motståndaren poäng för de kort som hen har
      kvar på handen.</p>
      <h3>Så här spelar du</h3>
      <h4>1. Plocka ett kort</h4>
      <p>Varje spelares tur börjar med att spelaren plockar upp ett kort. Spelaren får välja fritt
      mellan att plocka upp det senast slängda kortet eller ett nytt dolt kort från kortleken.</p>
      <h4>2. Spela kort (om du vill/kan)</h4>
      <h5>Godkända kombinationer</h5>
      <p>Varje omgång (kontrakt) har ett specifikt mål som ska uppnås. Målet består
      av triss och/eller stegar. En triss består av tre eller fler kort med
      samma värde, till exempel tre kungar. En stege består av fyra eller fler
      kort i följd och av samma färg, till exempel 6, 7, 8 och 9 i hjärter.
      Stegar får lov att gå "börja om" genom att kung, som är det högsta kortet,
      följs av ett ess, som är det lägsta kortet. Dam - kung - ess - två är
      alltså en godkänd stege, om alla kort har samma färg.</p>
      <h5>Spela ut kort</h5>
      <p>Efter att en spelare plockat upp ett kort har denne möjlighet att spela ut kort.
      Det går bara att spela de kombinationer som finns i pågående kontrakt.
      Efter att kontraktets mål är uppnått, kan spelaren fortsätta spela ut
      enstaka kort genom att fylla på de triss och/eller stegar som finns på
      bordet. Det är tillåtet att fylla på triss/stegar på både den egna sidan
      och på motståndarens sida. Man får spela ut så många kort man vill, så
      länge man följer kontraktets regler för vilka kort som får spelas ut. Man
      kan också välja att avstå från att spela ut kort, även om man har godkända
      kombinationer på handen. Korten som spelas ut hamnar med framsidan upp på
      bordet framför respektive spelare.</p>
      <h4>3. Släng ett kort</h4>
      <p>Varje spelare avslutar sin tur genom att slänga ett valfritt kort från handen. Kortet
      hamnar med framsidan upp mitt på bordet.</p>
      <h3>Poängberäkning</h3>
      <p>När någon spelare inte längre har några kort på handen, avslutas omgången och motståndaren får poäng för de kort som hen har kvar på handen. Poängen beräknas utifrån kortens värde. Kung ger 13 poäng, dam 12 poäng, osv. ner till ess som ger ett poäng. Kom ihåg att målet med spelet är att få så lite poäng som möjligt!</p>
      <h3>Övrigt</h3>
      <p>I spelet finns två kortlekar. Varje omgång börjar med att alla kort blandas och varje spelare tilldelas tolv kort.</p>
    </div>
  )
}
