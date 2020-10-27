const bagua = '乾兌離震巽坎艮坤';
const tu2 = '⚊⚋○ㄨ';
const tu4 = '⚌⚍⚎⚏';
const tu8 = '☰☱☲☳☴☵☶☷';
const tu64 = '䷀䷁䷂䷃䷄䷅䷆䷇䷈䷉䷊䷋䷌䷍䷎䷏䷐䷑䷒䷓䷔䷕䷖䷗䷘䷙䷚䷛䷜䷝䷞䷟䷠䷡䷢䷣䷤䷥䷦䷧䷨䷩䷪䷫䷬䷭䷮䷯䷰䷱䷲䷳䷴䷵䷶䷷䷸䷹䷺䷻䷼䷽䷾䷿';
const tiangan = '甲乙丙丁戊己庚辛壬癸';
const dizhi = '子丑寅卯辰巳午未申酉戌亥';
const term = ['立春','雨水','驚蟄','春分','清明','穀雨','立夏','小滿','芒種','夏至','小暑','大暑','立秋','處暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至','小寒','大寒']; Object.freeze(term);
const infoWuxingWidth = 5;
const infoWuxing = ['3','木','甲','乙','東','2','火','南','丙','丁','5','土','中','戊','己','4','金','西','庚','辛','1','水','北','壬','癸']; Object.freeze(infoWuxing);
const infoDizhiWidth = 3;
const infoDizhi = ['子','鼠','水','丑','牛','土','寅','虎','木','卯','兔','木','辰','龍','土','巳','蛇','火','午','馬','火','未','羊','土','申','猴','金','酉','雞','金','戌','狗','土','亥','豬','水']; Object.freeze(infoDizhi);
const relation6 = ['兄弟','子孫','妻財','官鬼','父母']; Object.freeze(relation6);
const shen6 = ['青龍','白虎','勾陳','螣蛇','朱雀','玄武']; Object.freeze(shen6);
const base8bits = [0b111111,0b100100,0b010010,0b001001,0b000000,0b011011,0b101101,0b110110]; Object.freeze(base8bits);
const base8wuxing = ['金','土','水','木','土','金','火','木']; Object.freeze(base8wuxing);
const base8mask = [0b000000,0b000001,0b000011,0b000111,0b001111,0b011111,0b010111,0b010000]; Object.freeze(base8mask);
const shiying = [[0,3],[5,2],[4,1],[3,0],[2,5],[1,4],[2,5],[3,0]]; Object.freeze(shiying);  //世應在數組中的位置
/**
 * 數象名
 * 數據使用 Object.freeze() 函數禁止更改
 * 可將 javascript 數組作爲關系數據庫使用，有多種類型字段
 * 象數統一使用二進制表示
 */
