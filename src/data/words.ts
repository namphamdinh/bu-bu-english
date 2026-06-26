import type { Word, WordCategory } from "../types/word";

type Seed = [word: string, meaning: string, emoji: string, ipa: string, read: string];
let nextId = 1;

const makeWords = (category: WordCategory, rows: string): Word[] =>
  rows.trim().split("\n").map((line) => {
    const [word, meaning, emoji, ipa, read] = line.split("|").map((item) => item.trim()) as Seed;
    const article = /^[aeiou]/i.test(word) ? "an" : "a";
    const isAction = category === "Actions" || category === "Daily Life";
    const example = isAction ? `I can ${word}.` : `This is ${article} ${word}.`;
    const exampleMeaning = isAction ? `Con có thể ${meaning}.` : `Đây là ${meaning}.`;
    return {
      id: nextId++,
      word,
      meaning,
      category,
      emoji,
      pronunciation: ipa,
      pronunciationText: read,
      syllables: read.split(/[- ]/).filter(Boolean),
      vietnameseGuide: `Con nghe chậm, đọc “${read}”, rồi nối các âm thật mềm.`,
      mouthTip: `Nhìn miệng cô, thả lỏng hàm và đọc rõ từng phần: ${read}.`,
      commonMistake: `Đừng thêm âm “ơ” hoặc âm cuối tiếng Việt vào từ “${word}”.`,
      example,
      exampleMeaning,
      explanation: `“${word}” có nghĩa là ${meaning}. Đây là một từ quen thuộc Bư Bư có thể gặp mỗi ngày.`,
      memoryTip: `Nhìn ${emoji}, nói “${word}” ba lần và tưởng tượng ${meaning} đang mỉm cười với Bư Bư.`,
      collocations: isAction ? [`${word} every day`] : [`my ${word}`, `a ${word}`],
      relatedWords: []
    };
  });

const family = makeWords("Family", `
mother|mẹ|👩|/ˈmʌð.ər/|MUH-thờ
father|bố|👨|/ˈfɑː.ðər/|FAA-thờ
mom|mẹ|👩|/mɑːm/|mom
dad|bố|👨|/dæd/|đaed
parent|cha hoặc mẹ|👪|/ˈper.ənt/|PE-rần
parents|bố mẹ|👪|/ˈper.ənts/|PE-rầns
brother|anh hoặc em trai|👦|/ˈbrʌð.ər/|BRUH-thờ
sister|chị hoặc em gái|👧|/ˈsɪs.tər/|SIS-tờ
baby|em bé|👶|/ˈbeɪ.bi/|BÂY-bi
child|đứa trẻ|🧒|/tʃaɪld/|chai-lđ
children|trẻ em|🧒|/ˈtʃɪl.drən/|CHIL-đrần
grandmother|bà|👵|/ˈɡræn.mʌð.ər/|GRAN-muh-thờ
grandfather|ông|👴|/ˈɡræn.fɑː.ðər/|GRAN-faa-thờ
grandma|bà|👵|/ˈɡræn.mɑː/|GRAN-ma
grandpa|ông|👴|/ˈɡræn.pɑː/|GRAN-pa
aunt|cô hoặc dì|👩|/ænt/|aent
uncle|chú hoặc cậu|👨|/ˈʌŋ.kəl/|UNG-cồ
cousin|anh chị em họ|🧑|/ˈkʌz.ən/|CUZ-zần
son|con trai|👦|/sʌn/|sân
daughter|con gái|👧|/ˈdɔː.tər/|ĐO-tờ
family|gia đình|👨‍👩‍👧‍👦|/ˈfæm.əl.i/|FAM-ờ-li
home|tổ ấm|🏡|/hoʊm/|hôum
name|tên|🏷️|/neɪm/|nâym
friend|bạn|🧑‍🤝‍🧑|/frend/|frenđ
neighbor|hàng xóm|🏘️|/ˈneɪ.bər/|NÂY-bờ
`);

const animals = makeWords("Animals", `
cat|con mèo|🐱|/kæt/|kaet
dog|con chó|🐶|/dɔːɡ/|đog
bird|con chim|🐦|/bɝːd/|bơ-đ
fish|con cá|🐟|/fɪʃ/|fish
rabbit|con thỏ|🐰|/ˈræb.ɪt/|RAE-bit
bear|con gấu|🐻|/ber/|be-r
lion|sư tử|🦁|/ˈlaɪ.ən/|LAI-ần
tiger|con hổ|🐯|/ˈtaɪ.ɡər/|TAI-gờ
elephant|con voi|🐘|/ˈel.ə.fənt/|E-lờ-fần
monkey|con khỉ|🐵|/ˈmʌŋ.ki/|MUNG-ki
duck|con vịt|🦆|/dʌk/|đấc
chicken|con gà|🐔|/ˈtʃɪk.ɪn/|CHIK-in
cow|con bò|🐄|/kaʊ/|kao
pig|con lợn|🐷|/pɪɡ/|pig
horse|con ngựa|🐴|/hɔːrs/|ho-rs
sheep|con cừu|🐑|/ʃiːp/|shiip
goat|con dê|🐐|/ɡoʊt/|gôut
mouse|con chuột|🐭|/maʊs/|mao-s
frog|con ếch|🐸|/frɔːɡ/|frog
snake|con rắn|🐍|/sneɪk/|snâyk
turtle|con rùa|🐢|/ˈtɝː.t̬əl/|TƠ-tồ
bee|con ong|🐝|/biː/|bii
butterfly|con bướm|🦋|/ˈbʌt̬.ɚ.flaɪ/|BUH-tờ-flai
ant|con kiến|🐜|/ænt/|aent
zebra|ngựa vằn|🦓|/ˈziː.brə/|ZII-brờ
`);

