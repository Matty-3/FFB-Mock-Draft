//Create a mock draft machine.
//Fine tune the autodraft AI. Make it stronger, but with some randomness so every draft is different.
//Make it look as sleek as possible. Make the results save-able.
//Give it settings like roster configuration, PPR or no, AI sliders like randomness and positional value.
//Use images of each player.
//Bonus: add auction draft.
//maybe add details like name of high school, college, age

//Later make a Pokemon Battle simulator. Start with a honcalculator for battle tower doubles pokes.
//Start with problematic sets. Add every set. Add a teambuilder. Add good ai. Add a sim to help figure out the best moveset for a team by simming 1000 battles. Add remote battle capability. Add different moves like safeguard, perish song, pursuit, fury cutter, minimize, stomp, dig, EQ, fly, sky uppercut, twister, and follow me.


//As long as this is a mock draft tool, it doesn't need to include everyone.
//Nobody is drafting Tyler Huntley. NOBODY.
//If this is a full-scale fantasy platform, then I need everyone.
//Just do top 300 players
//Other QBs, Kickers, and Defenses are very low-end and not needed. (For now.)

//To Do:
//Next code thing: why is every player in player list (last name only right now) null?
//Just work on Bootcamp for a bit
//Eventually work on.. idk.. appearance or fixing issues or adding features
//I need to add support for FAs like Hopkins, Zeke, and Fournette, Hunt, Gould, Succop, Dalvin
//Update ADP in July or August
//Validate which stadiums are really domes. Retractable roof counts as a dome.
//Adding a wait() is the BIGGEST pain in the booty in JavaScript, so I'll figure that out later? Autodraft will be instant :)

/*



*/

//The NFL team object class. For the Minnesota Vikings, region="Minnesota", name="Vikings". abrev is the abreviation, such as "MIN". dome is true if the team plays indoors (dome, retractable roof, etc.) otherwise it is false. byeWeek is the team's bye week, an int that shouldn't be less than 4 or greater than 14.
class TeamNFL{
    constructor(region, name, abrev, dome, byeWeek){
        this.region=region
        this.name=name
        this.abrev=abrev
        this.dome=dome
        this.byeWeek=byeWeek
    }
}

const ARI = new TeamNFL("Arizona", "Cardinals", "ARI", true, 14)
const ATL = new TeamNFL("Atlanta", "Falcons", "ATL", true, 11)
const BAL = new TeamNFL("Baltimore", "Ravens", "BAL", false, 13)
const BUF = new TeamNFL("Buffalo", "Bills", "BUF", false, 13)
const CAR = new TeamNFL("Carolina", "Panthers", "CAR", false, 7)
const CHI = new TeamNFL("Chicago", "Bears", "CHI", false, 13)
const CIN = new TeamNFL("Cincinnati", "Bengals", "CIN", false, 7)
const CLE = new TeamNFL("Cleveland", "Browns", "CLE", false, 5)
const DAL = new TeamNFL("Dallas", "Cowboys", "DAL", true, 7)
const DEN = new TeamNFL("Denver", "Broncos", "DEN", false, 9)
const DET = new TeamNFL("Detroit", "Lions", "DET", true, 9)
const GB = new TeamNFL("Green Bay", "Packers", "GB", false, 6)
const HOU = new TeamNFL("Houston", "Texans", "HOU", true, 7)
const IND = new TeamNFL("Indianapolis", "Colts", "IND", true, 11)
const JAX = new TeamNFL("Jacksonville", "Jaguars", "JAX", false, 9)
const KC = new TeamNFL("Kansas City", "Chiefs", "KC", false, 10)
const LV = new TeamNFL("Las Vegas", "Raiders", "LV", true, 13)
const LAC = new TeamNFL("Los Angeles", "Chargers", "LAC", true, 5)
const LAR = new TeamNFL("Los Angeles", "Rams", "LAR", true, 10)
const MIA = new TeamNFL("Miami", "Dolphins", "MIA", true, 10)
const MIN = new TeamNFL("Minnesota", "Vikings", "MIN", true, 13)
const NE = new TeamNFL("New England", "Patriots", "NE", false, 11)
const NO = new TeamNFL("New Orleans", "Saints", "NO", true, 11)
const NYG = new TeamNFL("New York", "Giants", "NYG", false, 13)
const NYJ = new TeamNFL("New York", "Jets", "NYJ", false, 7)
const PHI = new TeamNFL("Philadelphia", "Eagles", "PHI", false, 10)
const PIT = new TeamNFL("Pittsburgh", "Steelers", "PIT", false, 6)
const SF = new TeamNFL("San Francisco", "49ers", "SF", false, 9)
const SEA = new TeamNFL("Seattle", "Seahawks", "SEA", false, 5)
const TB = new TeamNFL("Tampa Bay", "Buccaneers", "TB", false, 5)
const TEN = new TeamNFL("Tennessee", "Titans", "TEN", false, 7)
const WAS = new TeamNFL("Washington", "Commanders", "WAS", false, 14)

//Not sure if I need this.
const teamListNFL = [ARI, ATL, BAL, BUF, CAR, CHI, CIN, CLE, DAL, DEN, DET, GB, HOU, IND, JAX, KC, LV, LAC, LAR, MIA, MIN, NE, NO, NYG, NYJ, PHI, PIT, SF, SEA, TB, TEN, WAS]

