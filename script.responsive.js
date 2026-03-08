const iconPlay = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>`;
const iconPause = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

const playground = document.getElementById('playground');
const bottomBar = document.getElementById('bottom-bar');
const modal = document.getElementById('dynamic-modal');
const overlay = document.getElementById('modal-overlay');
const stepPass = document.getElementById('step-password');
const stepContent = document.getElementById('step-content');
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const musicCover = document.getElementById('music-cover');
const pwdInput = document.getElementById('pwd-input');

const MOBILE_BREAKPOINT = 768;

// TẠO HIỆU ỨNG HOA ANH ĐÀO
function createSakuraPetals() {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        petal.style.left = Math.random() * 100 + 'vw';

        const size = Math.random() * 8 + 6;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = (Math.random() * 5 + 6) + 's';

        container.appendChild(petal);
        setTimeout(() => petal.remove(), 12000);
    }, 400);
}
createSakuraPetals();

function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
}

function isMobileLayout() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getBottomBarHeight() {
    return bottomBar ? bottomBar.offsetHeight || 88 : 88;
}

function getPlaygroundHeight() {
    return Math.max(320, window.innerHeight - getBottomBarHeight());
}

function getModalClosedSize() {
    return isMobileLayout()
        ? { width: Math.min(window.innerWidth * 0.9, 340), height: 260 }
        : { width: 350, height: 280 };
}

function getEnvelopeSize() {
    return isMobileLayout()
        ? { width: Math.min(window.innerWidth * 0.9, 340), height: Math.min(window.innerHeight * 0.28, 220) }
        : { width: 350, height: 230 };
}

function getExpandedModalSize() {
    if (isMobileLayout()) {
        return {
            width: Math.min(window.innerWidth * 0.94, 460),
            height: Math.min(window.innerHeight * 0.82, 780)
        };
    }

    return {
        width: Math.min(window.innerWidth * 0.86, 900),
        height: Math.min(window.innerHeight * 0.78, 520)
    };
}

// DỮ LIỆU BẠN BÈ
const rawDataList =[
    { fullName: "Trần Hà Minh Anh", dob: "06/01/2008", password: "minhanh0601", songTitle: "Bình yên", artistName: "Vũ", message: "Thời gian trôi qua thật nhanh nhỉ? Mới đây mà đã gần ba năm, dù thực ra là đã đồng hành cùng nhau từ lâu lắm rồi. Mới ngày nào còn gặp nhau khi đang thi kể chuyện ở trường cấp một, mà giờ ta sắp phải bước trên con đường riêng của mỗi người.<br><br>Từ lần đầu tiên gặp đến tận ngày hôm nay, Minh Anh luôn là một người điềm tĩnh, khiêm tốn và vô cùng chăm chỉ. Dù sống kỷ luật và kỹ tính, Minh Anh vẫn luôn là một người hòa đồng và có tinh thần trách nhiệm đối với mọi người. Trải qua từng ấy thời gian, biết được bao nhiêu bí mật động trời của nhau, thậm chí đôi lúc còn hơi \"báo\" nhau, nhưng mình tin rằng chúng ta cũng đã là những người bạn tốt trong những năm tháng qua.<br><br>Thời gian còn lại cũng không nhiều, đây có thể là năm cuối cùng mà mình ngồi ở đây để viết những lời nhắn nhủ cho bạn. Nhân dịp 8/3 năm nay, mình xin thay mặt cánh nam giới trong lớp, chúc người bạn \"cựu K-pop\" của chúng mình càng xinh đẹp, dịu dàng; luôn tự tin, mãi giữ vững phong độ học tập, và đạt được nhiều thành công trên con đường mà bạn sắp phải bước đi trong tương lai nhé! Cảm ơn vì bạn đã trở thành một mảnh ghép không thể thiếu trong tuổi học trò của mình!", hashtags:["#TrachNhiem", "#NoiTam", "#NhayCam"] },
    { fullName: "Hồ Trần Diệp Ngân", dob: "18/01/2008", password: "diepngan1801", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "Gửi Diệp Ngân - quý cô mộc gia,<br><br>Mới ngày nào lớp 10 cô gái Diệp Ngân bé bỏng ngoan xinh iu nay đã trở thành một thiếu nữ tuổi 18 toát lên vẻ quý phái, sang trọng. Một Diệp Ngân rất riêng, rất cá tính. CHƯA BAO GIỜ mình thấy Diệp Ngân dận dữ với ai cả, rất dễ thương và hiền lành, với tất cả mọi người. Một con người dễ gần, thân thiện, đáng yêu nhưng cũng rất quyền lực.<br><br>Còn hơn 90 ngày nữa là đến ngày chúng ta tạm biệt rồi. Chúc cho cô gái họ Hồ của chúng ta mãi xinh đẹp, mãi hạnh phúc như những kỉ niệm của 1000 ngày thanh xuân. Mong bạn sẽ vẫn luôn giữ được sự dịu dàng, nhẹ nhàng và đầy tốt bụng, sẽ vẫn được mọi người yêu thương và tin tưởng trong mọi công việc. Về phần học tập, chúc cho tfanihihi sẽ hoàn thành tốt mọi bài thi, trở thành thủ khoa trong lòng mọi người. Vạn điều như ý sẽ tới với cô gái xinh đẹp dễ thương! ❤️❤️❤️<br><br>P/s: À thêm cái nữa là sớm có được người che chở đầu tiên trong đời nhí hí hí.<br><br>Từ: Đại Lộ, Bong Bóng Heli, JagaVlog Mukbang, 36+1, Chú Bộ Đội Bullied, Tiểu Cẩu Quyền Quý, Ô Chin Chin, Em \"xúc xích\", Tiramisu Dubai Chocolate Cake.", hashtags:["#DeThuong", "#VuiVe", "#Ngau"] },
    { fullName: "Nguyễn Thị Hà Linh", dob: "12/07/2008", password: "halinh1207", songTitle: "2AM", artistName: "Justatee, BigDaddy", message: "Thời gian như thoi đưa, từ những ngày đầu tiên hùa nhau bầu lớp trưởng để rồi qua 3 năm nhanh như một cái chớp mắt. Chỉ chút nữa thôi, chuyến tàu mang tên 12 năm đèn sách, 3 năm thanh xuân cấp 3 và trọn vẹn 1000 ngày gắn bó sẽ chính thức cập bến…<br><br>Hà Linh đối với mình vẫn ấn tượng nhất là tinh thần lạc quan, vô lo vô nghĩ, dù là trong hoàn cảnh nào đi nữa. Bạn rất có khả năng chỉ huy, mang lại cho lớp mình nhiều giải thưởng, đặc biệt là giai điệu tuổi hồng. Trải qua ba năm học tập với nhau, ấn tượng ấy vẫn chưa bao giờ thay đổi, một con người có thể vì lớp quên thân (vì chơi quên học).<br><br>Đây chắc hẳn sẽ là lần đầu tiên và là lần cuối cùng mình viết cho bạn những dòng chữ này. Nhân ngày 8/3, xin chúc bạn những điều tuyệt vời nhất bên gia đình, bạn bè, bên \"bộ tứ khải huyền\", bên \"thằng ny\",… Mong rằng chặng đường phía trước dẫu có ra sao, bạn vẫn luôn giữ nụ cười lạc quan, rạng rỡ. Chúc cho tương lai của bạn luôn thuận buồm xuôi gió, và hy vọng sau này, dù thời gian có trôi đi, bạn vẫn sẽ cất giữ một góc nhỏ kỷ niệm về chúng mình – những chàng trai A2K28.", hashtags:["#OnAo", "#HoatBat", "#TruaNayAnGi"] },
    { fullName: "Nguyễn Thị Mai Phương", dob: "07/08/2008", password: "maiphuong0708", songTitle: "Swim", artistName: "Chase Atlantic", message: "Hế lô Phương nha,<br><br>Chúng ta đều đã có những kỉ niệm đáng nhớ, ở khu sân sau kí túc xá, ở phòng số 21 dãy D,...<br><br>Đây là cái 8/3 cuối cùng mà bà và cả hội Em Xinh Say 2 được nhận trong suốt 3 năm dưới mái trường Chuyên Hùng Vương này rồi. Nhìn lại hành trình từ lớp 10 lên tận lớp 12, tui thấy bà luôn là một tấm gương để mọi người nhìn vào: học giỏi, chỉn chu với bản thân và cực kỳ trách nhiệm trong mọi việc.<br><br>Nói thiệt là khi ngồi viết những dòng này, tui cũng không biết phải dùng từ ngữ nào để diễn tả hết sự tôn trọng và ngưỡng mộ mà tui dành cho bà. Nhân ngày Quốc tế Phụ nữ, tui muốn gửi đến bà một lời cảm ơn chân thành nhất vì đã luôn là một phần tuyệt vời của tập thể này, một lời chúc cho sức khỏe để bà luôn rạng rỡ, và một lời chúc để bà vững vàng hơn trên con đường mà bà đang đi.<br><br>Người ta nói \"vạn con đường đều dẫn đến thành Roma\", và tui tin chắc con đường của bà chính là một trong số đó - một hành trình rực rỡ và đầy kiêu hãnh. Cố lên nhé!<br><br>From theboysof🅰️2️⃣", hashtags:["#BietLangNghe", "#LinhHoat", "#ThanThien"] },
    { fullName: "Lê Trần Thảo Nguyên", dob: "20/11/2008", password: "thaonguyen2011", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "Thương gửi Thảo Nguyên - cô gái tài sắc vẹn toàn,<br><br>Thảo Nguyên - một cô học sinh năng nổ, xinh đẹp và đầy diệu dàng. Là một niềm tự hào của lớp, Thảo Nguyên không những đem về những thành tích đầy ngưỡng mộ mà còn gâng gũi, thân thiện, sẵn sàng giúp đỡ các bạn trong lớp. 3 năm cấp 3 trôi qua - không chỉ là một quá trình - mà chính là thời gian chứng kiến sự trưởng thành của Nguyên, là khoảnh khắc đáng nhớ chúng mình được cùng bạn cười nói vui vẻ.<br><br>Chúc cho nàng thơ của A2 sẽ theo đuổi thành công với ước mơ du học của bản thân, quan trọng hơn hết là sẽ mãi luôn kiên định, vững vàng trên con đường mà mình đang đi. Mong rằng, mỗi ngày trôi qua đều mang đến hàng ngàn làn nắng ấm áp và hạnh phúc cho bạn. Thảo Nguyên hãy giữ gìn sức khỏe cho mình, biết yêu bản thân mình hơn nhiều nhiều lần nữa nhaaa! 3️⃣6️⃣(Ba điều ước, sáu niềm vui)<br><br>Thân mến,<br><br>9 chàng hiệp sĩ xứ A2K28", hashtags:["#NangNo", "#ChuDong", "#ThamVong"] },
    { fullName: "Lê Ngọc Đài Cát", dob: "03/01/2008", password: "daicat0301", songTitle: "fashion killa", artistName: "asap rocky", message: "Nhìn lại 3 năm qua, điều tôi nể nhất ở bà chính là cái cá tính mạnh mẽ, dám nghĩ dám làm. Sắp tới bà đi du học, xa tụi mình nửa vòng trái đất, nghĩ đến thôi đã thấy hụt hẫng rồi. Nhưng tôi biết, một người bản lĩnh như bà thì ở đâu cũng sống tốt và tỏa sáng được thôi. Chúc Cát lên đường bình an, chân cứng đá mềm nhé. Đi xa chắc chắn sẽ có lúc vất vả, nhưng tôi tin là bà vẫn sẽ luôn mạnh mẽ, vượt qua mọi khó khăn. Đợi ngày bà mang thành công trở về, tụi mình lại tụ tập nhé!", hashtags:["#Lowkey", "#Niche", "#BrainRot"] },
    { fullName: "Phạm Nguyễn Gia Linh", dob: "12/03/2008", password: "gialinh1203", songTitle: "Wind", artistName: "Akeboshi", message: "Cuốn phim thanh xuân quay nhanh đến nghẹn ngào. Từ khung hình đầu tiên gặp nhau, thoắt cái đã vội chuyển sang cảnh cuối: hành trình 12 năm cầm bút, 3 năm gửi gắm thanh xuân, và hơn 1000 ngày có nhau... dần dần khép lại.<br><br>Nhắc tới Gia Linh là phải nhắc đến DorD. Mỗi lần bạn luyện tập, lên bài, hay đứng trên sân khấu trước hàng trăm đôi mắt, mọi người đều phải ồ lên trước độ công phu của bài diễn mà bạn cùng đồng đội đã gây dựng nên. Mình tin rằng, bạn là một con người cần cù, chịu khó, đặc biệt là đối với những gì mà mình yêu thích.<br><br>Đây chắc hẳn sẽ là lần đầu tiên và là lần cuối cùng mình viết cho bạn những dòng chữ này. Nhân ngày 8/3, xin chúc bạn những điều tuyệt vời nhất bên gia đình, bạn bè, bên \"bộ tứ khải huyền\", bên \"thằng ny\",… Mong rằng bạn sẽ luôn giữ mãi ngọn lửa cháy bỏng với đam mê. Chúc cho tương lai của bạn luôn tràn ngập niềm vui và hy vọng sau này, dù thời gian có trôi đi, bạn vẫn sẽ cất giữ một góc nhỏ kỷ niệm về chúng mình – những chàng trai A2K28.", hashtags:["#CoolNgau", "#LanhLung"] },
    { fullName: "Phạm Bảo Linh", dob: "03/11/2008", password: "baolinh0311", songTitle: "toronto 2014", artistName: "daniel caesar", message: "Bảo Linh có thư từ trai lớp 12A2 nè!!<br><br>Trải qua 3 năm học chung với nhau òi, blin luôn rất là năng lượng, vui vẻ và vô cùng hòa đồng với mọi người, thi thoảng rất hay pha trò và có mấy cái sound effects cute vili. Với lại là thấy blin siu cấp chăm chỉ và cố gắng ở mọi lúc luôn á, từ học tập nè, lúc làm staff hvc hay là cả tập giai điệu tuổi hồng nữa, luôn là người ở lại làm việc hay tập đến cuối cùng rồi mới về. Những đìu đó làm tụi mình ấn tượng với blin vô cùng luôn á.<br><br>Nhân dịp 8/3 năm nay, chúc blin luôn luôn vui vẻ, hạnh phúc, đạt được kết quả cao trong kì thi sắp tới và đạt được điều mình mong muốn nhen.<br><br>Mong blin về sau đầu ít tiêu cực, lòng mang cốt khí, ngang thẳng ưu tư, trong tim đầy nắng.<br><br>Hy vọng về sau tụi mình lại được gặp nhau.<br><br>– From the bottom of our 9 floriculturists' hearts –🐻‍❄️", hashtags:["#AmAp", "#AmTham", "#NgheSi"] },
    { fullName: "Thái Trần Bảo Châu", dob: "26/11/2008", password: "baochau2611", songTitle: "chẳng nói nên lời", artistName: "Hoàng Dũng", message: "Knock knock! Xin chào Bảo Châu, các bạn nam của 12A2 đây.<br><br>Trải qua 3 năm học chung với nhau rồi nè, đối với các bạn nam lớp mình, bchau luôn là một bạn rất là… bạn ấy rồi. Nói chứ, bchau luôn học rất chăm, rất dỏi, rất vui vẻ và hòa đồng với tất cả mọi người luôn á. Là \"cá thể gơ phố vượt trội\" trong lớp nhưng mà lại im ắng lạ kì (so với Pún Lèo). Dù thế thì bchau vẫn cực kì có trách nhiệm và nghiêm túc với công việc được giao, có lẽ thế nên để lại một ấn tượng sâu đậm trong lòng tụi mình.<br><br>Nhân dịp 8/3 năm nay, chúc Bảo Châu luôn xinh đẹp, vui vẻ, hạnh phúc, đạt được kết quả thật cao trong kì thi sắp tới và chạm tay được vào điều mình hằng mong muốn nhen.<br><br>– 9 chàng hiệp sĩ mộng mơ của A2 –", hashtags:["#DiemDam", "#ChanThanh", "#HoaDong"] },
    { fullName: "Hà Thị Ánh Dương", dob: "27/01/2008", password: "anhduong2701", songTitle: "Tumblr Girls", artistName: "G-Eazy", message: "Đúng như câu nói quen thuộc \"time flies\", thời gian trôi qua nhanh đến mức đôi khi mình còn chưa kịp nhận ra. Mới ngày nào chúng mình còn bỡ ngỡ khi bắt đầu học chung, vậy mà thoáng chốc đã ba năm trôi qua. Mình vẫn nhớ lúc bạn nói \"ô m… chung phòng với t nè\", cảm giác khi đó vừa bất ngờ vừa vui. Và giờ đây, chúng ta lại đang cùng nhau cố gắng cho \"trận chiến\" cuối cùng sau hơn 12 năm đèn sách<br><br>Ấn tượng đầu tiên của mình về Ánh Dương là một người rất năng động, vui tính và cởi mở. Bạn lúc nào cũng mang đến bầu không khí thoải mái cho mọi người, đặc biệt là với những màn nhảy hay quay TikTok đầy nhiệt huyết. Đôi khi bạn còn bày trò \"nhây nhây\" khiến cả nhóm cười không ngớt. Thế nhưng phía sau sự hài hước đó là một người rất nghiêm túc trong học tập. Bạn sẵn sàng dành nhiều thời gian và công sức để cố gắng, để bản thân tiến bộ hơn, và đặc biệt là luôn tập trung khi học. Đó cũng là một trong những điều khiến mình ấn tượng nhất ở bạn<br><br>Nhưng rồi cuộc vui nào cũng đến lúc phải khép lại. Có lẽ đây cũng là lần cuối mình ngồi viết và gửi bạn những lời chúc vào những dịp như thế này, vì sau này mỗi người sẽ bước tiếp trên con đường riêng của mình. Nhân ngày 8/3, mình muốn gửi đến bạn những lời chúc tốt đẹp nhất. Chúc bạn luôn tự tự tin, mạnh mẽ nhưng vẫn giữ được sự dịu dàng và duyên dáng vốn có. Mong rằng nụ cười tươi của bạn sẽ luôn hiện diện, mang lại niềm vui và sự ấm áp cho những người xung quanh. Chúc cho cuộc sống của bạn sẽ luôn tràn đầy những khoảnh khắc hạnh phúc, những thành công đáng nhớ và những tình bạn chân thành. Và hãy luôn nhớ rằng, bạn là một người rất đặc biệt và có ý nghĩa đối với thế giới này", hashtags:["#VuiVe", "#ThanThien"] },
    { fullName: "Nguyễn Ngọc Như Hiếu", dob: "22/01/2008", password: "nhuhieu2201", songTitle: "thằng điên", artistName: "justatee", message: "Nhanh quá, phải không? Ba năm nhanh như một cái chớp mắt. 12 năm đèn sách, 3 năm thanh xuân cấp 3 và trọn vẹn 1000 ngày gắn bó sẽ khép lại thành một vùng ký ức không thể nào quên.<br><br>Hiếu đối với mình vẫn ấn tượng nhất là cảm xúc. Mình không tài nào đoán được bạn đang suy nghĩ cái gì…? Lúc thì vui, lúc thì mồm không thèm mở,… Nhưng nhờ đó, nó đã để lại cho mình một ấn tượng khá là \"độc và lạ\" về Hiếu. Bản thân mình thấy Hiếu gần như chẳng bao giờ cày, nhưng mỗi lần cày là gần như \"out trình\". Bạn thuộc tuýp người học ít cũng giỏi, mà học được thì càng giỏi hơn. Trải qua ba năm học tập với nhau, ấn tượng ấy vẫn chưa bao giờ thay đổi, một con người có thể lúc cần học thì chơi, lúc cần chơi thì… vẫn chơi.<br><br>Đây chắc hẳn sẽ là lần đầu tiên và là lần cuối cùng mình viết cho bạn những dòng chữ này. Nhân ngày 8/3, xin chúc bạn những điều tuyệt vời nhất bên gia đình, bạn bè,… Chúc cho Hiếu sẽ luôn vui tươi, hạnh phúc, có đủ tiền tài, danh vọng, người thương,... Hy vọng sau này, dù thời gian có trôi đi, bạn vẫn sẽ cất giữ một góc nhỏ kỷ niệm về chúng mình – những chàng trai A2K28.", hashtags:["#SangNangChieuMua", "#HatCaNgay"] },
    { fullName: "Lê Nhã Thi", dob: "23/04/2008", password: "nhathi2304", songTitle: "Gam màu tím ở rìa thế giới", artistName: "Tùng", message: "Thời gian trôi nhanh thật, chớp mắt cái là đến mấy cột mốc cuối của thời học sinh rồi. Nếu như hồi đầu năm lớp 10, đang còn bỡ ngỡ, chưa biết nhiều về bà thì bây giờ khi đã trải qua 3 năm chung lớp thì tui đã khám phá ra ở bà nhiều điều thú vị. Trước đây, trong mắt tui, bà đúng kiểu \"học bá\" chính hiệu luôn á. Tui siêu nể cái tính kiên trì với kỷ luật của bà, lúc nào cũng thấy bà nỗ lực hết mình với đống bài tập miệt mài kể cả khi trống tiết. Nhưng sau này, tui nhận ra rằng ngoài học siêu đỉnh thì bà còn là một người vô cùng hòa đồng, sống vô tư, và có thể giúp đỡ bạn bè lúc khó khăn.<br><br>Cũng năm cuối cùng tui viết thư cho bà, so với năm lớp 10 thì tui đã bớt khô khốc rồi nhé =)), mong là không làm bà bị hụt hẫng như lớp 10. Thôi thì nhân dịp 8/3 năm nay cũng không biết chúc gì hơn, tui xin thay mặt mấy đứa đực trong lớp, chúc bà luôn giữ vững phong độ \"học bá\", ngày càng xinh đẹp, rạng rỡ và nhớ giữ gìn sức khỏe để còn chinh phục những mục tiêu đã đặt ra nhe, tui tin bà sẽ làm được!", hashtags:["#HoaDong", "#VuiVe"] },
    { fullName: "Nguyễn Trần Minh Uyên", dob: "27/11/2008", password: "minhuyen2711", songTitle: "what if we?", artistName: "emi choi", message: "Ba năm học chung trôi qua nhanh hơn mình tưởng. Từ những ngày đầu còn khá xa lạ trong lớp, đến lúc dần quen với những gương mặt, những câu chuyện nhỏ mỗi ngày, rồi bất ngờ nhận ra rằng chúng ta đã đi cùng nhau gần hết quãng đường thời học sinh. Bây giờ, khi chặng đường hơn 12 năm đèn sách đang dần khép lại, mỗi người đều đang cố gắng hết mình cho bước ngoặt quan trọng phía trước.<br><br>Điều khiến mình nhớ nhất ở Uyên chính là niềm đam mê với âm nhạc, đặc biệt là piano. Mỗi lần nghe bạn chơi đàn, mình luôn có cảm giác rất dễ chịu, như thể những giai điệu ấy có thể làm cho không gian xung quanh trở nên nhẹ nhàng hơn. Để chơi được như vậy chắc chắn không chỉ là năng khiếu, mà còn là sự kiên trì và tình yêu thật sự dành cho âm nhạc. Bên cạnh đó, Uyên cũng là một người khá chăm chỉ và nghiêm túc trong học tập, luôn cố gắng để hoàn thiện bản thân tốt hơn mỗi ngày.<br><br>Ngày 8/3 là dịp ý nghĩa để gửi đến bạn những lời chúc tốt đẹp nhất. Mong rằng Uyên sẽ luôn giữ được niềm đam mê với âm nhạc và tiếp tục để những giai điệu piano trở thành một phần đẹp trong cuộc sống của mình. Chúc mọi ước mơ của bạn sớm trở thành hiện thực, việc học tập và công việc đều thuận lợi, suôn sẻ, và tình cảm luôn ngọt ngào, ấm áp. Bạn xứng đáng nhận được thật nhiều yêu thương, sự trân trọng và hạnh phúc không chỉ trong ngày hôm nay mà còn trên suốt hành trình phía trước.", hashtags:["#BungChay", "#AmTham", "#HoatNao"] },
    { fullName: "Lê Nguyễn Khánh Tiên", dob: "18/09/2008", password: "khanhtien1809", songTitle: "vạn vật như muốn ta bên nhau", artistName: "RIO", message: "Hành trình 3 năm qua, nếu nhớ lại ấn tượng đầu tiên của tớ về cậu thì đó là một cô bạn có vóc dáng nhỏ nhắn, gương mặt dễ thương và khá xinh xắn. Lúc đó cậu trông hơi rụt rè, ít nói và dường như không phải kiểu người sẽ chủ động bắt chuyện với nhiều người. Nhưng càng có dịp tiếp xúc nhiều hơn, tớ mới nhận ra cậu là một người rất cầu toàn và luôn mong muốn mọi việc được làm thật tốt, thật chỉn chu, không chỉ cho bản thân mà còn cho cả những người xung quanh nữa. Chính sự cẩn thận và tinh tế đó khiến tớ dần thấy cậu là một người rất đáng quý.<br><br>Những dịp 8/3 trong hai năm lớp 10 và lớp 11 cũng vì thế mà trở thành những kỷ niệm khá đặc biệt. Đó là những lúc cả lớp cùng nhau chuẩn bị, cùng cười nói và tạo ra những khoảnh khắc rất dễ thương của thời học sinh. Và tớ cũng nhận ra rằng theo thời gian, cậu đã trở nên cởi mở hơn, năng động hơn và thoải mái hơn khi ở bên mọi người.<br><br>Vậy nên nhân ngày 8/3, tớ muốn chúc Tiên sẽ luôn vui vẻ, luôn giữ được nụ cười dễ thương và nguồn năng lượng tích cực của mình. Mong rằng cậu sẽ tiếp tục tự tự tin, tiếp tục theo đuổi những điều mình mong muốn, và vẫn luôn là một người bạn đáng quý như vậy. Chúc Tiên có một ngày 8/3 thật ý nghĩa, thật nhiều niềm vui và luôn được yêu thương. 🌷", hashtags:["#DepGai", "#ThauHieu", "#YNghia"] },
    { fullName: "Huỳnh Nguyễn Thanh Xuân", dob: "07/05/2008", password: "thanhxuan0705", songTitle: "Mastermind", artistName: "Taylor Swift", message: "Nếu phải dùng vài từ để nói về Xuân, tớ nghĩ đó sẽ là hiền lành và dễ mến. Ở Xuân luôn có một sự nhẹ nhàng rất riêng. Ban đầu nhìn cậu, tớ cứ nghĩ cậu là kiểu người khá kiệm lời và ít khi bày tỏ suy nghĩ của mình. Nhưng sau khi có dịp tiếp xúc nhiều hơn, tớ mới nhận ra Xuân thật ra lại khá thoải mái khi chia sẻ ý kiến, chỉ là cậu chọn cách thể hiện rất bình tĩnh và chừng mực thôi. Chính sự điềm đạm đó khiến mọi người cảm thấy rất dễ chịu khi ở bên cạnh cậu.<br><br>Một điều nữa khiến tớ luôn ấn tượng với Xuân là chuyện học tập. Nhìn cậu lúc nào cũng trông rất bình thản, nhưng kết quả học thì đúng kiểu \"học bá ngầm\" của lớp, điểm số toàn 9 với 10. Dù Xuân không phải là người thường xuyên xuất hiện trong các hoạt động náo nhiệt của lớp, nhưng những đóng góp âm thầm của cậu vẫn luôn ở đó. Có thể không quá nổi bật, nhưng lại góp phần làm cho tập thể lớp mình trở nên gắn kết và vui vẻ hơn từng ngày.<br><br>Vì vậy nhân dịp 8/3, tớ muốn gửi đến Xuân những lời chúc thật chân thành. Chúc cậu luôn vui vẻ, giữ mãi sự dịu dàng và bình tĩnh rất đặc trưng của mình. Mong rằng Xuân sẽ tiếp tục học thật tốt, đạt được nhiều điều mà cậu mong muốn và luôn gặp thật nhiều may mắn trên con đường phía trước. Chúc Xuân có một ngày 8/3 thật ý nghĩa và tràn ngập niềm vui nhé! 🌷", hashtags:["#CaiDauLanh", "#BinhTinh", "#KienNhan"] },
    { fullName: "Hồ Bảo Ngọc", dob: "23/11/2008", password: "baongoc2311", songTitle: "Mình gặp lại được không", artistName: "LEZII x MINH HUY x BIKAY", message: "To cô gái nhỏ nhắn xinh xắn đáng yêu Hồ Ngọc,<br><br>Đúng như cái tên \"Bảo Ngọc\", bạn như một viên ngọc từ từ tỏa sáng khi mà càng học cùng nhau thì chúng mình mới càng biết thêm nhiều điều thú vị về bạn. Điều khiến tụi mình bất ngờ chính là sự nhiệt tình và đầy thân thiện, năng lượng tích cực mà Ngọc mang đến cho cả lớp. Một cô gái vừa hát hay, nhảy đẹp mà học cũng siêu siêu đỉnh. Có lẽ, ông trời quá thiên vị cho A2K28 khi có một nhân tố hội tụ đầy đủ những tính từ miêu tả mỹ miều nhất. \"Hihihi\" ❤️<br><br>Chúc Bảo Ngọc của A2 luôn luôn vững vàng trên hành trình của bản thân trong tương lai cũng như giữ lửa với niềm đam mê của mình. Chúc cho bạn sẽ hoàn thành một năm học thật thành công và tham gia các kì thi tiếp theo với tâm thế chiến thắng, đem lại kết quả như bản thân đã hằng mong ước. Mong rằng về sau, chúng mình sẽ có cơ hội để biết thêm nhiều điều về viên pha lê lấp lánh này để từ đó càng gắn kết và gần gũi với nhau hơn nữa nhé! ❤️<br><br>Gửi bởi trái Tym khổng lồ của 9 Anh Trai Say Hi.", hashtags:["#LacQuan", "#DaChieu", "#SangTao"] },
    { fullName: "Đào Thị Phương Thảo", dob: "23/02/2008", password: "phuongthao2302", songTitle: "Daylight", artistName: "Taylor Swift", message: "Thời gian đúng là chẳng chờ đợi ai, mới đó mà chúng ta đã đi cùng nhau đến những cột mốc cuối cùng của thời học sinh rồi. Trong mắt mình, Phương Thảo luôn là một \"siêu nhân\" chính hiệu. Thảo là một người có lối học \"bán sống bán chết\", luôn nỗ lực hết mình với một kỷ luật đáng nể, làm cho mình thấy vừa nể vừa khâm phục khả năng kiên trì siêu phàm của bạn.<br><br>Nhưng điều tuyệt vời nhất ở Thảo chính là dù áp lực học hành có lớn đến đâu, bạn vẫn giữ được sự lạc quan, sống vô tư và luôn sẵn lòng giúp đỡ mọi người xung quanh. Nhìn lại những lúc Thảo tỏa sáng trên sân khấu, mình thấy được một nguồn năng lượng tự do và rực hiểu vô cùng. Một cô gái vừa tự lập, vừa kiên trì lại vừa có tâm hồn đam mê trình diễn như bạn chắc chắn sẽ tiến rất xa.<br><br>Nhân dịp 8/3, mình xin thay mặt cánh nam giới chúc bạn \"dancer\" này của lớp mình luôn giữ vững phong độ nhé! Chúc Thảo ngày càng xinh đẹp, luôn rạng rỡ với nụ cười vô tư ấy, và quan trọng nhất là dù có bận rộn đến mấy cũng nhớ giữ gìn sức khỏe để chinh phục mọi mục tiêu phía trước nhe!", hashtags:["#NangLuong", "#NhietTinh", "#NhayCam"] },
    { fullName: "Trần Huyền Trang", dob: "07/01/2008", password: "huyentrang0701", songTitle: "XO (Only If You Say Yes)", artistName: "ENHYPEN", message: "A: 12A2 QUYẾT TÂM WOKE NHẤT KHÓA 28 CHV<br><br>B: Um hm… Nói đàng hoàng đi<br><br>A: Uhhhhhh okay...<br><br>Qua đoạn hội thoại xàm chấn động trên, tui chỉ muốn khẳng định một điều: \"HÀ QUỲNH CẢNH WOKE NHẤT CHV 🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈\"<br><br>Nghiêm túc lại nè. Đây là những lời chân thành tui gửi đến Huyền Trang aka Quỳnh Cảnh:<br><br>Điều tui ấn tượng nhất ở bà chắc chắn là cái tiểu sử đọc truyện gay dày đặc mà hiếm ai có thể làm được. Từ trước đến giờ, tui chưa thấy ai có thể dành trọn tâm và sức để vừa xem hai người đồng ang hôn nhau, vừa ôm đống đề Kinh tế Pháp luật vô đầu một cách thần sầu như bà. Nhưng không vì thế mà bà không có profile học tập tốt nha, ta nói truyện gay nó lại là chất xúc tác giúp bà tỉnh táo hơn và học vô hơn hẳn. Đúng là một hệ tư tưởng rất riêng biệt!<br><br>Ngoài ra, tui cực kỳ ấn tượng với bộ tính cách cởi mở và hòa đồng của bà. Bà luôn là người đem lại những giá trị tích cực đến cho mọi người xung quanh, luôn vui vẻ và giàu trách nhiệm trong cả công việc trên lớp lẫn trong câu lạc bộ. Có bà ở đâu là ở đó thấy năng lượng gay liền. Đời không gay hồn bay một nửa 🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈.<br><br>Nhân ngày 8/3, tui chúc bà có một bộ sưu tập truyện gay đồ sộ hơn nữa, luôn tích cực, vui vẻ trong cuộc sống và mãi kiên cường trên con đường mình đã chọn nha.<br><br>From theboysof🅰️2️⃣", hashtags:["#CoiMo", "#HoanHi", "#KiemSoat"] },
    { fullName: "Nguyễn Quỳnh Lam", dob: "06/07/2008", password: "quynhlam0607", songTitle: "Join Me In Death", artistName: "HIM", message: "Cảm ơn bà vì 3 năm qua đã luôn là người hoạt bát nhất, khuấy động không khí mỗi khi tụi mình thấy nản. Bà không chỉ vui vẻ mà còn tốt bụng đến mức đôi khi làm tôi thấy cảm động thật sự. Sự nhiệt tình và chân thành của bà chính là chất kết dính cho tình bạn này. Chúc bà sau này ra đời vẫn mãi giữ được sự hoạt bát và tâm hồn thiện lành đó. Một người như bà chắc chắn xứng đáng có được những thành công rực rỡ nhất!", hashtags:["#VuiVe", "#MongManh", "#HanhTrinhTruongThanh"] },
    { fullName: "Trần Hoàng Anh Thư", dob: "03/01/2008", password: "anhthu0301", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "Thời gian vèo cái là hết ba năm, sắp mỗi đứa một ngả rồi. Nhắc đến Anh Thư, tao chỉ nhớ ngay đến hình ảnh một bà sao đỏ rất \"nghiêm túc\", và làm việc rất trách nhiệm nhe. Dù quyền lực đấy, cơ mà thấy mày cũng bựa nhất nhì cái lớp này, lúc nào cũng năng động và biết cách khuấy động không khí và đem lại năng lượng tích cực cho mọi người.<br><br>Tao thực sự nể khả năng trình bày tự tin, vip pro của mày trước đám đông, trái ngược hoàn toàn với lúc nhàn rỗi chỉ thấy mày cũng chill chill. Một đứa vừa có bản lĩnh, hoạt động năng nổ thế đã làm cho cái lớp này phần nào bớt đi sự nhàm chán. Cảm ơn mày vì đã là một \"thế lực\" vừa uy tín vừa vui vẻ trong suốt những năm tháng học trò của tao.<br><br>Nhân dịp 8/3, thay mặt cánh nam giới trong lớp, chúc cho Anh Thư luôn giữ vững phong độ này nhe. Chúc mày ngày càng xinh đẹp, luôn tự tin như trên bục giảng hay trên sân khấu. Nhớ giữ gìn sức khỏe để theo đuổi mọi ước mơ nhé và tỏa sáng rực rỡ nhé!", hashtags:["#NangDong", "#HoatBat", "#VuiVe"] },
    { fullName: "Cù Hoàn Mỹ", dob: "06/06/2008", password: "hoanmy0606", songTitle: "Fragrance", artistName: "茉ひる", message: "3 năm học vừa qua sẽ nhạt nhẽo lắm nếu thiếu đi cái tính cách sôi nổi và quyết liệt của bà. Tôi vẫn nhớ những lúc bà \"cháy\" hết mình trong mọi hoạt động, cá tính đến mức không lẫn vào đâu được. Chúc bà trong hành trình sắp tới vẫn luôn giữ được ngọn lửa nhiệt huyết đó để chinh phục những mục tiêu lớn lao. Cứ tự tin và rực rỡ như hiện tại nhé, thành công chắc chắn sẽ gọi tên bà sớm thôi!", hashtags:["#LucNayLucKia", "#NghiemTuc", "#HeHuoc"] },
    { fullName: "Nguyễn Thanh Thảo", dob: "28/01/2008", password: "thanhthao2801", songTitle: "嗚呼メクラ", artistName: "鮮血A子ちゃん", message: "Thấm thoắt mà cũng sắp hết ba năm học chung cùng một lớp rồi nhỉ? Nghĩ lại thấy cũng hay, sống lowkey và có phần Emo như mày mà lại là đứa có quả mồm phát ngôn câu nào là gây \"sát thương\" câu đó. Tao đôi lúc cũng thấy sốc nhưng mà xét cho cùng, chính cái tính tình \"nóng như kem\" lại làm mày khác biệt, chẳng lẫn vào đâu được giữa cái lớp này.<br><br>Trải qua từng ấy thời gian, tao thực sự nể cái cách mày đắm chìm vào thế giới riêng của mình từ việc tự học ngoại ngữ, cho đến mấy bộ truyện, văn hóa Nhật Bản mà mày đam mê. Đặc biệt là cái khoản tiếng Nhật, nhìn mày cày cật lực để theo đuổi cái ngôn ngữ khó nhằn đấy, tao tin là mày sớm muộn gì cũng thành \"master\" thôi. Dù mày thích đọc mấy thể loại truyện khá \"lạ\", nhưng tao tôn trọng cái gu độc bản ấy, vì nó mới đúng là chất riêng của Thanh Thảo.<br><br>Thời gian ngồi chung lớp không còn nhiều nữa, chắc đây cũng là lần cuối tao viết mấy dòng này cho mày. Thôi cũng nhân dịp 8/3, chúc mày vẫn cứ ngầu, cứ \"gothic\" và giữ được bản sắc như bây giờ. Chúc mày không chỉ ngày càng pro vip tiếng Nhật mà sớm thành công để cosplay thêm được nhiều char nữa, sống cuộc đời theo phong cách riêng của mày nha.  頑張ってください!", hashtags:["#AntiSocial", "#FreePalestine"] },
    { fullName: "Đặng An Ninh", dob: "14/07/2008", password: "anninh1407", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "Gửi An Ninh,<br><br>Nhân ngày 8/3, tui muốn dành những dòng này để tri ân một mảnh ghép đầy tri thức và chiều sâu của tập thể A2 chúng mình.<br><br>Điều đầu tiên khiến tụi tui thực sự nể phục chính là cái cách bà tỏa sáng rực rỡ ở môn Ngữ văn. Giữa một tập thể đầy cá tính, sự điềm tĩnh và tư duy văn chương sắc sảo của bà luôn tạo nên một sức hút rất riêng, như một tâm hồn nghệ sĩ ẩn sau những con chữ, vừa nhạy bén lại vừa giàu cảm xúc. Nhìn cách bà học và thẩm thấu văn học, tui luôn cảm thấy đó là một tài năng cực kỳ đáng gờm mà không phải ai cũng có được.<br><br>Bên cạnh đó, tui cũng cực kỳ trân trọng sự hiện diện đầy chất lượng của bà trong những cột mốc quan trọng của lớp, mà tiêu biểu nhất chính là Giai Điệu Tuổi Hồng vừa qua. Chính sự đồng hành và nỗ lực của bà ở những thời điểm \"vàng\" như thế đã giúp bức tranh 12A2 thêm phần trọn vẹn và vững chắc hơn rất nhiều.<br><br>Nhân ngày Quốc tế Phụ nữ, tui muốn gửi đến bà một lời cảm ơn vì đã luôn là một phần tuyệt vời của lớp, một lời chúc cho sức khỏe để bà luôn rạng rỡ, và một lời chúc để bà vững vàng hơn trên con đường mà bà đang đi. Tui tin chắc với nội lực và sự thông minh vốn có, con đường dẫn đến \"thành Roma\" của bà chắc chắn sẽ là một hành trình rực rỡ và đầy kiêu hãnh.", hashtags:["#VuiVe", "#HoaDong", "#TotBung"] },
    { fullName: "Nguyễn Như Tâm", dob: "05/02/2008", password: "nhutam0502", songTitle: "With you", artistName: "Hoaprox", message: "Gửi bà Như Tâm,<br><br>Bình thường tui hay gọi là Chấm này Chấm nọ cho vui, nhưng hôm nay cho tui xin phép được gọi tên bà một cách đàng hoàng và trân trọng nhất nha.<br><br>Trong suốt 3 năm dưới mái trường Chuyên Hùng Vương, bà đã gắn bó với lớp mình qua vô số hoạt động, từ những ngày đầu tiên tỉ mẩn vẽ tranh treo lớp cho đến tận dấu mốc mới nhất là Giai Điệu Tuổi Hồng 2026. Đó chính là điều khiến tui ấn tượng nhất về bà: một người luôn hiện diện, luôn đồng hành và gắn bó sâu sắc với từng giai đoạn trong \"tiến trình lịch sử\" của tập thể A2 này.<br><br>Thứ hai, tui cực kỳ nể phục sự nỗ lực không ngừng của bà trong học tập. Từ việc thông thạo tiếng Quảng Đông (你估下我奶奶講咩) đến tài năng hội họa, bà luôn khiến mọi người bất ngờ. Nhưng hơn cả năng khiếu, chính là cách bà luôn tinh tế động viên mọi người xung quanh mỗi khi họ mất động lực (mà tui chính là một ví dụ điển hình đây). Tui luôn có một niềm tin chắc nịch rằng sự chăm chỉ chính là chiếc chìa khóa vạn năng để mở cánh cửa thành Roma, và bà vẫn đang đi rất đúng hướng trên con đường đó.<br><br>Cuối cùng, tui rất ấn tượng với lối sống \"culturally healthy\" của bà - cách bà ăn uống khoa học, ngon lành và đủ chất. Có lẽ chính nhờ sự kỷ luật đó mà lúc nào bà cũng tràn đầy năng lượng tích cực để lan tỏa đến mọi người, đúng chuẩn phong thái của một \"chaebol Hàn Quắc\" thực thụ.<br><br>Nhân ngày 8/3, chúc bà luôn giữ được sức khỏe dồi dào, sự lạc quan vốn có và mãi kiên cường trên con đường mình đã chọn. Cảm ơn bà vì đã là một phần không thể thiếu của A2 tụi mình.<br><br>From theboysof🅰️2️⃣", hashtags:["#Chaebol", "#ChiBayGa"] },
    { fullName: "Thân Thị Phương Trang", dob: "19/01/1984", password: "phuongtrang1901", songTitle: "Một lời chúc nho nhỏ...", artistName: "cô Trang", message: "Kính thưa cô Trang,<br><br>Nhân ngày Quốc tế Phụ nữ 8/3, thay mặt cho tập thể lớp, chúng em xin gửi đến cô những lời chúc tốt đẹp và chân thành nhất. Chúc cô luôn giữ vững ngọn lửa nhiệt huyết, rạng rỡ và hạnh phúc không chỉ trong ngày hôm nay mà trong suốt hành trình \"chèo lái\" con thuyền tri thức của mình.<br><br>Chúng em luôn cảm thấy may mắn khi được là học trò môn Toán của cô. Cách cô giảng dạy không chỉ là những con số khô khan, mà là sự tận tâm và công bằng khi cô luôn kiên nhẫn tạo cơ hội cho mỗi thành viên trong lớp, dù học lực môn Toán ra sao, đều được thử sức và tiến bộ. Ở cương vị giáo viên chủ nhiệm, cô còn là \"hậu phương\" vững chắc, luôn lắng nghe, thấu hiểu và ủng hộ hết mình cho mọi phong trào của lớp, giúp mỗi cá nhân cảm thấy ý kiến của mình luôn được tôn trọng.<br><br>Đặc biệt, lớp mình rất trân trọng những lời khuyên thực tế của cô ngoài trang sách. Những bài học về việc rèn luyện sức khỏe, cách tư duy về thành công tài chính đi đôi với giữ gìn đạo đức là những hành trang quý giá mà cô đã truyền dạy. Cảm ơn cô đã không chỉ dạy chúng em cách giải toán, mà còn dạy cách sống khỏe, sống có ích. Chúc cô luôn dồi dào sức khỏe và luôn là nguồn cảm hứng lớn cho chúng em!", hashtags:["#Mathetics", "#12A2", "#Sức khỏe"] }
];

const cardsData =[];
const numCards = rawDataList.length;
let CARD_SIZE = 0;
let currentClickedIndex = null;
let isModalOpen = false;
let frameCount = 0;

function calculateCardSize() {
    const width = window.innerWidth;
    const height = getPlaygroundHeight();
    const screenArea = width * height;
    const density = isMobileLayout() ? 0.34 : 0.45;
    const areaPerCard = (screenArea * density) / numCards;
    const newSize = Math.sqrt(areaPerCard);

    if (width <= 420) return Math.max(68, Math.min(newSize, 96));
    if (isMobileLayout()) return Math.max(72, Math.min(newSize, 110));
    return Math.max(80, Math.min(newSize, 160));
}

function getPointOnRect(cx, cy, width, height, progress) {
    if (width <= 0 && height <= 0) return { x: cx, y: cy };

    const perimeter = 2 * width + 2 * height;
    let d = progress * perimeter;

    if (d <= width) return { x: cx - width / 2 + d, y: cy - height / 2 };
    d -= width;

    if (d <= height) return { x: cx + width / 2, y: cy - height / 2 + d };
    d -= height;

    if (d <= width) return { x: cx + width / 2 - d, y: cy + height / 2 };
    d -= width;

    return { x: cx - width / 2, y: cy + height / 2 - d };
}

function getFilledRingsLayout() {
    CARD_SIZE = calculateCardSize();

    const w = window.innerWidth;
    const h = getPlaygroundHeight();
    const cx = w / 2;
    const cy = h / 2;
    const paddingMultiplier = isMobileLayout() ? 1.45 : 1.2;

    let availW = Math.max(0, w - CARD_SIZE * paddingMultiplier);
    let availH = Math.max(0, h - CARD_SIZE * paddingMultiplier);
    let rings =[];
    const step = CARD_SIZE * (isMobileLayout() ? 0.9 : 1);

    while (availW > CARD_SIZE * 0.2 && availH > CARD_SIZE * 0.2) {
        const perimeter = 2 * availW + 2 * availH;
        rings.push({ w: availW, h: availH, perimeter });
        availW -= step * 2;
        availH -= step * 2;
    }

    if (rings.length === 0) rings.push({ w: 0, h: 0, perimeter: 1 });

    const totalPerimeter = rings.reduce((sum, ring) => sum + ring.perimeter, 0);
    const targets =[];
    let cardsLeft = numCards;

    rings.forEach((ring, index) => {
        let count = index === rings.length - 1
            ? cardsLeft
            : Math.round(numCards * (ring.perimeter / totalPerimeter));

        if (count === 0 && cardsLeft > 0 && index === rings.length - 1) count = cardsLeft;

        for (let i = 0; i < count; i++) {
            const progress = count > 1 ? i / count : 0.5;
            const pt = getPointOnRect(cx, cy, ring.w, ring.h, progress);
            const jitter = isMobileLayout() ? CARD_SIZE * 0.18 : CARD_SIZE * 0.4;

            targets.push({
                x: pt.x - CARD_SIZE / 2 + (Math.random() - 0.5) * jitter,
                y: pt.y - CARD_SIZE / 2 + (Math.random() - 0.5) * jitter,
                angle: (Math.random() - 0.5) * (isMobileLayout() ? 26 : 60)
            });
        }

        cardsLeft -= count;
    });

    return targets.sort(() => Math.random() - 0.5);
}

function applyModalBaseState() {
    const size = getModalClosedSize();
    modal.style.width = `${size.width}px`;
    modal.style.height = `${size.height}px`;
    modal.style.maxWidth = isMobileLayout() ? '94vw' : '95vw';
    modal.style.maxHeight = isMobileLayout() ? '82vh' : '90vh';
}

let initialTargets = getFilledRingsLayout();
const startCenterX = window.innerWidth / 2;
const startCenterY = getPlaygroundHeight() / 2;

for (let i = 0; i < numCards; i++) {
    const user = rawDataList[i];
    const userId = getInitials(user.fullName);

    const mainImg = `image/cartoon/${userId}_main.jpg`;
    const avtImg = `image/avatar/${userId}.jpg`;
    const audioSrc = `music/${userId}.mp3`;
    const coverImg = `image/music_cover/${userId}_cover.jpg`;

    const sq = document.createElement('div');
    sq.className = 'card';
    sq.style.width = CARD_SIZE + 'px';
    sq.style.height = CARD_SIZE + 'px';
    sq.style.backgroundImage = `url('${mainImg}')`;

    const imgCheck = new Image();
    imgCheck.src = mainImg;
    imgCheck.onerror = () => {
        sq.style.backgroundImage = `url('https://picsum.photos/seed/${userId}/300/300')`;
    };

    const baseZ = numCards - i;
    sq.style.zIndex = baseZ;
    playground.appendChild(sq);

    const startX = startCenterX - (CARD_SIZE / 2) + (Math.random() - 0.5) * 15;
    const startY = startCenterY - (CARD_SIZE / 2) + (Math.random() - 0.5) * 15;
    const startAngle = (Math.random() - 0.5) * 20;

    cardsData.push({
        id: userId,
        element: sq,
        password: user.password,
        fullName: user.fullName,
        dob: user.dob,
        songTitle: user.songTitle || `Bài hát của ${userId}`,
        artistName: user.artistName || `Ca sĩ ${userId}`,
        message: user.message,
        hashtags: user.hashtags ||["#KyNiem", "#ThanhXuan", "#YeuThuong"],
        paths: { mainImg, avtImg, audioSrc, coverImg },
        x: startX,
        y: startY,
        angle: startAngle,
        targetX: initialTargets[i].x,
        targetY: initialTargets[i].y,
        targetAngle: initialTargets[i].angle,
        baseZIndex: baseZ,
        isHovered: false,
        currentScale: 1,
        delay: i * 6
    });

    if (!isMobileLayout()) {
        sq.addEventListener('mouseenter', () => {
            if (!isModalOpen) {
                cardsData[i].isHovered = true;
                sq.style.zIndex = 1000;
            }
        });

        sq.addEventListener('mouseleave', () => {
            if (!isModalOpen) {
                cardsData[i].isHovered = false;
                sq.style.zIndex = cardsData[i].baseZIndex;
            }
        });
    }

    sq.addEventListener('click', () => openModal(i));
}

if (bottomBar) {
    setTimeout(() => {
        bottomBar.classList.add('show');
    }, 2500);
}

applyModalBaseState();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        applyModalBaseState();

        const newTargets = getFilledRingsLayout();
        cardsData.forEach((data, i) => {
            data.element.style.width = CARD_SIZE + 'px';
            data.element.style.height = CARD_SIZE + 'px';
            data.targetX = newTargets[i].x;
            data.targetY = newTargets[i].y;
            data.targetAngle = newTargets[i].angle;
        });

        if (isModalOpen && currentClickedIndex !== null) {
            const expanded = getExpandedModalSize();
            modal.style.width = `${expanded.width}px`;
            modal.style.height = `${expanded.height}px`;
            modal.style.maxWidth = isMobileLayout() ? '94vw' : '95vw';
            modal.style.maxHeight = isMobileLayout() ? '82vh' : '90vh';
        }
    }, 200);
});

function animate() {
    frameCount++;

    if (!isModalOpen) {
        cardsData.forEach(data => {
            const targetScale = (!isMobileLayout() && data.isHovered) ? 1.15 : 1;
            data.currentScale += (targetScale - data.currentScale) * 0.15;

            if (!isMobileLayout() && data.isHovered) {
                data.element.style.borderColor = "#ffffff";
                data.element.style.boxShadow = "0 0 25px 8px rgba(255, 255, 255, 0.7)";
            } else {
                data.element.style.borderColor = "rgba(255, 255, 255, 0.8)";
                data.element.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.6)";
            }

            if (frameCount > data.delay) {
                const speed = isMobileLayout() ? 0.08 : 0.05;
                data.x += (data.targetX - data.x) * speed;
                data.y += (data.targetY - data.y) * speed;
                data.angle += (data.targetAngle - data.angle) * Math.max(0.02, speed * 0.5);
            }

            data.element.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.angle}deg) scale(${data.currentScale})`;
        });
    }

    requestAnimationFrame(animate);
}
animate();