const food = makeWords("Food", `
apple|quả táo|🍎|/ˈæp.əl/|AP-uhl
banana|quả chuối|🍌|/bəˈnæn.ə/|bờ-NAE-nờ
pear|quả lê|🍐|/per/|pe-r
grape|quả nho|🍇|/ɡreɪp/|grâyp
watermelon|dưa hấu|🍉|/ˈwɔː.t̬ɚˌmel.ən/|WO-tờ-me-lần
strawberry|dâu tây|🍓|/ˈstrɔːˌber.i/|STRO-be-ri
mango|quả xoài|🥭|/ˈmæŋ.ɡoʊ/|MANG-gôu
lemon|quả chanh|🍋|/ˈlem.ən/|LE-mần
rice|cơm|🍚|/raɪs/|rai-s
bread|bánh mì|🍞|/bred/|bređ
egg|quả trứng|🥚|/eɡ/|eg
milk|sữa|🥛|/mɪlk/|milk
water|nước|💧|/ˈwɔː.t̬ɚ/|WO-tờ
juice|nước ép|🧃|/dʒuːs/|juus
cake|bánh ngọt|🍰|/keɪk/|kâyk
candy|kẹo|🍬|/ˈkæn.di/|KAN-đi
cookie|bánh quy|🍪|/ˈkʊk.i/|KU-ki
cheese|phô mai|🧀|/tʃiːz/|chiiz
meat|thịt|🥩|/miːt/|miit
soup|súp|🥣|/suːp/|suup
noodles|mì|🍜|/ˈnuː.dəlz/|NUU-đồlz
breakfast|bữa sáng|🍳|/ˈbrek.fəst/|BREK-fợst
lunch|bữa trưa|🍱|/lʌntʃ/|lânch
dinner|bữa tối|🍽️|/ˈdɪn.ɚ/|ĐIN-nờ
vegetable|rau củ|🥦|/ˈvedʒ.tə.bəl/|VEJ-tờ-bồ
`);

const colors = makeWords("Colors", `
red|màu đỏ|🔴|/red/|ređ
blue|màu xanh dương|🔵|/bluː/|bluu
yellow|màu vàng|🟡|/ˈjel.oʊ/|YE-lôu
green|màu xanh lá|🟢|/ɡriːn/|griin
orange|màu cam|🟠|/ˈɔːr.ɪndʒ/|OR-inj
purple|màu tím|🟣|/ˈpɝː.pəl/|PƠ-pồ
pink|màu hồng|🌸|/pɪŋk/|pink
brown|màu nâu|🟤|/braʊn/|brao-n
black|màu đen|⚫|/blæk/|blaek
white|màu trắng|⚪|/waɪt/|oai-t
gray|màu xám|🩶|/ɡreɪ/|grây
gold|màu vàng kim|🥇|/ɡoʊld/|gôulđ
silver|màu bạc|🥈|/ˈsɪl.vɚ/|SIL-vờ
light|màu nhạt|💡|/laɪt/|lai-t
dark|màu đậm|🌑|/dɑːrk/|đaark
bright|sáng rực|✨|/braɪt/|brai-t
pale|nhợt nhạt|🫧|/peɪl/|pâyl
color|màu sắc|🎨|/ˈkʌl.ɚ/|CUH-lờ
colorful|nhiều màu sắc|🌈|/ˈkʌl.ɚ.fəl/|CUH-lờ-fồ
beige|màu be|🟫|/beɪʒ/|bâyz
navy|xanh hải quân|🟦|/ˈneɪ.vi/|NÂY-vi
violet|màu tím hoa|💜|/ˈvaɪə.lət/|VAI-ờ-lợt
turquoise|xanh ngọc|🩵|/ˈtɝː.kwɔɪz/|TƠ-kwoiz
cream|màu kem|🍦|/kriːm/|kriim
rainbow|cầu vồng|🌈|/ˈreɪn.boʊ/|RÂYN-bôu
`);