//The fantasy team object class. name is the fantasy football team's name. pick is where the team picks in the first round (subsequent rounds follow a snake draft order). playerlist lists all of the players the team has drafted thus far. auto is true for a team that is autodrafting (a computer-run team or an offline person) and is otherwise false. strength, risk, and randomness are integers 1-100 that represent how strong an (auto-picking) team drafts, how much they go after 'risky' players, and how much their picks vary from the default rankings. strategy is a string that is still being implemented.
class TeamFant{
    constructor(name, pick, auto, strength, strategy, risk, randomness){
        this.name=name
        this.pick=pick
        this.playerList=[]
        this.qb=0
        this.rb=0
        this.wr=0
        this.te=0
        this.k=0
        this.def=0
        this.auto=auto
        this.strength=strength
        this.strategy=strategy
        this.risk=risk
        this.randomness=randomness
    }
}

let availablePlayers=[]
let draftedPlayers=[]

//The NFL player class. id is a unique integer for every player. pos is the player's position. injury is their status of being on the PUP, IR, SUSP (suspension(not an injury but still an important tag)), or healthy (represented as null, no tag). rank is the player's rank among all fantasy-relevant NFL players. teamFant is the fantasy team (object) that has drafted the player. risk is an integer that represents a player's risk on a very basic level.
//default risk (no more risk than normal) is 0
//1 point for minor injury from last season, 1 point for a high capital rookie(top 32 NFL draft pick), 1 point for changing teams in the offseason, 1 point for holdout or possible suspension
//2 points for acl tear in the previous year or similar injury, 2 points for non-high captial rookie
//3 points for more serious than acl tear (achilles, or several knee ligaments)
class Player{
    constructor(fName, lName, number, pos, teamNFL, injury, rank, risk){
        this.id=availablePlayers.length
        availablePlayers.push(this)
        this.fName=fName
        this.lName=lName
        this.number=number
        this.pos=pos
        this.teamNFL=teamNFL
        this.dome=teamNFL.dome
        this.byeWeek=teamNFL.byeWeek
        this.injury=injury
        this.rank=rank
        this.risk=risk
        this.teamFant=null
    }

}

