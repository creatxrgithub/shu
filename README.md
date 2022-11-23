# 六爻裝卦

經研究發現：不宜以左起爲高位記錄爻象，宜以左起爲低位記錄爻象。應當以零（坤）爲起點作減法，得到負數，其補碼（加上「進制的位數的乘方」取同餘）卽其象。故將停止更新 shu-var 啟用 shu-var-negative 以左起爲低位記錄爻象。

比較：

左起高位的數　左起高位的象　左起低位的數（顯然更有規律）　左起低位的數的補碼　左起低位的象

坤　0 000 -0 0 000
乾　7 111 -1 7 111
兌　3 011 -2 6 110
離　5 101 -3 5 101
震　1 001 -4 4 100
巽　6 110 -5 3 011
坎　2 010 -6 2 010
艮　4 100 -7 1 001


```
npm install shu-var
npm install chinese-calendar-indexer
```

code:

```
/**
 * 只提供兩種起卦法：按中國北京時間起卦，指定時間及卦象與變爻起卦。
 * 定應期以中國北京時間爲準。
 */
const Prediction = require('shu-var');
const CalendarIndexer = require('chinese-calendar-indexer');

const moment = require('moment-timezone');

const timeZone = 'Asia/Shanghai';
const tiangan = '甲乙丙丁戊己庚辛壬癸';
const dizhi = '子丑寅卯辰巳午未申酉戌亥';
const shu8Map = ['000','111','011','101','001','110','010','100'];
const yaoVarMap = ['100000','000001','000010','000100','001000','010000'];
const shuHourMap = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];

/*
 * 打印或渲染函數
 * 默認是後臺打印
 */
function display(arg) {
	if(arg!=null) {
		console.log(arg);
	} else {
		console.log();
	}
}

class LogToStr {
	constructor() {
	}

	static target = '';

	static clear() {
		LogToStr.target = '';
	}

	static log(arg) {
		if(arg!=null) {
			LogToStr.target += arg + '\n';
		} else {
			LogToStr.target += '\n';
		}
	}
}


/**
 * 應當以 0 爲起點（坤）作減法，得到負數（或補碼，加上「進制的位數的乘方」取同餘）表示。
 * 這樣才符合「損之又損，以至於無」。
 * 而且，這樣象數之間無需轉化（左起爲低位），五行分布更規律。
 * 左起爲高位的數值，是相對應的負數的補碼。如果象也以左起爲高位，象卻是數值的鏡像，卽 reverse 值。見下面的兩個函數：
 */

/**
 * 由數取象
 * 這兩個函數只爲研究
 * 查表法最簡單
 */
function getSymbolFromNum (value, base=2, bits=3) {
	let padChar  = '0';
	let modVal = Math.pow(base,bits);
	let n = value;
	if (n<0) {
		n = (n + modVal) % modVal;
	}
	let realSymbol = n.toString(base).padStart(bits, padChar);
	//左起爲高位的象，實爲數的鏡像。
	let humanSymbol = realSymbol.split('').reverse().join('');
	return humanSymbol;
}

/**
 * 由象取數
 * 這兩個函數只爲研究
 * 查表法最簡單
 * @humanSymbol 左起爲高位
 */
function getNumFromSymbol (humanSymbol, base=2, bits=3) {
	let padChar  = '0';
	let modVal = Math.pow(base,bits);
	let realSymbol = humanSymbol.split('').reverse().join('');
	let n = (parseInt(realSymbol, base) - modVal) % modVal;
	//返回零或負數
	return n;
}



/**
 * 以時間起卦取數，取中國北京時間的年月日時的農曆日期，定應期也是以北京時間推算。
 * 根據經驗，以他國時間定卦，似頗不驗。
 */
async function doPredictionByTime(dateObj, memo='備注') {
	let calendarIndexer = new CalendarIndexer();
	let curDate = moment.tz(dateObj, timeZone)
	let lunarData = await calendarIndexer.indexChineseLunar(curDate);
	//console.log(lunarData);
	let shuYear = dizhi.indexOf(lunarData.chineseYear[1])+1;
	let shuMonth = lunarData.lunarMonthDigit;
	let shuDay = lunarData.lunarDayDigit;
	let shuHour = shuHourMap[parseInt(curDate.format('HH'))];
	let yaoTu = shu8Map[(shuYear+shuMonth+shuDay)%8]+ shu8Map[(shuYear+shuMonth+shuDay+shuHour)%8];
	//let yaoVar = 1<<(((((shuYear+shuMonth+shuDay+shuHour)%6)-1)+6)%6);
	let yaoVar = yaoVarMap[((shuYear+shuMonth+shuDay+shuHour)%6)];  //查表最簡單
	//console.log(yaoTu);
	return new Prediction(`北京時間 ${curDate.format()}\n${lunarData.chineseMonth}月${lunarData.chineseDay}日`,yaoTu,yaoVar,memo);
}

/**
 * 指定時間及卦象與變爻起卦
 */
async function doPredictionBySpecify(dateObj, original, mask, memo='備注') {
	let calendarIndexer = new CalendarIndexer();
	let curDate = moment.tz(dateObj, timeZone);
	let lunarData = await calendarIndexer.indexChineseLunar(curDate);
	return new Prediction(`北京時間 ${curDate.format()}\n${lunarData.chineseMonth}月${lunarData.chineseDay}日`,original,mask,memo);
}



(async () => {


	console.log('>>----------');
	let curDate = moment().clone().tz(timeZone);
	let result = await doPredictionByTime(curDate);
	result.getInfo().print(display);

	console.log('>>----------');
	result = await doPredictionBySpecify('2020-05-05','001011','010100');
	result.getInfo().print(display);

	console.log('>>----------');
	result = await doPredictionBySpecify(curDate,'010000','000010','考試');
	//result.getInfo().print(display);
	LogToStr.clear();
	result.getInfo().print(LogToStr.log);
	console.log(LogToStr.target);

	console.log();
	let base = 2;
	let bits = 3;
	let modVal = Math.pow(base, bits);
	for (let i=0; i>-modVal; i--) {
		//let shuStr = ((i+modVal)%modVal).toString(base).padStart(bits,'0');
		let shuStr = getSymbolFromNum(i, base, bits);
		let n = getNumFromSymbol(shuStr, base, bits);
		console.log(parseInt(shuStr,2), shuStr, n, (n+modVal)%modVal, ((n+modVal)%modVal).toString(base).padStart(bits,'0'));
	}



})();  //end top async()

```