const numbers = makeWords("Numbers", `
zero|số không|0️⃣|/ˈzɪr.oʊ/|ZI-rôu
one|số một|1️⃣|/wʌn/|oăn
two|số hai|2️⃣|/tuː/|tuu
three|số ba|3️⃣|/θriː/|thrii
four|số bốn|4️⃣|/fɔːr/|fo-r
five|số năm|5️⃣|/faɪv/|fai-v
six|số sáu|6️⃣|/sɪks/|siks
seven|số bảy|7️⃣|/ˈsev.ən/|SE-vần
eight|số tám|8️⃣|/eɪt/|ây-t
nine|số chín|9️⃣|/naɪn/|nai-n
ten|số mười|🔟|/ten/|ten
eleven|mười một|1️⃣|/ɪˈlev.ən/|i-LE-vần
twelve|mười hai|2️⃣|/twelv/|twel-v
thirteen|mười ba|3️⃣|/ˌθɝːˈtiːn/|thơ-TIIN
fourteen|mười bốn|4️⃣|/ˌfɔːrˈtiːn/|fo-TIIN
fifteen|mười lăm|5️⃣|/ˌfɪfˈtiːn/|fif-TIIN
sixteen|mười sáu|6️⃣|/ˌsɪkˈstiːn/|siks-TIIN
seventeen|mười bảy|7️⃣|/ˌsev.ənˈtiːn/|se-vần-TIIN
eighteen|mười tám|8️⃣|/ˌeɪˈtiːn/|ây-TIIN
nineteen|mười chín|9️⃣|/ˌnaɪnˈtiːn/|nai-n-TIIN
twenty|hai mươi|2️⃣|/ˈtwen.t̬i/|TWEN-ti
first|thứ nhất|🥇|/fɝːst/|fơ-st
second|thứ hai|🥈|/ˈsek.ənd/|SE-kầnđ
third|thứ ba|🥉|/θɝːd/|thơ-đ
hundred|một trăm|💯|/ˈhʌn.drəd/|HUN-đrợđ
`);

const body = makeWords("Body", `
head|đầu|🙂|/hed/|heđ
face|khuôn mặt|😊|/feɪs/|fâys
hair|tóc|💇|/her/|he-r
eye|mắt|👁️|/aɪ/|ai
ear|tai|👂|/ɪr/|ia-r
nose|mũi|👃|/noʊz/|nôuz
mouth|miệng|👄|/maʊθ/|mao-th
tooth|răng|🦷|/tuːθ/|tuu-th
teeth|những chiếc răng|🦷|/tiːθ/|tii-th
tongue|lưỡi|👅|/tʌŋ/|tâng
neck|cổ|🧣|/nek/|nek
shoulder|vai|🤷|/ˈʃoʊl.dɚ/|SHÔUL-đờ
arm|cánh tay|💪|/ɑːrm/|aam
hand|bàn tay|✋|/hænd/|haenđ
finger|ngón tay|☝️|/ˈfɪŋ.ɡɚ/|FING-gờ
chest|ngực|🫁|/tʃest/|chest
back|lưng|🔙|/bæk/|baek
stomach|bụng|🤰|/ˈstʌm.ək/|STUH-mợk
leg|chân|🦵|/leɡ/|leg
knee|đầu gối|🦵|/niː/|nii
foot|bàn chân|🦶|/fʊt/|fut
feet|những bàn chân|🦶|/fiːt/|fiit
toe|ngón chân|🦶|/toʊ/|tôu
heart|trái tim|❤️|/hɑːrt/|haa-t
body|cơ thể|🧍|/ˈbɑː.di/|BO-đi
`);

const school = makeWords("School", `
school|trường học|🏫|/skuːl/|skuul
classroom|lớp học|🏫|/ˈklæs.ruːm/|KLAS-ruum
teacher|giáo viên|🧑‍🏫|/ˈtiː.tʃɚ/|TII-chờ
student|học sinh|🧑‍🎓|/ˈstuː.dənt/|STUU-đần
book|quyển sách|📖|/bʊk/|buk
notebook|quyển vở|📓|/ˈnoʊt.bʊk/|NÔUT-buk
pencil|bút chì|✏️|/ˈpen.səl/|PEN-sồ
pen|bút mực|🖊️|/pen/|pen
eraser|cục tẩy|🧽|/ɪˈreɪ.sɚ/|i-RÂY-sờ
ruler|thước kẻ|📏|/ˈruː.lɚ/|RUU-lờ
bag|cặp sách|🎒|/bæɡ/|baeg
desk|bàn học|🪑|/desk/|đesk
chair|ghế|🪑|/tʃer/|che-r
board|bảng|🟩|/bɔːrd/|bo-rđ
paper|giấy|📄|/ˈpeɪ.pɚ/|PÂY-pờ
picture|bức tranh|🖼️|/ˈpɪk.tʃɚ/|PIK-chờ
lesson|bài học|📚|/ˈles.ən/|LE-sần
homework|bài tập về nhà|📝|/ˈhoʊm.wɝːk/|HÔUM-wơ-k
question|câu hỏi|❓|/ˈkwes.tʃən/|KWES-chần
answer|câu trả lời|✅|/ˈæn.sɚ/|AN-sờ
read|đọc|📖|/riːd/|riiđ
write|viết|✍️|/raɪt/|rai-t
learn|học|🧠|/lɝːn/|lơ-n
spell|đánh vần|🔤|/spel/|spel
library|thư viện|📚|/ˈlaɪ.brer.i/|LAI-bre-ri
`);