const p1 = new Player("Christian", "McCaffrey", "23", "RB", SF, null, 1, 0)
const p2 = new Player("Austin", "Ekeler", "30", "RB", LAC, null, 2, 0)
const p3 = new Player("Saquon", "Barkley", "26", "RB", NYG, null, 3, 0)
const p4 = new Player("Bijan", "Robinson", "7", "RB", ATL, null, 4, 1)
const p5 = new Player("Jonathan", "Taylor", "28", "RB", IND, null, 5, 1)
const p6 = new Player("Justin", "Jefferson", "18", "WR", MIN, null, 6, 0)
const p7 = new Player("Travis", "Kelce", "87", "TE", KC, null, 7, 0)
const p8 = new Player("Ja'Marr", "Chase", "1", "WR", CIN, null, 8, 0)
const p9 = new Player("Josh", "Jacobs", "8", "RB", LV, null, 9, 0)
const p10 = new Player("Cooper", "Kupp", "10", "WR", LAR, null, 10, 1)
const p11 = new Player("Tony", "Pollard", "20", "RB", DAL, null, 11, 0)
const p12 = new Player("Tyreek", "Hill", "10", "WR", MIA, null, 12, 0)
const p13 = new Player("Rhamondre", "Stevenson", "38", "RB", NE, null, 13, 0)
const p14 = new Player("Nick", "Chubb", "24", "RB", CLE, null, 14, 0)
const p15 = new Player("Derrick", "Henry", "22", "RB", TEN, null, 15, 0)
const p16 = new Player("Stefon", "Diggs", "14", "WR", BUF, null, 16, 0)
const p17 = new Player("CeeDee", "Lamb", "88", "WR", DAL, null, 17, 0)
const p18 = new Player("Davante", "Adams", "17", "WR", LV, null, 18, 0)
const p19 = new Player("Breece", "Hall", "20", "RB", NYJ, null, 19, 2)
const p20 = new Player("Mark", "Andrews", "89", "TE", BAL, null, 20, 0)
const p21 = new Player("A.J.", "Brown", "11", "WR", PHI, null, 21, 0)
const p22 = new Player("Amon-Ra", "St. Brown", "14", "WR", DET, null, 22, 0)
const p23 = new Player("Travis", "Etienne", "1", "RB", JAX, null, 23, 0)
const p24 = new Player("Najee", "Harris", "22", "RB", PIT, null, 24, 0)
const p25 = new Player("Garrett", "Wilson", "17", "WR", NYJ, null, 25, 0)
const p26 = new Player("Jaylen", "Waddle", "17", "WR", MIA, null, 26, 0)
const p27 = new Player("Aaron", "Jones", "33", "RB", GB, null, 27, 0)
const p28 = new Player("Tee", "Higgins", "85", "WR", CIN, null, 28, 0)
const p29 = new Player("Devonta", "Smith", "6", "WR", PHI, null, 29, 0)
const p30 = new Player("Chris", "Olave", "12", "WR", NO, null, 30, 0)
const p31 = new Player("T.J.", "Hockenson", "87", "TE", MIN, null, 31, 0)
const p32 = new Player("Joe", "Mixon", "28", "RB", CIN, null, 32, 1)
const p33 = new Player("Kenneth", "Walker", "9", "RB", SEA, null, 33, 0)
const p34 = new Player("D.K.", "Metcalf", "14", "WR", SEA, null, 34, 0)
const p35 = new Player("Keenan", "Allen", "13", "WR", LAC, null, 35, 0)
const p36 = new Player("Jahmyr", "Gibbs", "26", "RB", DET, null, 36, 1)
const p37 = new Player("Patrick", "Mahomes", "15", "QB", KC, null, 37, 0)
const p38 = new Player("Josh", "Allen", "17", "QB", BUF, null, 38, 0)
const p39 = new Player("Dalvin", "Cook", "4", "RB", MIN, null, 39, 0)
const p40 = new Player("Jalen", "Hurts", "1", "QB", PHI, null, 40, 0)
const p41 = new Player("Amari", "Cooper", "2", "WR", CLE, null, 41, 0)
const p42 = new Player("Chris", "Godwin", "14", "WR", TB, null, 42, 0)
const p43 = new Player("J.K.", "Dobbins", "27", "RB", BAL, null, 43, 0)
const p44 = new Player("DeAndre", "Hopkins", "10", "WR", ARI, null, 44, 1)
const p45 = new Player("Dameon", "Pierce", "31", "RB", HOU, null, 45, 0)
const p46 = new Player("Deebo", "Samuel", "19", "WR", SF, null, 46, 0)
const p47 = new Player("Miles", "Sanders", "6", "RB", CAR, null, 47, 1)
const p48 = new Player("Rachaad", "White", "1", "RB", TB, null, 48, 0)
const p49 = new Player("Drake", "London", "5", "WR", ATL, null, 49, 0)
const p50 = new Player("Cam", "Akers", "3", "RB", LAR, null, 50, 0)
const p51 = new Player("D'Andre", "Swift", "0", "RB", PHI, null, 51, 1)
const p52 = new Player("D.J.", "Moore", "2", "WR", CHI, null, 52, 1)
const p53 = new Player("Terry", "McLaurin", "17", "WR", WAS, null, 53, 0)
const p54 = new Player("George", "Kittle", "85", "TE", SF, null, 54, 0)
const p55 = new Player("James", "Conner", "6", "RB", ARI, null, 55, 0)
const p56 = new Player("Michael", "Pittman", "11", "WR", IND, null, 56, 0)
const p57 = new Player("Dallas", "Goedert", "88", "TE", PHI, null, 57, 0)
const p58 = new Player("Jerry", "Jeudy", "10", "WR", DEN, null, 58, 0)
const p59 = new Player("Joe", "Burrow", "9", "QB", CIN, null, 59, 0)
const p60 = new Player("Lamar", "Jackson", "8", "QB", BAL, null, 60, 0)
const p61 = new Player("Tyler", "Lockett", "16", "WR", SEA, null, 61, 0)
const p62 = new Player("Kyle", "Pitts", "8", "TE", ATL, null, 62, 0)
const p63 = new Player("Javonte", "Williams", "33", "RB", DEN, null, 63, 2)
const p64 = new Player("David", "Montgomery", "5", "RB", DET, null, 64, 1)
const p65 = new Player("Christian", "Watson", "9", "WR", GB, null, 65, 0)
const p66 = new Player("Alvin", "Kamara", "41", "RB", NO, null, 66, 1)
const p67 = new Player("Calvin", "Ridley", "0", "WR", JAX, null, 67, 0)
const p68 = new Player("Christian", "Kirk", "13", "WR", JAX, null, 68, 0)
const p69 = new Player("Mike", "Williams", "81", "WR", LAC, null, 69, 0)
const p70 = new Player("Diontae", "Johnson", "18", "WR", PIT, null, 70, 0)
const p71 = new Player("Justin", "Fields", "1", "QB", CHI, null, 71, 0)
const p72 = new Player("Isiah", "Pacheco", "10", "RB", KC, null, 72, 0)
const p73 = new Player("Marquise", "Brown", "2", "WR", ARI, null, 73, 0)
const p74 = new Player("Mike", "Evans", "13", "WR", TB, null, 74, 0)
const p75 = new Player("Brandon", "Aiyuk", "11", "WR", SF, null, 75, 0)
const p76 = new Player("Justin", "Herbert", "10", "QB", LAC, null, 76, 0)
const p77 = new Player("Darren", "Waller", "12", "TE", NYG, null, 77, 1)
const p78 = new Player("Trevor", "Lawrence", "16", "QB", JAX, null, 78, 0)
const p79 = new Player("James", "Cook", "4", "RB", BUF, null, 79, 0)
const p80 = new Player("Treylon", "Burks", "16", "WR", TEN, null, 80, 0)
const p81 = new Player("Evan", "Engram", "17", "TE", JAX, null, 81, 0)
const p82 = new Player("Khalil", "Herbert", "24", "RB", CHI, null, 82, 0)
const p83 = new Player("Brian", "Robinson", "8", "RB", WAS, null, 83, 0)
const p84 = new Player("A.J.", "Dillon", "28", "RB", GB, null, 84, 0)
const p85 = new Player("Antonio", "Gibson", "24", "RB", WAS, null, 85, 0)
const p86 = new Player("Pat", "Freiermuth", "88", "TE", PIT, null, 86, 0)
const p87 = new Player("Dak", "Prescott", "4", "QB", DAL, null, 87, 0)
const p88 = new Player("Deshaun", "Watson", "4", "QB", CLE, null, 88, 0)
const p89 = new Player("Jamaal", "Williams", "30", "RB", NO, null, 89, 1)
const p90 = new Player("George", "Pickens", "14", "WR", PIT, null, 90, 0)
const p91 = new Player("Jahan", "Dotson", "1", "WR", WAS, null, 91, 0)
const p92 = new Player("Jordan", "Addison", "3", "WR", MIN, null, 92, 1)
const p93 = new Player("Jaxon", "Smith-Njigba", "11", "WR", SEA, null, 93, 1)
const p94 = new Player("David", "Njoku", "85", "TE", CLE, null, 94, 0)
const p95 = new Player("Damien", "Harris", "22", "RB", BUF, null, 95, 1)
const p96 = new Player("Rashaad", "Penny", "23", "RB", PHI, null, 96, 1)
const p97 = new Player("Courtland", "Sutton", "14", "WR", DEN, null, 97, 0)
const p98 = new Player("Alexander", "Mattison", "2", "RB", MIN, null, 98, 0)
const p99 = new Player("Daniel", "Jones", "8", "QB", NYG, null, 99, 0)
const p100 = new Player("Tua", "Tagovailoa", "1", "QB", MIA, null, 100, 1)
const p101 = new Player("JuJu", "Smith-Schuster", "7", "WR", NE, null, 101, 1)
const p102 = new Player("Kadarius", "Toney", "19", "WR", KC, null, 102, 1)
const p103 = new Player("Rashod", "Bateman", "7", "WR", BAL, null, 103, 1)
const p104 = new Player("Brandin", "Cooks", "3", "WR", DAL, null, 104, 1)
const p105 = new Player("Samaje", "Perine", "24", "RB", DEN, null, 105, 1)
const p106 = new Player("Dalton", "Schultz", "83", "TE", HOU, null, 106, 1)
const p107 = new Player("Kirk", "Cousins", "8", "QB", MIN, null, 107, 0)
const p108 = new Player("Quentin", "Johnston", "1", "WR", LAC, null, 108, 1)
const p109 = new Player("Jakobi", "Meyers", "16", "WR", LV, null, 109, 1)
const p110 = new Player("Gabe", "Davis", "13", "WR", BUF, null, 110, 0)
const p111 = new Player("Geno", "Smith", "7", "QB", SEA, null, 111, 0)
const p112 = new Player("Tyler", "Allgeier", "25", "RB", ATL, null, 112, 0)
const p113 = new Player("Elijah", "Mitchell", "25", "RB", SF, null, 113, 0)
const p114 = new Player("Jerick", "McKinnon", "1", "RB", KC, null, 114, 0)
const p115 = new Player("Michael", "Thomas", "13", "WR", NO, null, 115, 2)
const p116 = new Player("Aaron", "Rodgers", "8", "QB", NYJ, null, 116, 1)
const p117 = new Player("Jeff", "Wilson", "23", "RB", MIA, null, 117, 0)
const p118 = new Player("Chigoziem", "Okonkwo", "85", "TE", TEN, null, 118, 0)
const p119 = new Player("Elijah", "Moore", "8", "WR", CLE, null, 119, 1)
const p120 = new Player("Zach", "Charbonnet", "26", "RB", SEA, null, 120, 2)
const p121 = new Player("Darnell", "Mooney", "11", "WR", CHI, null, 121, 0)
const p122 = new Player("Devin", "Singletary", "26", "RB", HOU, null, 122, 1)
const p123 = new Player("Raheem", "Mostert", "31", "RB", MIA, null, 123, 0)
const p124 = new Player("Cole", "Kmet", "85", "TE", CHI, null, 124, 0)
const p125 = new Player("Rondale", "Moore", "4", "WR", ARI, null, 125, 0)
const p126 = new Player("Jameson", "Williams", "9", "WR", DET, null, 126, 1)
const p127 = new Player("Jared", "Goff", "16", "QB", DET, null, 127, 0)
const p128 = new Player("Zay", "Jones", "7", "WR", JAX, null, 128, 0)
const p129 = new Player("Allen", "Lazard", "10", "WR", NYJ, null, 129, 1)
const p130 = new Player("Nico", "Collins", "12", "WR", HOU, null, 130, 0)
const p131 = new Player("Greg", "Dulcich", "80", "TE", DEN, null, 131, 0)
const p132 = new Player("Tyler", "Boyd", "83", "WR", CIN, null, 132, 0)
const p133 = new Player("Tyler", "Higbee", "89", "TE", LAR, null, 133, 0)
const p134 = new Player("D'Onta", "Foreman", "21", "RB", CHI, null, 134, 1)
const p135 = new Player("Kenneth", "Gainwell", "14", "RB", PHI, null, 135, 0)
const p136 = new Player("Adam", "Thielen", "19", "WR", CAR, null, 136, 1)
const p137 = new Player("Russell", "Wilson", "3", "QB", DEN, null, 137, 0)
const p138 = new Player("Zay", "Flowers", "4", "WR", BAL, null, 138, 1)
const p139 = new Player("Gerald", "Everett", "7", "TE", LAC, null, 139, 0)
const p140 = new Player("Jaylen", "Warren", "30", "RB", PIT, null, 140, 0)
const p141 = new Player("Donovan", "Peoples-Jones", "11", "WR", CLE, null, 141, 0)
const p142 = new Player("D.J.", "Chark", "17", "WR", CAR, null, 142, 1)
const p143 = new Player("Devon", "Achane", "28", "RB", MIA, null, 143, 2)
const p144 = new Player("Hunter", "Renfrow", "13", "WR", LV, null, 144, 1)
const p145 = new Player("Ezekiel", "Elliott", "21", "RB", DAL, null, 145, 1)
const p146 = new Player("Skyy", "Moore", "24", "WR", KC, null, 146, 0)
const p147 = new Player("Anthony", "Richardson", "5", "QB", IND, null, 147, 1)
const p148 = new Player("Leonard", "Fournette", "21", "RB", TB, null, 148, 1)
const p149 = new Player("Trey", "McBride", "85", "TE", ARI, null, 149, 0)
const p150 = new Player("Romeo", "Doubs", "87", "WR", GB, null, 150, 0)
const p151 = new Player("Wan'Dale", "Robinson", "17", "WR", NYG, null, 151, 1)
const p152 = new Player("Dawson", "Knox", "88", "TE", BUF, null, 152, 0)
const p153 = new Player("Cordarrelle", "Patterson", "84", "RB", ATL, null, 153, 0)
const p154 = new Player("Matthew", "Stafford", "9", "QB", LAR, null, 154, 2)
const p155 = new Player("Chuba", "Hubbard", "30", "RB", CAR, null, 155, 0)
const p156 = new Player("Michael", "Gallup", "13", "WR", DAL, null, 156, 0)
const p157 = new Player("Kareem", "Hunt", "27", "RB", CLE, null, 157, 1)
const p158 = new Player("Odell", "Beckham", "3", "WR", BAL, null, 158, 1)
const p159 = new Player("Derek", "Carr", "4", "QB", NO, null, 159, 1)
const p160 = new Player("Mike", "Gesicki", "88", "TE", NE, null, 160, 1)
const p161 = new Player("Michael", "Carter", "32", "RB", NYJ, null, 161, 0)
const p162 = new Player("Juwan", "Johnson", "83", "TE", NO, null, 162, 0)
const p163 = new Player("Clyde", "Edwards-Helaire", "25", "RB", KC, null, 163, 0)
const p164 = new Player("San Francisco", "49ers", "100", "DEF", SF, null, 164, 0)
const p165 = new Player("Kendre", "Miller", "25", "RB", NO, null, 165, 2)
const p166 = new Player("Buffalo", "Bills", "100", "DEF", BUF, null, 166, 0)
const p167 = new Player("Dallas", "Cowboys", "100", "DEF", DAL, null, 167, 0)
const p168 = new Player("Philadelphia", "Eagles", "100", "DEF", JAX, null, 168, 0)
const p169 = new Player("Alec", "Pierce", "14", "WR", IND, null, 169, 0)
const p170 = new Player("Zach", "Ertz", "86", "TE", ARI, null, 170, 2)
const p171 = new Player("K.J.", "Osborn", "17", "WR", MIN, null, 171, 0)
const p172 = new Player("Joshua", "Palmer", "5", "WR", LAC, null, 172, 0)
const p173 = new Player("New England", "Patriots", "100", "DEF", NE, null, 173, 0)
const p174 = new Player("New York", "Jets", "100", "DEF", NYJ, null, 174, 0)
const p175 = new Player("Denver", "Broncos", "100", "DEF", DEN, null, 175, 0)
const p176 = new Player("Baltimore", "Ravens", "100", "DEF", BAL, null, 176, 0)
const p177 = new Player("Hayden", "Hurst", "81", "TE", CAR, null, 177, 1)
const p178 = new Player("Justin", "Tucker", "9", "K", BAL, null, 178, 0)
const p179 = new Player("Chase", "Claypool", "10", "WR", CHI, null, 179, 0)
const p180 = new Player("Noah", "Fant", "87", "TE", SEA, null, 180, 0)
const p181 = new Player("Curtis", "Samuel", "4", "WR", WAS, null, 181, 0)
const p182 = new Player("Jordan", "Love", "10", "QB", GB, null, 182, 0)
const p183 = new Player("Rashid", "Shaheed", "22", "WR", NO, null, 183, 0)
const p184 = new Player("Tyler", "Bass", "2", "K", BUF, null, 184, 0)
const p185 = new Player("Gus", "Edwards", "35", "RB", BAL, null, 185, 0)
const p186 = new Player("Chase", "Edmonds", "22", "RB", TB, null, 186, 0)
const p187 = new Player("Kyler", "Murray", "1", "QB", ARI, null, 187, 2)
const p188 = new Player("Kenny", "Pickett", "8", "QB", PIT, null, 188, 0)
const p189 = new Player("Dalton", "Kincaid", "86", "TE", BUF, null, 189, 1)
const p190 = new Player("Joshua", "Kelley", "25", "RB", LAC, null, 190, 0)
const p191 = new Player("Isaiah", "Hodgins", "18", "WR", NYG, null, 191, 0)
const p192 = new Player("Daniel", "Carlson", "2", "K", LV, null, 192, 0)
const p193 = new Player("Harrison", "Butker", "7", "K", KC, null, 193, 0)
const p194 = new Player("Darius", "Slayton", "86", "WR", NYG, null, 194, 0)
const p195 = new Player("Irv", "Smith", "81", "TE", CIN, null, 195, 1)
const p196 = new Player("Allen", "Robinson", "11", "WR", PIT, null, 196, 1)
const p197 = new Player("Evan", "McPherson", "2", "K", CIN, null, 197, 0)
const p198 = new Player("Jerome", "Ford", "34", "RB", CLE, null, 198, 0)
const p199 = new Player("Bryce", "Young", "9", "QB", CAR, null, 199, 1)
const p200 = new Player("Kansas City", "Chiefs", "100", "DEF", KC, null, 200, 0)
const p201 = new Player("Zamir", "White", "35", "RB", LV, null, 201, 0)
const p202 = new Player("Hunter", "Henry", "85", "TE", NE, null, 202, 0)
const p203 = new Player("John", "Metchie", "8", "WR", HOU, null, 203, 2)
const p204 = new Player("James", "Robinson", "3", "RB", NE, null, 204, 1)
const p205 = new Player("Cincinnati", "Bengals", "100", "DEF", CIN, null, 205, 0)
const p206 = new Player("Parris", "Campbell", "0", "WR", NYG, null, 206, 1)
const p207 = new Player("New Orleans", "Saints", "100", "DEF", NO, null, 207, 0)
const p208 = new Player("Van", "Jefferson", "12", "WR", LAR, null, 208, 0)
const p209 = new Player("Marquez", "Valdes-Scantling", "11", "WR", KC, null, 209, 0)
const p210 = new Player("Robert", "Woods", "2", "WR", HOU, null, 210, 1)
const p211 = new Player("Pittsburgh", "Steelers", "100", "DEF", PIT, null, 211, 0)
const p212 = new Player("Tampa Bay", "Buccaneers", "100", "DEF", TB, null, 212, 0)
const p213 = new Player("Mecole", "Hardman", "6", "WR", NYJ, null, 213, 1)
const p214 = new Player("DeVante", "Parker", "1", "WR", NE, null, 214, 0)
const p215 = new Player("Tyquan", "Thornton", "11", "WR", NE, null, 215, 0)
const p216 = new Player("Pierre", "Strong", "35", "RB", NE, null, 216, 0)
const p217 = new Player("Jalin", "Hyatt", "84", "WR", NYG, null, 217, 2)
const p218 = new Player("Roschon", "Johnson", "30", "RB", CHI, null, 218, 2)
const p219 = new Player("Taysom", "Hill", "7", "TE", NO, null, 219, 0)
const p220 = new Player("Jason", "Sanders", "7", "K", MIA, null, 220, 0)
const p221 = new Player("Russell", "Gage", "3", "WR", TB, null, 221, 0)
const p222 = new Player("Younghoe", "Koo", "6", "K", ATL, null, 222, 0)
const p223 = new Player("Tank", "Bigsby", "4", "RB", JAX, null, 223, 2)
const p224 = new Player("Miami", "Dolphins", "100", "DEF", MIA, null, 224, 0)
const p225 = new Player("Washington", "Commanders", "100", "DEF", WAS, null, 225, 0)
const p226 = new Player("Los Angeles", "Chargers", "100", "DEF", LAC, null, 226, 0)
const p227 = new Player("Jimmy", "Garoppolo", "10", "QB", LV, null, 227, 1)
const p228 = new Player("Sam", "LaPorta", "87", "TE", DET, null, 228, 2)
const p229 = new Player("Matt", "Gay", "7", "K", IND, null, 229, 0)
const p230 = new Player("Corey", "Davis", "84", "WR", NYJ, null, 230, 0)
const p231 = new Player("Cleveland", "Browns", "100", "DEF", CLE, null, 231, 0)
const p232 = new Player("Isaiah", "Spiller", "28", "RB", LAC, null, 232, 0)
const p233 = new Player("Brandon", "McManus", "10", "K", JAX, null, 233, 0)
const p234 = new Player("Jake", "Elliott", "4", "K", PHI, null, 234, 0)
const p235 = new Player("Green Bay", "Packers", "100", "DEF", GB, null, 235, 0)
const p236 = new Player("Michael", "Mayer", "87", "TE", LV, null, 236, 2)
const p237 = new Player("Nick", "Folk", "6", "K", NE, null, 237, 0)
const p238 = new Player("Indianapolis", "Colts", "100", "DEF", IND, null, 238, 0)
const p239 = new Player("Jason", "Myers", "5", "K", SEA, null, 239, 0)
const p240 = new Player("Terrace", "Marshall", "88", "WR", CAR, null, 240, 0)
const p241 = new Player("Jonathan", "Mingo", "15", "WR", CAR, null, 241, 2)
const p242 = new Player("Los Angeles", "Rams", "100", "DEF", LAR, null, 242, 0)
const p243 = new Player("Isaiah", "Likely", "80", "TE", BAL, null, 243, 0)
const p244 = new Player("Josh", "Downs", "1", "WR", IND, null, 244, 2)
const p245 = new Player("Nyheim", "Hines", "0", "RB", BUF, null, 245, 0)
const p246 = new Player("Jelani", "Woods", "80", "TE", IND, null, 246, 0)
const p247 = new Player("C.J.", "Stroud", "7", "QB", HOU, null, 247, 1)
const p248 = new Player("D'Ernest", "Johnson", "25", "RB", JAX, null, 248, 1)
const p249 = new Player("Trey", "Lance", "5", "QB", SF, null, 249, 1)
const p250 = new Player("Sterling", "Shepard", "3", "WR", NYG, null, 250, 2)
const p251 = new Player("Tim", "Patrick", "81", "WR", DEN, null, 251, 2)
const p252 = new Player("Graham", "Gano", "9", "K", NYG, null, 252, 0)
const p253 = new Player("Logan", "Thomas", "82", "TE", WAS, null, 253, 0)
const p254 = new Player("Mac", "Jones", "10", "QB", NE, null, 254, 0)
const p255 = new Player("Zonovan", "Knight", "27", "RB", NYJ, null, 255, 0)
const p256 = new Player("Kyren", "Williams", "23", "RB", LAR, null, 256, 0)
const p257 = new Player("Tyjae", "Spears", "32", "RB", TEN, null, 257, 2)
const p258 = new Player("Jacksonville", "Jaguars", "100", "DEF", JAX, null, 258, 0)
const p259 = new Player("Zach", "Evans", "21", "RB", LAR, null, 259, 2)
const p260 = new Player("Matt", "Prater", "5", "K", ARI, null, 260, 0)
const p261 = new Player("Isaiah", "McKenzie", "6", "WR", IND, null, 261, 1)
const p262 = new Player("Greg", "Zuerlein", "9", "K", NYJ, null, 262, 0)
const p263 = new Player("Chase", "Brown", "30", "RB", CIN, null, 263, 2)
const p264 = new Player("Greg", "Joseph", "1", "K", MIN, null, 264, 0)
const p265 = new Player("Jayden", "Reed", "11", "WR", GB, null, 265, 2)
const p266 = new Player("Rashee", "Rice", "4", "WR", KC, null, 266, 2)
const p267 = new Player("Cade", "Otton", "88", "TE", TB, null, 267, 0)
const p268 = new Player("Ryan", "Tannehill", "17", "QB", TEN, null, 268, 0)
const p269 = new Player("Zach", "Moss", "21", "RB", IND, null, 269, 0)
const p270 = new Player("Carolina", "Panthers", "100", "DEF", CAR, null, 270, 0)
const p271 = new Player("Marvin", "Jones", "0", "WR", DET, null, 271, 1)
const p272 = new Player("Jordan", "Mason", "24", "RB", SF, null, 272, 0)
const p273 = new Player("Kendrick", "Bourne", "84", "WR", NE, null, 273, 0)
const p274 = new Player("JaMycal", "Hasty", "22", "RB", JAX, null, 274, 0)
const p275 = new Player("Mack", "Hollins", "18", "WR", ATL, null, 275, 1)
const p276 = new Player("Sam", "Howell", "14", "QB", WAS, null, 276, 0)
const p277 = new Player("Israel", "Abanikanda", "25", "RB", NYJ, null, 277, 2)
const p278 = new Player("Josh", "Reynolds", "8", "WR", DET, null, 278, 0)
const p279 = new Player("Wil", "Lutz", "3", "K", NO, null, 279, 0)
const p280 = new Player("Khalil", "Shakir", "10", "WR", BUF, null, 280, 0)
const p281 = new Player("Richie", "James", "17", "WR", KC, null, 281, 1)
const p282 = new Player("Dustin", "Hopkins", "4", "K", LAC, null, 282, 0)
const p283 = new Player("Desmond", "Ridder", "9", "QB", ATL, null, 283, 0)
const p284 = new Player("Boston", "Scott", "35", "RB", PHI, null, 284, 0)
const p285 = new Player("Marvin", "Mims", "83", "WR", DEN, null, 285, 2)
const p286 = new Player("Chris", "Boswell", "9", "K", PIT, null, 286, 0)
const p287 = new Player("New York", "Giants", "100", "DEF", NYG, null, 287, 0)
const p288 = new Player("Hassan", "Haskins", "25", "RB", TEN, null, 288, 0)
const p289 = new Player("Daniel", "Bellinger", "82", "TE", NYG, null, 289, 0)
const p290 = new Player("Robbie", "Gould", "9", "K", SF, null, 290, 0)
const p291 = new Player("Tennessee", "Titans", "100", "DEF", TEN, null, 291, 0)
const p292 = new Player("Quez", "Watkins", "16", "WR", PHI, null, 292, 0)
const p293 = new Player("Seattle", "Seahawks", "100", "DEF", SEA, null, 293, 0)
const p294 = new Player("David", "Bell", "18", "WR", CLE, null, 294, 0)
const p295 = new Player("Kayshon", "Boutte", "81", "WR", NE, null, 295, 2)
const p296 = new Player("Brock", "Purdy", "13", "QB", SF, null, 296, 2)
const p297 = new Player("Ryan", "Succop", "3", "K", TB, null, 297, 0)
const p298 = new Player("Riley", "Patterson", "36", "K", DET, null, 298, 0)
const p299 = new Player("Laviska", "Shenault", "5", "WR", CAR, null, 299, 0)
const p300 = new Player("Ka'imi", "Fairbairn", "15", "K", HOU, null, 300, 0)
//June 5th, 2023