function openModal(index) {
    currentClickedIndex = index;
    isModalOpen = true;

    const data = cardsData[index];
    const rect = data.element.getBoundingClientRect();
    const collapsed = getModalClosedSize();

    stepPass.style.opacity = '0';
    stepPass.style.display = 'none';
    stepContent.style.opacity = '0';
    stepContent.style.display = 'none';
    pwdInput.value = '';
    document.getElementById('error-msg').style.display = 'none';
    modal.classList.remove('content-open');

    const closeBtn = document.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.style.opacity = '1';
        closeBtn.style.pointerEvents = 'auto';
    }

    let normalizedAngle = data.angle % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    else if (normalizedAngle < -180) normalizedAngle += 360;

    modal.style.transition = 'none';
    modal.style.top = rect.top + 'px';
    modal.style.left = rect.left + 'px';
    modal.style.width = CARD_SIZE + 'px';
    modal.style.height = CARD_SIZE + 'px';
    modal.style.transform = `translate(0, 0) rotate(${normalizedAngle}deg) scale(${data.currentScale})`;
    modal.style.backgroundImage = data.element.style.backgroundImage;
    modal.style.backgroundColor = 'transparent';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.style.borderRadius = '15px';

    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';

    void modal.offsetWidth;

    modal.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
    modal.style.width = `${collapsed.width}px`;
    modal.style.height = `${collapsed.height}px`;
    modal.style.maxWidth = isMobileLayout() ? '94vw' : '95vw';
    modal.style.maxHeight = isMobileLayout() ? '82vh' : '90vh';
    modal.style.backgroundImage = 'none';
    modal.style.backgroundColor = '#ffffff';
    modal.style.borderRadius = '18px';

    setTimeout(() => {
        stepPass.style.display = 'block';
        setTimeout(() => {
            stepPass.style.opacity = '1';
            pwdInput.focus();
        }, 50);
    }, 500);
}