const toys = makeWords("Toys", `
toy|đồ chơi|🧸|/tɔɪ/|toi
ball|quả bóng|⚽|/bɔːl/|bol
doll|búp bê|🪆|/dɑːl/|đol
kite|cái diều|🪁|/kaɪt/|kai-t
robot|rô-bốt|🤖|/ˈroʊ.bɑːt/|RÔU-bot
block|khối xếp hình|🧱|/blɑːk/|blok
puzzle|trò ghép hình|🧩|/ˈpʌz.əl/|PUZ-zồ
game|trò chơi|🎮|/ɡeɪm/|gâym
card|lá bài|🃏|/kɑːrd/|kaa-rđ
train|tàu đồ chơi|🚂|/treɪn/|trâyn
drum|cái trống|🥁|/drʌm/|đrâm
balloon|bóng bay|🎈|/bəˈluːn/|bờ-LUUN
teddy|gấu bông|🧸|/ˈted.i/|TE-đi
marble|viên bi|🔵|/ˈmɑːr.bəl/|MAA-bồ
yo-yo|con quay yo-yo|🪀|/ˈjoʊ.joʊ/|YÔU-yôu
rope|dây nhảy|🪢|/roʊp/|rôup
scooter|xe trượt|🛴|/ˈskuː.t̬ɚ/|SKUU-tờ
skateboard|ván trượt|🛹|/ˈskeɪt.bɔːrd/|SKÂYT-bo-rđ
crayon|bút sáp|🖍️|/ˈkreɪ.ɑːn/|KRÂY-on
sticker|nhãn dán|⭐|/ˈstɪk.ɚ/|STIK-kờ
bubbles|bong bóng xà phòng|🫧|/ˈbʌb.əlz/|BUH-bồlz
football|bóng đá|⚽|/ˈfʊt.bɔːl/|FUT-bol
top|con quay|🌀|/tɑːp/|top
plane|máy bay đồ chơi|✈️|/pleɪn/|plâyn
boat|thuyền đồ chơi|⛵|/boʊt/|bôut
`);

const house = makeWords("House", `
house|ngôi nhà|🏠|/haʊs/|hao-s
room|căn phòng|🚪|/ruːm/|ruum
bedroom|phòng ngủ|🛏️|/ˈbed.ruːm/|BEĐ-ruum
bathroom|phòng tắm|🛁|/ˈbæθ.ruːm/|BAETH-ruum
kitchen|nhà bếp|🍳|/ˈkɪtʃ.ən/|KICH-chần
hall|hành lang|🚪|/hɔːl/|hol
door|cửa ra vào|🚪|/dɔːr/|đo-r
window|cửa sổ|🪟|/ˈwɪn.doʊ/|WIN-đôu
wall|bức tường|🧱|/wɔːl/|wol
floor|sàn nhà|🟫|/flɔːr/|flo-r
roof|mái nhà|🏠|/ruːf/|ruuf
bed|giường|🛏️|/bed/|beđ
table|cái bàn|🪑|/ˈteɪ.bəl/|TÂY-bồ
sofa|ghế sofa|🛋️|/ˈsoʊ.fə/|SÔU-fờ
lamp|đèn bàn|💡|/læmp/|laemp
clock|đồng hồ|🕰️|/klɑːk/|klok
mirror|gương|🪞|/ˈmɪr.ɚ/|MIR-rờ
television|ti vi|📺|/ˈtel.ə.vɪʒ.ən/|TE-lờ-vi-zhần
fridge|tủ lạnh|🧊|/frɪdʒ/|frij
oven|lò nướng|♨️|/ˈʌv.ən/|UH-vần
cup|cốc|☕|/kʌp/|cấp
plate|cái đĩa|🍽️|/pleɪt/|plây-t
spoon|thìa|🥄|/spuːn/|spuun
fork|nĩa|🍴|/fɔːrk/|fo-rk
key|chìa khóa|🔑|/kiː/|kii
`);