let teamNamesFant = ["Motor City Kitties", "Monsters of the Midway", "Orange Crush", "Chiefs Kingdom", "Raider Nation", "Bear Down", "Bear Force One", "Cheese Heads", "Purple People Eaters", "Number One Browns Fan", "Joe Cool", "Skyline Chili", "Pickett to Pickens", "Quoth the Raven, 'Nevermore'", "Bills Mafia", "Diggs! Sideline! Touchdown! Unbelievable!", "Aikman, Touchdown, Unbelievable!", "Belichick's Spy", "Do the Waddle", "Fins Up", "New York Cyclones", "Breece Hall of Fame", "CeeDeez Nuts", "We Dem Boyz", "Philly Philly", "Hurts Donut", "Scary Terry", "Saquon's Quads", "New York Football Giants", "Tompa Bay", "Bijan Mustard", "Dirty Birds", "Dome Patrol", "Taysom Hill MVP", "Cardiac Cats", "Newton's First Law", "King Henry", "Flaming Thumbtacks", "God Hates Jags", "Trevor Lawrence's Hair", "Andrew Luck's Book Club", "Stroud & Proud", "Mr. Unlimited", "Mr. Big Chest", "Sean Payton's Bounty", "Go Pack Go", "Go Charge Go", "Justin Herbert's Hair", "Kenneth Runner", "Legion of Boom", "Purdy Good", "69ers", "Sad Cards Fan", "Kyler's ACL", "Inglewood Rams", "The Next Sean McVay"]
//const prompt = require("prompt-sync")();
let teamName=prompt("Fantasy team name: ", "Purple People Eaters")
const teamNameIndex = teamNamesFant.indexOf(teamName)
if (teamNameIndex > -1){
    teamNamesFant.splice(teamNameIndex, 1)
}

