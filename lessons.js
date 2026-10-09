// The Alpha-Phonics lesson order (Samuel L. Blumenfeld), one entry per lesson.
// Lesson numbers and titles follow the book's Order of Lessons. The practice
// words and sentences are written for this app (not copied from the book), and
// each sentence uses only sounds and words the book has taught by its lesson.
//
// Format, one item per line:
//   # 103 | Long o as o-e          a lesson (number | title)
//   ? ...                          a short note for the grown-up
//   ate: Kate date gate late            a spelling family (shown boxed, like the book)
//   ~ syllables: ab eb ib          drill syllables (read, but not real words)
//   pairs: at/ate hat/hate         pairs read side by side
//   !: said again                  irregular words, shown in a box
//   > The snake is in the cave.    a practice sentence
// Two-syllable words are written with a dash (rab-bit) and shown both ways.
window.PRIMER_BOOK = `
# 1 | Short a; consonants m, n, s, t, x
? Teach the short a sound, then each consonant. Every word here has two sounds. Have the child say each word, spell it aloud, and write it.
a: am an as at ax

# 2 | Initial consonants S, m, h, s, t
? Add one letter to the front of a known word to make a new one (am → Sam). Proper names start with a capital letter.
am: Sam ham
an: man tan
as: has
at: hat mat sat
ax: Max tax

# 3 | Review sentences
? First sentences. A sentence starts with a capital letter and ends with a period.
> Max sat.
> Sam has ham.
> Max has an ax.
> Sam has tax.

# 4 | Consonants d, D, w
? Teach the sounds of d and w by adding them to known words (ad → dad, ax → wax).
ad: ad dad Dad had mad sad
an: Dan
ax: wax

# 5 | Alphabetic word building
? Read the words in their columns. Point out that "was" is irregular: it sounds like "wuz".
an: Dan man Nan tan
at: hat mat sat
ad: dad had mad sad Tad
am: ham Sam dam
ax: Max tax wax
!: was

# 6 | Short a sentences; punctuation
? A question ends with a question mark. Have the child copy a sentence or two in writing.
> Dad had ham.
> Was Dan sad?
> Max was mad!
> Nan sat.
> Was Sam mad at Max?
> Tad has wax.

# 7 | Consonant blend nd; consonant l
? Add d to an to make and. In a blend, both sounds can still be heard: h-a-n-d.
nd: and hand land sand
l: lad

> Dad and Max sat.
> Sam had sand.
> Max had sand and wax.

# 8 | Consonants l, b, c, g, j, f
? l at the end of a word (Al), capital A, and c (as in cat), g (as in gas), j, f and n.
al: Al gal Hal Sal
b: bad bag ban bat
c: can cat cab
g: gas gag gab
j: jam Jan jab
f: fan fat fad fax
n: Nan nab nag
# 9 | Consonants p, t, r, v, y, z
? Make sure each consonant sound is said cleanly, without an extra "uh".
p: pan pat pad pal Pam cap map nap lap sap
t: tab tag tap
r: ran rat rag ram rap
v: van vat
w: wag
y: yam yap
z: zap zag
> Jan ran.
> Pat has jam.
> Pam and Jan ran.
> Can Dan bat?
> Max ran and sat.

# 10 | Review of short a words
? Drill the short a families. Correct every error, and have the child sound out the hard ones.

# 11 | Consonant digraph ck; qu
? ck is two letters for one sound, so back has four letters but three sounds. qu is taught with quack.
ack: back hack Jack lack pack rack sack tack
qu: quack

# 12 | a as a word
? a means the same as an, but comes before a word that starts with a consonant: a cat, a hat.
a: a
> Jack has a cat.
> Sam has a bag.
> A cat ran.
> Dad has a van.
> Pam has a hat and a bag.

# 13 | Sentences
? These can be read and also written.
> Jack ran back.
> Max had a sack.
> Can a cat nap?
> Pat has a bad cat.
> A rat ran at Jack!
> Dad has a tan cap.

# 14 | Review of short a words and syllables
? Drill columns, with the letter k. Many of these syllables turn up later inside longer words.
~ syllables: ab ac ad af ag ak al am an ap as at av ax az

# 15 | Short vowels a, e, i, o, u
? Compare the five short vowel sounds, so each sound goes with the right letter.
~ at: at et it ot ut
~ an: an en in on un
vowels: bag beg big bog bug
in: is it in

# 16 | Short e words
? c sounds like s before e and i (cell), and g can sound like j before e and i (gem).
ed: bed fed led red wed Ted Ned
eg: beg leg peg Meg
et: bet get jet let met net pet set vet wet yet
en: den hen men pen ten Ben Ken
e: yes web gem Set
!: cell sell

# 17 | Short e sentences
> Ted fed a red hen.
> Ben met Ken.
> Set has a red pen.
> Get a net, Ted!
> Is Ned in bed?
> Yes, Ned is in bed.
> Meg can pet a cat.

# 18 | Short e words and syllables
? Short e drill columns. Initial c sounds like s here; final c sounds like k.
~ syllables: eb ec ed ef eg el em en ep es et ev ex ez
ell: bell fell tell well yell
e: less mess deck neck peck egg Jeff Bess

# 19 | Short i words; ph as f
? Teach ph as another way to write f, with the name Phil. Then the first two-syllable word: Phil-ip.
ib: bib rib fib
id: bid did hid kid lid rid
ig: big dig fig jig pig rig wig
im: dim him rim Tim Jim
in: bin fin kin pin tin win
ip: dip hip lip nip rip sip tip zip
it: bit fit hit kit lit pit sit
ix: fix mix six
ick: kick lick pick sick tick quick
ill: Bill fill hill mill pill will
is: his miss kiss if
ph: Phil Phil-ip

# 20 | Short a, e, i sentences
> Tim is six.
> Did Bill fix it?
> Jim hid a big pig in a pit.
> Tim and Phil dig a pit.
> His wig fell in a well!
> Sit, Max, sit!
> Is it a big pig?

# 21 | Consonant digraph th
? A digraph is two letters for one sound. th is hard in thin and soft in the.
th: the this that than then them thin thick
th end: with bath path math Beth Seth

# 22 | Sentences
> Seth is thin.
> This is a big bath.
> Then the cat ran with the hat.
> Beth and Seth hid in the bath!
> That cat is fat.

# 23 | Short o words
? off and dog are often said a little differently; son, ton and won are irregular.
ob: Bob cob job mob rob sob
od: cod God nod pod rod
og: fog hog jog log
om: Tom mom
on: Don Ron on
op: cop hop mop pop top
ot: cot dot got hot jot lot not pot rot
ox: box fox ox
ock: lock rock sock dock
o: doll odd
!: son ton won dog off

# 24 | Short o sentences
? Irregular words should be read the way they are normally spoken.
> Tom got a dog.
> The fox is on the log.
> Bob has a big box.
> Can Ron hop on a rock?
> Mom got a hot pot.
> Not a dog, a fox!

# 25 | Plural s, es, and 's
? s and es mean more than one; apostrophe s means it belongs to someone.
s: cats dogs pigs hats
es: box-es fox-es kiss-es
's: Tom's Sam's Meg's

# 26 | Sentences
> The foxes hid in the rocks.
> The cats sat on Beth's bed.
> Ten pigs and six hens.
> Ron's box has rocks in it.
> Tom's dog is on Meg's bed.

# 27 | Short u words
? Note the irregular full, bull, pull and put. Pointing out the few irregulars shows how regular everything else is.
ub: cub rub sub tub
ud: bud mud
ug: bug dug hug jug mug rug tug
um: gum hum sum yum
un: bun fun gun run sun
up: cup pup up
ut: but cut hut nut
us: bus us Gus
uck: buck duck luck tuck
u: buzz fuzz puff huff fuss
!: full bull pull put

# 28 | Short u sentences
> The pup dug in the mud.
> Run, bug, run!
> A duck is in the tub.
> Gus has fun in the sun.
> Put the cup on the rug.
> The bull is big.
> Pull the rug, Gus!

# 28a | Consonants b and d
? Only if b and d get mixed up: read each pair and say which letter is which.
pairs: bad/dad big/dig bug/dug bud/dud bin/din rob/rod cab/cad lab/lad

# 29 | Consonant digraph sh
? sh is one sound written with two letters. Note the irregular bush, push and wash.
sh: ship shop shot shed shell shin shut
ash: cash dash lash mash rash sash
ish: dish fish wish
ush: gush hush mush rush
sh: shack shock Josh
!: bush push wash

# 30 | Consonant digraph ch
ch: Chad chap chat chin chip chop chug check chess chick chill chum
ch end: much such rich

# 31 | Consonant digraph wh
? Say wh carefully so it sounds different from plain w.
wh: when which whip whiz whim whack whiff
!: what

# 32 | Review of sh, ch, wh words
? Review digraph words, and give a short spelling test.

# 33 | Sentences
!: of
> Shut the shed, Seth!
> Chad has a fish in a dish.
> Which ship is it?
> The chick is in the shop.
> What a rush!
> Josh had chips with his fish.

# 34 | Verbs to be and to have
? have and be, with am, is, are, was, were. they, were and you are common irregular words, taught as sight words for now.
to be: I am he is she we
words: they in-to
!: have be are were you to

# 35 | Sentences
> They were in the ship.
> You have a big fish!
> Are you with Tom?
> The ducks were in the mud.
> Have you got the map?
> It is fun to be a cat.

# 36 | Contractions
? Show how everyday speech shortens words, and how the apostrophe marks the missing letters.
n't: isn't can't didn't hasn't wasn't aren't weren't haven't
's: it's that's let's

# 37 | Sentences with contractions
? Point out the two uses of the apostrophe: isn't (letters left out) and Meg's (belongs to Meg).
> Bob isn't sad.
> It's a fox!
> Let's run to the hut.
> That's Meg's hat.
> The dog didn't dig.
> You can't get the fish.
> They aren't in the shed.

# 38 | Two-syllable, short-vowel words
? Read each word in syllables first (rab-bit), then as a whole word. A good time for a spelling test.
2: rab-bit kit-ten mit-ten muf-fin sun-set cat-nip nap-kin pic-nic cob-web up-set ten-nis ban-dit gob-lin zig-zag tom-cat cab-in hid-den

# 39 | Sentences with two-syllable, short-vowel words
> The goblin hid in the cabin.
> The kitten has a mitten.
> Let's have a picnic.
> The bandit ran up the hill.
> Ted had a muffin at sunset.
> The rabbit is hidden in the cabin.

# 40 | a as in all; sentences
? The second sound of a, as in all.
all: all ball call fall hall mall tall wall
sh: shall
> The ball fell.
> Call the dog.
> The tall man is in the hall.
> Is that all?

# 41 | Consonant blend ng; ing words
? ng is two sounds said close together. Short-vowel words usually double the last letter before ing (sit, sitting).
ang: bang fang gang hang rang sang
ing: king ring sing wing thing
ung: hung lung rung sung
ing: kick-ing fish-ing tell-ing yell-ing pack-ing wish-ing
ing: sit-ting run-ning hop-ping dig-ging
words: Wash-ing-ton
!: long song

# 42 | Sentences with ing words
> The king is singing a song.
> The dog is digging in the sand.
> Tom is fishing with Dad.
> A bell is ringing.
> The bats are hanging in the cabin.
> The goblin is hopping and yelling!

# 43 | Final consonant blends nd, nt
? Note the irregular want and wand: w changes the sound of short a after it.
nd: band bend end lend mend send tend bond fond pond fund
nt: ant pant bent dent lent rent sent tent went hint mint tint hunt punt runt
!: want wand

# 44 | Sentences
> The ants went in the tent.
> The pond is at the end of the land.
> Ben fell in the pond and got wet.
> Ted wants a wand.
> Send the cat a hat!
> Tom went on a hunt.

# 45 | Final syllable er
? er added to known words makes many new ones.
er: her ham-mer lad-der din-ner sup-per rub-ber hot-ter thin-ner num-ber ban-ner pep-per hunt-er
> Tom the Hunter has a red banner.
> Her dinner is hotter.
> Get the ladder, Ken!
> The hunter sat with his dog.
> The number on the van is ten.

# 46 | Final consonant blends nk, nc, nch
ank: bank sank tank thank yank
ink: ink pink sink wink think
unk: bunk junk sunk honk
nc: zinc
nch: bench lunch munch bunch hunch inch pinch finch ranch

# 47 | Sentences
> The dog sank in the pond.
> Let's have lunch on the bench.
> Thank you, Mom!
> The pink finch is singing.
> Think!
> The tank is full of junk.

# 48 | Final consonant blends ct, ft, pt, xt; sentences
ct: act fact pact
ft: left lift gift raft soft loft tuft
pt: kept wept
xt: next text
> The gift is soft.
> Max kept the gift.
> Next, the raft sank!
> Lift it with the left hand.

# 49 | Final consonant blends sk, sp, st; sentences
sk: ask task mask desk tusk husk
sp: gasp wisp lisp
st: fast last past best nest rest test vest west fist list mist dust must rust just
> Just ask Dad.
> The dog is fast.
> The hen is on the nest.
> The best mask is at the shop.
> Rest in the tent.
> The goblin left his mask in the mist.

# 50 | Final consonant blends lb, ld, lf, lk
? Note the irregular bald, calf, half, talk and walk. Sentences use only words and sounds taught through Lesson 50.
l: bulb held elf self shelf golf gulf milk silk bulk hulk elk
!: bald calf half talk walk
> The elf has milk.
> Half the milk is in the cup.
> The elk can't talk!
> Let's walk to the pond.

# 51 | Final consonant blends lm, lp, lt
l: elm film help yelp gulp kelp belt felt melt welt tilt wilt quilt
> Help! The elf is in the kelp.
> Tom felt the quilt.
> The pup yelps.

# 52 | Final consonant blend mp
mp: camp damp lamp ramp champ bump dump jump lump pump limp chimp romp
> The chimp can jump.
> Camp is fun.
> Bump! The lamp fell.

# 53 | Final consonant blend tch; sentences
? tch is another spelling of ch at the end of a word. Rich rhymes with itch; much rhymes with Dutch. Note the irregular a in watch.
tch: batch catch hatch latch match patch fetch ditch hitch pitch witch itch notch hutch Dutch
!: watch
> Catch the ball!
> The witch is in the ditch.
> Fetch, dog, fetch!
> Watch the chick hatch.

# 54 | Final consonant blend dge
? dge is another spelling of soft g.
dge: badge edge ledge hedge wedge ridge fudge judge nudge budge lodge dodge
> The fudge is on the ledge.
> Dodge the ball!
> The judge has a badge.

# 55 | Final consonant blends nce, nse
? Note that once rhymes with dunce.
nce: dance fence hence since wince mince
nse: dense sense tense rinse
!: once
> Once, a fox sat on the fence.
> Dance, Tom, dance!
> Rinse the cup.

# 56 | Review of words with final consonant blends
? Review one-syllable short-vowel words with final blends. See how many can be read.

# 57 | Two-syllable words with consonant blends
? A good check: can these be figured out from what has been taught so far?
2: hel-met pump-kin bas-ket mag-net in-sect gob-let rock-et pock-et jack-et tick-et buck-et chick-en kitch-en mus-ket dent-ist hand-bag
> The pumpkin is in the basket.
> Tom has a helmet and a musket.
> The chicken is in the kitchen.
> The rocket went up!

# 58 | Initial consonant blends bl, br
bl: black blot blob bled blend blink blush bless
br: brag brick bring brush brim bran Brad brass

# 59 | Initial consonant blends cl, cr
cl: clam clap clan class click cliff clock club cluck
cr: crab cram crack crib crop cross crust crush crisp crept

# 60 | Initial consonant blends dr, dw
dr: drag drip drop drum drink dress drill drift drank drag-on
dw: dwell dwelt

# 61 | Initial consonant blends fl, fr
fl: flag flap flat flash fled flip flock flop fluff
fr: frog fret fresh frill Fred Fran from

# 62 | Initial consonant blends gl, gr, gw
gl: glad glass glen glum
gr: grab grand grass grill grim grin grip grub grunt
gw: Gwen

# 63 | Initial consonant blends pl, pr
pl: plan plant plod plop plot plug plum plus pluck
pr: press prim print prick prod prop

# 64 | Initial consonant blend sl
sl: slab slam slap sled slept slid slim slip slit slot slug slush sling

# 65 | Initial consonant blends shr, sm, sn
? shr is a digraph (sh) plus a consonant.
shr: shred shrimp shrink shrub shrug
sm: small smash smell smack smog smug
sn: snack snap sniff snip snug snag

# 66 | Initial consonant blends sp, spr
? spr is a blend of three consonant sounds.
sp: span spat sped spell spill spin spit spot spun spend
spr: sprang sprig spring sprint

# 67 | Initial consonant blends st, str
st: stab stack stamp stand stem step stick still sting stop stuck stuff
str: strap string strip strong struck stretch

# 68 | Initial consonant blends sw, sc, sk, scr
sw: swam swim swell swept swing
sc: scab scalp scan scat
sk: skid skill skim skin skip skunk
scr: scrap scratch scrub scram

# 69 | Initial consonant blends tr, thr, tw
tr: track trap trick trim trip trot truck trust
thr: thrill throb thrust
tw: twig twin twist twitch

# 70 | Words with consonant blends
? Review short-vowel words with blends at the start and the end.

# 71 | Sentences
? Good test sentences. Go back to earlier drills where there are weak spots, but move on to the long vowels as quickly as you can.
> The dragon slept in his den.
> A frog sat on a big flat rock.
> Fred can swim and skip.
> Grab the string!
> The skunk has a strong smell.
> Stop the truck!
> The elf is stuck in the mud.
> The twins went camping on the cliff.
> Brad and Gwen are swinging on the swing.
> The dragon's den is black and still.
> Click, click! The crab is on the rock.
> Drink from the cup, Fred.

# 72 | Long a
? Long vowels say their letter names. Compare at and ate: the e at the end changes short a to long a.
pairs: at/ate hat/hate fat/fate mat/mate rat/rate Al/ale pal/pale gal/gale can/cane man/mane tap/tape cap/cape mad/made Sam/same plan/plane

# 73 | Long a as a-e
? g is soft in age (unlike get). Note the irregular ache (ch sounds like k), are (rhymes with car) and have.
ace: face lace race place grace space
age: cage page sage stage
ale: bale male pale sale tale whale scale
ape: cape tape grape shape
ate: Kate date gate late plate skate state crate
ade: fade made wade blade shade trade
ake: Jake bake cake lake make rake take wake snake flake shake
ame: came game name same tame blame flame frame
ane: cane lane mane plane crane
ave: cave gave save wave brave grave
aze: daze haze maze blaze
ase: base case vase
!: ache are have

# 74 | Sentences with long a words
> The snake is in the cave.
> Jake made a cake.
> The whale swam in the lake.
> Let's skate on the lake.
> A dragon came to the gate!
> Shake the rake.
> Same game, same name.
> The brave man gave the snake a grape.
> The flames are hot. Stand back!
> Kate came late with the plate.

# 75 | Long a as ai
? ai is the second most common way to write long a. Note the irregular said, again and against: said rhymes with red, again with Ben.
aid: aid maid paid raid braid
ail: fail hail jail mail nail pail rail sail tail snail trail
ain: gain main pain rain chain brain drain grain plain train
ait: bait wait faint paint saint
aim: aim
!: said again against

# 76 | Long a sentences
> The snail is on the trail.
> The train is late.
> "Wait!" said the maid.
> Paint the sail red.
> Rain, rain, again!
> The dragon has a long tail and a chain.

# 77 | Long a as ay and ey
? ay and ey come at the ends of words. The ey words are only a few, and are really irregulars.
ay: bay day hay jay lay may pay ray say way clay gray play pray stay stray tray sway spray a-way
ey: they hey prey o-bey

# 78 | Long a sentences
> Let's play in the hay.
> They stay all day.
> The gray jay is singing.
> Pay the man, Ray.
> Hey, stay away!
> The dragon's prey ran away.

# 79 | Long a as ei and eigh; sentences
? Three ways to write long a with no letter a at all: ey, ei, eigh.
ei: vein rein veil
eigh: eight weigh sleigh neigh freight weight
> The sleigh has eight bells.
> Weigh the freight.
> The maid has a veil.

# 80 | Review of words with long a spellings
? These spellings are fixed: we must always use the spelling that is correct.

# 81 | Long a homonyms
? Words that sound alike but are spelled differently. The aim is awareness; they will be learned better later, in sentences.
pairs: ate/eight made/maid pale/pail tale/tail male/mail sale/sail plane/plain way/weigh pain/pane mane/main hay/hey

# 82 | Two-syllable words with long a syllables
? See how many can be figured out. A good check on where more practice is needed.
2: play-mate mail-man rail-way hay-stack base-ball cup-cake pay-day main-land mis-take in-vade es-cape ex-plain con-tain rain-drop

# 83 | Vowel spellings au, aw
? The aw sound, written au or aw. Note the irregular awe and aunt.
au: haul Paul fault vault cause pause haunt launch sauce
aw: jaw law paw raw saw claw draw flaw straw thaw lawn dawn fawn yawn crawl shawl hawk
!: aunt

# 84 | Sentences with au, aw words
> Paul saw a fawn at dawn.
> Draw a hawk.
> The cat's paw is on the lawn.
> Pause the game.

# 85 | a as in ma, car
? The fourth sound of a (after short a, long a and a as in all). Note the irregular quart.
a: ma pa
ar: bar car far jar tar star scar
arm: arm farm harm charm
art: art cart dart part smart start
ark: bark dark mark park shark spark
ar: barn yarn card hard yard harp sharp march
!: quart

# 86 | Sentences with a-as-ah words
> The farm has a big barn.
> A star is far.
> Mark has a red car.
> Start the cart!
> Ma and Pa are at the park.
> The shark is in the dark.
> The dog barks in the yard.
> The hawk has sharp claws.

# 87 | Long e as ee
? Teach ee in its spelling families. kn in knee sounds like n; been rhymes with sin; be, he, me, we and she are long e words too.
ee: bee fee see tree free three flee cheese breeze sneeze
eed: feed need seed weed bleed speed
eek: peek seek week cheek creek
eel: feel heel peel reel steel wheel
eem: seem
een: teen green queen seen
eep: beep deep jeep keep peep sheep sleep steep sweep creep
eet: beet feet meet sheet sweet street greet
ee: beef reef teeth
!: knee been be he me we she

# 88 | Long e sentences
> The bee is in the tree.
> She sees three sheep.
> We need sleep.
> Keep the green seeds.
> He is in the deep creek.
> Meet me on the street.
> The queen sees a green tree.

# 89 | Long e as ea
? The second most common long e. Many irregular ea words: short e in head and bread; bear and wear rhyme with air; steak and break rhyme with cake. read and tear depend on the sentence.
eat: eat beat heat meat neat seat treat wheat
eak: beak leak peak weak speak sneak squeak
eal: deal heal meal real seal steal
eam: beam team cream dream steam stream scream
ean: bean clean lean mean
eap: heap leap cheap
ear: ear dear fear gear hear near year clear spear
east: east beast feast least
ea: tea pea sea flea leaf each beach peach reach teach please
!: head bread dead deaf sweat sweat-er threat bear pear wear swear steak break read lead tear

# 90 | Long e sentences
> The beast is near the sea.
> We can eat a peach.
> A seal sleeps on the beach.
> Clean the dish, please.
> The bear ate the bread.
> Hear the dragon scream!
> The dream was real.

# 91 | Long e as e-e; sentences
? Note the exceptions there, where, were and eye. eye is very irregular, but easy to learn because it looks so different.
e-e: eve Pete Steve these theme here
!: there where were eye
> These are Pete's.
> Steve is here.
> Where is the beast?
> There is a seal in the sea.

# 92 | Long e as ie; sentences
? Note the exceptions friend (rhymes with blend) and receive ("i before e except after c").
ie: field yield shield chief thief grief brief piece niece priest shriek
!: friend receive
> The chief has a shield.
> The thief ran into the field.
> Pete is a friend.
> A piece of cheese.

# 93 | Long e as y
? y at the end of a word. Note the irregular pretty (rhymes with city), busy (dizzy), money (sunny), any and many (penny).
y: sleep-y hap-py pup-py fun-ny sun-ny bun-ny pen-ny jel-ly bel-ly sil-ly hil-ly Bil-ly sand-y can-dy wind-y hand-y mud-dy mess-y luck-y fif-ty six-ty twen-ty ver-y fog-gy
!: pretty busy money any many

# 94 | Long e as y sentences
> The puppy is silly.
> It is windy and foggy.
> The bunny is very happy.
> Many ducks are in the muddy pond.
> Billy is busy.
> Any candy left?

# 95 | Plural ies
? When a word ending in long e (y) means more than one, it is spelled ies.
ies: pup-pies bun-nies pen-nies cher-ries ber-ries can-dies jel-lies

# 96 | Review of long e words
? Long e in all its spellings.

# 97 | Long e sentences
> The chief has three puppies.
> There are cherries on the tree.
> Where is the beach?
> Please read to me.
> Steve sleeps here.
> We were at the sea.
> The thief asked to see the queen.
> The seal is very sleepy.
> The queen's friend is Pete.
> Feel the sea breeze.

# 98 | Long i as i-e, y, ie
? Long i and its spellings. Teach the words in their spelling families. Note climb, knife, and the irregular give and live.
y: by my why try dry cry spy fly fry sky shy
ie: die lie pie tie
ice: dice mice nice rice price slice twice spice
ike: bike hike like Mike spike strike
ide: hide ride side tide wide bride slide
ime: dime lime time chime crime slime
ine: dine fine line mine nine pine vine shine spine twine
ite: bite kite white quite spite
ire: fire hire tire wire
ile: file mile pile tile while smile
ive: dive five hive drive
ize: size prize
ipe: pipe ripe wipe stripe
ise: wise rise
!: climb rhyme knife give live

# 99 | Long i sentences
> I like my bike.
> Five mice hide in the pipe.
> Why is the sky white?
> I can fly my kite.
> Mike gave me a slice of pie.
> It's time to ride!
> The dragon's fire is white hot.
> The knife is on the side of the plate.
> I will give the fish a bite of my rice.
> Nine mice like the spice.

# 100 | Long i as igh; sentences
? An old spelling, but in some of our most common words.
igh: high sigh thigh light might night right sight tight bright flight fright slight fight
> The kite is high in the sky.
> It's night, and the light is bright.
> The king can fight.
> What a fright!
> The light is bright.

# 101 | Spelling forms ough and augh
? ough and augh are old spellings of the aw sound. Note the irregular though.
ough: ought bought brought fought sought thought
augh: caught taught daugh-ter naugh-ty
!: though
> The king fought the dragon.
> Dad brought me a kite.
> She taught me to swim.
> The cat caught a fish.

# 102 | gh as f
? gh can sound like f. In laugh the au is short a; in rough and tough the ou is short u.
gh: laugh laugh-ter cough rough tough e-nough

# 103 | Long o as o-e
? The most common long o spelling is o-consonant-e. Point out the irregulars in their families: dove, love, glove, shove, move, come, some, whole, one, done, none, once, gone, soul.
one: bone cone tone zone stone phone throne
ode: code rode strode
oke: joke poke woke smoke spoke stroke broke choke
ole: hole mole pole role stole
ome: dome home Rome
ope: hope rope slope
ose: nose hose rose those chose
ore: more bore core sore tore store shore chore
ote: note vote
obe: robe globe
ove: cove drove stove grove
oze: doze froze
!: dove love glove shove move come some whole one done none once gone soul
> The dragon woke up.
> Tom the Hunter rode home.
> The king sat on the throne.
> The mole is in a hole.
> Come home, Rose!
> Not one of us can move the stone.
> Tell me a joke!
> The globe is on the desk.

# 104 | Long o sentences
? Practice sentences with o-consonant-e words.
> Smoke came from the dragon's nose.
> Some of the stones are gone.
> I love my home.
> The fox froze by the stove.
> Those bones are in a hole.
> The king broke his pole.
> The dragon chose a stone throne.
> I hope you like it.
> Come home, Mole! The rain is coming.
> Put on a glove and a robe.
> The dragon broke the dome, and the stones fell.
> Rose has a cone. Mole has a bone.
> Wake up, Tom! The dragon is home!
> The fox hid in the grove by the cove.
> The king drove the dragon from the throne.

# 105 | Long o as oa; sentences
? Note the irregular broad.
oa: oak soak cloak croak road load toad loaf coal goal foal foam roam moan groan soap
oat: boat coat goat moat float throat
oast: boast coast roast toast
oach: coach roach poach
> The toad croaks.
> A goat is in the boat.
> The king has a cloak.
> The coach is on the road.
> The boat floats on the moat.

# 106 | Long o as ow; sentences
ow: low mow row tow bow blow flow glow grow show slow snow crow throw
own: own grown shown blown thrown flown
ow: bowl el-bow win-dow yel-low pil-low shad-ow ar-row fol-low hol-low
> The crow is black.
> Throw the ball!
> The dragon's shadow is long.
> Follow the yellow road.
> Snow is falling.
> Show me the window.

# 107 | Long o as in old; sentences
old: old bold cold fold gold hold sold told scold
olt: colt bolt jolt
oll: roll toll troll
ost: most post host
o: oh go no so yo-yo
!: only cost lost boss loss moss toss
> The troll has gold.
> It is cold in the hole.
> Hold the rope.
> I told you so!
> Go slow. The road is cold.
> The bold colt is old.
> The troll wants a toll.

# 108 | Common irregular words
? Best taught inside sentences. to, too and two sound alike but mean different things; too is regular, to and two are not.
!: to too two do who
> Who is there?
> I do.
> Do you like the troll?
> The dog has two bones too.
> I do not want to go.
> He will not come home.
> Who is the troll?

# 109 | oo as in good food
? The two sounds of oo. Note the irregular door and floor.
oo: boo too zoo moo food mood boot hoot root shoot cool fool pool tool stool boom room zoom broom moon noon soon spoon hoop loop scoop goose loose moose tooth roof rac-coon
ood: good wood hood stood
ook: book cook hook look nook took brook crook shook
oo: foot wool
!: door floor

# 110 | Sentences with oo words
> Look at the moon!
> The goose is in the pool.
> This is a good book.
> The witch's broom zooms.
> The raccoon took the food.
> Look! A moose in the woods.
> Cook the food soon.
> Shut the door, please.

# 111 | Spelling form ould; sentences
? An old spelling: ould sounds like ood in wood.
ould: could would should could-n't would-n't should-n't
> Could you help me?
> I would like some food.
> You should go to sleep.
> The troll couldn't swim.

# 112 | ow and ou as in cow and ouch
? ow can be long o (Lesson 106) or the ow in cow. Irregulars: touch, wound (injure), four, your, rough, tough, enough.
ow: cow how now wow plow vow brown clown crown down drown frown gown town owl howl growl prowl crowd
ou: out about shout spout stout trout scout snout loud cloud proud ouch couch pouch grouch
ound: found bound hound pound round sound mound ground
ou: count mount house mouse blouse south mouth our sour flour
!: touch wound four your rough tough enough young youth

# 113 | Sentences
> The cow is in the brown house.
> The owl howls at night.
> Look out! The dragon is about!
> The hound found a mouse.
> The king has a crown.
> Shout it out loud!
> Four clouds are in the sky.

# 114 | oy as in boy; oi as in oil; sentences
oy: boy joy toy soy Roy en-joy an-noy oys-ter roy-al loy-al
oi: oil boil coil foil soil toil spoil coin join joint point noise voice choice moist hoist
> The boy has a toy.
> Boil the oil.
> The king's voice is loud.
> I enjoy my toys.

# 115 | Long u as u-e; sentences
? use, June, cube, mule: u, a consonant, then e. Note the sh sound of s in sure.
u-e: use fuse cute mute flute brute cube tube rude dude June tune dune prune mule rule fume duke huge cure pure
!: sure
> The mule is cute.
> Play a tune on the flute.
> The duke has a huge cube.

# 116 | Long u as ue and ui; sentences
ue: due cue hue blue clue glue true Sue
ui: fruit suit juice cruise bruise
> The sky is blue.
> I like fruit juice.
> Is it true?

# 117 | Long u as ew and eu; sentences
? Note the irregular sew, which rhymes with grow.
ew: new few dew mew pew chew drew flew grew crew blew brew stew threw screw
eu: feud
!: sew
> The crow flew away.
> I drew a new dragon.
> The crew threw the rope.

# 118 | er, ir, or, ur, ear; sentences
? One sound, many spellings, best learned in spelling families. Have the child figure out the two-syllable words.
er: fern herd term germ clerk perch
ir: sir fir stir bird girl firm first shirt skirt dirt third thirst birth
or: word work worm world worth
ur: fur burn turn hurt curl burst church nurse purse tur-key
ear: earn learn earth pearl search heard
> The bird is in the fir tree.
> The worm is in the dirt.
> The girl has a new shirt.
> The nurse has a purse.

# 119 | Words ending in le; silent t; sentences
? The le ending has only a hint of a vowel. Note the silent t where it appears.
le: ap-ple bub-ble pud-dle lit-tle mid-dle gig-gle wig-gle puz-zle can-dle han-dle sim-ple jun-gle tick-le pick-le buck-le tur-tle
stle: cas-tle whis-tle this-tle bus-tle hus-tle nes-tle
> The little turtle is in the puddle.
> The king's castle has a candle.

# 120 | ph as f
ph: phone pho-to graph Ralph dol-phin el-e-phant al-pha-bet neph-ew or-phan tro-phy phan-tom sphinx

# 121 | ce, sc, ci, si, ti, xi, su, tu as sh, ch, zh
? Words of Latin origin. zh is its own sound, with no spelling of its own.
ci: o-cean spe-cial pre-cious
si: vi-sion mis-sion ten-sion
ti: na-tion sta-tion mo-tion lo-tion po-tion ac-tion frac-tion men-tion
su: plea-sure trea-sure mea-sure
tu: pic-ture cap-ture na-ture ad-ven-ture fu-ture crea-ture

# 122 | kn as n
? Already seen in knee and knife. Now the other kn words.
kn: knee knit knob knock knot know known knelt knife knight kneel knack knuck-le

# 123 | mb as m; bt as t
? It is the letters together (mb, bt) that stand for one sound.
mb: lamb limb climb comb tomb thumb numb crumb dumb
bt: debt
!: doubt

# 124 | Silent h
? h is not sounded in these words. In the gh words, gh stands for g as in go.
h: hon-est hour hon-or heir John Thom-as thyme
gh: ghost ghast-ly ghoul spa-ghet-ti

# 125 | wr as r
wr: wrap wren wreck wrist write wrote writ-ten wrong wring wreath wrench wrin-kle

# 126 | st as s; ft as f
st: lis-ten fas-ten glis-ten cas-tle whis-tle wres-tle
ft: of-ten sof-ten

# 127 | ch as k; ps as s
ch: Christ-mas cho-rus school ech-o an-chor stom-ach chrome char-ac-ter or-chid
ps: psy-chic psy-che

# 128 | y as short i
? Mostly words of Greek origin. After this lesson, the child is ready for any suitable book.
y: gym myth sys-tem crys-tal sym-bol cym-bal rhythm mys-ter-y E-gypt pyr-a-mid lyr-ic hymn
`;