const clothes = makeWords("Clothes", `
shirt|áo sơ mi|👕|/ʃɝːt/|shơ-t
T-shirt|áo phông|👕|/ˈtiː.ʃɝːt/|TII-shơ-t
dress|váy liền|👗|/dres/|đres
skirt|chân váy|👗|/skɝːt/|skơ-t
pants|quần dài|👖|/pænts/|paents
shorts|quần short|🩳|/ʃɔːrts/|sho-rts
jeans|quần bò|👖|/dʒiːnz/|jiinz
coat|áo khoác|🧥|/koʊt/|kôut
jacket|áo khoác ngắn|🧥|/ˈdʒæk.ɪt/|JAK-kit
sweater|áo len|🧶|/ˈswet̬.ɚ/|SWE-tờ
shoe|chiếc giày|👟|/ʃuː/|shuu
shoes|đôi giày|👟|/ʃuːz/|shuuz
sock|chiếc tất|🧦|/sɑːk/|sok
socks|đôi tất|🧦|/sɑːks/|soks
hat|mũ|👒|/hæt/|haet
cap|mũ lưỡi trai|🧢|/kæp/|kaep
scarf|khăn quàng|🧣|/skɑːrf/|skaa-rf
glove|găng tay|🧤|/ɡlʌv/|glâv
glasses|kính mắt|👓|/ˈɡlæs.ɪz/|GLAS-siz
belt|thắt lưng|🧷|/belt/|belt
pocket|túi áo quần|👖|/ˈpɑː.kɪt/|PO-kit
button|cúc áo|🔘|/ˈbʌt̬.ən/|BUH-tần
uniform|đồng phục|🧑‍🎓|/ˈjuː.nə.fɔːrm/|YUU-nờ-fo-rm
pajamas|đồ ngủ|🥱|/pəˈdʒɑː.məz/|pờ-JAA-mờz
boots|đôi ủng|🥾|/buːts/|buuts
`);

const actions = makeWords("Actions", `
run|chạy|🏃|/rʌn/|rân
walk|đi bộ|🚶|/wɔːk/|wok
jump|nhảy|🤸|/dʒʌmp/|jâmp
sit|ngồi|🪑|/sɪt/|sit
stand|đứng|🧍|/stænd/|staenđ
eat|ăn|😋|/iːt/|iit
drink|uống|🥤|/drɪŋk/|đrink
sleep|ngủ|😴|/sliːp/|sliip
wake|thức dậy|⏰|/weɪk/|uâyk
play|chơi|🎮|/pleɪ/|plây
sing|hát|🎤|/sɪŋ/|sing
dance|nhảy múa|💃|/dæns/|đaens
draw|vẽ|🎨|/drɔː/|đro
paint|tô màu|🖌️|/peɪnt/|pâynt
open|mở|📖|/ˈoʊ.pən/|ÔU-pần
close|đóng|🚪|/kloʊz/|klôuz
look|nhìn|👀|/lʊk/|luk
see|nhìn thấy|👁️|/siː/|sii
hear|nghe thấy|👂|/hɪr/|hia-r
listen|lắng nghe|🎧|/ˈlɪs.ən/|LI-sần
talk|nói chuyện|💬|/tɔːk/|tok
say|nói|🗣️|/seɪ/|sây
give|đưa cho|🎁|/ɡɪv/|giv
take|cầm lấy|🤲|/teɪk/|tâyk
help|giúp đỡ|🤝|/help/|help
`);

const feelings = makeWords("Feelings", `
happy|vui|😊|/ˈhæp.i/|HAE-pi
sad|buồn|😢|/sæd/|saeđ
angry|tức giận|😠|/ˈæŋ.ɡri/|ANG-gri
scared|sợ hãi|😨|/skerd/|ske-rđ
afraid|lo sợ|😟|/əˈfreɪd/|ờ-FRÂYĐ
tired|mệt|🥱|/taɪrd/|tai-rđ
sleepy|buồn ngủ|😴|/ˈsliː.pi/|SLII-pi
hungry|đói|🤤|/ˈhʌŋ.ɡri/|HUNG-gri
thirsty|khát|🥤|/ˈθɝː.sti/|THƠ-sti
excited|hào hứng|🤩|/ɪkˈsaɪ.t̬ɪd/|ik-SAI-tiđ
surprised|ngạc nhiên|😮|/sɚˈpraɪzd/|sờ-PRAIZĐ
worried|lo lắng|😟|/ˈwɝː.id/|WƠ-riđ
shy|ngại ngùng|☺️|/ʃaɪ/|shai
brave|dũng cảm|🦸|/breɪv/|brâiv
calm|bình tĩnh|😌|/kɑːm/|kaam
proud|tự hào|🥹|/praʊd/|prao-đ
kind|tốt bụng|🥰|/kaɪnd/|kai-nđ
nice|dễ mến|🙂|/naɪs/|nai-s
funny|vui tính|😄|/ˈfʌn.i/|FUN-ni
lonely|cô đơn|😔|/ˈloʊn.li/|LÔUN-li
bored|chán|🥱|/bɔːrd/|bo-rđ
well|khỏe|🙂|/wel/|wel
sick|ốm|🤒|/sɪk/|sik
love|yêu thương|❤️|/lʌv/|lâv
feel|cảm thấy|💗|/fiːl/|fiil
`);