const info64Width = 3;
const info64 = [
	0b111111,'䷀','乾爲天',0b111110,'䷫','天風姤',0b111100,'䷠','天山遁',0b111000,'䷋','天地否',0b110000,'䷓','風地觀',0b100000,'䷖','山地剝',0b101000,'䷢','火地晉',0b101111,'䷍','火天大有',

	0b100100,'䷳','艮爲山',0b100101,'䷕','山火賁',0b100111,'䷙','山天大畜',0b100011,'䷨','山澤損',0b101011,'䷥','火澤睽',0b111011,'䷉','天澤履',0b110011,'䷼','風澤中孚',0b110100,'䷴','風山漸',

	0b010010,'䷜','坎爲水',0b010011,'䷻','水澤節',0b010001,'䷂','水雷屯',0b010101,'䷾','水火既濟',0b011101,'䷰','澤火革',0b001101,'䷶','雷火豐',0b000101,'䷣','地火明夷',0b000010,'䷆','地水師',

	0b001001,'䷲','震爲雷',0b001000,'䷏','雷地豫',0b001010,'䷧','雷水解',0b001110,'䷟','雷風恆',0b000110,'䷭','地風升',0b010110,'䷯','水風井',0b011110,'䷛','澤風大過',0b011001,'䷐','澤雷隨',

	0b000000,'䷁','坤爲地',0b000001,'䷗','地雷復',0b000011,'䷒','地澤臨',0b000111,'䷊','地天泰',0b001111,'䷡','雷天大壯',0b011111,'䷪','澤天夬',0b010111,'䷄','水天需',0b010000,'䷇','水地比',

	0b011011,'䷹','兌爲澤',0b011010,'䷮','澤水困',0b011000,'䷬','澤地萃',0b011100,'䷞','澤山咸',0b010100,'䷦','水山蹇',0b000100,'䷎','地山謙',0b001100,'䷽','雷山小過',0b001011,'䷵','雷澤歸妹',

	0b101101,'䷝','離爲火',0b101100,'䷷','火山旅',0b101110,'䷱','火風鼎',0b101010,'䷿','火水未濟',0b100010,'䷃','山水蒙',0b110010,'䷺','風水渙',0b111010,'䷅','天水訟',0b111101,'䷌','天火同人',

	0b110110,'䷸','巽爲風',0b110111,'䷈','風天小畜',0b110101,'䷤','風火家人',0b110001,'䷩','風雷益',0b111001,'䷘','天雷无妄',0b101001,'䷔','火雷噬嗑',0b100001,'䷚','山雷頤',0b100110,'䷑','山風蠱'
]; Object.freeze(info64);
const info64_8_6Width = 9;
const info64_8_6 = [
	0b111111,'乾','䷀','壬戌土','壬申金','壬午火','甲辰土','甲寅木','甲子水',
	0b100100,'艮','䷳','丙寅木','丙子水','丙戌土','丙申金','丙午火','丙辰土',
	0b010010,'坎','䷜','戊子水','戊戌土','戊申金','戊午火','戊辰土','戊寅木',
	0b001001,'震','䷲','庚戌土','庚申金','庚午火','庚辰土','庚寅木','庚子水',
	0b000000,'坤','䷁','癸酉金','癸亥水','癸丑土','乙卯木','乙巳火','乙未土',
	0b011011,'兌','䷹','丁未土','丁酉金','丁亥水','丁丑土','丁卯木','丁巳火',
	0b101101,'離','䷝','己巳火','己未土','己酉金','己亥水','己丑土','己卯木',
	0b110110,'巽','䷸','辛卯木','辛巳火','辛未土','辛酉金','辛亥水','辛丑土'
];Object.freeze(info64_8_6);
const nayin = [
	'甲子乙丑海中金','丙寅丁卯爐中火','戊辰己巳大林木','庚午辛未路旁土','壬申癸酉劍鋒金',
	'甲戌乙亥山頭火','丙子丁丑澗下水','戊寅己卯城頭土','庚辰辛巳白臘金','壬午癸未楊柳木',
	'甲申乙酉井泉水','丙戌丁亥屋上土','戊子己丑霹靂火','庚寅辛卯松柏木','壬辰癸巳長流水',
	'甲午乙未砂中金','丙申丁酉山下火','戊戌己亥平地木','庚子辛丑壁上土','壬寅癸卯金箔金',
	'甲辰乙巳覆燈火','丙午丁未天河水','戊申己酉大驛土','庚戌辛亥釵釧金','壬子癸丑桑柘木',
	'甲寅乙卯大溪水','丙辰丁巳砂中土','戊午己未天上火','庚申辛酉石榴木','壬戌癸亥大海水'
]; Object.freeze(nayin);


/**
 * 爻變：由某卦因爻變得到新卦，可用于從八純卦變化得到宮內其餘各卦
 * 輸入：卦數値，變爻
 * 輸出：爻變後的卦數値
 */
function changeBits(bitsInput,bitsMask) {
	let bitsA = (Number.MAX_SAFE_INTEGER^bitsMask)&bitsInput;
	let bitsB = (Number.MAX_SAFE_INTEGER^bitsInput)&bitsMask;
	return bitsA^bitsB;
}