function checkPassword() {
    const data = cardsData[currentClickedIndex];
    const pwdValue = pwdInput.value;

    if (pwdValue === data.password) {
        stepPass.style.opacity = '0';
        document.getElementById('error-msg').style.display = 'none';

        document.getElementById('display-name').innerText = data.fullName;
        document.getElementById('display-dob').innerText = data.dob;
        document.getElementById('display-text').innerHTML = data.message;
        document.getElementById('song-title').innerText = data.songTitle;
        document.getElementById('artist-name').innerText = data.artistName;

        const hashtagsContainer = document.getElementById('display-hashtags');
        hashtagsContainer.innerHTML = '';
        if (data.hashtags && data.hashtags.length > 0) {
            data.hashtags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'hashtag';
                span.innerText = tag;
                hashtagsContainer.appendChild(span);
            });
        }

        const avt = document.getElementById('display-avatar');
        avt.src = data.paths.avtImg;
        avt.onerror = () => {
            avt.src = `https://picsum.photos/seed/${data.id}avt/200/200`;
        };

        musicCover.src = data.paths.coverImg;
        musicCover.onerror = () => {
            musicCover.src = `https://picsum.photos/seed/${data.id}cover/100/100`;
        };

        audio.src = data.paths.audioSrc;

        const musicContainer = document.getElementById('music-player-container');
        if (data.songTitle === "Chưa cập nhật" || !data.songTitle) {
            musicContainer.style.display = 'none';
        } else {
            musicContainer.style.display = 'flex';
        }

        setTimeout(() => {
            if (!isModalOpen) return;
            stepPass.style.display = 'none';

            const closeBtn = document.querySelector('.modal-close-btn');
            if (closeBtn) {
                closeBtn.style.opacity = '0';
                closeBtn.style.pointerEvents = 'none';
            }

            const envelopeSize = getEnvelopeSize();
            modal.style.width = `${envelopeSize.width}px`;
            modal.style.height = `${envelopeSize.height}px`;
            modal.style.backgroundColor = 'transparent';
            modal.classList.remove('custom-paper-bg');

            const envWrapper = document.getElementById('envelope-wrapper');
            const envelope3D = document.getElementById('envelope-3d');
            envWrapper.style.display = 'block';
            envelope3D.classList.remove('fade-out');

            // Tăng thời gian chờ mặt trước bao thư từ 600ms lên 1200ms
            setTimeout(() => {
                if (!isModalOpen) return;
                modal.classList.add('custom-paper-bg');
                envelope3D.classList.add('fade-out');

                setTimeout(() => {
                    if (!isModalOpen) return;
                    envWrapper.style.display = 'none';

                    const expanded = getExpandedModalSize();
                    modal.style.width = `${expanded.width}px`;
                    modal.style.height = `${expanded.height}px`;
                    modal.style.maxWidth = isMobileLayout() ? '94vw' : '95vw';
                    modal.style.maxHeight = isMobileLayout() ? '82vh' : '90vh';
                    modal.classList.add('content-open');

                    if (closeBtn) {
                        closeBtn.style.opacity = '1';
                        closeBtn.style.pointerEvents = 'auto';
                    }

                    setTimeout(() => {
                        if (!isModalOpen) return;
                        stepContent.style.display = 'flex';
                        setTimeout(() => {
                            if (!isModalOpen) return;
                            stepContent.style.opacity = '1';
                        }, 100);
                    }, 500);
                }, 400); // Đợi hiệu ứng mờ bao thư
            }, 1200); // Thời gian nhìn thấy bao thư trước khi mở thành thư
        }, 300);
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

pwdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    if (!isModalOpen) return;

    audio.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = iconPlay;

    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    overlay.style.pointerEvents = 'none';

    setTimeout(() => {
        isModalOpen = false;
        modal.classList.remove('content-open', 'custom-paper-bg');

        cardsData.forEach((data) => {
            data.isHovered = false;
            data.element.style.zIndex = data.baseZIndex;
        });

        const envWrapper = document.getElementById('envelope-wrapper');
        const envelope3D = document.getElementById('envelope-3d');
        if (envWrapper) envWrapper.style.display = 'none';
        if (envelope3D) envelope3D.classList.remove('fade-out');

        modal.style.backgroundColor = '#ffffff';
        stepContent.style.display = 'none';
        stepContent.style.opacity = '0';
        stepPass.style.display = 'none';
        stepPass.style.opacity = '0';

        const closeBtn = document.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.style.opacity = '1';
            closeBtn.style.pointerEvents = 'auto';
        }

        applyModalBaseState();
    }, 400);
}

function downloadMainImage() {
    if (currentClickedIndex === null) return;

    const imgPath = cardsData[currentClickedIndex].paths.mainImg;
    const a = document.createElement('a');
    a.href = imgPath;
    a.download = `${cardsData[currentClickedIndex].id}_main.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function togglePlay() {
    if (audio.paused) {
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    playBtn.innerHTML = iconPause;
                })
                .catch(err => {
                    console.error("Audio error:", err);
                });
        }
    } else {
        audio.pause();
        playBtn.innerHTML = iconPlay;
    }
}

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            progressBar.max = audio.duration;
            progressBar.value = audio.currentTime;

            const curMins = Math.floor(audio.currentTime / 60);
            const curSecs = Math.floor(audio.currentTime % 60);
            document.getElementById('curr-time').innerText = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        const totMins = Math.floor(audio.duration / 60);
        const totSecs = Math.floor(audio.duration % 60);
        document.getElementById('total-time').innerText = `${totMins}:${totSecs < 10 ? '0' : ''}${totSecs}`;
    });

    audio.addEventListener('ended', () => {
        playBtn.innerHTML = iconPlay;
        audio.currentTime = 0;
    });
}

if (progressBar) {
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });
}

document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);