const t1 = new TeamFant(teamName, 1, true, 100, "heroRB", 50, 50)
const t2 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 2, true, 50, "balanced", 50, 50)
const t3 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 3, true, 50, "balanced", 50, 50)
const t4 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 4, true, 50, "balanced", 50, 50)
const t5 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 5, true, 50, "balanced", 50, 50)
const t6 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 6, true, 50, "balanced", 50, 50)
const t7 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 7, true, 50, "balanced", 50, 50)
const t8 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 8, true, 50, "balanced", 50, 50)
const t9 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 9, true, 50, "balanced", 50, 50)
const t10 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 10, true, 50, "balanced", 50, 50)
const t11 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 11, true, 50, "balanced", 50, 50)
const t12 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 12, true, 50, "balanced", 50, 50)
const t13 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 13, true, 50, "balanced", 50, 50)
const t14 = new TeamFant(teamNamesFant.splice(Math.floor(Math.random()*teamNamesFant.length), 1)[0], 14, true, 50, "balanced", 50, 50)
let teamListFant = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14]
//team pick no. might be irrelevant unless I make it used in this list creation
//Which I will probably have to to let the user pick their spot

document.write(t1.name)
document.write("<br>")
document.write(t2.name)
document.write("<br>")
document.write(t3.name)
document.write("<br>")
document.write(t4.name)
document.write("<br>")
document.write(t5.name)
document.write("<br>")
document.write(t6.name)
document.write("<br>")
document.write(t7.name)
document.write("<br>")
document.write(t8.name)
document.write("<br>")
document.write(t9.name)
document.write("<br>")
document.write(t10.name)
document.write("<br>")
document.write(t11.name)
document.write("<br>")
document.write(t12.name)
document.write("<br>")
document.write(t13.name)
document.write("<br>")
document.write(t14.name)
document.write("<br>")
document.write("<br>")