const nature = makeWords("Nature", `
sun|mặt trời|☀️|/sʌn/|sân
moon|mặt trăng|🌙|/muːn/|muun
star|ngôi sao|⭐|/stɑːr/|staa-r
sky|bầu trời|🌌|/skaɪ/|skai
cloud|đám mây|☁️|/klaʊd/|klao-đ
tree|cây|🌳|/triː/|trii
flower|bông hoa|🌼|/ˈflaʊ.ɚ/|FLAO-ờ
grass|cỏ|🌱|/ɡræs/|graes
leaf|chiếc lá|🍃|/liːf/|liif
forest|rừng|🌲|/ˈfɔːr.ɪst/|FO-rợst
mountain|núi|⛰️|/ˈmaʊn.tən/|MAO-n-tần
river|dòng sông|🏞️|/ˈrɪv.ɚ/|RI-vờ
sea|biển|🌊|/siː/|sii
ocean|đại dương|🌊|/ˈoʊ.ʃən/|ÔU-shần
lake|hồ nước|🏞️|/leɪk/|lâyk
beach|bãi biển|🏖️|/biːtʃ/|biich
sand|cát|🏝️|/sænd/|saenđ
rock|tảng đá|🪨|/rɑːk/|rok
stone|viên đá|🪨|/stoʊn/|stôun
earth|trái đất|🌍|/ɝːθ/|ơ-th
world|thế giới|🌎|/wɝːld/|wơ-lđ
plant|cây cối|🪴|/plænt/|plaent
seed|hạt giống|🌱|/siːd/|siiđ
wood|gỗ|🪵|/wʊd/|wuđ
fire|lửa|🔥|/faɪr/|fai-r
`);

const vehicles = makeWords("Vehicles", `
car|ô tô|🚗|/kɑːr/|kaa-r
bus|xe buýt|🚌|/bʌs/|bâs
bike|xe đạp|🚲|/baɪk/|bai-k
bicycle|xe đạp|🚲|/ˈbaɪ.sə.kəl/|BAI-sờ-cồ
motorbike|xe máy|🏍️|/ˈmoʊ.t̬ɚ.baɪk/|MÔU-tờ-bai-k
truck|xe tải|🚚|/trʌk/|trấc
taxi|xe taxi|🚕|/ˈtæk.si/|TAK-si
van|xe tải nhỏ|🚐|/væn/|vaen
airplane|máy bay|✈️|/ˈer.pleɪn/|E-r-plâyn
helicopter|trực thăng|🚁|/ˈhel.əˌkɑːp.tɚ/|HE-lờ-kop-tờ
ship|tàu thủy|🚢|/ʃɪp/|ship
subway|tàu điện ngầm|🚇|/ˈsʌb.weɪ/|SUB-uây
tram|tàu điện|🚊|/træm/|traem
rocket|tên lửa|🚀|/ˈrɑː.kɪt/|RO-kit
wheel|bánh xe|🛞|/wiːl/|uiil
road|con đường|🛣️|/roʊd/|rôuđ
street|phố|🛣️|/striːt/|striit
driver|tài xế|🧑‍✈️|/ˈdraɪ.vɚ/|ĐRAI-vờ
ride|đi bằng xe|🚲|/raɪd/|rai-đ
drive|lái xe|🚘|/draɪv/|đrai-v
fly|bay|🛫|/flaɪ/|flai
sail|đi thuyền|⛵|/seɪl/|sâyl
stop|dừng lại|🛑|/stɑːp/|stop
temple|ngôi đền|🏯|/ˈtem.pəl/|TEM-pồ
traffic|giao thông|🚦|/ˈtræf.ɪk/|TRAE-fik
`);

const dailyLife = makeWords("Daily Life", `
wash|rửa|🧼|/wɑːʃ/|uosh
brush|chải|🪥|/brʌʃ/|brấsh
comb|chải tóc|🪮|/koʊm/|kôum
shower|tắm vòi sen|🚿|/ˈʃaʊ.ɚ/|SHAO-ờ
like|thích|👍|/laɪk/|lai-k
cook|nấu ăn|👩‍🍳|/kʊk/|kuk
clean|lau dọn|🧹|/kliːn/|kliin
tidy|dọn gọn|🧺|/ˈtaɪ.di/|TAI-đi
work|làm việc|💼|/wɝːk/|wơ-k
study|học bài|📚|/ˈstʌd.i/|STUH-đi
start|bắt đầu|▶️|/stɑːrt/|staa-t
finish|hoàn thành|🏁|/ˈfɪn.ɪʃ/|FI-nish
go|đi|➡️|/ɡoʊ/|gôu
come|đến|⬅️|/kʌm/|câm
leave|rời đi|👋|/liːv/|liiv
bring|mang đến|👜|/brɪŋ/|bring
carry|mang theo|🎒|/ˈker.i/|KE-ri
buy|mua|🛍️|/baɪ/|bai
use|sử dụng|🛠️|/juːz/|yuuz
make|làm ra|🧁|/meɪk/|mâyk
put|đặt|📥|/pʊt/|put
keep|giữ|🤲|/kiːp/|kiip
wait|chờ|⏳|/weɪt/|uây-t
meet|gặp|🤝|/miːt/|miit
visit|thăm|🏡|/ˈvɪz.ɪt/|VI-zit
`);

