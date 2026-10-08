import { FormEvent, useEffect, useState } from "react";
import { getHolyDay, holyDays, lunarPhases, sacredWeeks, seasons, weekdays, weeks } from "./calendar-data";

type TimelineEntry={year:string;date:string;title:string;type:string;place:string;characters:string;summary:string;outcome:string};

function GodNames({gods,high=[]}:{gods:string[];high?:string[]}){
  return <>{gods.map((god,index)=><span key={`${god}-${index}`} className={high.includes(god)?"high-god":""}>{index>0&&<i>、</i>}{god}</span>)}</>;
}

type DateMark={label:string;high:boolean};
type DeityRow={god:string;seasons:DateMark[][]};

function compactGodDates(god:string,seasonIndex:number):DateMark[]{
  const sourceWeeks=seasonIndex===5?sacredWeeks:weeks;
  const records=holyDays.filter(item=>item.season===seasonIndex&&item.gods?.includes(god));
  if(!records.length)return [];
  const isHigh=(day:number)=>records.find(item=>item.day===day)?.high?.includes(god)??false;
  if(seasonIndex===5&&records.length===14&&records.every(item=>isHigh(item.day)===isHigh(records[0].day))){
    return [{label:"全聖季期",high:isHigh(records[0].day)}];
  }
  const marks:DateMark[]=[];
  sourceWeeks.forEach((week,weekIndex)=>{
    const weekDays=records.filter(item=>Math.floor((item.day-1)/7)===weekIndex);
    const statuses=weekDays.map(item=>isHigh(item.day));
    if(weekDays.length===7&&statuses.every(value=>value===statuses[0])){
      marks.push({label:`${week.zh}全週`,high:statuses[0]});
      return;
    }
    weekDays.sort((a,b)=>a.day-b.day).forEach(item=>{
      const weekday=weekdays[(item.day-1)%7];
      marks.push({label:`${week.zh}/${weekday.zh}`,high:isHigh(item.day)});
    });
  });
  return marks;
}

const deityRows:DeityRow[]=Array.from(new Set(holyDays.flatMap(item=>item.gods??[])))
  .sort((a,b)=>a.localeCompare(b,"zh-Hant"))
  .map(god=>({god,seasons:seasons.map((_,seasonIndex)=>compactGodDates(god,seasonIndex))}));

function PrintDateGrid({sacred=false}:{sacred?:boolean}){
  const sourceWeeks=sacred?sacredWeeks:weeks;
  return <div className={`print-date-grid ${sacred?"sacred":"regular"}`}>
    <div className="print-corner">週／日</div>
    {weekdays.map(day=><div className="print-weekday" key={day.en}><i className="rune">{day.rune}</i><b>{day.zh}</b></div>)}
    {sourceWeeks.map((week,weekIndex)=><div className="print-week-row" key={week.en}>
      <div className="print-week-label"><i className="rune">{week.rune}</i><b>{week.zh}</b></div>
      {weekdays.map((weekday,dayIndex)=>{
        const day=weekIndex*7+dayIndex+1;
        return <div className="print-date-cell" key={day}>
          <strong>{day}</strong><span className="rune">{week.rune}{weekday.rune}</span>
        </div>;
      })}
    </div>)}
  </div>;
}

function parseCsv(text:string){
  const rows:string[][]=[];let row:string[]=[];let cell="";let quoted=false;
  for(let i=0;i<text.length;i++){
    const char=text[i];
    if(char==='"'&&quoted&&text[i+1]==='"'){cell+='"';i++}
    else if(char==='"'){quoted=!quoted}
    else if(char===","&&!quoted){row.push(cell);cell=""}
    else if((char==="\n"||char==="\r")&&!quoted){if(char==="\r"&&text[i+1]==="\n")i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell=""}
    else cell+=char;
  }
  row.push(cell);if(row.some(Boolean))rows.push(row);return rows;
}