/**
 * 輸入：數象名皆可
 * 輸出：卦信息第一字段指鍼
 */
function getOffset64(value) {
	return Math.floor(info64.indexOf(value)/info64Width) * info64Width;
}

/**
 * 輸入：數
 * 輸出：八純卦的數　及　宮中位置　（注意：八純卦宮位設爲零）
 * 原理：任意卦與八純卦計算（位異或）掩碼値，可確定該卦在何宮何卦（通過定位掩碼在數組 base8mask 中的位置得知）。
 *
 * 取出時使用 ES6 的析構法分解返回値，非常方便：let [base,index] = returnVal
 * 析構賦値有一點很重要：要模擬被析構的目標，析構數組就要模擬數組，析構對象就要模擬對象
 * 卽：let [a,b] = [val1,val2]; let {x,y} = {x:val1,y:val2};
 * 同樣的，析構賦値可以嵌套模擬
 */
function getGroup(value) {
	for(let i=0; i<8; i++) {
		let index = base8mask.indexOf(base8bits[i]^value);
		if(index!=-1) {
			return [info64[getOffset64(base8bits[i])+1], base8wuxing[i], index];
		}
	}
}

/**
 * 輸入：五行之一
 * 輸出：用神（卽輸入），我生，我克，克我（忌神），生我（元神）
 * 我克成仇。仇神，生忌神克元神，也許這就是反克的原理。木，生木者水，克木者金，克水生金者土，應是木克土，卻成土爲仇。
 */
function getInfoWuxing(value) {
	let index = infoWuxing.indexOf(value);
	return [
		value,
		infoWuxing[(index+infoWuxingWidth)%(5*infoWuxingWidth)],
		infoWuxing[(index+2*infoWuxingWidth)%(5*infoWuxingWidth)],
		infoWuxing[(index+3*infoWuxingWidth)%(5*infoWuxingWidth)],
		infoWuxing[(index+4*infoWuxingWidth)%(5*infoWuxingWidth)],
	];
}