const shopping = makeWords("Shopping", `
shop|cửa hàng|🏪|/ʃɑːp/|shop
store|cửa hiệu|🏬|/stɔːr/|sto-r
market|chợ|🛒|/ˈmɑːr.kɪt/|MAA-kit
mall|trung tâm mua sắm|🏬|/mɔːl/|mol
money|tiền|💵|/ˈmʌn.i/|MUH-ni
coin|đồng xu|🪙|/kɔɪn/|koin
price|giá tiền|🏷️|/praɪs/|prai-s
cheap|rẻ|🏷️|/tʃiːp/|chiip
expensive|đắt|💎|/ɪkˈspen.sɪv/|ik-SPEN-siv
cash|tiền mặt|💵|/kæʃ/|kaesh
cart|xe đẩy hàng|🛒|/kɑːrt/|kaa-t
basket|cái giỏ|🧺|/ˈbæs.kɪt/|BAS-kit
customer|khách hàng|🧑|/ˈkʌs.tə.mɚ/|CUS-tờ-mờ
seller|người bán|🧑‍💼|/ˈsel.ɚ/|SE-lờ
sale|đợt giảm giá|🏷️|/seɪl/|sâyl
size|kích cỡ|📐|/saɪz/|sai-z
small|cỡ nhỏ|🤏|/smɔːl/|smol
medium|cỡ vừa|👌|/ˈmiː.di.əm/|MII-đi-ầm
large|cỡ lớn|👐|/lɑːrdʒ/|laa-j
pay|trả tiền|💳|/peɪ/|pây
cost|có giá|💰|/kɔːst/|kost
change|tiền thừa|🪙|/tʃeɪndʒ/|châynj
gift|món quà|🎁|/ɡɪft/|gift
box|cái hộp|📦|/bɑːks/|boks
receipt|hóa đơn|🧾|/rɪˈsiːt/|ri-SIIT
`);

const weather = makeWords("Weather", `
weather|thời tiết|🌤️|/ˈweð.ɚ/|UE-thờ
sunny|có nắng|☀️|/ˈsʌn.i/|SUN-ni
rainy|có mưa|🌧️|/ˈreɪ.ni/|RÂY-ni
cloudy|nhiều mây|☁️|/ˈklaʊ.di/|KLAO-đi
windy|nhiều gió|🌬️|/ˈwɪn.di/|WIN-đi
snowy|có tuyết|🌨️|/ˈsnoʊ.i/|SNÔU-i
hot|nóng|🥵|/hɑːt/|hot
warm|ấm|🌤️|/wɔːrm/|uo-rm
cool|mát|😎|/kuːl/|kuul
cold|lạnh|🥶|/koʊld/|kôulđ
rain|mưa|🌧️|/reɪn/|râyn
snow|tuyết|❄️|/snoʊ/|snôu
wind|gió|🌬️|/wɪnd/|uinđ
storm|bão|⛈️|/stɔːrm/|sto-rm
thunder|sấm|🌩️|/ˈθʌn.dɚ/|THUN-đờ
lightning|chớp|⚡|/ˈlaɪt.nɪŋ/|LAIT-ning
fog|sương mù|🌫️|/fɑːɡ/|fog
ice|băng|🧊|/aɪs/|ai-s
temperature|nhiệt độ|🌡️|/ˈtem.prə.tʃɚ/|TEM-prờ-chờ
season|mùa|🍂|/ˈsiː.zən/|SII-zần
spring|mùa xuân|🌸|/sprɪŋ/|spring
summer|mùa hè|☀️|/ˈsʌm.ɚ/|SUM-mờ
autumn|mùa thu|🍂|/ˈɔː.t̬əm/|O-tầm
winter|mùa đông|⛄|/ˈwɪn.tɚ/|WIN-tờ
umbrella|ô che mưa|☂️|/ʌmˈbrel.ə/|ầm-BRE-lờ
`);

const time = makeWords("Time", `
time|thời gian|⏰|/taɪm/|tai-m
day|ngày|🌞|/deɪ/|đây
night|đêm|🌙|/naɪt/|nai-t
morning|buổi sáng|🌅|/ˈmɔːr.nɪŋ/|MO-r-ning
afternoon|buổi chiều|🌤️|/ˌæf.tɚˈnuːn/|af-tờ-NUUN
evening|buổi tối|🌆|/ˈiːv.nɪŋ/|IIV-ning
today|hôm nay|📅|/təˈdeɪ/|tờ-ĐÂY
tomorrow|ngày mai|➡️|/təˈmɑːr.oʊ/|tờ-MO-rôu
yesterday|hôm qua|⬅️|/ˈjes.tɚ.deɪ/|YES-tờ-đây
week|tuần|🗓️|/wiːk/|uiik
month|tháng|📆|/mʌnθ/|mânth
year|năm|🎆|/jɪr/|yia-r
Monday|thứ Hai|1️⃣|/ˈmʌn.deɪ/|MUN-đây
Tuesday|thứ Ba|2️⃣|/ˈtuːz.deɪ/|TUUZ-đây
Wednesday|thứ Tư|3️⃣|/ˈwenz.deɪ/|UENZ-đây
Thursday|thứ Năm|4️⃣|/ˈθɝːz.deɪ/|THƠZ-đây
Friday|thứ Sáu|5️⃣|/ˈfraɪ.deɪ/|FRAI-đây
Saturday|thứ Bảy|6️⃣|/ˈsæt̬.ɚ.deɪ/|SA-tờ-đây
Sunday|Chủ nhật|7️⃣|/ˈsʌn.deɪ/|SUN-đây
hour|giờ|🕐|/aʊr/|ao-ờ
minute|phút|⏱️|/ˈmɪn.ɪt/|MI-nit
early|sớm|🐓|/ˈɝː.li/|Ơ-li
late|muộn|⌛|/leɪt/|lây-t
now|bây giờ|👇|/naʊ/|nao
soon|sớm thôi|🔜|/suːn/|suun
`);