export default function Home(){
  const [season,setSeason]=useState(0);
  const [selectedDay,setSelectedDay]=useState(1);
  const [draftExcelUrl,setDraftExcelUrl]=useState("");
  const [excelUrl,setExcelUrl]=useState("");
  const [excelError,setExcelError]=useState("");
  const [timeline,setTimeline]=useState<TimelineEntry[]>([]);
  const [timelineLoading,setTimelineLoading]=useState(false);
  const [showTip,setShowTip]=useState(false);
  const [dateCopied,setDateCopied]=useState(false);
  const seasonInfo=seasons[season];
  const selectedWeek=Math.floor((selectedDay-1)/7);
  const selectedWeekInfo=season===5?sacredWeeks[selectedWeek]:weeks[selectedWeek];
  const selectedWeekday=weekdays[(selectedDay-1)%7];
  const selectedMoon=lunarPhases[(selectedDay-1)%7];
  const holy=getHolyDay(season,selectedDay);
  const highGods=holy?.high??[];
  const rowCount=season===5?2:8;
  const dateRune=`${seasonInfo.rune}${selectedWeekInfo.rune}${"dateRune" in selectedWeekday?selectedWeekday.dateRune:selectedWeekday.rune}`;
  const calendarDateText=`${seasonInfo.zh}/${selectedWeekInfo.zh}/${selectedWeekday.zh}`;

  function chooseSeason(index:number){setSeason(index);setSelectedDay(1)}
  async function copyCalendarDate(){
    await navigator.clipboard.writeText(`${dateRune} ${calendarDateText}`);
    setDateCopied(true);window.setTimeout(()=>setDateCopied(false),1500);
  }
  function goToTimelineDate(date:string){
    const seasonIndex=seasons.findIndex(item=>date.includes(item.zh));
    const weekSource=seasonIndex===5?sacredWeeks:weeks;
    const weekIndex=weekSource.findIndex(item=>date.includes(item.zh));
    const weekdayIndex=weekdays.findIndex(item=>date.includes(item.zh));
    if(seasonIndex<0||weekIndex<0||weekdayIndex<0){setExcelError("這筆紀錄的曆法日期不完整，無法定位到日曆。");return}
    setSeason(seasonIndex);setSelectedDay(weekIndex*7+weekdayIndex+1);setExcelError("");
    requestAnimationFrame(()=>document.querySelector(".calendar-board")?.scrollIntoView({behavior:"smooth",block:"start"}));
  }
  useEffect(()=>{const saved=localStorage.getItem("rqg-chronicle-url");if(saved){setDraftExcelUrl(saved);loadTimeline(saved)}},[]);
  function publishedCsvUrl(value:string){
    try{
      const url=new URL(value);
      const isPublished=url.hostname==="docs.google.com"&&url.pathname.includes("/spreadsheets/d/e/")&&(url.pathname.endsWith("/pub")||url.pathname.endsWith("/pubhtml"));
      if(!isPublished||!url.searchParams.get("gid")) return null;
      url.pathname=url.pathname.replace(/\/pubhtml$/,"/pub");
      url.searchParams.set("single","true");
      url.searchParams.set("output","csv");
      return url.toString();
    }catch{return null}
  }
  async function loadTimeline(value:string){
    const csvUrl=publishedCsvUrl(value);
    if(!csvUrl){setExcelError("網址格式不正確。請貼上「時間線」分頁發布為 CSV 後取得的網址。");return}
    setTimelineLoading(true);setExcelError("");
    try{
      const response=await fetch(csvUrl);if(!response.ok)throw new Error();
      const rows=parseCsv(await response.text());
      const headerIndex=rows.findIndex(row=>row.includes("S.T. 年")&&row.includes("事件標題"));
      if(headerIndex<0)throw new Error("missing headers");
      const header=rows[headerIndex];const index=(name:string)=>header.indexOf(name);
      const entries=rows.slice(headerIndex+1).filter(row=>row[index("事件標題")]?.trim()).map(row=>({
        year:row[index("S.T. 年")]??"",date:row[index("曆法日期")]??"",title:row[index("事件標題")]??"",
        type:row[index("類型")]??"",place:row[index("地點")]??"",characters:row[index("參與角色")]??"",
        summary:row[index("事件摘要")]??"",outcome:row[index("後果／變化")]??""
      }));
      if(!entries.length)throw new Error("empty");
      setTimeline(entries);setExcelUrl(value);localStorage.setItem("rqg-chronicle-url",value);
    }catch{setExcelError("無法讀取時間線。請確認發布格式為 CSV、範圍為「時間線」，且該分頁含有範本欄位。")}
    finally{setTimelineLoading(false)}
  }
  function importExcel(event:FormEvent){
    event.preventDefault();
    const clean=draftExcelUrl.trim();
    loadTimeline(clean);
  }

  function exportAllSeasons(){
    window.print();
  }

  return <main className="calendar-app">
    <header className="masthead">
      <div><h1>符文巡旅線上日曆工具</h1></div>
      <div className="header-actions">
        <span className="legend-item"><i className="holy-dot"/>聖日</span>
        <span className="legend-item"><i className="holy-dot high"/>至高聖日</span>
        <a className="download-button" href="./downloads/RuneQuest-Chronicle-Template.xlsx" download>下載編年史 Excel</a>
        <button className="pdf-export-button" type="button" onClick={exportAllSeasons}>輸出全部季節 PDF</button>
      </div>
    </header>

    <nav className="season-tabs" aria-label="選擇季節">
      {seasons.map((s,i)=><button key={s.en} className={season===i?"active":""} style={{"--season-color":s.color} as React.CSSProperties} onClick={()=>chooseSeason(i)}><span>{s.zh}</span><small>{s.en}</small></button>)}
    </nav>

    <div className="calendar-layout">
      <aside className="chronicle-sidebar">
        <div className="side-heading"><p>CAMPAIGN CHRONICLE</p><div className="side-title-row"><h2>戰役時間線</h2><button className="tip-button" type="button" onClick={()=>setShowTip(true)}>TIP · 如何載入</button></div><span>載入 CSV 後，網站會把「時間線」分頁轉成可閱讀的編年史。</span></div>
        <form className="excel-import" onSubmit={importExcel}>
          <label htmlFor="excel-url">「時間線」分頁的 CSV 發布網址</label>
          <input id="excel-url" type="url" value={draftExcelUrl} onChange={e=>{setDraftExcelUrl(e.target.value);setExcelError("")}} placeholder="https://docs.google.com/spreadsheets/d/e/…/pub?output=csv" aria-invalid={!!excelError} required/>
          <button type="submit" disabled={timelineLoading}>{timelineLoading?"讀取中…":"載入時間線"}</button>
          {excelError&&<p className="excel-error" role="alert">{excelError}</p>}
        </form>
        {timeline.length?<div className="timeline-feed">{timeline.map((entry,index)=><button type="button" className="timeline-entry" onClick={()=>goToTimelineDate(entry.date)} title="在日曆中開啟這一天" key={`${entry.date}-${entry.title}-${index}`}>
          <i/><article><small>{entry.date||`${entry.year} S.T.`}</small><div className="timeline-entry-title"><b>{entry.title}</b>{entry.type&&<em>{entry.type}</em>}</div>
          {(entry.place||entry.characters)&&<span>{[entry.place,entry.characters].filter(Boolean).join(" · ")}</span>}
          {entry.summary&&<p>{entry.summary}</p>}{entry.outcome&&<footer>後果：{entry.outcome}</footer>}</article>
        </button>)}</div>:<div className="timeline-sample">
          <i/><article><small>1625 S.T. · 海洋季 · 混亂週</small><b>返回故鄉</b><p>冒險者結束遠行，回到氏族領地。</p></article>
          <i/><article><small>1625 S.T. · 火焰季 · 和諧週</small><b>夏至祭儀</b><p>祭儀中出現尚未解讀的不祥徵兆。</p></article>
        </div>}
      </aside>

      {showTip&&<div className="tip-backdrop" role="presentation" onMouseDown={()=>setShowTip(false)}><section className="tip-dialog" role="dialog" aria-modal="true" aria-labelledby="tip-title" onMouseDown={e=>e.stopPropagation()}>
        <button className="tip-close" type="button" onClick={()=>setShowTip(false)} aria-label="關閉說明">×</button><p>CSV PUBLISHING</p><h2 id="tip-title">如何載入時間線</h2>
        <ol><li>將下載的 XLSX 上傳到 Google Drive，並以 Google 試算表開啟。</li><li>選擇「檔案 → 共用 → 發布到網路」。</li><li>發布範圍選擇「時間線」分頁，格式選擇「逗號分隔值（.csv）」。</li><li>按下「發布」，複製產生的網址並貼回網站。</li></ol>
        <div className="tip-warning"><b>一般共用連結無法使用</b><span>網址應包含 <code>/pub?gid=…&amp;single=true&amp;output=csv</code>，而不是 <code>/edit?usp=sharing</code>。</span></div>
      </section></div>}

      <section className="calendar-board">
        <div className="season-heading" style={{borderColor:seasonInfo.color}}>
          <div><p>{seasonInfo.en}</p><h2>{seasonInfo.zh}</h2></div>
          <span>{seasonInfo.days} 日 · {rowCount} 週</span>
        </div>

        <div className="lunar-phase-strip" aria-label="露娜月相">
          <div className="lunar-strip-title"><span>露娜</span><b>月相</b></div>
          {lunarPhases.map(phase=><div className="lunar-phase-item" key={phase.en}>
            <span className="rune">{phase.glyph}</span><b>{phase.zh}</b><small>{phase.en}</small>
          </div>)}
        </div>

        <div className="month-grid" style={{gridTemplateRows:`auto repeat(${rowCount}, minmax(86px, 1fr))`}}>
          <div className="corner-label"><span>週／日</span></div>
          {weekdays.map((day,i)=><div key={day.en} className="weekday-head">
            <span className="rune weekday-symbol">{day.rune}</span>
            <div><b>{day.zh}</b><small>{day.en}</small></div>
          </div>)}

          {Array.from({length:rowCount},(_,weekIndex)=>{
            const week=season===5?sacredWeeks[weekIndex]:weeks[weekIndex];
            return <div className="week-row" key={week.en}>
              <div className="week-label">
                <span className="rune">{week.rune}</span><b>{week.zh}</b><small>{week.en}</small>
              </div>
              {Array.from({length:7},(_,dayIndex)=>{
                const day=weekIndex*7+dayIndex+1;
                const info=getHolyDay(season,day);
                const high=!!info?.high?.length;
                return <button key={day} className={`day-cell ${selectedDay===day?"selected":""}`} onClick={()=>setSelectedDay(day)} aria-label={`${seasonInfo.zh}第${day}日`}>
                  <span className="day-number">{day}</span>
                  {info?.gods?.length?<div className="god-list"><GodNames gods={info.gods} high={info.high}/></div>:<span className="no-holiday">—</span>}
                  {info?.event&&<em>{info.event}</em>}
                  {info&&<i className={`cell-marker ${high?"high":""}`}/>} 
                </button>;
              })}
            </div>;
          })}
        </div>
      </section>

      <aside className="date-inspector">
        <div className="inspector-band" style={{background:seasonInfo.color}}/>
        <p className="date-overline">{seasonInfo.en}</p>
        <h2>{seasonInfo.zh}</h2>
        <div className="large-date"><strong>{selectedDay}</strong><span>日</span></div>

        <button className="copy-date" type="button" onClick={copyCalendarDate} aria-label={`複製 ${calendarDateText}`}>
          <span><b className="rune">{dateRune}</b><strong>{calendarDateText}</strong></span>
          <small>{dateCopied?"已複製":"點擊複製"}</small>
        </button>

        <dl className="rune-facts">
          <div><dt className="rune">{selectedWeekInfo.rune}</dt><dd><b>{selectedWeekInfo.zh}</b><small>{selectedWeekInfo.en}</small></dd></div>
          <div><dt className="rune">{selectedWeekday.rune}</dt><dd><b>{selectedWeekday.zh}</b><small>{selectedWeekday.en}</small></dd></div>
          <div><dt className="rune">{selectedMoon.glyph}</dt><dd><b>{selectedMoon.zh}</b><small>{selectedMoon.en}</small></dd></div>
        </dl>

        <section className="holiday-panel">
          <div><h3>當日聖日</h3></div>
          {holy?.gods?.length?<p className="holiday-names">{holy.gods.map((god,index)=><span key={god}>{index>0&&<i>、</i>}<b className={highGods.includes(god)?"high-holiday-name":""}>{god}</b></span>)}</p>:<p className="holiday-empty">無列載神祇聖日</p>}
          {holy?.event&&<em>✦ {holy.event}</em>}
        </section>

        <div className="date-nav"><button onClick={()=>setSelectedDay(Math.max(1,selectedDay-1))} disabled={selectedDay===1}>前一日</button><button onClick={()=>setSelectedDay(Math.min(seasonInfo.days,selectedDay+1))} disabled={selectedDay===seasonInfo.days}>後一日</button></div>
      </aside>
    </div>

    <section className="print-calendar" aria-hidden="true">
      <article className="print-page print-structure-page">
        <header className="print-page-heading"><h2>曆法日期總表</h2><span>日期以「週符文＋星期符文」表示</span></header>
        <div className="print-season-legend">
          {[{rune:"w",label:"海洋季"},{rune:".",label:"火焰季"},{rune:"e",label:"大地季"},{rune:"o",label:"黑暗季"},{rune:"g",label:"風暴季"}].map(item=><span key={item.label}><i className="rune">{item.rune}</i><b>{item.label}</b></span>)}
        </div>
        <div className="print-lunar-strip"><strong>露娜月相</strong>{lunarPhases.map(phase=><span key={phase.en}><i className="rune">{phase.glyph}</i><b>{phase.zh}</b></span>)}</div>
        <section className="print-grid-section"><h3>一般季節 · 56 日</h3><PrintDateGrid/></section>
        <section className="print-grid-section sacred-section"><h3>聖季期 · 14 日</h3><PrintDateGrid sacred/></section>
      </article>
      <article className="print-page print-deity-page">
        <header className="print-page-heading"><h2>神祇聖日速查表</h2><span>黑色：聖日　<span className="print-high-key">紅色：至高聖日</span></span></header>
        <div className="deity-matrix-pair">
          {[deityRows.slice(0,23),deityRows.slice(23)].map((rows,panelIndex)=><table className="deity-matrix" key={panelIndex}><thead><tr><th>神祇</th>{seasons.map(item=><th key={item.zh}>{item.zh}</th>)}</tr></thead>
            <tbody>{rows.map(row=><tr key={row.god}><th>{row.god}</th>{row.seasons.map((marks,seasonIndex)=><td key={seasonIndex}>{marks.map((mark,index)=><span className={mark.high?"high-date-mark":""} key={`${mark.label}-${index}`}>{index>0&&<i>、</i>}<b>{mark.label}</b></span>)}</td>)}</tr>)}</tbody>
          </table>)}
        </div>
        <footer>日期以「週／日」表示；「全週」表示該神祇於該週七日皆有聖日。</footer>
      </article>
    </section>

  </main>;
}