/**
	納甲配天干要領：乾內甲外壬，三男丙戊庚；坤內乙外癸，三女丁己辛。
	納甲配地支要領：乾內初子繼，艮坎震進二。坤外四丑還，兌離巽退一。
	納天干地支總領：陽卦配陽干陽支，陰卦配陰干陰支。乾生卦進二，坤育卦退一。先內外，次三爻，天干同，地支異，陽進一，陰退一。

	其實查表法最簡單，編程更應查表。上述要領是爲了無表助記。六爻卜易不用天干，可省。
*/
function getDetail6(bits6) {
	let ooo = 0b111111 & bits6;  //不檢查輸入錯誤，只取最低六位二進制値
	let info6 = [];
	switch(0b111000 & ooo) {  //外卦
		case 0b111000: {
			for(let i=2,d=infoDizhiWidth*6; i>=0; i--,d+=infoDizhiWidth*2) {
				info6[i] = '壬';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b100000: {
			for(let i=2,d=infoDizhiWidth*10; i>=0; i--,d+=infoDizhiWidth*2) {
				info6[i] = '丙';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b010000: {
			for(let i=2,d=infoDizhiWidth*8; i>=0; i--,d+=infoDizhiWidth*2) {
				info6[i] = '戊';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b001000: {
			for(let i=2,d=infoDizhiWidth*6; i>=0; i--,d+=infoDizhiWidth*2) {
				info6[i] = '庚';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b000000: {
			for(let i=2,d=infoDizhiWidth*13; i>=0; i--,d+=infoDizhiWidth*10) {
				info6[i] = '癸';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b011000: {
			for(let i=2,d=infoDizhiWidth*11; i>=0; i--,d+=infoDizhiWidth*10) {
				info6[i] = '丁';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b101000: {
			for(let i=2,d=infoDizhiWidth*9; i>=0; i--,d+=infoDizhiWidth*10) {
				info6[i] = '己';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b110000: {
			for(let i=2,d=infoDizhiWidth*7; i>=0; i--,d+=infoDizhiWidth*10) {
				info6[i] = '辛';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
	}

	switch(0b000111 & ooo) {  //內卦
		case 0b111: {
			for(let i=5,d=0; i>=3; i--,d+=infoDizhiWidth*2) {
				info6[i] = '甲';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b100: {
			for(let i=5,d=infoDizhiWidth*4; i>=3; i--,d+=infoDizhiWidth*2) {
				info6[i] = '丙';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b010: {
			for(let i=5,d=infoDizhiWidth*2; i>=3; i--,d+=infoDizhiWidth*2) {
				info6[i] = '戊';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b001: {
			for(let i=5,d=0; i>=3; i--,d+=infoDizhiWidth*2) {
				info6[i] = '庚';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b000: {
			for(let i=5,d=infoDizhiWidth*7; i>=3; i--,d+=infoDizhiWidth*10) {
				info6[i] = '乙';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b011: {
			for(let i=5,d=infoDizhiWidth*5; i>=3; i--,d+=infoDizhiWidth*10) {
				info6[i] = '丁';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b101: {
			for(let i=5,d=infoDizhiWidth*3; i>=3; i--,d+=infoDizhiWidth*10) {
				info6[i] = '己';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
		case 0b110: {
			for(let i=5,d=infoDizhiWidth; i>=3; i--,d+=infoDizhiWidth*10) {
				info6[i] = '辛';
				info6[i] += infoDizhi[d%(infoDizhiWidth*12)];
			}
		} break;
	}

	for(let i=0; i<info6.length; i++) {
		info6[i] += infoDizhi[infoDizhi.indexOf(info6[i][1])+2];
	}
	return info6;
}

/**
 * 旬空計算法
 * 甲子：子-甲=0，癸酉，酉-癸=0，戌亥 11,12
 * 甲戌：戌-甲=10，癸未，未-癸=-2，申酉 9,10
 * 甲申：申-甲=8，癸巳，巳-癸=-4，午未 7,8
 * 甲午：午-甲=6，癸卯，卯-癸=-6，辰巳 5,6
 * 甲辰：辰-甲=4，癸丑，丑-癸=-8，寅卯 3,4
 * 甲寅：寅-甲=2，癸亥，亥-癸=2，子丑 1,2
 *
 * 計算公式是：（地支+11-天干）%12 得到的餘數確定旬空起始位置，這樣就不需要判斷是否餘數是否負數
 * 判斷任意干支是否在六十花甲中
 * 干支配是陽干配陽支，陰干配陰支，而且是完全匹配，干支差若得到奇數，則說明輸入的干支有誤
 * 由于數組是從零開始，所以上述公式改爲（地支+11-天干）%12-1
 */
function getXunkong(value) {
	if(value==null) return '';
	let resultSub = dizhi.indexOf(value[1])-tiangan.indexOf(value[0]);
	if((resultSub%2)!=0) return '干支有誤';

	let offset = (resultSub+11)%12-1;
	return `${dizhi[offset]}${dizhi[offset+1]}空`;
}


/**
 * 輸入：干支時間，本卦（數），變爻位置（用二進制表示），目的，備注
 * 爲減少外部依賴，時間傳入干支紀年月日時，最多八字最少六字，卽年月日的干支
 */
class Prediction {

	constructor(time8,original,mask,...memo) {
		this.time8 = time8;
		if(Number.isInteger(original)) {
			this.original = 0b111111 & original;
		} else {
			this.original = 0b111111 & parseInt(original,2);
		}
		if(Number.isInteger(mask)) {
			this.mask = 0b111111 & mask;
		} else {
			this.mask = 0b111111 & parseInt(mask,2);
		}
	}

	getInfo() {
		if((typeof this.time8)==='string') {
			//取旬空
			this.time8 += ' ' + getXunkong(this.time8.match(new RegExp(`[${tiangan}][${dizhi}]日`,'g')));
		}

		[this.group,this.groupWuxing,this.offsetInGroup] = getGroup(this.original);

		[this.shi,this.ying] = shiying[this.offsetInGroup];  //世應

		this.oooShu = info64[getOffset64(this.original)];
		this.oooTu = info64[getOffset64(this.original)+1];
		this.oooName = info64[getOffset64(this.original)+2];
		this.ooo6 = getDetail6(this.original);
		let w5 = getInfoWuxing(this.groupWuxing);
		for(let i=0; i<=5; i++) {
			switch(this.ooo6[i][2]) {
				case w5[0]: this.ooo6[i] += relation6[0]; break;
				case w5[1]: this.ooo6[i] += relation6[1]; break;
				case w5[2]: this.ooo6[i] += relation6[2]; break;
				case w5[3]: this.ooo6[i] += relation6[3]; break;
				case w5[4]: this.ooo6[i] += relation6[4]; break;
			}
		}

//		this.ooo6[this.shi] += '世';		this.ooo6[this.ying] += '應';

		if((0b111111&this.mask)===0) return this;  //無變爻

		let var6 = changeBits(this.original,this.mask);
		this.oooVarShu = info64[getOffset64(var6)];
		this.oooVarTu = info64[getOffset64(var6)+1];
		this.oooVarName = info64[getOffset64(var6)+2];
		this.oooVar6 = getDetail6(var6);
		for(let i=0; i<=5; i++) {
			switch(this.oooVar6[i][2]) {
				case w5[0]: this.oooVar6[i] += relation6[0]; break;
				case w5[1]: this.oooVar6[i] += relation6[1]; break;
				case w5[2]: this.oooVar6[i] += relation6[2]; break;
				case w5[3]: this.oooVar6[i] += relation6[3]; break;
				case w5[4]: this.oooVar6[i] += relation6[4]; break;
			}
		}
		return this;
	}

	print(...args) {
		let callback = console.log;
		if(args.length===1) {
			if(typeof args[args.length-1] === 'function') {
				callback = args.pop();
			}
		}

		if(this.group===undefined) this.getInfo();

		callback(this.time8);
		callback();

		let outStr = this.oooName+this.oooTu;
		if(this.mask!=0) outStr += '　之　'+this.oooVarName+this.oooVarTu;
		callback(outStr);
		callback();
		for(let i=0, varBit=0b100000; i<=5; i++,varBit=varBit>>>1) {
			//outStr = this.ooo6[i];
			outStr = this.ooo6[i].slice(1,this.ooo6[i].length);
			if((this.oooShu&varBit)===0) {
				outStr += tu2[1];
			} else {
				outStr += tu2[0];
			}
			if((this.mask&varBit)!=0) {
				switch(outStr[outStr.length-1]) {
					case tu2[0]: outStr = outStr.replace(tu2[0],tu2[2]); break;
					case tu2[1]: outStr = outStr.replace(tu2[1],tu2[3]); break;
				}
			}
			if(i===this.shi) outStr += '世';
			if(i===this.ying) outStr += '應';
			if(this.mask!=0) {
				if((i===this.shi)||(i===this.ying)) {
					//outStr += '　' + this.oooVar6[i];
					outStr += '　' + this.oooVar6[i].slice(1,this.oooVar6[i].length);
				} else {
					//outStr += '　　' + this.oooVar6[i];
					outStr += '　　' + this.oooVar6[i].slice(1,this.oooVar6[i].length);
				}
				if((this.oooVarShu&varBit)===0) {
					outStr += tu2[1];
				} else {
					outStr += tu2[0];
				}
			}
			callback(outStr);
		}
	}
}

module.exports = Prediction;
//export {Prediction};