userPick()
let i = 0
do {
    oddRound()
    evenRound()
    i++
} while(i < 7)


for(team of teamListFant){
    printRoster(team)
}


function setupLeague(){
    return
    //here I will eventually set up the roster requirements, number of teams, and the user's team name
}

function oddRound(){
    //will need to be changed when not every team is autopicking
    //maybe pass the parameter of where we are in the draft if I am printing: "With pick 17..."
    //If I do this, then maybe I can combine this with function evenRound()
    for(const team of teamListFant){
        if (team.auto){
            autoPick(team)
        }
        else{
            userPick(team)
        }
    }
}

function evenRound(){
    //will need to be changed when not every team is autopicking
    //maybe pass the parameter of where we are in the draft if I am printing: "With pick 17..."
    //If I do this, then maybe I can combine this with function oddRound()
    let i = teamListFant.length-1
    do {
        if (teamListFant[i].auto){
            autoPick(teamListFant[i])
        }
        else{
            userPick(teamListFant[i])
        }
        i--
    } while(i > -1)
}

function userPick(){
    document.write(teamName+" is on the clock! The best remaining players are "+availablePlayers[0].fName+" "+availablePlayers[0].lName+", "+availablePlayers[1].fName+" "+availablePlayers[1].lName+", "+availablePlayers[2].fName+" "+availablePlayers[2].lName+", "+availablePlayers[4].fName+" "+availablePlayers[4].lName+", and "+availablePlayers[5].fName+" "+availablePlayers[5].lName+".<br>")
}