output:

```
>>----------
北京時間 2020-10-28T06:58:05+08:00
丙戌月甲辰日 戌亥空

[ '備注' ]

水澤節䷻　之　水雷屯䷂

子水兄弟⚋　　子水兄弟⚋
戌土官鬼⚊　　戌土官鬼⚊
申金父母⚋應　申金父母⚋
丑土官鬼⚋　　辰土官鬼⚋
卯木子孫○　　寅木子孫⚋
巳火妻財⚊世　子水兄弟⚊
>>----------
北京時間 2020-05-05T00:00:00+08:00
辛巳月戊申日 戌亥空

[ '備注' ]

雷澤歸妹䷵　之　澤天夬䷪

戌土父母⚋應　未土父母⚋
申金兄弟ㄨ　　酉金兄弟⚊
午火官鬼⚊　　亥水子孫⚊
丑土父母ㄨ世　辰土父母⚊
卯木妻財⚊　　寅木妻財⚊
巳火官鬼⚊　　子水子孫⚊
>>----------
北京時間 2020-10-28T06:58:05+08:00
丙戌月甲辰日 戌亥空

[ '考試' ]

水地比䷇　之　坎爲水䷜

子水妻財⚋應　子水妻財⚋
戌土兄弟⚊　　戌土兄弟⚊
申金子孫⚋　　申金子孫⚋
卯木官鬼⚋世　午火父母⚋
巳火父母ㄨ　　辰土兄弟⚊
未土兄弟⚋　　寅木官鬼⚋

0 000 -0 0 000
7 111 -1 7 111
3 011 -2 6 110
5 101 -3 5 101
1 001 -4 4 100
6 110 -5 3 011
2 010 -6 2 010
4 100 -7 1 001




```
