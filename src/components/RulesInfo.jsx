import styled from "styled-components"

export const RulesInfo = () => {
  return (
    <Box>
      <RulesBox>
        <Title>Regler</Title>
        <ParagraphTitle>Spelets mål</ParagraphTitle>
        <Text>
          Målet med Carioca Rummy är att ha så lite poäng som möjligt vid
          spelets slut.
        </Text>
        <SmallTitle>Kontrakt</SmallTitle>
        <Text>
          Carioca Rummy spelas i åtta omgångar eller s.k. kontrakt. I varje
          kontrakt gäller det att så fort som möjligt spela ut alla sina kort.
        </Text>
        <Text>
          Varje kontrakt har sitt specifika mål som ska uppnås innan resterande
          kort får spelas ut.
        </Text>
        <List>
          <ListItem>Kontrakt 1: 2 triss</ListItem>
          <ListItem>Kontrakt 2: 1 triss, 1 stege</ListItem>
          <ListItem>Kontrakt 3: 2 stegar</ListItem>
          <ListItem>Kontrakt 4: 3 triss</ListItem>
          <ListItem>Kontrakt 5: 2 triss, 1 stege</ListItem>
          <ListItem>Kontrakt 6: 1 triss, 2 stegar</ListItem>
          <ListItem>Kontrakt 7: 4 triss</ListItem>
          <ListItem>Kontrakt 8: 3 stegar</ListItem>
        </List>
        <Text>
          När en spelare uppnått kontraktets mål kan denne spelare fortsätta
          spela ut kort genom att fylla på de triss och stegar som ligger på
          bordet (både egna och motståndarens). När en spelare spelat ut alla
          sina kort får motståndaren poäng för de kort som hen har kvar på
          handen.
        </Text>
        <ParagraphTitle>Så här spelar du</ParagraphTitle>
        <SmallTitle>1. Plocka ett kort</SmallTitle>
        <Text>
          Varje spelares tur börjar med att spelaren plockar upp ett kort.
          Spelaren får välja fritt mellan att plocka upp det senast slängda
          kortet eller ett nytt dolt kort från kortleken.
        </Text>
        <SmallTitle>2. Spela kort (om du vill/kan)</SmallTitle>
        <MiniTitle>Godkända kombinationer</MiniTitle>
        <Text>
          Varje omgång (kontrakt) har ett specifikt mål som ska uppnås. Målet
          består av triss och/eller stegar. En triss består av tre eller fler
          kort med samma värde, till exempel tre kungar. En stege består av fyra
          eller fler kort i följd och av samma färg, till exempel 6, 7, 8 och 9
          i hjärter. Stegar får lov att gå "börja om" genom att kung, som är det
          högsta kortet, följs av ett ess, som är det lägsta kortet. Dam - kung
          - ess - två är alltså en godkänd stege, om alla kort har samma färg.
        </Text>
        <MiniTitle>Spela ut kort</MiniTitle>
        <Text>
          Efter att en spelare plockat upp ett kort har denne möjlighet att
          spela ut kort. Det går bara att spela de kombinationer som finns i
          pågående kontrakt. Efter att kontraktets mål är uppnått, kan spelaren
          fortsätta spela ut enstaka kort genom att fylla på de triss och/eller
          stegar som finns på bordet. Det är tillåtet att fylla på triss/stegar
          på både den egna sidan och på motståndarens sida. Man får spela ut så
          många kort man vill, så länge man följer kontraktets regler för vilka
          kort som får spelas ut. Man kan också välja att avstå från att spela
          ut kort, även om man har godkända kombinationer på handen. Korten som
          spelas ut hamnar med framsidan upp på bordet framför respektive
          spelare.
        </Text>
        <SmallTitle>3. Släng ett kort</SmallTitle>
        <Text>
          Varje spelare avslutar sin tur genom att slänga ett valfritt kort från
          handen. Kortet hamnar med framsidan upp mitt på bordet.
        </Text>
        <ParagraphTitle>Poängberäkning</ParagraphTitle>
        <Text>
          När någon spelare inte längre har några kort på handen, avslutas
          omgången och motståndaren får poäng för de kort som hen har kvar på
          handen. Poängen beräknas utifrån kortens värde. Kung ger 13 poäng, dam
          12 poäng, osv. ner till ess som ger ett poäng. Kom ihåg att målet med
          spelet är att få så lite poäng som möjligt!
        </Text>
        <ParagraphTitle>Övrigt</ParagraphTitle>
        <Text>
          I spelet finns två kortlekar. Varje omgång börjar med att alla kort
          blandas och varje spelare tilldelas tolv kort.
        </Text>
      </RulesBox>
    </Box>
  )
}

const Box = styled.div`
  width: 100wv;
  display: flex;
  justify-content: center;
`

const RulesBox = styled.div`
  position: absolute;
  z-index: 1;
  max-width: 700px;
  max-height: 500px;
  overflow-y: scroll;
  margin: 10px;
  padding: 20px 40px 40px;
  border-radius: 40px;
  background-color: var(--light);
`

const Title = styled.h2`
  margin: 10px 10px 0;
  text-align: center;
  font-size: 38px;
  color: black;
  font-family: "Quicksand", serif;
  font-weight: 700;
  font-style: normal;
  align-self: center;
`

const ParagraphTitle = styled.h3`
  font-family: "Raleway", serif;
  font-weight: 600;
  font-style: normal;
  text-align: left;
  margin: 10px 10px 0;
`

const SmallTitle = styled.h4`
  font-family: "Raleway", serif;
  font-weight: 600;
  font-style: normal;
  text-align: left;
  margin: 5px 10px 0px;
`

const MiniTitle = styled.h5`
  font-family: "Raleway", serif;
  font-weight: 600;
  font-style: normal;
  text-align: left;
  margin: 5px 10px 5px;
`

const Text = styled.p`
  font-family: "Raleway", serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  margin: 0 10px;
`

const List = styled.ul`
  list-style-type: none;
`

const ListItem = styled.li`
  font-family: "Raleway", serif;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  margin: 0 10px;
`