const places = makeWords("Places", `
park|công viên|🏞️|/pɑːrk/|paa-k
zoo|sở thú|🦒|/zuː/|zuu
farm|nông trại|🚜|/fɑːrm/|faa-m
hospital|bệnh viện|🏥|/ˈhɑː.spɪ.t̬əl/|HOS-pi-tồ
clinic|phòng khám|🩺|/ˈklɪn.ɪk/|KLI-nik
bank|ngân hàng|🏦|/bæŋk/|baengk
station|nhà ga|🚉|/ˈsteɪ.ʃən/|STÂY-shần
restaurant|nhà hàng|🍽️|/ˈres.tə.rɑːnt/|RES-tờ-ront
cafe|quán cà phê|☕|/kæˈfeɪ/|ka-FÂY
cinema|rạp chiếu phim|🎬|/ˈsɪn.ə.mə/|SI-nờ-mờ
museum|bảo tàng|🏛️|/mjuˈziː.əm/|myu-ZII-ầm
playground|sân chơi|🛝|/ˈpleɪ.ɡraʊnd/|PLÂY-grao-nđ
pool|hồ bơi|🏊|/puːl/|puul
garden|khu vườn|🌻|/ˈɡɑːr.dən/|GAA-đần
city|thành phố|🏙️|/ˈsɪt̬.i/|SI-ti
town|thị trấn|🏘️|/taʊn/|tao-n
village|làng|🏡|/ˈvɪl.ɪdʒ/|VI-lij
country|đất nước|🗺️|/ˈkʌn.tri/|CUN-tri
airport|sân bay|🛫|/ˈer.pɔːrt/|E-r-po-t
hotel|khách sạn|🏨|/hoʊˈtel/|hôu-TEL
office|văn phòng|🏢|/ˈɑː.fɪs/|O-fis
bakery|tiệm bánh|🥐|/ˈbeɪ.kɚ.i/|BÂY-kờ-ri
supermarket|siêu thị|🛒|/ˈsuː.pɚˌmɑːr.kɪt/|SUU-pờ-maa-kit
church|nhà thờ|⛪|/tʃɝːtʃ/|chơ-ch
bridge|cây cầu|🌉|/brɪdʒ/|brij
`);

const opposites = makeWords("Opposites", `
big|to|🐘|/bɪɡ/|big
tiny|tí hon|🐜|/ˈtaɪ.ni/|TAI-ni
tall|cao|🦒|/tɔːl/|tol
short|thấp hoặc ngắn|📏|/ʃɔːrt/|sho-t
long|dài|🐍|/lɔːŋ/|long
fast|nhanh|🐆|/fæst/|faest
slow|chậm|🐢|/sloʊ/|slôu
young|trẻ|🧒|/jʌŋ/|yâng
old|già hoặc cũ|👴|/oʊld/|ôulđ
new|mới|✨|/nuː/|nuu
good|tốt|👍|/ɡʊd/|guđ
bad|xấu hoặc không tốt|👎|/bæd/|baeđ
right|đúng hoặc bên phải|➡️|/raɪt/|rai-t
wrong|sai|❌|/rɔːŋ/|rong
easy|dễ|🙂|/ˈiː.zi/|II-zi
hard|khó|🧗|/hɑːrd/|haa-rđ
full|đầy|🥛|/fʊl/|ful
empty|trống rỗng|🫙|/ˈemp.ti/|EM-ti
wet|ướt|💦|/wet/|uet
dry|khô|🏜️|/draɪ/|đrai
inside|bên trong|📥|/ˌɪnˈsaɪd/|in-SAIĐ
outside|bên ngoài|📤|/ˌaʊtˈsaɪd/|ao-t-SAIĐ
up|lên|⬆️|/ʌp/|ấp
down|xuống|⬇️|/daʊn/|đao-n
same|giống nhau|🟰|/seɪm/|sâym
`);

export const words: Word[] = [
  ...family, ...animals, ...food, ...colors, ...numbers,
  ...body, ...school, ...toys, ...house, ...clothes,
  ...actions, ...feelings, ...nature, ...vehicles, ...dailyLife,
  ...shopping, ...weather, ...time, ...places, ...opposites
];

export const wordsById = new Map(words.map((word) => [word.id, word]));