function autoPick(team){
    //maybe include risk, randomness, etc.
    let choices=[]
    let pickIndex=0
    do{
        if(availablePlayers[pickIndex].pos==="RB"){
            if(team.rb < 5){
                choices.push(pickIndex)
            }
        }
        else if(availablePlayers[pickIndex].pos==="WR"||availablePlayers[pickIndex].pos==="TE"){
            if((team.wr + team.te) < 5){
                choices.push(pickIndex)
            }
        }
        else if(availablePlayers[pickIndex].pos==="QB"){
            if(team.qb < 2){
                choices.push(pickIndex)
            }
        }
        else if(availablePlayers[pickIndex].pos==="DEF"){
            if(team.def < 1){
                choices.push(pickIndex)
            }
        }
        else if(team.k < 1){
            choices.push(pickIndex)
        }
        pickIndex++
    } while(choices.length < 6 && pickIndex <100) //this is a quick fix to not enough QBs to make list
    //of six (27 have been drafted, there are only 5 more, help!!!)
    let i;
    const seed=Math.random()
    if(seed < 0.75||choices.length===1){
        i=0
    }
    else if(seed < 0.9||choices.length===2){
        i=1
    }
    else if(seed < 0.95||choices.length===3){
        i=2
    }
    else if(seed < 0.98||choices.length===4){
        i=3
    }
    else if(seed < 0.99||choices.length===5){
        i=4
    }
    else{
        i=5
    }

    const pick = availablePlayers[choices[i]]
    pick.TeamFant=team
    team.playerList.push(pick)
    if(pick.pos==="RB"){
        team.rb++
    }
    else if(pick.pos==="WR"){
        team.wr++
    }
    else if(pick.pos==="TE"){
        team.te++
    }
    else if(pick.pos==='QB'){
        team.qb++
    }
    else if(pick.pos==="DEF"){
        team.def++
    }
    else {
        team.k++
    }
    draftedPlayers.push(pick)
    availablePlayers.splice(choices[i],1)
    //eventually make it have a scrollable list of players drafted
    //for now, print the last x players drafted
    updateDrafted()
    updateAvailable()
    return
}

//for now this updates the 'players drafted'
function updateDrafted(){
    if(draftedPlayers.length === 1){
        document.getElementById('drafted').innerHTML = ("<br><br><br><br><br>"+draftedPlayers[0].lName);
        return
    }
    else if(draftedPlayers.length === 2){
        document.getElementById('drafted').innerHTML = ("<br><br><br>"+draftedPlayers[0].lName+"<br>"+draftedPlayers[1].lName);
        return
    }
    document.getElementById('drafted').innerHTML = ("<br>"+draftedPlayers[draftedPlayers.length-3].lName+"<br>"+draftedPlayers[draftedPlayers.length-2].lName+"<br>"+draftedPlayers[draftedPlayers.length-1].lName);
    return
}


//updates scrollable list of available players
function updateAvailable(){
    //lazy(?) way of clearing this element
    //is this the best? I'll decide later
    document.getElementById('available').innerHTML = '';

    for(let player in availablePlayers){
        document.getElementById('available').insertAdjacentHTML("afterend",player.lName+'<br>');
    }
    return
}


function printRoster(team){
    document.write(team.name+":<br>")
    for(const player of team.playerList){
        document.write(player.fName+" "+player.lName+"<br>")
    }
    document.write("<br><br>")
}